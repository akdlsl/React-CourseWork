import styles from './PlayBar.module.scss';
import React, {Component} from "react";
import {ISong} from "../../models/ISong";
import {Subscription} from "rxjs";
import {playListService} from "../../services/PlayList.service";
import {IData} from "../../models/IData";
import PlayerIcon from "../PlayerIcon/PlayerIcon";
import {EIcon} from "../../models/EIcon";

export class PlayBarComponent extends Component<any, IData<ISong>> {
    subscription: Subscription;

    constructor(props) {
        super(props);

        this.state = {data: null};
    }

    componentDidMount(): void {
        this.subscription = playListService.activeSong$.subscribe(song => {
            this.setState({data: song})
        });
    }

    componentWillUnmount(): void {
        this.subscription.unsubscribe();
    }

    play = () => {
        playListService.play();
    }

    stop = () => {

    }

    render() {
        return (
            <div className={styles.container}>
                <PlayerIcon size='50px' icon={EIcon.Play} isActive={false} onClick={this.play}/>
                <span className={styles.title}>{this.state.data?.title}</span>
            </div>
        )
    }
}
