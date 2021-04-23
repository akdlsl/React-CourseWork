import {ISong} from "../models/ISong";
import {Subject, Subscription} from "rxjs";
import {EMode, IPlayer} from "../models/IPlayer";
import {audioService, getBlob} from "./Audio.service";

class PlayListService {
    private _songs: ISong[] = [];
    private _activeId: number;
    private _player: IPlayer = {
        volume: 5,
        isPlay: false,
        mode: EMode.Standart
    };

    private subscriptions: Subscription[] = [];
    songs$: Subject<ISong[]> = new Subject<ISong[]>();
    activeSong$: Subject<ISong> = new Subject<ISong>();
    player$: Subject<IPlayer> = new Subject<IPlayer>();

    constructor() {
        this.subscriptions.push(audioService.currentTime$.subscribe(currentTime => {
            const song = this.findSongById(this._activeId);
            song.currentTime = currentTime;
            this.updateSong(song);
        }));

        this.subscriptions.push(audioService.endSong$.subscribe(() => {
            this.forward();
        }));
    }

    getPlayer(): IPlayer {
        return this._player;
    }

    findSongById(id: number): ISong | null {
        return this._songs.find(a => a.id === id);
    }

    selectSong(id: number): void {
        const song = this.findSongById(id);
        this._activeId = !!song ? id : -1;
        if (this._player.isPlay) {
            this.play(song.currentTime);
        }
        this.activeSong$.next(song);
    }

    addSong(file: File | null) {
        if (!file) {
            return;
        }

        const src = getBlob(file);
        if (!src) {
            return
        }

        this._songs.push({
            id: getId(),
            src: src,
            title: file.name,
            currentTime: 0,
            duration: 1
        });

        this.songs$.next(this._songs);
    }

    updateSong(song: ISong) {
        const index = this._songs.findIndex(a => a.id === song.id);
        this._songs[index] = song;
        this.player$.next(this._player);
        this.activeSong$.next(song);
    }

    play(currentTime = 0) {
        audioService.play(this.findSongById(this._activeId)?.src, currentTime).then(result => {
            this._player.isPlay = true;
            const song = this.findSongById(this._activeId);
            song.currentTime = result.currentTime;
            song.duration = result.duration;
            this.updateSong(song);
        })
    }

    pause () {
        this._player.isPlay = false;
        this.player$.next(this._player);
        audioService.pause(this.findSongById(this._activeId)?.src);
    }

    forward() {
        const idx = this._songs.findIndex(a => a.id === this._activeId);
        const newIdx = idx + 1;

        switch (this._player.mode) {
            case EMode.Standart: this._activeId = this._songs[newIdx >= this._songs.length ? 0 : newIdx].id; break;
            case EMode.Repeat: this.play(0); break;
            case EMode.Random: const inx = Math.ceil(Math.random()) % (this._songs.length); this._activeId = this._songs[inx].id; this.play(0); break;
        }

        this.selectSong(this._activeId);
    }

    backward() {
        const idx = this._songs.findIndex(a => a.id === this._activeId);
        const newIdx = idx - 1;
        this._activeId = this._songs[newIdx < 0 ? this._songs.length - 1 : newIdx].id;
        this.selectSong(this._activeId);
    }

    setMode(mode: EMode) {
        this._player.mode = mode;
        this.player$.next(this._player);
    }
}

const getId = (() => {
    let id = 0;
    return () => id++;
})()

export const playListService = new PlayListService();

