//console.log(new Date().toISOString().substring(11, 19)); //23:33:13

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

//test
//console.log(getValueAtBinary(0b00001001, 3));
//console.log(getValueAtBinary(0b1001, 7));


//列印字元像素
function print5x7(charPixelBins) {
    var cols = [];
    //
    charPixelBins.forEach(function(b) {
        for (var j = 0; j < 7; j++) cols[j] = (cols[j] << 1) + getValueAtBinary(b, j);
    });
    //
    cols.forEach(function(col){
        var rowString = col.toString(2);
        while(rowString.length < 5) rowString = '0' + rowString;
        console.log(rowString);
    });
    console.log();
}

//test
print5x7(font.getCharPixels('A'));
print5x7(font.getCharPixels('C'));
print5x7(font.getCharPixels('Z'));
