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
                utils.log("info", "Example", "Multiselector initialization")
                $("#multiselector").each(function() {
                    MS[i] = new BLSJS.class_multiselector(jQuery(this));
                    MS[i].init("a.add", "a.remove");
                    utils.log("debug", "Example", "multiselektor numer " + (i + 1) + " aktywowany");
                    i++;
                });

                utils.log("info", "Example", "Multiselector initialized")
                utils.log("info", "Example", "Validator binding------------>");

                $("#commentForm").validate();

                utils.log("info", "Example", "<------------Validator binded");

                utils.fireunitWrapper("ok", [true,"this is true msg"]);
            }
        }
    });
    BLSJS.Core.start("exampleModule", BLSJS.DefaultSettings);


});