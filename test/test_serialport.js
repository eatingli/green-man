var GmSerialport = require('../lib/gm-serialport');
var GmProtocal = require('../lib/gm-protocal');

var portName = process.argv[2] || '/dev/ttyAMA0'; //ttyACM0, ttyAMA0 ///dev/ttyACM0
var baudrate = Number(process.argv[3]) || 115200;

//test
//GmSerialport.printAvailablePort();
//console.log(123)
var a = GmSerialport.init(portName, baudrate)
    .then(function() {
        console.log(123)
        console.log('Open!');
        var datas = GmProtocal.generateData(6, 2, 0b0000000000001111, 0);
        //var buff = ['U', 'U', 5, 5];
        var buff = [];
        for (var i = 0; i < datas.length; i++) {
            buff.push(datas[i]);
        }

        console.log(buff);
        return GmSerialport.write(buff);
    })
    .then(function(){
    	console.log('ok');
    })

/*
setTimeout(function() {
    var datas = GmProtocal.generateData(5, 2, 0b0000000000001111, 0);
    //var buff = ['U', 'U', 5, 5];
    var buff = [];
    for (var i = 0; i < datas.length; i++) {
        buff.push(datas[i]);
    }

    console.log(buff);
    return GmSerialport.write(buff);
}, 3900)

setTimeout(function() {
    var datas = GmProtocal.generateData(6, 2, 0b0000000011110000, 0);
    //var buff = ['U', 'U', 5, 5];
    var buff = [];
    for (var i = 0; i < datas.length; i++) {
        buff.push(datas[i]);
    }

    console.log(buff);
    return GmSerialport.write(buff);
}, 7900)
*/