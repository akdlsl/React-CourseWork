import './App.scss';
import {SongItem} from "./components/SongItem";
import { Component} from 'react';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            songList: []
        }
    }

    addSong(files) {
        console.log(files);
        const reader = new FileReader();
        const context = this;
        reader.addEventListener("load", function () {
            // convert image file to base64 string
            const fileURL = reader.result;
            console.log(fileURL);

            context.setState(prevState => ({songList: [...prevState.songList, [(<SongItem src={fileURL}></SongItem>)]]}));
           // this.state.songList.push(());
        }, false);

        for (let index = 0; index < files.length; index++) {
            reader.readAsDataURL(files[index]);
        }
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
