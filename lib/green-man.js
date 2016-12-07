var CharPixelByte = require('./char-pixel-byte.js');

var GreenMan = module.exports = function(xSize, ySize, width, height) {

    this.xSize = xSize;
    this.ySize = ySize;
    this.width = width;
    this.height = height;

    this.rowPixels = [];
    this.shiftPositionX = 0;
    this.shiftPositionY = 0;
}


GreenMan.prototype.setShiftPosition = function(x, y) {
    this.shiftPositionX = x;
    this.shiftPositionY = y;
}

GreenMan.prototype.resetShiftPosition = function() {
    this.shiftPositionX = 0;
    this.shiftPositionY = 0;
}

GreenMan.prototype.shift = function(x, y) {
    this.shiftPositionX += x;
    this.shiftPositionY += y;
}

GreenMan.prototype.setPixels = function(rowPixels) {

    this.rowPixels = rowPixels;
}

GreenMan.prototype.setPixelsByText5x7 = function(text) {

    //初始化
    var rowPixels = this.rowPixels = [];
    for (var i = 0; i < 7; i++) rowPixels.push([]);

    //將字元一一轉成 Pixel
    text.split('').forEach(function(char) {

        //將字元 Pixel填入 rowPixels
        CharPixelByte.getChar5x7(char).forEach(function(charPixelByte) {
            for (j = 0; j < 7; j++) rowPixels[j].push(getValueAtBinary(charPixelByte, j));
        });

        //字元間的空白
        for (var i = 0; i < 7; i++) rowPixels[i].push(0);
    });
}

GreenMan.prototype.printPixels = function() {
    this.rowPixels.forEach(function(row) {
        var str = '';
        row.forEach(function(col) {
            str = str + (col ? '[]' : '  ')
        });
        console.log(str);
    });
}

//回傳各個面板的畫面(二進制值)
GreenMan.prototype.getStatus = function() {

    var datas = [];

    //計算各綠人矩陣該顯示的畫面(左上角為原點)
    for (var y = 0; y < this.ySize; y++) {
        for (var x = 0; x < this.xSize; x++) {

            var status = 0x00;

            var originX = this.shiftPositionX + this.width * x;
            var originY = this.shiftPositionY + this.height * y;
            //console.log(originX + ' , ' + originY);

            for (var offsetY = this.height - 1; offsetY >= 0; offsetY--) {
                for (var offsetX = this.width - 1; offsetX >= 0; offsetX--) {

                    //console.log(originX + offsetX, ',', originY + offsetY);
                    status = (status << 1) | (this.rowPixels[originY + offsetY] ? this.rowPixels[originY + offsetY][originX + offsetX] || 0 : 0);
                }
            }

            //console.log((status).toString(2));
            //console.log('--------------------------------');

            datas.push(status);
        }
    }

    return datas;
}

//取得二進制數值的特定位置
function getValueAtBinary(byte, pos) {
    return (byte >> pos) & 0b00000001;
}