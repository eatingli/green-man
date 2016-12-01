var GreenMan = require('../green-man.js');
var SerialPort = require('serialport');

var portName = process.argv[2] || '/dev/ttyAMA0'; //ttyACM0, ttyAMA0 ///dev/ttyACM0
var baudrate = Number(process.argv[3]) || 115200;

var serialPort = new SerialPort(portName, {
    baudrate: baudrate,
    dataBits: 8,
    parity: 'none',
    stopBit: '1',
    flowControl: false,
    parser: SerialPort.parsers.readline("\n")
});


var greenMan = new GreenMan(3, 2, 4, 4);
greenMan.resetShiftPosition();
greenMan.setPixelsByText5x7('TEST YA! 中文!');
greenMan.shift(0, 0);

serialPort.on("open", function() {
    console.log("onOpen!");
    setInterval(test, 1500);
});

serialPort.on('error', function(err) {
    console.error("error", err);
});

function test() {

    greenMan.generateProtocolData().forEach(function(data) {
        console.log(data);
        for (var d in data) serialPort.write(data[d]);
    });
}