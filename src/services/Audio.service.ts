import {Subject} from "rxjs";

class AudioService
{
    context: AudioContext = new window.AudioContext;
    audio = new Audio();
    currentTime$ = new Subject<number>();
    endSong$ = new Subject();

    constructor() {
        this.audio.ontimeupdate = () => this.currentTime$.next(this.audio.currentTime);
        this.audio.onended = () => this.endSong$.next();
    }

    async play(src: string, currentTime: number) {
        this.audio.currentTime = currentTime;
        if (this.audio.src !== src || this.audio.paused) {
            this.audio.src = src;
            this.audio.load();
            await this.audio.play();
        }

        return {
            duration: this.audio.duration,
            currentTime: this.audio.currentTime
        };
    }

    pause(src) {
        if (this.audio.src === src) {
            this.audio.pause();
        }
    }
}

export const getBlob = (url) => {
    const blob = window.URL || window.webkitURL;
    return blob.createObjectURL(url);
}

export const audioService = new AudioService();
