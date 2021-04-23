import styles from './PlayBar.module.scss';
import React, {Component} from "react";
import {ISong} from "../../models/ISong";
import {Subscription} from "rxjs";
import {playListService} from "../../services/PlayList.service";
import PlayerIcon from "../PlayerIcon/PlayerIcon";
import {EIcon} from "../../models/EIcon";
import {EMode, IPlayer} from "../../models/IPlayer";

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
        playListService.setMode(mode);
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
            ? <PlayerIcon size='50px' icon={EIcon.Pause} isActive={false} onClick={this.pause}/>
            : <PlayerIcon size='50px' icon={EIcon.Play} isActive={false} onClick={this.play}/>;
        return (
            <div className={styles.container}>
                <span className={styles.title}>{this.state.song?.title}</span>
                <div className={styles.controls}>
                    <PlayerIcon size='50px' icon={EIcon.Backward} isActive={false} onClick={this.backward}/>
                    {button}
                    <PlayerIcon size='50px' icon={EIcon.Forward} isActive={false} onClick={this.forward}/>
                    <div className={styles.progressBar} onClick={(e) => this.changeCurrentTime(e)}>
                        <span style={{width: `${progress}%`}}></span>
                    </div>
                    <PlayerIcon size='50px' icon={EIcon.Random} isActive={false} onClick={() => this.setMode(EMode.Random)}/>
                </div>
            </div>
        )
    }
}
