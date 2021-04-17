import './App.scss';
import {SongItem} from "./components/SongItem";
import { Component} from 'react';
import {SoundBuffer} from "./Audio";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            songList: []
        };
    }

    async addSong(files) {
        const buffer = new SoundBuffer(files[0].name);

        debugger;
        this.setState(prevState => ({
            songList: [...prevState.songList, [(<SongItem buffer={buffer}></SongItem>)]]
        }));

  /*      for (let index = 0; index < files.length; index++) {
            reader.readAsDataURL(files[index]);
        }*/
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
