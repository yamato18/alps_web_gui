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

    // Point2D型
    const pub_2d = new ROSLIB.Topic({
        ros: ros,
        name: "/point2d",
        messageType: "Point2D"
    });

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
        document.getElementById("cd-xy-i").textContent = y * 640 + x;

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
            const point2d = new ROSLIB.Message({
                point2d: point2d
            });
            pub_2d.publish(point2d);

            document.getElementById("cd-status-t").textContent = "座標計算中";
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
    const ip = "192.168.11.10";
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
    const ip = "192.168.11.20";
    document.getElementById("ip").value = ip;
    const port = "9090";
    document.getElementById("port").value = port;
    const ros_domain_id = "20";
    document.getElementById("ros_domain_id").value = ros_domain_id;
    connectROS(protocol, ip, port, ros_domain_id);
});

// 「試験」押下時
document.getElementById("connect_R2").addEventListener("click", () => {
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