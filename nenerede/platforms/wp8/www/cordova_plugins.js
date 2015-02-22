cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.risingj.cordova.livetiles/www/livetiles.js",
        "id": "com.risingj.cordova.livetiles.livetiles",
        "clobbers": [
            "LiveTiles"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.splashscreen/www/splashscreen.js",
        "id": "org.apache.cordova.splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.apache.cordova.geolocation": "0.3.8",
    "com.risingj.cordova.livetiles": "0.1.0",
    "org.apache.cordova.splashscreen": "0.3.2"
}
// BOTTOM OF METADATA
});