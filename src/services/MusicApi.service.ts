import {IRadios} from "../models/IRadios";

class MusicApiService {
    private _headers = {
        "x-rapidapi-key": "cb47a89a92mshbfaeebe2bd8b648p119867jsn4e83bee457cb",
        "x-rapidapi-host": "radio-world-50-000-radios-stations.p.rapidapi.com"
    };



    async getTopByCountry(countryCode: string): Promise<IRadios> {
        const response = await this.sendRequest(`https://radio-world-50-000-radios-stations.p.rapidapi.com/v1/radios/getTopByCountry?query=${countryCode}`, 'GET');
        console.log(response.ok);
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

