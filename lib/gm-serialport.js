var SerialPort = require('serialport');
var GmSerialport = module.exports = {};

GmSerialport.serialPort = null;

GmSerialport.printAvailablePort = function() {
	SerialPort.list(function(err, ports) {
		console.log('----------------------------------------------------');
		ports.forEach(function(port) {
			console.log(port.comName);
			//console.log(port.pnpId);
			//console.log(port.manufacturer);
		});
		console.log('----------------------------------------------------');
	});
}

GmSerialport.init = function(portName, baudrate) {

	return new Promise(function(resolve, reject) {

		GmSerialport.serialPort = new SerialPort(portName, {
			baudrate: baudrate,
			parser: SerialPort.parsers.readline("\n")

		}, function(err) {
			if (err) console.log(err)

			if (err) reject(err);
			else resolve();
		});
	});
}

GmSerialport.write = function(datas) {

	return new Promise(function(resolve, reject) {
		GmSerialport.serialPort.write(new Buffer(datas), function(err) {

			if (err) reject(err);
			else {
				GmSerialport.serialPort.drain(function() {
					resolve();
				});
			}

		});
	});

}