const connectROS = (protocol, ip, port, ros_domain_id) => {
    const ros = new ROSLIB.Ros({
        url: `${protocol}://${ip}:${port}`,
        options: {
            ros_domain_id: ros_domain_id
        }
    })
    
    ros.on("connection", () => {
        const status = document.getElementById("status");
        status.innerHTML = `🟢【ROS接続状況】接続済（${protocol}://${ip}:${port} ID=${ros_domain_id}）`
        const image = new ROSLIB.Topic({
            ros: ros,
            name: "/image_raw/compressed",
            messageType: "sensor_msgs/msg/CompressedImage"
        });
        
        image.subscribe((message) => {
            const data = "data:image/png;base64," + message.data;
            document.getElementById("ros_image").setAttribute("src", data);
        });
    });
    
    ros.on("error", (error) => {
        const status = document.getElementById("status");
        status.innerHTML = `🔴【ROS接続状況】エラー（${protocol}://${ip}:${port} ID=${ros_domain_id}）`
        console.log("Error: ", error);
        document.getElementById("ros_image").setAttribute("src", "NO SIGNAL.png");
    });
    
    ros.on("close", () => {
        const status = document.getElementById("status");
        status.innerHTML = `🟡【ROS接続状況】未接続（${protocol}://${ip}:${port} ID=${ros_domain_id}）`
        console.log("Closed");
        document.getElementById("ros_image").setAttribute("src", "NO SIGNAL.png");
    });
}

