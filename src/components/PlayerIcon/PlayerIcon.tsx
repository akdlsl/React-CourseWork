import React from 'react'
import Random from "../../icons/Random";
import Sync from "../../icons/Sync";
import Play from "../../icons/Play";
import Pause from "../../icons/Pause";
import VolumeUp from "../../icons/VolumeUp";
import VolumeOff from "../../icons/VolumeOff";
import Forward from "../../icons/Forward";
import VolumeDown from "../../icons/VolumeDown";
import Backward from '../../icons/Backward';
import {EIcon} from "../../models/EIcon";
import styles from './PlayerIcon.module.scss'

export const iconToRender = props => {
    const requestedIcon = props.icon

    switch (requestedIcon) {
        case 'random':
            return <Random />
        case 'sync':
            return <Sync />
        case 'play':
            return <Play />
        case 'pause':
            return <Pause />
        case 'forward':
            return <Forward />
        case 'backward':
            return <Backward />
        case 'volumeup':
            return <VolumeUp />
        case 'volumedown':
            return <VolumeDown />
        case 'volumeoff':
            return <VolumeOff />
        default:
            break
    }
}

const PlayerIconComponent = (props: { size: string; icon: EIcon; isActive: boolean; onClick: React.MouseEventHandler<HTMLDivElement>; }) => {
    return (
        <div style={{height: props.size, width: props.size}} className={`${props.isActive && styles.active} ${styles.icon}`} onClick={props.onClick}>
            {iconToRender(props)}
        </div>
    )
}

export default PlayerIconComponent;
