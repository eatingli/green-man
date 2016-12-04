var font = require('oled-font-5x7');

//取得順時針歪90度的字元像素資料
font.getCharPixels = function(char) {
    var pixels = [];
    var index = this.lookup.indexOf(char);

    //檢查字元是否存在
    if (index < 0) return pixels;

    //取得字元的5x7 pixel資料
    for (var i = 0; i < 5; i++) pixels.push(this.fontData[index * 5 + i]);

    return pixels;
}

//取得二進制數值的特定位置
function getValueAtBinary(bin, pos) {
    if (pos < 0 || pos > 7) return null;
    return (bin >> pos) & 0b00000001;
}

//------------------

var GreenMan = module.exports = function(xSize, ySize) {

    this.mode = 0;
    this.text = 'HELLO';
    this.xSize = xSize;
    this.ySize = ySize;
    this.width = xSize * 4;
    this.height = ySize * 4;

    //this.textWidth = 0;
    //this.textHeight = 0;
    this.textPixels = [];
    this.updateTextPixel();

    this.pixels = []; //width x height
    this.textShift = 0;
}


GreenMan.prototype.updateTextPixel = function() {
    var rows = this.textPixels = [];
    //var rows = [];
    for (var i = 0; i < 7; i++) rows.push([]);

    this.text.split('').forEach(function(t) {
        font.getCharPixels(t).forEach(function(charPixelBins, j) {
            for (  j = 0; j < 7; j++) rows[j].push(getValueAtBinary(charPixelBins, j));
        });
        for (var j = 0; j < 7; j++) rows[j].push(0);
    });

    /*
    rows.forEach(function(row) {
        console.log(row);
        row.forEach(function(col) {
            textPixels.push(col);
        });
    });
    */

    //this.textWidth = rows[0].length;
    //this.textHeight = 7;
}

GreenMan.prototype.updatePixel = function() {
    var rows = this.pixels = [];
    for (var i = 0; i < 7; i++) rows.push([]);

    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < this.width; j++) {
            rows[i].push(this.textPixels[i][j + this.textShift] || 0)
        }
    }
}

//回傳lcd控制碼(跑馬燈)
GreenMan.prototype.ctrlCode = function() {
    //protocol: ID - Mode - Walk - Run - Chksum

}

GreenMan.prototype.abc = function() {

}

//test
var greenMan = new GreenMan(3, 2);
greenMan.updateTextPixel();
console.log(greenMan);

setInterval(function() {
    if(++greenMan.textShift >= greenMan.width) greenMan.textShift = 0;
    greenMan.updatePixel();
    console.log(greenMan.pixels);
}, 100);
