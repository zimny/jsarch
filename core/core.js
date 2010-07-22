/**
 * User: pzi
 * Date: Jul 21, 2010
 * Time: 10:37:59 AM
 */

/**
 * main object
 * @version 1.0
 */
var BLSJS = BLSJS || {};

/**
 * debug levels:      <br/>
 * debug - log all    <br/>
 * info - log only info    <br/>
 * prod - no logs
 */

/**
 * debug displays:              <br/>
 * 0 - no logs                  <br/>
 * 1 - browser console          <br/>
 * 2 - browser alert            <br/>
 * 3 - server                   <br/>
 * 4 - console and server       <br/>
 * 5 - alert and server
 */
BLSJS.DefaultSettings = {
    debug: "debug", /* debug|info|prod */
    display: 1, /* 0, 1, 2, 3, 4, 5 */
    loggerAddress: "logger.do"
};

/**
 * Holds default settings and common functions. Settings can be overwritten.
 * @param {JSON} settings JSON Object parameter which overwrite default settings
 * @return JSON
 * @type Object
 * @version 1.0
 * @requires BLSJS
 * @member BLSJS
 * @constructor
 * @author PZI
 * @lastEditor PZI
 */
BLSJS.Utils = function(settings) {
    var version = "1.0";
    var _debug = settings.debug || "debug";
    var _loggerAddress = settings.loggerAddress || "logger.do";
    var _display = settings.display || "1";

    return {
        getUtilsVersion : function() {
            return version;
        },

        getModuleName : function(moduleInstance) {
            return moduleInstance.moduleName;
        },
        /**
         * Log message to specified destination
         * @param {String} type info|dbug
         * @param {String} module Module Name
         * @param {String} msg Message to log
         * @param {String} ev unused leave empty
         */
        log : function(type, module, msg, ev) {
            if (_display && _debug != "prod") {
                if (_debug == type || _debug == "debug") {
                    switch (_display) {
                        case 1:
                            if (window.console && console.log) {
                                console.log("Module: " + module + " ;Message: " + msg);
                            }
                            break;
                        case 2:
                            alert("Module: " + module + " ;Message: " + msg);
                            break;
                        case 3:
                            var img = new Image();
                            img.src = _loggerAddress + "?level=" + _debug + "&module=" + encodeURIComponent(module) + "&msg=" + encodeURIComponent(msg);
                            break;
                        case 4:
                            if (window.console && console.log) {
                                console.log("Module: " + module + " ;Message: " + msg);
                            }
                            var img = new Image();
                            img.src = _loggerAddress + "?level=" + _debug + "&module=" + encodeURIComponent(module) + "&msg=" + encodeURIComponent(msg);
                            break;
                        case 5:
                            alert("Module: " + module + " ;Message: " + msg);
                            var img = new Image();
                            img.src = _loggerAddress + "?level=" + _debug + "&module=" + encodeURIComponent(module) + "&msg=" + encodeURIComponent(msg);
                            break;
                    }
                }
            }
        }

    }
}
/**
 * Main class - self invoking
 * @return JSON
 * @type Object
 * @version 1.0
 * @requires BLSJS
 * @member BLSJS
 * @constructor
 * @author PZI
 * @lastEditor PZI
 */
BLSJS.Core = function() {
    var moduleData = {};

    return {
        register : function(moduleId, creator) {
            moduleData[moduleId] = {
                creator : creator,
                instance : null
            };
        },

        start : function(moduleId, settings) {
            moduleData[moduleId].instance = moduleData[moduleId].creator(new BLSJS.Utils(settings));
            moduleData[moduleId].instance.init();
        },

        stop : function(moduleId) {
            var data = moduleData[moduleId];
            if (data.instance) {
                data.instance.destroy();
                data.instance = null;
            }
        },

        startAll : function() {
            for (var moduleId in moduleData) {
                if (moduleData.hasOwnProperty(moduleId)) {
                    this.start(moduleId);
                }
            }
        },

        stopAll : function() {
            for (var moduleId in moduleData) {
                if (moduleData.hasOwnProperty(moduleId)) {
                    this.stop(moduleId);
                }
            }
        }
    }
}();
