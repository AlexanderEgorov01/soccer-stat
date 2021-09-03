export const FOOTBALL_DATA_API_HOST = 'http://api.football-data.org/v2';
export const FOOTBALL_DATA_AUTH_TOKEN = process.env.REACT_APP_FOOTBALL_DATA_AUTH_TOKEN;

export default class FootballDataApiService {

    async getResource(url) {
        const res = await fetch(
            `${FOOTBALL_DATA_API_HOST}${url}`,
            {
                headers: {'X-Auth-Token': `${FOOTBALL_DATA_AUTH_TOKEN}`}
            }
        );

        if (!res.ok) {
            throw new Error(
                `Could not fetch ${url}, received ${res.status}`
            )
        }
        return await res.json();
    }

    async getCompetitionsList() {
        return await this.getResource(`/competitions/`);
    }

    async getCompetitionMatches(id) {
        return await this.getResource(`/competitions/${id}/matches`);
    }

    async getTeamsList() {
        return await this.getResource(`/teams/`);
    }

    async getTeamMatches(id) {
        return await this.getResource(`/teams/${id}/matches`);
    }

}
