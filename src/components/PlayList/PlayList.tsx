import React, {Component} from "react";
import {ISong} from "../../models/ISong";
import {SongComponent} from "../Song/Song";
import styles from './PlayList.module.scss'
import {playListService} from "../../services/PlayList.service";
import {Subscription} from "rxjs";
import {IData} from "../../models/IData";

export class PlayListComponent extends Component<any, IData<ISong[]>> {
    subscription: Subscription;

    constructor(props) {
        super(props);

        this.state = {data: []}
    }

    componentDidMount(): void {
        this.subscription = playListService.songs$.subscribe(songs => {
            this.setState({data: songs})
        });
    }

    componentWillUnmount(): void {
        this.subscription.unsubscribe();
    }

    addSong = (files: FileList | null) => {
        playListService.addSong(files[0]);
    }

    render() {
        return (
            <div>
{/*                <button  onClick={this.addSong}>Add ISong</button>*/}
                <label htmlFor="file-upload" className={styles.addSongBtn}>
                    Add Song
                </label>
                <input type="file" id="file-upload" onChange={(e) => this.addSong(e.target.files)} accept=".M4A,.FLAC,.MP3,.MP4,.WAV,.WMA,.AAC"></input>
                <div className={styles.playList}>
                    {this.state.data.map(a => (
                        <SongComponent src={a.src} title={a.title} id={a.id}></SongComponent>
                    ))}
                </div>
            </div>
        )
    }
}