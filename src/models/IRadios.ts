
export interface IRadios {
    radios: IRadioItem[];
}

export interface IRadioItem {
    image_url: string;
    name: string;
    uri: string;
    genre: string;
    countryCode: string;
    channel_id: number;
    metadata: boolean;
}
