import React, {useContext, useEffect, useMemo, useState} from 'react';
import ErrorIndicator from "../error-indicator/ErrorIndicator";
import Spinner from "../spinner/Spinner";
import SettingsContext from "../../contexts/SettingsContext";

const CompetitionMatches = ({competitionId}) => {

    const {settings: {api: {footballDataApiService}}} = useContext(SettingsContext);

    const initialState = useMemo(() => ({
        matchesData: {},
        loading: true,
        error: null
    }), []);

    const [dataState, setDataState] = useState(initialState);

    useEffect(() => {
        let cancelled = false;
        footballDataApiService
            .getCompetitionMatches(competitionId)
            .then(matchesData => {
                if (!cancelled) {
                    setDataState(newDataState => {
                        return {...newDataState, matchesData, loading: false, error: null}
                    })
                }
            })
            .catch(error => {
                if (!cancelled) {
                    setDataState(newDataState => {
                        return {...newDataState, loading: false, error: error}
                    })
                }
            });
        return () => {
            cancelled = true;
        }
    }, [
        competitionId,
        footballDataApiService
    ]);

    function build() {
        const {matchesData, loading, error} = dataState;

        if (error) {
            return <ErrorIndicator/>
        }

        if (loading) {
            return <Spinner/>;
        }

        const {matches: [...matches] = []} = matchesData;

        const elements =
            matches && matches.length
                ? matches.map((match, index) => {
                    const score = {
                        homeTeam: match?.score?.fullTime?.homeTeam
                            + match?.score?.halfTime?.homeTeam
                            + match?.score?.extraTime?.homeTeam
                            + match?.score?.penalties?.homeTeam,
                        awayTeam: match?.score?.fullTime?.awayTeam
                            + match?.score?.halfTime?.awayTeam
                            + match?.score?.extraTime?.awayTeam
                            + match?.score?.penalties?.awayTeam
                    }
                    return (
                        <tr key={index}>
                            <td>{`${match?.homeTeam?.name} vs ${match?.awayTeam?.name}`}</td>
                            <td>{match?.group}</td>
                            <td>{match?.utcDate}</td>
                            <td>{match?.status}</td>
                            <td>{`${score.homeTeam}:${score.awayTeam}`}</td>
                        </tr>
                    );
                })
                : <p className="text-center">No info</p>

        return (
            <div className="mt-2 table-responsive">
                <table className="table table-borderless">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">Teams</th>
                        <th scope="col">Group</th>
                        <th scope="col">Date (UTC)</th>
                        <th scope="col">Status</th>
                        <th scope="col">Score</th>
                    </tr>
                    </thead>
                    <tbody>
                    {elements}
                    </tbody>
                </table>
            </div>
        )
    }

    return build()
}

export default CompetitionMatches;
