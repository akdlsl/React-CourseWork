import styles from './PlayBar.module.scss';
import React, {Component} from "react";
import {ISong} from "../../models/ISong";
import {Subscription} from "rxjs";
import {playListService} from "../../services/PlayList.service";
import {EMode, IPlayer} from "../../models/IPlayer";
import Icon from "../Icon/Icon";

interface PlayerBarState {
    song: ISong;
    player: IPlayer;
}

export class PlayBarComponent extends Component<any, PlayerBarState> {
    subscriptions: Subscription[] = [];

    constructor(props) {
        super(props);

        this.state = {
            song: null,
            player: playListService.getPlayer()
        };
    }

    componentDidMount(): void {
        this.subscriptions.push( playListService.activeSong$.subscribe(song => {
            this.setState({song: song})
        }));

        this.subscriptions.push( playListService.player$.subscribe(player => {
            this.setState({player: player})
        }));
    }

    componentWillUnmount(): void {
        this.subscriptions.forEach(a => a.unsubscribe());
    }

    play = () => {
        playListService.play(this.state.song.currentTime);
    }

    pause = () => {
        playListService.pause();
    }

    forward = () => {
        playListService.forward();
    }

    backward = () => {
        playListService.backward();
    }

    setMode = (mode: EMode) => {
        const newMode = this.state.player.mode === mode ? EMode.Standart : mode;
        playListService.setMode(newMode);
    }

    volumeUp = () => {
        playListService.setVolume(this.state.player.volume + 0.1);
    }

    volumeDown = () => {
        playListService.setVolume(this.state.player.volume - 0.1);
    }

    changeCurrentTime = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left; //x position within the element.
        const percent = (x / e.target.clientWidth) * 100;
        const currentTime = (this.state.song.duration / 100) * percent;
        const song = Object.assign({}, this.state.song);
        song.currentTime = currentTime;
        if (this.state.player.isPlay) {
            playListService.play(currentTime);
        } else {
            playListService.updateSong(song);
        }
    }

    render() {
        if (!this.state.song || !this.state.player) {
            return (
                <div className={styles.container}></div>
            )
        }

        const progress = (this.state.song.currentTime / this.state.song.duration) * 100;
        const button = this.state.player?.isPlay
            ? <div className={styles.control} onClick={this.pause}><Icon name='pause'/></div>
            : <div className={styles.control} onClick={this.play}><Icon name='play'/></div>;
        return (
            <div className={styles.container}>
                <span className={styles.title}>{this.state.song?.title}</span>
                <div className={styles.controls}>
                    <div className={styles.control} onClick={this.backward}><Icon name='previous'/></div>
                    {button}
                    <div className={styles.control} onClick={this.forward}><Icon name='next'/></div>
                    <div className={styles.progressBar} onClick={(e) => this.changeCurrentTime(e)}>
                        <span style={{width: `${progress}%`}}></span>
                    </div>
                    <div className={`${styles.control} ${styles.controlSecondary} ${this.state.player.mode === EMode.Random && styles.controlActive}`} onClick={() => this.setMode(EMode.Random)}><Icon name='random'/></div>
                    <div className={`${styles.control} ${styles.controlSecondary} ${this.state.player.mode === EMode.Repeat && styles.controlActive}`} onClick={() => this.setMode(EMode.Repeat)}><Icon name='repeat'/></div>
                    <span>Volume: {this.state.player.volume * 100}% </span>
                    <div className={`${styles.control} ${styles.controlSecondary}`} onClick={this.volumeUp}><Icon name='volume-increase'/></div>
                    <div className={`${styles.control} ${styles.controlSecondary}`} onClick={this.volumeDown}><Icon name='volume-decrease'/></div>
                </div>
            </div>
        )
    }
}
