var GreenMan = require('../lib/green-man.js');
var greenMan = new GreenMan(3, 2, 4, 4);
greenMan.setPixelsByText5x7('TEST!');
greenMan.resetShiftPosition();
greenMan.shift(2, 0);
greenMan.printPixels();

//greenMan.setPixelsByText5x7('TEST YA! 中文!');
//greenMan.setPixelsByText5x7('ABCDEFGHIJKLMNOPQRSTUVWXYZ');


printStatus(greenMan.getStatus());

function printStatus(datas) {

	a(datas);

	function a(datas) {

		var row = ['', '', '', '', '', '', '', ''];

		for (var i = 0; i < 3; i++) {

			var result = b(datas[i]);
			//console.log(result);
			for (var j = 0; j < 4; j++) row[j] = row[j] + result[j];
		}

		for (var i = 3; i < 6; i++) {
			var result = b(datas[i]);
			//console.log(result);
			for (var j = 0; j < 4; j++) row[4 + j] = row[4 + j] + result[j];

		}

		for (var i = 0; i < 8; i++) {
			console.log(row[i]);
		}

	}

	function b(value) {
		var str = value.toString(2);
		while (str.length < 16) str = '0' + str;
		var chars = str.split('');

		var result = [];
		for (var i = 0; i < 4; i++) result.push(c(chars[i * 4 + 0]) + c(chars[i * 4 + 1]) + c(chars[i * 4 + 2]) + c(chars[i * 4 + 3]));

		return result;
	}

	function c(value) {
		if (value == '0') return '  ';
		else return '[]';
	}
}