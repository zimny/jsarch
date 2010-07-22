$(document).ready(function() {
    BLSJS.Core.register("exampleModule", function(utils) {
        return {
            init: function() {
                utils.log("debug", "Example", "Example message");
                utils.log("info", "Example", "Example info message");
                this.listeners();
            },
            destroy: function() {
               $("#foo").unbind("click");
            },
            listeners: function() {
                $("#foo").click(function() {
                    utils.log("debug", "Example", "#foo clicked");
                    $("div").toggle(function(){
                        $(this).css({"color":"#ff0000"});
                    }, function(){
                        $(this).css({"color":"#000"});
                    });
                });
            }
        }
    });
    BLSJS.Core.start("exampleModule", BLSJS.DefaultSettings);
});