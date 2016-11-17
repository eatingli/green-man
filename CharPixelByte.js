var font = require('oled-font-5x7');

var CharPixelByte = module.exports = {};

CharPixelByte.checkCharExist = checkCharExist;
CharPixelByte.getChar5x7 = getChar5x7;
CharPixelByte.getText5x7 = getText5x7;

function checkCharExist(char) {
    return font.lookup.indexOf(char) > -1;
}

function getChar5x7(char) {
    var rowPixels = [];
    var index = font.lookup.indexOf(char);

    //如果找不到字元就用問號代替
    if (index < 0) index = font.lookup.indexOf('?');

    //取得字元的5x7 pixel資料
    for (var i = 0; i < 5; i++) rowPixels.push(font.fontData[index * 5 + i]);
    return rowPixels;
}

function getText5x7(text) {
    var text5x7 = [];

    text.split('').forEach(function(char) {
        text5x7.push(getChar5x7(char));
    });

    return text5x7;
}
