var GreenMan = require('./lib/green-man.js');
var GmProtocal = require('./lib/gm-protocal.js');
var GmSerialport = require('./lib/gm-serialport.js');
var GmAnima = require('./lib/gm-anima.js');

var port = process.argv[2] || 8085;
var portName = process.argv[3] || '/dev/ttyAMA0'; //ttyACM0, ttyAMA0 ///dev/ttyACM0
var baudrate = Number(process.argv[4]) || 115200;

//var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

//GreenMan
var greenMan = new GreenMan(3, 2, 4, 4);
//greenMan.setPixelsByText5x7('Hello');
//greenMan.printPixels();

//Buff
//啟動loop後，會遞迴檢查 buff陣列中有無資料，如果有資料則由serialport送出
var buff = [];

function putIntoBuff(array) {
    for (var j = 0; j < array.length; j++) buff.push(array[j]);
}

function loop() {

    if (buff.length == 0) return setImmediate(loop); // process.nextTick(loop); 

    //console.log(buff)
    GmSerialport.write(buff)
        .then(function() {
            console.log('serialport has writed.');
            setImmediate(loop)
        });

    buff.length = 0;
}

//Anima
var delay = 900;
var clearDelay = 50
var anima = new GmAnima(delay, clearDelay, draw, clear);

function draw() {

    //將frame填入buff
    var frame = anima.getNowFrame();
    for (var i = 0; i < 6; i++) {
        var data = GmProtocal.generateData(i + 1, 2, frame[i], 0);
        putIntoBuff(data);
        console.log(data);
    }
    //greenMan.printPixels();
    console.log("protocol frame pixel.");
}

function clear() {

    for (var i = 0; i < 6; i++) {
        var data = GmProtocal.generateData(i + 1, 2, [0x00, 0x00, 0x00, 0x00, 0x00, 0x00], 0);
        putIntoBuff(data);
        //console.log(data);
    }
    console.log("protocol clear.");
}

//Server
router.post('/fn/:fn', function(req, res, next) {
    var data = req.body;
    var fn = +req.params.fn;

    anima.stop();

    //0:靜態展示/ 1:跑馬燈/ 2:超音波
    switch (fn) {
        case 0:
            console.log('靜態展示');
            greenMan.setPixels(data.rowPixels);
            greenMan.resetShiftPosition();
            anima.setFrames([greenMan.getStatus()]);
            anima.start();
            break;
        case 1:
            console.log('文字捲動');
            greenMan.setPixelsByText5x7(data.message);
            greenMan.setShiftPosition(-6, 0);
            var frames = [];
            var frameCount = greenMan.rowPixels[0].length + 7;
            for (var i = 0; i < frameCount; i++) {
                greenMan.shift(1, 0);
                frames.push(greenMan.getStatus());
            }

            anima.setFrames(frames);
            anima.start();
            break;
        case 2:
            console.log('超音波');
            for (var i = 0; i < 6; i++) {
                var data = GmProtocal.generateData(i + 1, 1, 0, 0);
                putIntoBuff(data);
                console.log(data);
            }
            break;
        case 3:
            console.log('New Frame');
            anima.setFrames([]);
            break;
        case 4:
            console.log('Add Frame');
            greenMan.setPixels(data.rowPixels);
            greenMan.resetShiftPosition();
            anima.frames.push(greenMan.getStatus());
            anima.start();
            break;

    }
    res.send('success');
});

app.use('/api', router);

app.listen(port, function() {
    console.log('The server listening on port ' + port);
});



//start
GmSerialport.init(portName, baudrate)
    .then(function() {
        console.log('open.');
        loop();
    }, function(err) {
        console.error(err);
    });