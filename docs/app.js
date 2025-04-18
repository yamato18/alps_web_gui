let ros = null;

// 照準用パラメータ
let aimParams = {
    velocity: NaN,
    pitch: NaN,
    yaw: NaN
};

// rad -> deg 変換
/**
 * 
 * @param {number} rad ラジアン
 * @returns 度
 */
const rad2deg = (rad) => rad * (180 / Math.PI);

/**
 * 
 * @brief `$(id)`を短縮
 * @param {*} id id
 * @returns 短縮
 */
const $ = (id) => document.getElementById(id);

/**
 * 
 * @param {string} title 通知タイトル
 * @param {string} body 通知本文
 */
const showNotification = (title, body) => {
    if (Notification.permission === "granted") {
        navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification(title, {
                body: body,
            });
        });
    } else {
        alert(title + "\n" + body + "\n\n※通知を許可してください");
    }
};

/**
 * 
 * @brief マーカー削除
 */
const removeMarker = () => {
    const existMarkers = $("img_field").getElementsByClassName("marker");
    while (0 < existMarkers.length) {
        existMarkers[0].remove();
    }
};

/**
 * 
 * @brief マーカー作成
 * @param {string} src 
 * @param {number} x 
 * @param {number} y 
 */
const createMarker = (src, x, y) => {
    const marker = document.createElement("img");
        marker.className = "marker";
        marker.src = src;
        marker.style.left = `${x}px`;
        marker.style.top = `${y}px`;
        img_field.appendChild(marker);
};

/**
 * 
 * @brief ROSクライアント
 * @param {string} protocol ws / wss
 * @param {string} ip IPアドレス
 * @param {string} port ポート番号
 * @param {string} ros_domain_id ROS_DOMAIN_ID
 * @returns 
 */
const connectROS = (protocol, ip, port, ros_domain_id) => {

    if (ros) return;

    // roslib.js
    ros = new ROSLIB.Ros({
        url: `${protocol}://${ip}:${port}`,
        options: {
            ros_domain_id: ros_domain_id
        }
    })

    ros.on("connection", () => {
        $("status").textContent = `🟢【ROS接続状況】接続済（${protocol}://${ip}:${port} ID=${ros_domain_id}）`;
        console.log("【INFO】Connected");
        rosSubscriptions();
    });

    // エラー発生時
    ros.on("error", (error) => {
        $("status").textContent = `🔴【ROS接続状況】エラー（${protocol}://${ip}:${port} ID=${ros_domain_id}）`;
        console.log("【ERROR】", error);
        $("ros_image").src = "./NO SIGNAL.png";
        ros = null;
    });

    // 接続終了時
    ros.on("close", () => {
        $("status").textContent = `🟡【ROS接続状況】未接続（${protocol}://${ip}:${port} ID=${ros_domain_id}）`;
        console.log("【INFO】Connection closed");
        $("ros_image").src = "./NO SIGNAL.png";
        ros = null;
    });

    imageClickHandler();
};

/**
 * @brief Topic購読
 */
const rosSubscriptions = () => {
    
    // CompressedImage型
    new ROSLIB.Topic({
        ros: ros,
        name: "/camera/rgb/image_raw/compressed",
        messageType: "sensor_msgs/msg/CompressedImage"
    }).subscribe((msg) => {
        $("ros_image").src = "data:image/jpeg;base64," + msg.data;
    });

    // Notification型
    new ROSLIB.Topic({
        ros: ros,
        name: "/Notification",
        messageType: "web_gui_interfaces/msg/Notification"
    }).subscribe((msg) => {
        console.log(msg);
        showNotification(msg.title, msg.body);
    });

    // Auto Detect

};

/**
 * 
 * @brief 画像クリック時のイベントハンドラ
 */
const imageClickHandler = () => {
     // 座標取得・照準描写
    $("ros_image").addEventListener("click", (event) => {

        const rect = img.getBoundingClientRect();
        const ax = Math.round(event.clientX) + 1;
        const ay = Math.round(event.clientY) + 1;

        // マーカー削除
        removeMarker();

        // マーカー作成
        const marker_l = ax + Math.round(window.scrollX) - 40;
        const marker_t = ay + Math.round(window.scrollY) - 40;
        createMarker("./marker.png", marker_l, marker_t);

        if (!ros) return;
        
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

        $("cd-status-t").textContent = "座標取得中";
        const point_index = y * 640 + x;

        getPointService(x, y, point_index);
    });
};

/**
 * 
 * @brief パラメータ取得サービス
 * @param {number} x 
 * @param {number} y 
 * @param {number} point_index 
 */
const getPointService = (x, y, point_index) => {
    $("cd-status-t").textContent = "座標計算中";

    // Serviceクライアント
    const getPoint3D = new ROSLIB.Service({
        ros: ros,
        name: "/get_point3_d",
        serviceType: "web_gui_interfaces/srv/GetPoint3D"
    });

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

        // Publish用
        aimParams = {
            velocity: n,
            pitch: p,
            yaw: y
        };

        $("range-value").textContent = isNaN(r) ? r : parseFloat(r).toFixed(2);
        $("pitch-value").textContent = isNaN(p) ? p : rad2deg(parseFloat(p)).toFixed(2);
        $("yaw-value").textContent = isNaN(y) ? y : rad2deg(parseFloat(y)).toFixed(2);
        $("turn-value").textContent = isNaN(n) ? n : parseFloat(n).toFixed(2);
    });

    const isValidParams = !isNaN(n) && n !== null &&
                          !isNaN(p) && p !== null && 
                          !isNaN(y) && y !== null;
    if (isValidParams) {
        $("aim-btn").disabled = false;
        $("cd-status-t").textContent = "照準待機中";
    } else {
        $("aim-btn").disabled = true;
        $("cd-status-t").textContent = "座標選択待機中";
    }    
};

// 照準用トピック
const aim_trigger = new ROSLIB.Topic({
    ros: ros,
    name: "/shooting/aim_info",
    messageType: "shooting_interfaces/msg/ShootingAimInfo"
});

// 射撃用トピック
const air_trigger = new ROSLIB.Topic({
    ros: ros,
    name: "/shooting/trigger/gui",
    messageType: "std_msgs/Bool"
});

// リセット用トピック
const reset_trigger = new ROSLIB.Topic({
    ros: ros,
    name: "/shooting/aim_info/reset",
    messageType: "std_msgs/Bool"
});

/**
 * 
 * @brief リセット処理
 */
const reset = () => {
    console.log("復旧");
    $("cd-status-t").textContent = "座標選択待機中";

    $("range-value").textContent = "-----";
    $("pitch-value").textContent = "-----";
    $("yaw-value").textContent = "-----";
    $("turn-value").textContent = "-----";

    // マーカー削除
    removeMarker();

    // 照準ボタンDisabled
    $("aim-btn").disabled = true;
    // 射撃ボタンDisabled
    $("inj-btn").disabled = true;

    const reset_msg = new ROSLIB.Message({
        data: true
    });
    reset_trigger.publish(reset_msg);
};

// 「照準」押下時
$("aim-btn").addEventListener("click", () => {
    console.log("オート照準");
    $("cd-status-t").textContent = "オート照準中";
    console.log(aim_velocity);

    const isValidAimParams = !isNaN(aim_velocity) && aim_velocity !== null &&
                          !isNaN(aim_pitch) && aim_pitch !== null &&
                          !isNaN(aim_yaw) && aim_yaw !== null;
    if (isValidAimParams) {
        const aim_msg = new ROSLIB.Message({
            velocity: aim_velocity,
            pitch: aim_pitch,
            yaw: aim_yaw
        });
        aim_trigger.publish(aim_msg);

        $("inj-btn").disabled = false;
        $("cd-status-t").textContent = "射撃準備完了";
    } else {
        $("inj-btn").disabled = true;
        $("cd-status-t").textContent = "座標選択待機中";
    }
});

// 「射撃」押下時
$("inj-btn").addEventListener("click", () => {
    console.log("射撃");
    $("cd-status-t").textContent = "射撃実行中";
    console.log(aim_velocity);
    
    const inj_msg = new ROSLIB.Message({
            data: true
    });
    air_trigger.publish(inj_msg);

    $("cd-status-t").textContent = "射撃指令送信完了";

    if (window.confirm("射出機構を停止し、初期化しますか？")) {
        reset();
        const inj_msg = new ROSLIB.Message({
            data: false
        });
        air_trigger.publish(inj_msg);

        // 照準ボタンDisabled
        $("aim-btn").disabled = true;

        $("cd-status-t").textContent = "座標選択待機中";
    }
});

// 「復旧」押下時
$("rcv-btn").addEventListener("click", () => {
    reset();
});

// 「詳細」押下時
$("detail").addEventListener("click", () => {
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

// マニュアル照準
// 「照準」押下時
$("manual-inj-btn").addEventListener("click", () => {
    console.log("マニュアル照準");
    $("cd-status-t").textContent = "マニュアル照準中";

    const manual_vel = Number($("manual-turn-value").value);
    const manual_pitch = Number($("manual-pitch-value").value);
    const manual_yaw = Number($("manual-yaw-value").value);

    if (manual_vel !== null && manual_pitch !== null && manual_yaw !== null) {
        const trigger_msg = new ROSLIB.Message({
            velocity: manual_vel,
            pitch: manual_pitch,
            yaw: manual_yaw
        });
        trigger.publish(trigger_msg);

        $("cd-status-t").textContent = "射撃準備完了";

    } else {
        $("cd-status-t").textContent = "照準指令送信中止";
    }
});

// ページ読み込み時
window.addEventListener("DOMContentLoaded", () => {
    const protocol = $("protocol").value;
    const ip = $("ip").value;
    const port = $("port").value;
    const ros_domain_id = $("ros_domain_id").value;
    connectROS(protocol, ip, port, ros_domain_id);
});

// 「接続」押下時
$("connect").addEventListener("click", () => {
    const protocol = $("protocol").value;
    const ip = $("ip").value;
    const port = $("port").value;
    const ros_domain_id = $("ros_domain_id").value;
    connectROS(protocol, ip, port, ros_domain_id);
});

// 「R1」押下時
$("connect_R1").addEventListener("click", () => {
    const protocol = "wss";
    $("protocol").value = protocol;
    const ip = "192.168.2.10";
    $("ip").value = ip;
    const port = "9090";
    $("port").value = port;
    const ros_domain_id = "10";
    $("ros_domain_id").value = ros_domain_id;
    connectROS(protocol, ip, port, ros_domain_id);
});

// 「R2」押下時
$("connect_R2").addEventListener("click", () => {
    const protocol = "wss";
    $("protocol").value = protocol;
    const ip = "192.168.2.20";
    $("ip").value = ip;
    const port = "9090";
    $("port").value = port;
    const ros_domain_id = "20";
    $("ros_domain_id").value = ros_domain_id;
    connectROS(protocol, ip, port, ros_domain_id);
});

// 「試験」押下時
$("connect_Test").addEventListener("click", () => {
    const protocol = "wss";
    $("protocol").value = protocol;
    const ip = "dell-pc.local";
    $("ip").value = ip;
    const port = "9090";
    $("port").value = port;
    const ros_domain_id = "10";
    $("ros_domain_id").value = ros_domain_id;
    connectROS(protocol, ip, port, ros_domain_id);
});


// // Point2D型
// const autoDetect = new ROSLIB.Topic({
//     ros: ros,
//     name: "/goal_auto_detect",
//     messageType: "web_gui_interfaces/msg/Point2D"
// });
// // ROS接続成功で購読開始
// autoDetect.subscribe((msg) => {
//     let auto_x = msg.x;
//     let auto_y = msg.y;

//     const img = $("ros_image");
//     const rect = img.getBoundingClientRect();
//     if (rect.width == 320) {
//         auto_x = Math.round(auto_x / 2);
//     }
//     if (rect.height == 240) {
//         auto_y = Math.round(auto_y / 2);
//     }
    
//     // マーカー削除
//     removeMarker();

//     // マーカー作成
//     const marker = document.createElement("img");
//     marker.className = "marker";
//     marker.src = "./marker_auto.png";
//     marker.style.left = `${auto_x + Math.round(window.scrollX) - 40 + 8}px`;
//     marker.style.top = `${auto_y + Math.round(window.scrollY) - 40 + 61}px`;
//     img_field.appendChild(marker);
// });
