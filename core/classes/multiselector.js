/**
 * allows to move multiple selected option tags from one select to another.
 *
 * Usage:
 *  $('.multiSelector').each(function() {
 *      MS[i] = new BLSJS.class_multiselector(jQuery(this));
 *      MS[i].init();
 *      i++;
 *   });
 * @param {jQuery} multiselector
 */
BLSJS.class_multiselector = function(multiselector) {
    this.multiselector = multiselector;
    this.leftBox = this.multiselector.find('.left > select');
    this.rightBox = this.multiselector.find('.right > select');
}
BLSJS.class_multiselector.prototype.reindex = function(side) {
    var box = (side == 'left') ? this.leftBox : this.rightBox;
    var index = 0;
    box.find('option').each(function() {
        if ($(this)[0]) {
            $(this).attr('id', index);
            index++;
        }
    })
}
BLSJS.class_multiselector.prototype.checkSelected = function(side) {
    var self = this;
    var box = (side == 'left') ? this.leftBox : this.rightBox;
    var boxTo = (side == 'left') ? this.rightBox : this.leftBox;
    var iterator = 0;

    var leftBox_ilosc = 0;

    this.leftBox.find('option').each(function() {
        leftBox_ilosc++;
    })

    box.find('option:selected').each(function() {
        boxTo.append($(this).clone());
        $(this).remove();
    });
    self.reindex('left');
    self.reindex('right');
}

BLSJS.class_multiselector.prototype.add = function() {
    this.checkSelected('left');

}
BLSJS.class_multiselector.prototype.remove = function() {
    this.checkSelected('right');
}
/**
 * init multiselector
 * @param {String} addHandler i.e. "A.add"
 * @param {String} removeHandler i.e. "A.remove"
 */
BLSJS.class_multiselector.prototype.init = function(addHandler, removeHandler) {
    var self = this;
    this.multiselector.find(addHandler).click(function() {
        self.add();
        return false;
    });
    this.multiselector.find(removeHandler).click(function() {
        self.remove();
        return false;
    });
}

