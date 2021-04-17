export const PlayerApi = {
    context: new (window.AudioContext || window.webkitAudioContext)(),

    init: function() {
        this.gainNode = this.context.createGain();
        this.gainNode.connect(this.context.destination);
/*        this.source.buffer = this.buffer;
        this.source.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);*/
    },

    play: function (mediaElementAudioSourceNode) {
        debugger;
        mediaElementAudioSourceNode.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
        mediaElementAudioSourceNode.start(this.context.currentTime);
    }
}


export class SoundBuffer {
    constructor(url) {
        var audio = document.createElement('audio');
        audio.src = url;
        debugger;
        this.audio = PlayerApi.context.createMediaElementSource(audio);
        this.audio.connect(PlayerApi.context.destination);
    }
}

class Sound {

    constructor(context, buffer) {
        this.context = context;
        this.buffer = buffer;
    }

    init() {
        this.gainNode = this.context.createGain();
        this.source = this.context.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
    }

/*    setup() {
        this.oscillator = this.context.createOscillator();
        this.gainNode = this.context.createGain();

        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
        this.oscillator.type = 'sine';
    }*/

    play() {
        this.setup();
        this.source.start(this.context.currentTime);
    }

    stop() {
        this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.5);
        this.source.stop(this.context.currentTime + 0.5);
    }

}
