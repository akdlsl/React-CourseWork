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
            <div className={'app'}>
                <ContentComponent>
                    <PlayListComponent/>
                </ContentComponent>
                <PlayBarComponent>
                </PlayBarComponent>
            </div>
        );
    }
}

export default App;
