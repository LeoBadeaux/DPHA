const fs = require("fs")
const path = require("path");
module.exports = function (session, window) {
    session.defaultSession.webRequest.onBeforeRequest({ urls: ["https://code.prodigygame.com/code/*", "https://code.prodigygame.com/js/public-game-*.min.js"] }, (details, callback) => {
        if (details.url.startsWith("https://code.prodigygame.com/code/")) {
            if (details.url.includes("/game.min.js")) {
                fs.readFile(path.resolve(__dirname, "../gen/integrity.js"), 'utf8', function (err, data) {
                    window.webContents.executeJavaScript(data);
                });
            }
            callback({ cancel: true });
        } else if (details.url.startsWith("https://code.prodigygame.com/js/public-game")) {
            console.log("Public game!!")
            callback({
                redirectURL: `https://hacks.prodigyhacking.com/public-game.min.js?hash=${details.url.split("public-game-")[1].split(".")[0]}&updated=${Date.now()}`
            });
        }
    });
}