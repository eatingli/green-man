var CharPixelByte = require('../char-pixel-byte.js');

console.log(CharPixelByte.checkCharExist('A'));


CharPixelByte.getChar5x7('A').forEach(function(byte) {
	console.log((0xff - byte).toString(2));
});
console.log('------------------------1-----------------------');

CharPixelByte.getText5x7('TEST').forEach(function(char) {
	char.forEach(function(byte) {
		console.log((0xff - byte).toString(2));
	});
	console.log('----------------------2-------------------------');
});