function ROS(URL) {
    const ros = new ROSLIB.Ros({
        url: `ws://${URL}:9090`,
        options: {
            ros_domain_id: "10"
        }
    })
    
    ros.on("connection", () => {
        document.getElementById("status").innerHTML = "successful";
    });
    
    ros.on("error", (error) => {
        console.log("Error: ", error);
    });
    
    ros.on("close", () => {
        console.log("Closed");
    });
    
    const image = new ROSLIB.Topic({
        ros: ros,
        name: "/image_raw/compressed",
        messageType: "sensor_msgs/msg/CompressedImage"
    });
    
    image.subscribe((message) => {
        const data = "data:image/png;base64," + message.data;
        document.getElementById("ros_image").setAttribute("src", data);
    });
}

ROS("localhost");

const btn = document.getElementById("ipButton");
btn.addEventListener("click", () => {
    const ip = document.getElementById("ipAddress").value;
    ROS(ip);
});