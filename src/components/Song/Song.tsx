import React, {Component, Props} from 'react'
import styles from './Song.module.scss';
import {ISong} from "../../models/ISong";
import {playListService} from "../../services/PlayList.service";
import {enterKeyFilter} from "../../utils/enterKeyFilter";

export class SongComponent extends Component<ISong, ISong> {
    constructor(props: ISong) {
        super(props);

        this.state = Object.assign({}, props)
    }

    componentDidMount(): void {
        playListService.activeSong$.subscribe(value => {
            this.setState(prevstate => prevstate);
        })
    }

    click = () => {
        playListService.selectSong(this.state.id)
    }

    render() {
        return (
            <div role='listitem' aria-current={this.state.id === playListService.getActiveId()} tabIndex={0} className={styles.songContainer} onKeyUp={($event) => enterKeyFilter($event, this.click)} onClick={this.click}>
                <img src={this.state.imageSrc}/>
                <span className={styles.title}>{this.state.title}</span>
            </div>
        );
    }
}
