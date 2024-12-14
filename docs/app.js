// ROS接続
const connectROS = (protocol, ip, port, ros_domain_id) => {

    // roslib.js
    const ros = new ROSLIB.Ros({
        url: `${protocol}://${ip}:${port}`,
        options: {
            ros_domain_id: ros_domain_id
        }
    })

    let isConnected = false;

    ros.on("connection", () => {
        const status = document.getElementById("status");
        status.textContent = `🟢【ROS接続状況】接続済（${protocol}://${ip}:${port} ID=${ros_domain_id}）`;
        console.log("【INFO】Connected");

        isConnected = true;

        // CompressedImage型
        const image = new ROSLIB.Topic({
            ros: ros,
            name: "/camera/rgb/image_raw/compressed",
            messageType: "sensor_msgs/msg/CompressedImage"
        });
        // ROS接続成功で購読開始
        image.subscribe((message) => {
            const data = "data:image/png;base64," + message.data;
            document.getElementById("ros_image").setAttribute("src", data);
        });
    });

    // エラー発生時
    ros.on("error", (error) => {
        const status = document.getElementById("status");
        status.textContent = `🔴【ROS接続状況】エラー（${protocol}://${ip}:${port} ID=${ros_domain_id}）`;
        console.log("【ERROR】", error);
        isConnected = false;
        document.getElementById("ros_image").setAttribute("src", "./NO SIGNAL.png");
    });

    // 接続修了時
    ros.on("close", () => {
        const status = document.getElementById("status");
        status.textContent = `🟡【ROS接続状況】未接続（${protocol}://${ip}:${port} ID=${ros_domain_id}）`;
        console.log("【INFO】Connection closed");
        isConnected = false;
        document.getElementById("ros_image").setAttribute("src", "./NO SIGNAL.png");
    });

    // Notification型
    const ros_notification = new ROSLIB.Topic({
        ros: ros,
        name: "/Notification",
        messageType: "web_gui_interfaces/msg/Notification"
    });
    // ROS接続成功で購読開始
    ros_notification.subscribe((message) => {
        console.log(message);
        
        if (Notification.permission === "granted") {
            navigator.serviceWorker.ready.then((registration) => {
                registration.showNotification(message.title, {
                    body: message.body,
                });
            });
        } else {
            alert(message.title + "\n" + message.body + "\n\n※通知を許可してください");
        }
    });

    let getPoint3D = null;

    // Serviceクライアント
    if (!getPoint3D) {
        getPoint3D = new ROSLIB.Service({
            ros: ros,
            name: "/get_point3_d",
            serviceType: "web_gui_interfaces/srv/GetPoint3D"
        });
    };

    // マーカー削除
    const img_field = document.getElementById("img-field");
    const removeMarker = () => {
        const existMarkers = img_field.getElementsByClassName("marker");
        while (0 < existMarkers.length) {
            existMarkers[0].remove();
        }
    }

    // 座標取得・照準描写
    const img = document.getElementById("ros_image");
    img.addEventListener("click", (event) => {
        const rect = img.getBoundingClientRect();
        const ax = Math.round(event.clientX) + 1;
        const ay = Math.round(event.clientY) + 1;
        let x, y;
        if (rect.width == 320) {
            x = 2 * (ax - Math.round(rect.left));
        } else {
            x = ax - Math.round(rect.left);
        }
        if (640 <= x) {
            x = 639;
        }
        if (rect.height == 240) {
            y = 2 * (ay - Math.round(rect.top));
        } else {
            y = ay - Math.round(rect.top);
        }
        if (480 <= y) {
            y = 479;
        }

        document.getElementById("cd-status-t").textContent = "座標取得中";
        document.getElementById("cd-xy-x").textContent = x;
        document.getElementById("cd-xy-y").textContent = y;
        const point_index = y * 640 + x;
        document.getElementById("cd-xy-i").textContent = point_index;

        // マーカー削除
        removeMarker();

        // マーカー作成
        const marker = document.createElement("img");
        marker.className = "marker";
        marker.src = "./marker.png";
        marker.style.left = `${ax + Math.round(window.scrollX) - 40}px`;
        marker.style.top = `${ay + Math.round(window.scrollY) - 40}px`;
        img_field.appendChild(marker);

        // ROS接続成功時に送信
        if (isConnected) {
            document.getElementById("cd-status-t").textContent = "座標計算中";
            const request = new ROSLIB.ServiceRequest({
                point2d: { index: point_index }
            });
            getPoint3D.callService(request, (response) => {
                const xyz = response.point3d_xyz;
                const rtp = response.point3d_rtp;

                document.getElementById("cd-xyz-x").textContent = isNaN(xyz.x) ? xyz.x : parseFloat(xyz.x).toFixed(2);
                document.getElementById("cd-xyz-y").textContent = isNaN(xyz.y) ? xyz.y : parseFloat(xyz.y).toFixed(2);
                document.getElementById("cd-xyz-z").textContent = isNaN(xyz.z) ? xyz.z : parseFloat(xyz.z).toFixed(2);

                document.getElementById("cd-rtp-r").textContent = isNaN(rtp.range) ? rtp.range : parseFloat(rtp.range).toFixed(2);
                document.getElementById("cd-rtp-t").textContent = isNaN(rtp.theta) ? rtp.theta : parseFloat(rtp.theta).toFixed(2);
                document.getElementById("cd-rtp-p").textContent = isNaN(rtp.phi) ? rtp.phi : parseFloat(rtp.phi).toFixed(2);
            });
            document.getElementById("cd-status-t").textContent = "座標表示中";
        }

        // 射出ボタンEnabled
        document.getElementById("inj-btn").disabled = false;
    });

    // 「射出」押下時
    document.getElementById("inj-btn").addEventListener("click", () => {
        console.log("射出");
        document.getElementById("cd-status-t").textContent = "射出実行中"
    });

    // 「復旧」押下時
    document.getElementById("rcv-btn").addEventListener("click", () => {
        console.log("復旧");

        document.getElementById("cd-status-t").textContent = "座標選択待機中";

        document.getElementById("cd-xy-x").textContent = "x";
        document.getElementById("cd-xy-y").textContent = "y";
        document.getElementById("cd-xy-i").textContent = "i";

        document.getElementById("cd-xyz-x").textContent = "x";
        document.getElementById("cd-xyz-y").textContent = "y";
        document.getElementById("cd-xyz-z").textContent = "z";

        document.getElementById("cd-rtp-r").textContent = "r";
        document.getElementById("cd-rtp-t").textContent = "θ";
        document.getElementById("cd-rtp-p").textContent = "φ";

        // マーカー削除
        removeMarker();

        // 射出ボタンDisabled
        document.getElementById("inj-btn").disabled = true;
    });
}

// ページ読み込み時
window.addEventListener("load", () => {
    const protocol = document.getElementById("protocol").value;
    const ip = document.getElementById("ip").value;
    const port = document.getElementById("port").value;
    const ros_domain_id = document.getElementById("ros_domain_id").value;
    connectROS(protocol, ip, port, ros_domain_id);
});

// 「接続」押下時
document.getElementById("connect").addEventListener("click", () => {
    const protocol = document.getElementById("protocol").value;
    const ip = document.getElementById("ip").value;
    const port = document.getElementById("port").value;
    const ros_domain_id = document.getElementById("ros_domain_id").value;
    connectROS(protocol, ip, port, ros_domain_id);
});

// 「R1」押下時
document.getElementById("connect_R1").addEventListener("click", () => {
    const protocol = "wss";
    document.getElementById("protocol").value = protocol;
    const ip = "192.168.2.10";
    document.getElementById("ip").value = ip;
    const port = "9090";
    document.getElementById("port").value = port;
    const ros_domain_id = "10";
    document.getElementById("ros_domain_id").value = ros_domain_id;
    connectROS(protocol, ip, port, ros_domain_id);
});

// 「R2」押下時
document.getElementById("connect_R2").addEventListener("click", () => {
    const protocol = "wss";
    document.getElementById("protocol").value = protocol;
    const ip = "192.168.2.20";
    document.getElementById("ip").value = ip;
    const port = "9090";
    document.getElementById("port").value = port;
    const ros_domain_id = "20";
    document.getElementById("ros_domain_id").value = ros_domain_id;
    connectROS(protocol, ip, port, ros_domain_id);
});

// 「試験」押下時
document.getElementById("connect_Test").addEventListener("click", () => {
    const protocol = "wss";
    document.getElementById("protocol").value = protocol;
    const ip = "dell-pc.local";
    document.getElementById("ip").value = ip;
    const port = "9090";
    document.getElementById("port").value = port;
    const ros_domain_id = "10";
    document.getElementById("ros_domain_id").value = ros_domain_id;
    connectROS(protocol, ip, port, ros_domain_id);
});