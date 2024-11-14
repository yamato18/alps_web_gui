if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(
        (registration) => {
            console.log("ServiceWorker registration successful with scope: ", registration.scope);

            registration.addEventListener("updatefound", () => {
                const installWorker = registration.installing;
                if (installWorker != null) {
                    installWorker.onstatechange = (e) => {
                        if (e.target.state == "activated") {
                            navigator.serviceWorker.controller.postMessage({ type: "GET_VERSION" });
                            navigator.serviceWorker.addEventListener("message", (event) => {
                                if (event.data && event.data.type === "VERSION") {
                                    const newVersion = event.data.version;
                                    document.getElementById("sw-version").textContent = `Ver. ${newVersion}`;
                                    alert(`【アップデート Ver. ${newVersion}】\nWebアプリが更新されました。アプリを再起動してください。\niOS端末など一部の環境では更新が正しく適用されない場合があります。Webアプリを一度削除し、キャッシュの削除などを実行の上で再度インストールしてください。`);
                                }
                            });
                        }
                    };
                }
            });

            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({ type: "GET_VERSION" });
                navigator.serviceWorker.addEventListener("message", (event) => {
                    if (event.data && event.data.type === "VERSION") {
                        const currentVersion = event.data.version;
                        document.getElementById("sw-version").textContent = `Ver. ${currentVersion}`;                              
                    }
                });
            }
        },
        (error) => {
            console.error(`ServiceWorker registration failed: ${error}`);
        },
    );
} else {
    console.error("ServiceWorkers are not supported.");
}

const info = document.getElementById("info");
info.addEventListener("click", () => {
    alert("E-Mail: yamato151008<at>gmail.com\nCopyright © 2024 Shirahata Yamato All Rights Reserved.");
});

const notice = document.getElementById("notice");
notice.addEventListener("click", () => {
    alert("E-Mail: yamato151008@gmail.com\nCopyright © 2024 Shirahata Yamato All Rights Reserved.");
    console.log("test");
    
    // if (!("Notification" in window)) {
    //     alert("【ERROR】\nこのブラウザは通知に対応していません。");
    // } else if (Notification.permission === "granted") {
    //     alert("【INFO】\n通知は許可されています。");
    // } else if (Notification.permission === "denied") {
    //     Notification.requestPermission().then((permission) => {
    //         if (permission === "denied") {
    //             alert("【ERROR】\n通知は許可されませんでした。");
    //         } else if (permission === "granted") {
    //             navigator.serviceWorker.ready.then((registration) => {
    //                 registration.showNotification("【INFO】", {
    //                     body: "通知が許可されました。",
    //                 });
    //             });
    //         }
    //     });
    // }
});