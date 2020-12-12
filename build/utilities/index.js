"use strict";
module.exports = {
    convertToKey: function (targetString) {
        // lowercase and turn spaces into dashes
        return targetString.split(' ').join('-').toLowerCase();
    },
};
