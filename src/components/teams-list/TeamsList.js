import React, {useContext, useEffect, useMemo, useState} from 'react';

import Spinner from '../spinner/Spinner';
import ErrorIndicator from "../error-indicator/ErrorIndicator";
import SettingsContext from "../../contexts/SettingsContext";
import {Link} from "react-router-dom";

const TeamsList = () => {

    const {settings: {api: {footballDataApiService}}} = useContext(SettingsContext);

    const initialState = useMemo(() => ({
        teamListData: {},
        loading: true,
        error: null
    }), []);

    const [dataState, setDataState] = useState(initialState);

    useEffect(() => {
        let cancelled = false;
        footballDataApiService
            .getTeamsList()
            .then(teamListData => {
                if (!cancelled) {
                    setDataState(newDataState => {
                        return {...newDataState, teamListData, loading: false, error: null}
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
        footballDataApiService
    ]);

    function build() {
        const {teamListData, loading, error} = dataState;

        if (error) {
            return <ErrorIndicator/>
        }

        if (loading) {
            return <Spinner/>;
        }

        const {teams: [...teams] = []} = teamListData;

        const elements =
            teams && teams.length
                ? teams.map((team, index) => {
                    return (
                        <tr key={index}>
                            <td>
                                <Link
                                    key={team?.id}
                                    to={`/teams/${team?.id}/`}>
                                    {team?.shortName}
                                </Link>
                            </td>
                            <td>{team?.founded}</td>
                            <td>{team?.clubColors}</td>
                            <td>{team?.venue}</td>
                        </tr>
                    );
                })
                : <p className="text-center">No info</p>

        return (
            <div className="mt-2 table-responsive">
                <table className="table table-borderless">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Founded</th>
                        <th scope="col">Club colors</th>
                        <th scope="col">Venue</th>
                    </tr>
                    </thead>
                    <tbody>
                    {elements}
                    </tbody>
                </table>
            </div>
        )
    }

    return build();
};

export default TeamsList;
