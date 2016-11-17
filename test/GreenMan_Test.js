var GreenMan = require('../GreenMan.js');
var greenMan = new GreenMan(3, 2, 4, 4);

greenMan.setPixelsByText5x7('TEST YA! 中文!');
//greenMan.setPixelsByText5x7('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

greenMan.rowPixels.forEach(function(row) {
	var str = '';
    row.forEach(function(col) {
        str = str + (col ? '口' : '  ')
    });
    console.log(str);
});

//greenMan.shift(-1, 0);

greenMan.generateProtocolData().forEach(function(data){
	console.log(data);
});
