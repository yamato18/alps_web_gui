let ros = null;

// ROS接続
const connectROS = (protocol, ip, port, ros_domain_id) => {

    if (ros) return;

    // 各種パラメータ
    let aim_velocity = NaN;
    let aim_pitch = NaN;
    let aim_yaw = NaN;

    // roslib.js
    ros = new ROSLIB.Ros({
        url: `${protocol}://${ip}:${port}`,
        options: {
            ros_domain_id: ros_domain_id
        }
    })

    // リセット指示
    const reset = new ROSLIB.Topic({
        ros: ros,
        name: "/shooting/aim_info/reset",
        messageType: "std_msgs/Bool"
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
            const data = "data:image/jpeg;base64," + message.data;
            document.getElementById("ros_image").setAttribute("src", data);
        });

        // Notification型
        const rosNotification = new ROSLIB.Topic({
            ros: ros,
            name: "/Notification",
            messageType: "web_gui_interfaces/msg/Notification"
        });
        // ROS接続成功で購読開始
        rosNotification.subscribe((message) => {
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

        // Point2D型
        const autoDetect = new ROSLIB.Topic({
            ros: ros,
            name: "/goal_auto_detect",
            messageType: "web_gui_interfaces/msg/Point2D"
        });
        // ROS接続成功で購読開始
        autoDetect.subscribe((message) => {
            const auto_x = message.x;
            const auto_y = message.y;

            const rect = img.getBoundingClientRect();
            if (rect.width == 320) {
                auto_x = Math.round(auto_x / 2);
            }
            if (rect.height == 240) {
                auto_y = Math.round(auto_y / 2);
            }
            console.log(auto_x, auto_y);
            
            // マーカー削除
            removeMarker();

            // マーカー作成
            const marker = document.createElement("img");
            marker.className = "marker";
            marker.src = "./marker_auto.png";
            marker.style.left = `${auto_x + Math.round(window.scrollX) - 40 + 8}px`;
            marker.style.top = `${auto_y + Math.round(window.scrollY) - 40 + 61}px`;
            img_field.appendChild(marker);
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
        ros = null;
    });

    // 射出指示
    const trigger = new ROSLIB.Topic({
        ros: ros,
        name: "/shooting/aim_info",
        messageType: "shooting_interfaces/msg/ShootingAimInfo"
    })

    let getPoint3D = null;

    // Serviceクライアント
    if (!getPoint3D) {
        getPoint3D = new ROSLIB.Service({
            ros: ros,
            name: "/get_point3_d",
            serviceType: "web_gui_interfaces/srv/GetPoint3D"
        });
    };

    // Service処理
    const getPointService = (x, y, point_index) => {
        document.getElementById("cd-status-t").textContent = "座標計算中";
            const request = new ROSLIB.ServiceRequest({
                point2d: { 
                    x: x,
                    y: y,
                    index: point_index
                }
            });
            getPoint3D.callService(request, (response) => {
                // const point3d = response.point3d;
                const param = response.shootparam;
                const r = param.shoot_range;
                const p = param.shoot_pitch;
                const y = param.shoot_yaw;
                const n = param.shoot_n;

                // Publish用（後日最適化する）
                aim_velocity = n;
                aim_pitch = p;
                aim_yaw = y;

                const rad2deg = (rad) => rad * (180 / Math.PI);

                document.getElementById("range-value").textContent = isNaN(r) ? r : parseFloat(r).toFixed(2);
                document.getElementById("pitch-value").textContent = isNaN(p) ? p : rad2deg(parseFloat(p)).toFixed(2);
                document.getElementById("yaw-value").textContent = isNaN(y) ? y : rad2deg(parseFloat(y)).toFixed(2);
                document.getElementById("turn-value").textContent = isNaN(n) ? n : parseFloat(n).toFixed(2);

            });
            document.getElementById("cd-status-t").textContent = "座標表示中";
    }

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
        console.log(ax, ay);
        
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
        const point_index = y * 640 + x;

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
            getPointService(x, y, point_index);
            if (!isNaN(aim_velocity) && !isNaN(aim_pitch) && !isNaN(aim_yaw)) {
                // 射出ボタンEnabled
                document.getElementById("inj-btn").disabled = false;
            } else {
                // 射出ボタンDisabled
                document.getElementById("inj-btn").disabled = true;
            }
        }
    });

    // 「射出」押下時
    document.getElementById("inj-btn").addEventListener("click", () => {
        console.log("射出");
        document.getElementById("cd-status-t").textContent = "射出実行中";

        if (!isNaN(aim_velocity) && !isNaN(aim_pitch) && !isNaN(aim_yaw)) {
            const trigger_msg = new ROSLIB.Message({
                velocity: aim_velocity,
                pitch: aim_pitch,
                yaw: aim_yaw
            });
            trigger.publish(trigger_msg);
    
            document.getElementById("cd-status-t").textContent = "射出指示送信完了";
        } else {
            document.getElementById("cd-status-t").textContent = "射出指示送信中止";
        }
    });

    // 「復旧」押下時
    document.getElementById("rcv-btn").addEventListener("click", () => {
        console.log("復旧");

        document.getElementById("cd-status-t").textContent = "座標選択待機中";

        document.getElementById("range-value").textContent = "-----";
        document.getElementById("pitch-value").textContent = "-----";
        document.getElementById("yaw-value").textContent = "-----";
        document.getElementById("turn-value").textContent = "-----";

        // マーカー削除
        removeMarker();

        // 射出ボタンDisabled
        document.getElementById("inj-btn").disabled = true;

        const reset_msg = new ROSLIB.Message({
            data: true
        });
        reset.publish(reset_msg);
    });

    // 「詳細」押下時
    document.getElementById("detail").addEventListener("click", () => {
        alert(
            // "2D x ---------> " + "100" + "\n" +
            // "2D y ---------> " + "200" + "\n" +
            // "2D index -----> " + "20000" + "\n" +
            // "3D X ---------> " + "300" + " [m]\n" +
            // "3D Y ---------> " + "400" + " [m]\n" +
            // "3D Z ---------> " + "500" + " [m]\n" +
            // "3D Range -----> " + "200" + " [m]\n" +
            // "3D Theta -----> " + "90" + " [°]\n" +
            // "3D Phi -------> " + "90" + " [°]\n" +
            // "Distance -----> " + "200" + " [m]\n" +
            // "Yaw ----------> " + "200" + " [°]\n" +
            // "Pitch --------> " + "200" + " [°]\n" +
            // "Velocity -----> " + "200" + " [m/s]\n" +
            // "N ------------> " + "200" + " [r/s]\n" +
            // "MaxHeight ----> " + "2" + " [m]\n" +
            // "isAutoDetect -> " + "false" + "\n" +
            // "Auto 2D x ---->" + "200" + "\n" +
            // "Auto 2D y ---->" + "200" + "\n"
        );
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