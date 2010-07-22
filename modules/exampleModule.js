$(document).ready(function() {
    BLSJS.Core.register("exampleModule", function(utils) {
        return {
            init: function() {
                utils.log("info", "Example", "Module initialized");
                this.listeners();
            },
            destroy: function() {
            },
            listeners: function() {
                var MS = [];
                var i = 0;
                $("#multiselector").each(function() {
                    MS[i] = new BLSJS.class_multiselector(jQuery(this));
                    MS[i].init("a.add","a.remove");
                    i++;
                    utils.log("debug","Example","multiselektor numer " + (i+1) +" aktywowany");
                });
                utils.log("info","Example","Multiselector initialized")
            }
        }
    });
    BLSJS.Core.start("exampleModule", BLSJS.DefaultSettings);
});