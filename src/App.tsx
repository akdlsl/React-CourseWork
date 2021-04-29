import './App.scss';
import React, {Component} from "react";
import ContentComponent from "./components/Content/Content";
import {PlayListComponent} from "./components/PlayList/PlayList";
import {PlayBarComponent} from "./components/PlayBar/PlayBar";

class App extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <main className={'app'}>
                <div className={'content-container'}>
                    <ContentComponent>
                        <PlayListComponent/>
                    </ContentComponent>
                </div>
                <div className={'playbar-container'}>
                    <PlayBarComponent/>
                </div>
            </main>
        );
    }
}

export default App;
