import React, {ChangeEvent, Component} from "react";
import {ISong} from "../../models/ISong";
import {SongComponent} from "../Song/Song";
import styles from './PlayList.module.scss'
import {playListService} from "../../services/PlayList.service";
import {Subscription} from "rxjs";
import {IData} from "../../models/IData";
import {enterKeyFilter} from "../../utils/enterKeyFilter";

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
        playListService.addSongFromFile(files[0]);
    }

    render() {
        return (
            <div>
                <div style={{marginTop: '20px'}}>
                    <label tabIndex={0}
                           onKeyUp={($event) => enterKeyFilter($event, () => document.getElementById('file-upload')?.click())}
                           htmlFor="file-upload" className={styles.addSongBtn}>
                        Add Song
                    </label>
                </div>
                <input type="file" id="file-upload" onChange={(e) => this.addSong(e.target.files)}
                       accept=".M4A,.FLAC,.MP3,.MP4,.WAV,.WMA,.AAC"></input>
                <div role='list' className={styles.playList}>
                {this.state.data.length ? this.state.data.map(a => (
                        <SongComponent src={a.src} title={a.title} id={a.id} currentTime={a.currentTime} imageSrc={a.imageSrc}
                                       duration={a.duration}></SongComponent>
                    ))
                    : (<span role='note' className={styles.hint}> Click Add Song</span>)
                }
                </div>
            </div>
        )
    }
}
