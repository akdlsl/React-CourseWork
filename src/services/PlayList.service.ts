import {ISong} from "../models/ISong";
import {Subject} from "rxjs";
import {getBlob, playerAPI} from "../Audio";

class PlayListService {
    private _songs: ISong[] = [];
    private _activeId: number;

    songs$: Subject<ISong[]> = new Subject<ISong[]>();
    activeSong$: Subject<ISong> = new Subject<ISong>();

    findSongById(id: number): ISong | null {
        return this._songs.find(a => a.id === id);
    }

    selectSong(id: number): void {
        const song = this.findSongById(id);
        this._activeId = !!song ? id : -1;
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
            title: file.name
        });

        this.songs$.next(this._songs);
    }

    play() {
        playerAPI.play(this.findSongById(this._activeId)?.src);
    }

    stop () {

    }
}

const getId = (() => {
    let id = 0;
    return () => id++;
})()

export const playListService = new PlayListService();

