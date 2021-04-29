
export interface IPlayer {
    isPlay: boolean;
    volume: number;
    mode: EMode;
}

export enum EMode {
    Standart,
    Random,
    Repeat
}
