var GreenMan = require('../lib/green-man.js');
var GmProtocal = require('../lib/gm-protocal.js');
var GmSerialport = require('../lib/gm-serialport.js');

var portName = process.argv[2] || '/dev/ttyAMA0'; //ttyACM0, ttyAMA0 ///dev/ttyACM0
var baudrate = Number(process.argv[3]) || 115200;

var greenMan = new GreenMan(3, 2, 4, 4);
greenMan.setPixelsByText5x7('TEST!');
greenMan.resetShiftPosition();
greenMan.shift(1, 0);
greenMan.printPixels();
var status = greenMan.getStatus();



GmSerialport.init(portName, baudrate)

.then(function() {

    console.log('open.');
    var buff = [];
    for (var i = 0; i < 6; i++) {
        var data = GmProtocal.generateData(i + 1, 2, status[i], 0);
        console.log(data);
        buff = buff.concat(data);
    }

    return GmSerialport.write(buff);
})

.then(function() {

    console.log('ok.');
});
