import {Component} from 'react'
import styles from './SongItem.module.scss';

export interface SongItemState {
    isPlay: boolean;
    src: string;
}

export interface SongItemProps {
    isPlay: boolean;
    src: string;
    play: Function;
    stop: Function;
}

export class SongItem extends Component<SongItemProps, SongItemState> {
    constructor(props: SongItemProps) {
        super(props);

        this.state = {
            isPlay: this.props.isPlay,
            src: this.props.src
        };

    }

    click = () => {
        //this.setState(prevState => ({played: !prevState.played}));
        //  this.state.played = !this.state.played;
    }

    delete = () => {

    }

    moveUp = () => {

    }

    moveDown = () => {

    }

    play = () => {
        this.props.play(this.state.src);
        this.setState(prevState => ({isPlay: true, src: prevState.src}));
    }

    stop = () => {
        this.props.stop(this.state.src);
        this.setState(prevState => ({isPlay: false, src: prevState.src}));
    }

    render() {
        const button = this.state.isPlay
            ? <button className={styles.stopIcon} onClick={this.stop}><img src="pause.jpg"/></button>
            : <button className={styles.playIcon} onClick={this.play}><img src="play.png"/></button>;
        console.log(this.state.isPlay, button);
        return (
            <div className={styles.audioPlayerContainer}>
                <p className={styles.name}>Song name</p>
                <div style={{display: 'flex'}}>
                    {button}
                    <span className={styles.currentTime}>0:00</span>
                    <input type="range" className={styles.progressSlider} max="100" value="0"/>
                    <span className={styles.duration}> 0:00 </span>
                </div>
            </div>
        );
    }
}
