var GmSerialport = require('../lib/gm-serialport');
var portName = process.argv[2] || '/dev/ttyAMA0'; //ttyACM0, ttyAMA0 ///dev/ttyACM0
var baudrate = Number(process.argv[3]) || 115200;

//test
GmSerialport.printAvailablePort();

GmSerialport.init(portName, baudrate)
	.then(function() {

		console.log('Open!');

		var data = ['U', 'U', 5, 5];
		console.log(data);
		return GmSerialport.write(data);
	})
	.then(function() {

		console.log('ok.');
	});