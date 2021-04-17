import {Component} from 'react'
import styles from './SongItem.module.scss';
import {PlayerApi} from "../Audio";

export class SongItem extends Component {
    constructor(props) {
        super(props);

        console.log(props);
        this.state = {
            played: this.props.played,
            buffer: this.props.buffer
        };

    //    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        // audioCtx.
    }

    click = () => {
        console.log(this.state);
        this.setState(prevState => ({played: !prevState.played}));
        //  this.state.played = !this.state.played;
    };

    play = () => {
        debugger;
        PlayerApi.play(this.state.buffer);
    }

    render() {
        return (
            <div className={styles.audioPlayerContainer}>
  {/*              <audio src={this.state.src}></audio>*/}
                <p class={styles.name}>Song name</p>
                <div style={{display: 'flex'}}>
                    <button className={styles.playIcon} onClick={this.play}><img src="play1.png"/></button>
                    <span className={styles.currentTime}>0:00</span>
                    <input type="range" className={styles.progressSlider} max="100" value="0"/>
                    <span className={styles.duration}> 0:00 </span>
                </div>

{/*                <output id="volume-output">100</output>
                <input type="range" id="volume-slider" max="100" value="100"/>
                <button id="mute-icon"></button>*/}
            </div>
        );
    }
}
