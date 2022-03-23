module.exports = function (window, settings) {
    window.webContents.on('will-navigate', (event, url) => {
        if (url.includes("auth/google")) {
            window.setSize(448, settings.height)
            window.center();
        } else if (url.includes("signin/oauth/consent")) {
            window.setSize(settings.width, settings.height);
            window.center();
        } else if (url.includes("www.prodigygame.com")) {
            window.loadURL("https://play.prodigygame.com/", { userAgent: settings.userAgent });
        } else return;
    });
}