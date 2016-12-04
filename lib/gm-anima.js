var GmAnima = module.exports = function(delay, clearDelay, draw, clear) {
    //this.running = false;
    this.interval = null;
    this.frames = [];
    this.delay = delay;
    this.clearDelay = clearDelay;
    this.nowFrame = -1;
    //this.update = update;
    this.draw = draw;
    this.clear = clear;
    this.haveUpdate = false;
    this.doClear = true;
}

GmAnima.prototype.setFrames = function(frames) {
    this.frames = frames;
    this.haveUpdate = true;
}

GmAnima.prototype.hasFrame = function() {
    return this.frames.length > 0;
}

GmAnima.prototype.hasAnima = function() {
    return this.frames.length > 1;
}

GmAnima.prototype.getNowFrame = function() {
    if (!this.hasFrame) return null;
    return this.frames[this.nowFrame];
}

GmAnima.prototype.start = function() {
    if (!this.hasFrame) return false;
    this.nowFrame = -1;
    this.loop();
    return true;
}

GmAnima.prototype.stop = function() {
    clearInterval(this.interval);
}

GmAnima.prototype.update = function() {
    //切到下一個frame
    if (++this.nowFrame >= this.frames.length) this.nowFrame = 0;
    if (this.hasAnima()) this.haveUpdate = true;
}

GmAnima.prototype.draw = function() {}
GmAnima.prototype.clear = function() {}

GmAnima.prototype.loop = function() {

    var self = this;
    this.interval = setInterval(function() {
        self.update();
        if (self.haveUpdate) {
            self.draw();
            if (self.doClear) setTimeout(self.clear, self.clearDelay);
        }
        self.haveUpdate = false;
    }, self.delay);
}

/*
var a = new GmAnima(1000, function() {
	console.log('draw');
});

a.setFrames([1, 2, 3]);
//a.setFrames([1]);

a.start();

setTimeout(function() {
	a.stop();
}, 7100)
*/
