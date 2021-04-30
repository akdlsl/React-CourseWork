import React, {Component, Props} from 'react'
import styles from './Song.module.scss';
import {ISong} from "../../models/ISong";
import {playListService} from "../../services/PlayList.service";
import {enterKeyFilter} from "../../utils/enterKeyFilter";
import Icon from "../Icon/Icon";

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

    delete = (event) => {
        event.preventDefault();
        playListService.removeSong(this.state.id);
    }

    like = () => {
        const song = Object.assign({}, this.state) as ISong;
        song.like = !song.like;
        playListService.updateSong(song);
    }


    render() {
        return (
            <div role='listitem' aria-current={this.state.id === playListService.getActiveId()} tabIndex={0} className={styles.songContainer} onKeyUp={($event) => enterKeyFilter($event, this.click)} onClick={this.click}>
                <img src={this.state.imageSrc} alt={this.state.title}/>
                <span className={styles.title}>{this.state.title}</span>
                <div className={styles.controls}>
                    <button aria-label='Like' className={`${styles.like} ${this.state.like === true ? styles.likeActive : ''}`}
                            onClick={($event) => this.like()}><Icon name='like'/></button>
                    <button aria-label='Delete' className={styles.delete}
                            onClick={($event) => this.delete($event)}><Icon name='delete'/></button>
                </div>
            </div>
        );
    }
}
