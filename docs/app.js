import * as THREE from 'three';

const connectROS = () => {
    // roslib.js
    const protocol = document.getElementById("protocol").value;
    const ip = document.getElementById("ip").value;
    const port = document.getElementById("port").value;
    const ros_domain_id = document.getElementById("ros_domain_id").value;

    const ros = new ROSLIB.Ros({
        url: `${protocol}://${ip}:${port}`,
        options: {
            ros_domain_id: ros_domain_id
        }
    })

    // Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("pointcloud")
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.position.set(0, 0, 5);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const material = new THREE.PointsMaterial({ vertexColors: true });
    const pointCloud = new THREE.Points(geometry, material);
    scene.add(pointCloud);

    const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    };
    
    ros.on("connection", () => {
        const status = document.getElementById("status");
        status.textContent = `🟢【ROS接続状況】接続済（${protocol}://${ip}:${port} ID=${ros_domain_id}）`;
        
        // CompressedImage型
        const image = new ROSLIB.Topic({
            ros: ros,
            name: "/image_raw/compressed",
            messageType: "sensor_msgs/msg/CompressedImage"
        });
        image.subscribe((message) => {
            const data = "data:image/png;base64," + message.data;
            document.getElementById("ros_image").setAttribute("src", data);
        });

        // PointCloud2型
        const pointcloud = new ROSLIB.Topic({
            ros: ros,
            name: "/camera/depth_registered/points",
            messageType: "sensor_msgs/msg/PointCloud2"
        });
        pointcloud.subscribe((message) => {
            const width = message.width;
            const height = message.height;
            const data = message.data;

            const points = [];
            const colors = [];

            for (let i = 0; i < data.length; i += 3) {
                const x = ((i / 3) % width) - width / 2;
                const y = height / 2 - Math.floor((i / 3) / width);
                const z = Math.random() * 2 - 1;

                const r = data[i] / 255;
                const g = data[i + 1] / 255;
                const b = data[i + 2] / 255;

                points.push(x, y, z);

                colors.push(x, y, z);
            }

            geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
            geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

            geometry.attributes.position.needUpdate = true;
            geometry.attributes.color.needUpdate = true;
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
    connectROS();
});

document.getElementById("connect").addEventListener("click", () => {
    connectROS();
});