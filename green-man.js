var CharPixelByte = require('./char-pixel-byte.js');

var GreenMan = module.exports = function(xSize, ySize, width, height) {

    this.mode = 0; //0-Not Change, 1-Ultrasound, 2-Command
    this.xSize = xSize;
    this.ySize = ySize;
    this.width = width;
    this.height = height;

    this.rowPixels = [];
    this.shiftPositionX = 0;
    this.shiftPositionY = 0;
}

GreenMan.prototype.resetShiftPosition = function(x, y) {
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

    //檢查字元是否全部合法

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

//protocol: ID - Mode - Walk - Run - Chksum
GreenMan.prototype.generateProtocolData = function() {

    var datas = [];

    //計算各綠人矩陣該顯示的畫面(左上角為原點)
    for (var x = 0; x < this.xSize; x++) {
        for (var y = 0; y < this.ySize; y++) {

            var id = y * this.xSize + x + 1; //左到右，上到下，從1開始。
            var mode = this.mode;
            var walk = 0x00;
            var run = 0x00;


            //計算 Walk
            var originX = this.shiftPositionX + this.width * x;
            var originY = this.shiftPositionY + this.height * y;
            //console.log(originX + ' , ' + originY);
            for (var offsetY = 0; offsetY < this.height; offsetY++) {
                for (var offsetX = 0; offsetX < this.width; offsetX++) {

                    //console.log(originX + offsetX);
                    //console.log(originY + offsetY);

                    walk = (walk << 1) | (this.rowPixels[originY + offsetY] ? this.rowPixels[originY + offsetY][originX + offsetX] || 0 : 0);
                }
            }
            //console.log((walk).toString(2));
            //console.log('--------------------------------');

            //計算 checksum
            var data = [id, mode, walk >> 8, walk & 0xff, run >> 8, run & 0xff];
            data.push(getCheckSum(data));

            //加入資料
            datas.push(data);
        }
    }


    return datas;
}

//取得二進制數值的特定位置
function getValueAtBinary(byte, pos) {
    return (byte >> pos) & 0b00000001;
}

function getCheckSum(values) {
    var checksum = 0x00;
    values.forEach(function(value) {
        checksum += value;
    });

    return ((checksum & 0xff) + (checksum >> 8)) ^ 0x00ff;
}

/*
//checksum test
var value1 = 255;
var value2 = 121;
var value3 = 2;
var sum = value1 + value2 + value3;
var sum8 = (sum & 0xff) + (sum >> 8);
var sum8Xor = sum8 ^ 0x00ff;
console.log(value1.toString(2));
console.log(value2.toString(2));
console.log(value3.toString(2));
console.log(sum.toString(2));
console.log(sum8.toString(2));
console.log(sum8Xor.toString(2));
console.log((sum8Xor + sum8).toString(2));
//console.log(getCheckSum([value1, value2, value3]).toString(2));
*/