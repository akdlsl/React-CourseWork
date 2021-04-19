
class PlayerAPI
{
    constructor() {
        this.context = new (window.AudioContext || window.webkitAudioContext);
        this.audio = new Audio();
        this.audio.crossOrigin = "anonymous";
    }

    async play(src) {
        this.audio.src = src;
        this.audio.load();
        await this.audio.play();
    }
}

export const getBlob = (url) => {
    const blob = window.URL || window.webkitURL;
    return blob.createObjectURL(url);
}

export const playerAPI = new PlayerAPI();
