import {Component} from 'react'
import styles from './SongItem.module.scss';

export class SongItem extends Component {
    constructor(props) {
        super(props);

        console.log(props);
        this.state = {
            played: this.props.played,
            src: this.props.src
        };

    //    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        // audioCtx.
    }

    click = () => {
        console.log(this.state);
        this.setState(prevState => ({played: !prevState.played}));
        //  this.state.played = !this.state.played;
    }

    render() {
        return (
            // <div className={styles.container} onClick={this.click}><audio src={this.state.src} controls autoPlay>{this.state.played ? 'Да' : 'Нет'}</audio></div>

            <div className={styles.audioPlayerContainer}>
                <audio src="https://assets.codepen.io/4358584/Anitek_-_Komorebi.mp3" preload="metadata" loop></audio>
                <p>audio player ish</p>
                <button class={styles.playIcon}></button>
                <span class={styles.currentTime}>0:00</span>
                <input type="range" className="seek-slider" max="100" value="0"/>
                <span className={styles.duration}> 0:00 </span>
                <output id="volume-output">100</output>
                <input type="range" id="volume-slider" max="100" value="100"/>
                <button id="mute-icon"></button>
            </div>
        );
    }
}
