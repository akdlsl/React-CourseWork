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
            song: playListService.findSongById(playListService.getActiveId()),
            player: playListService.getPlayer()
        };
    }

    componentDidMount(): void {
        this.subscriptions.push(playListService.activeSong$.subscribe(song => {
            this.setState({song: song})
        }));

        this.subscriptions.push(playListService.player$.subscribe(player => {
            this.setState({player: player})
        }));

        document.addEventListener('keyup', (event) => {
                switch (event.keyCode) {
                    case 32:
                        this.state.player.isPlay ? this.pause() : this.play();
                        break;
                    case 37:
                        this.backward();
                        break;
                    case 39:
                        this.forward();
                        break;
                    case 49:
                        this.setMode(EMode.Repeat);
                        break;
                    case 50:
                        this.setMode(EMode.Random);
                        break;
                    case 107:
                        this.volumeUp();
                        break;
                    case 109:
                        this.volumeDown();
                        break;
                }
            }
        );
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
        if (this.state.song.duration === Infinity) {
            return;
        }
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
                <div className={styles.container} style={{backgroundColor: '#121212'}}></div>
            )
        }

        const progress = (this.state.song.currentTime / this.state.song.duration) * 100;
        const button = this.state.player?.isPlay
            ? <button aria-label='Pause' aria-current={this.state.player.isPlay} className={styles.control}
                      onClick={this.pause}><Icon name='pause'/></button>
            : <button aria-label='Play' aria-current={this.state.player.isPlay} className={styles.control}
                      onClick={this.play}><Icon name='play'/></button>;
        return (
            <div className={styles.container}>
                <img src={this.state.song.imageSrc} alt={this.state.song.title}/>
                <span className={styles.title}>{this.state.song.title}</span>
                <div className={styles.controls}>
                    <button aria-label='Previous' className={styles.control} onClick={this.backward}><Icon
                        name='previous'/></button>
                    {button}
                    <button aria-label='Next' className={styles.control} onClick={this.forward}><Icon name='next'/>
                    </button>
                    <div hidden={this.state.song.duration === Infinity} className={styles.progressBar}
                         onClick={(e) => this.changeCurrentTime(e)}>
                        <span style={{width: `${progress}%`}}></span>
                    </div>
                    <button aria-label='Random' aria-current={this.state.player.mode === EMode.Random}
                            className={`${styles.control} ${styles.controlSecondary} ${this.state.player.mode === EMode.Random && styles.controlActive}`}
                            onClick={() => this.setMode(EMode.Random)}><Icon name='random'/></button>
                    <button hidden={this.state.song.duration === Infinity} aria-label='Repeat'
                            aria-current={this.state.player.mode === EMode.Repeat}
                            className={`${styles.control} ${styles.controlSecondary} ${this.state.player.mode === EMode.Repeat && styles.controlActive}`}
                            onClick={() => this.setMode(EMode.Repeat)}><Icon name='repeat'/></button>
                    <span style={{color: 'darkgray'}}>Volume: {Math.floor(this.state.player.volume * 100)}% </span>
                    <button aria-label='Volume increase' className={`${styles.control} ${styles.controlSecondary}`}
                            onClick={this.volumeUp}><Icon name='volume-increase'/></button>
                    <button aria-label='Volume decrease' className={`${styles.control} ${styles.controlSecondary}`}
                            onClick={this.volumeDown}><Icon name='volume-decrease'/></button>
                </div>
            </div>
        )
    }
}
