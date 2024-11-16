const connectROS = (protocol, ip, port, ros_domain_id) => {
    
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
        console.log("【INFO】Connected");

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


    });
    
    ros.on("error", (error) => {
        const status = document.getElementById("status");
        status.textContent = `🔴【ROS接続状況】エラー（${protocol}://${ip}:${port} ID=${ros_domain_id}）`;
        console.log("【ERROR】", error);
        document.getElementById("ros_image").setAttribute("src", "./NO SIGNAL.png");
    });
    
    ros.on("close", () => {
        const status = document.getElementById("status");
        status.textContent = `🟡【ROS接続状況】未接続（${protocol}://${ip}:${port} ID=${ros_domain_id}）`;
        console.log("【INFO】Connection closed");
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
const removeMarker = () => {
    const existMarkers = img_field.getElementsByClassName("marker");
    while (0 < existMarkers.length) {
        existMarkers[0].remove();
    }
}

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
    if (rect.height == 240) {
        y = 2 * (ay - Math.round(rect.top));
    } else {
        y = ay - Math.round(rect.top);
    }
    
    document.getElementById("cd-xy").textContent = "【座標】（" + x + ", " + y + "）";

    // マーカー削除
    removeMarker();
    
    // マーカー作成
    const marker = document.createElement("img");
    marker.className = "marker";
    marker.src = "./marker.png";
    marker.style.left = `${ax + Math.round(window.scrollX) - 40}px`;
    marker.style.top = `${ay + Math.round(window.scrollY) - 40}px`;
    img_field.appendChild(marker);
});

document.getElementById("inj-btn").addEventListener("click", () => {
    console.log("射出");
    
});

document.getElementById("rcv-btn").addEventListener("click", () => {
    console.log("復旧");
    
    document.getElementById("cd-xy").textContent = "【座標】（x, y）";
    removeMarker();
});