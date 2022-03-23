// Could this file have a better name? Yes.
// Do I want to give it a better name? No.

module.exports = function (session) {
    session.defaultSession.webRequest.onHeadersReceived({ urls: ["<all_urls>"] }, (details, callback) => {
        var newheds = details.responseHeaders;
        delete newheds["content-security-policy"];
        delete newheds["x-frame-options"];
        callback({
            responseHeaders: newheds
        });
    });
}