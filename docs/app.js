const connectROS = (protocol, ip, port, ros_domain_id) => {

    console.log(typeof(ip));
    

    // roslib.js
    const ros = new ROSLIB.Ros({
        url: `${protocol}://${ip}:${port}`,
        options: {
            ros_domain_id: ros_domain_id
        }
    })
    
    ros.on("connection", () => {
        const status = document.getElementById("status");
        status.textContent = `🟢【ROS接続状況】接続済（${protocol}://${ip}:${port} ID=${ros_domain_id}）`;
        
        // CompressedImage型
        const image = new ROSLIB.Topic({
            ros: ros,
            name: "/camera/rgb/image_raw/compressed",
            messageType: "sensor_msgs/msg/CompressedImage"
        });

        image.subscribe((message) => {
            const data = "data:image/png;base64," + message.data;
            document.getElementById("ros_image").setAttribute("src", data);
        });

        animate();
    });
    
    ros.on("error", (error) => {
        const status = document.getElementById("status");
        status.textContent = `🔴【ROS接続状況】エラー（${protocol}://${ip}:${port} ID=${ros_domain_id}）`;
        console.log("Error: ", error);
        document.getElementById("ros_image").setAttribute("src", "./NO SIGNAL.png");
    });
    
    ros.on("close", () => {
        const status = document.getElementById("status");
        status.textContent = `🟡【ROS接続状況】未接続（${protocol}://${ip}:${port} ID=${ros_domain_id}）`;
        console.log("Closed");
        document.getElementById("ros_image").setAttribute("src", "./NO SIGNAL.png");
    });
}

window.addEventListener("load", () => {
    const protocol = document.getElementById("protocol").value;
    const ip = document.getElementById("ip").value;
    const port = document.getElementById("port").value;
    const ros_domain_id = document.getElementById("ros_domain_id").value;
    connectROS(protocol, ip, port, ros_domain_id);
});

document.getElementById("connect").addEventListener("click", () => {
    const protocol = document.getElementById("protocol").value;
    const ip = document.getElementById("ip").value;
    const port = document.getElementById("port").value;
    const ros_domain_id = document.getElementById("ros_domain_id").value;
    connectROS(protocol, ip, port, ros_domain_id);
});

document.getElementById("connect_R1").addEventListener("click", () => {
    const protocol = "wss";
    document.getElementById("protocol").value = protocol;
    const ip = "192.168.11.2";
    document.getElementById("ip").value = ip;
    const port = "9090";
    document.getElementById("port").value = port;
    const ros_domain_id = "10";
    document.getElementById("ros_domain_id").value = ros_domain_id;
    connectROS(protocol, ip, port, ros_domain_id);
});

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

const img_field = document.getElementById("img-field");
const img = document.getElementById("ros_image");
img.addEventListener("click", (event) => {
    const rect = img.getBoundingClientRect();
    const ax = Math.ceil(event.clientX);
    const ay = Math.ceil(event.clientY);
    const x = ax - rect.left;
    const y = ay - rect.top;
    document.getElementById("cd-xy").textContent = "【座標】（" + x + ", " + y + "）";
    console.log("x: ", x, " Y: ", y);

    // マーカー削除
    const existMarkers = img_field.getElementsByClassName("marker");
    while (0 < existMarkers.length) {
        existMarkers[0].remove();
    }

    // マーカー作成
    const marker = document.createElement("div");
    marker.className = "marker";
    marker.style.left = `${ax - 5}px`;
    marker.style.top = `${ay - 5}px`;
    img_field.appendChild(marker);
});