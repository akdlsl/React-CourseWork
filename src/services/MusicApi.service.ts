import {IRadios} from "../models/IRadios";

class MusicApiService {
    private _headers = {
        "x-rapidapi-key": "c300d3a6efmsh64ebb59fa458606p12b639jsn37de74f703cb",
        "x-rapidapi-host": "radio-world-50-000-radios-stations.p.rapidapi.com"
    };



    async getTopByCountry(countryCode: string): Promise<IRadios> {
        const response = await this.sendRequest(`https://radio-world-50-000-radios-stations.p.rapidapi.com/v1/radios/getTopByCountry?query=${countryCode}`, 'GET');
        return await response.json();
    }

    sendRequest(url: string, method: string) {
        const params: RequestInit = {
            method: method,
            headers: this._headers
        }
        return fetch(url, params);
    }
}

export const musicApiService = new MusicApiService();

