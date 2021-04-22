import React, {Component, Props} from 'react'
import styles from './Song.module.scss';
import {ISong} from "../../models/ISong";
import {playListService} from "../../services/PlayList.service";

export class SongComponent extends Component<ISong, ISong> {
    constructor(props: ISong) {
        super(props);

        this.state = Object.assign({}, props)
    }


/*    play = () => {
        this.props.play(this.state.src);
        this.setState(prevState => ({isPlay: true, src: prevState.src}));
    }

    stop = () => {
        this.props.stop(this.state.src);
        this.setState(prevState => ({isPlay: false, src: prevState.src}));
    }*/

    click = () => {
        playListService.selectSong(this.state.id)
    }

    render() {
        return (
            <div className={styles.songContainer} onClick={this.click}>
                <span className={styles.title}>{this.state.title}</span>
            </div>
        );
    }
}
