import './App.scss';
import {SongItem} from "./components/SongItem";
import { Component} from 'react';
import {getBlob} from "./Audio";



class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            songList: []
        };
    }

    addSong(files) {
        this.setState(prevState => ({
            songList: [...prevState.songList, [(<SongItem buffer={getBlob(files[0])}></SongItem>)]]
        }));
    }

    render() {
        return (
            <div className="App">
                <span id="text"></span>
                <input type="file" id="file" onChange={(e) => this.addSong(e.target.files)} accept=".M4A,.FLAC,.MP3,.MP4,.WAV,.WMA,.AAC"></input>


                {this.state.songList}
                {/*<SongItem played={true}>
                </SongItem>*/}

                <ul id="playlist">
                </ul>
            </div>
        );
    }
}

export default App;
