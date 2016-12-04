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
greenMan.setPixelsByText5x7('Hello');
greenMan.printPixels();

//SerialPort
var mode = 2;
var buff = [];

//Anima
var anima = new GmAnima(1000, 50, function() {

    //將frame填入buff
    var frame = anima.getNowFrame();
    for (var i = 0; i < 6; i++) {
        //if (i < 5) continue; //test
        var data = GmProtocal.generateData(i + 1, 2, frame[i], 0);
        for (var j = 0; j < data.length; j++) buff.push(data[j]);
        console.log(data);
    }
    //greenMan.printPixels();
}, function() {
    for (var i = 0; i < 6; i++) {
        //if (i < 5) continue; //test
        var data = GmProtocal.generateData(i + 1, 2, [0x00, 0x00, 0x00, 0x00, 0x00, 0x00], 0);
        for (var j = 0; j < data.length; j++) buff.push(data[j]);
        console.log(data);
    }
});


//捲動timer
var scrollingInterval = null;
var scrollingTimesCount = 0;

router.post('/form', function(req, res, next) {
    var data = req.body;
    mode = +data.mode;

    //清除捲動 Interval
    if (scrollingInterval) {
        clearInterval(scrollingInterval);
        scrollingInterval = null;
    }

    anima.stop();

    //0:靜態展示/ 1:跑馬燈/ 2:超音波
    switch (mode) {
        case 0:
            console.log('靜態展示');
            greenMan.setPixels(data.rowPixels);
            greenMan.resetShiftPosition();
            //protoaclStaticDisplay();
            anima.setFrames([greenMan.getStatus()]);
            anima.doClear = false;
            anima.start();
            break;
        case 1:
            console.log('文字捲動');
            greenMan.setPixelsByText5x7(data.message);
            greenMan.setShiftPosition(-6, 0);
            //startScroll(1, 0, greenMan.rowPixels[0].length * 2 + 2, 1300, protoaclScrolling);
            var frames = [];
            var frameCount = greenMan.rowPixels[0].length + 7;
            for (var i = 0; i < frameCount; i++) {
                greenMan.shift(1, 0);
                frames.push(greenMan.getStatus());
            }

            anima.setFrames(frames);
            anima.doClear = true;
            anima.start();
            break;
        case 2:
            protoaclUltrasound();
            break;
        case 3:
            var frames = [];
            frames.push([0b0000000000001111, 0b0000000000001111, 0b0000000000001111, 0, 0, 0]);
            break;
    }
    res.send('success');
});

app.use('/api', router);

app.listen(port, function() {
    console.log('The server listening on port ' + port);
});


function protoaclUltrasound() {
    console.log('超音波');
    for (var i = 0; i < 6; i++) {
        var data = GmProtocal.generateData(i + 1, 1, 0, 0);
        addToBuff(data);
        console.log(data);
    }
}


function protoaclScrolling() {
    console.log('捲動');
    var status = greenMan.getStatus();
    for (var i = 0; i < 6; i++) {
        var data = GmProtocal.generateData(i + 1, 2, status[i], status[i]);
        addToBuff(data);
        console.log(data);
    }
    greenMan.printPixels();
}

function protoaclStaticDisplay() {
    console.log('靜態展示');
    var status = greenMan.getStatus();
    for (var i = 0; i < 6; i++) {
        var data = GmProtocal.generateData(i + 1, 2, status[i], status[i]);
        addToBuff(data);
        console.log(data);
    }
    greenMan.printPixels();
}

function addToBuff(data) {
    for (var i = 0; i < data.length; i++) buff.push(data[i]);
}


function startScroll(x, y, times, delay, loop) {

    scrollingTimesCount = 0;
    scrollingInterval = setInterval(function() {

        if (++scrollingTimesCount == times) {
            greenMan.shift(x * times * -1, y * times * -1);
            scrollingTimesCount = 0;
        } else greenMan.shift(x, y);

        loop();

    }, delay);
}



//clearInterval(scrollingInterval);

//loop
function loop() {

    if (buff.length == 0) return setImmediate(loop); // process.nextTick(loop); 
    //console.log(buff)
    console.log('serialport write\n');

    GmSerialport.write(buff)
        .then(function() {
            setImmediate(loop)
        });

    buff.length = 0;
}

//start
GmSerialport.init(portName, baudrate)
    .then(function() {
        console.log('open.');
        loop();
        /*
        setInterval(function() {
        	buff.push(5);
        }, 1500);
        */
    });
