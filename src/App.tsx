import './App.scss';
import {SongItem, SongItemState} from "./components/SongItem";
import {getBlob, playerAPI} from "./Audio";
import {Component} from "react";

interface AppState {
    songList: SongItemState[];
}

interface AppProps {
}

class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            songList: []
        };
    }

    addSong(files: FileList | null) {
        if (!files) {
            return;
        }

        this.setState(prevState => ({
            songList: [...prevState.songList, ...[{
                src: getBlob(files[0]),
                isPlay: false
            }]]
        }));
    }

    play = (src: string) => {
        console.log('app play', src);
        playerAPI.play(src);

        this.setState(prevState => ({
            songList: prevState.songList.map(a => Object.assign({},{
                src: a.src,
                isPlay: a.src === src
            }))
        }));
    }

    stop = (src: string) => {
        playerAPI.stop(src);
        this.setState(prevState => ({
            songList: prevState.songList.map(a => Object.assign({}, {
                src: a.src,
                isPlay: false
            }))
        }));
    }


    render() {
        return (
            <div className="App">
                <span id="text"></span>
                <input type="file" id="file" onChange={(e) => this.addSong(e.target.files)} accept=".M4A,.FLAC,.MP3,.MP4,.WAV,.WMA,.AAC"></input>


                {this.state.songList.map((a, index) => (
                    <SongItem
                        key={index}
                        src={a.src}
                        isPlay={a.isPlay}
                        play={this.play}
                        stop={this.stop}>
                    </SongItem>
                ))}

                <ul id="playlist">
                </ul>
            </div>
        );
    }
}

export default App;
