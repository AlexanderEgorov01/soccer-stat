import React, {useContext, useEffect, useMemo, useState} from 'react';

import Spinner from '../spinner/Spinner';
import ErrorIndicator from "../error-indicator/ErrorIndicator";
import SettingsContext from "../../contexts/SettingsContext";
import {Link} from "react-router-dom";

const CompetitionsList = () => {

    const {settings: {api: {footballDataApiService}}} = useContext(SettingsContext);

    const initialState = useMemo(() => ({
        competitionsListData: {},
        loading: true,
        error: null
    }), []);

    const [dataState, setDataState] = useState(initialState);

    useEffect(() => {
        let cancelled = false;
        footballDataApiService
            .getCompetitionsList()
            .then(competitionsListData => {
                if (!cancelled) {
                    setDataState(newDataState => {
                        return {...newDataState, competitionsListData, loading: false, error: null}
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
        const {competitionsListData, loading, error} = dataState;

        if (error) {
            return <ErrorIndicator/>
        }

        if (loading) {
            return <Spinner/>;
        }

        const {competitions: [...competitions] = []} = competitionsListData;

        const elements =
            competitions && competitions.length
                ? competitions.map((competition, index) => {
                    const area = competition?.area?.ensignUrl
                        ? (
                            <td>
                                <img src={competition?.area?.ensignUrl}
                                     alt='ensign'
                                     width="14"
                                     height="14"/>
                                {` (${competition?.area?.name})`}
                            </td>
                        )
                        : (
                            <td>{competition?.area?.name}</td>
                        )
                    return (
                        <tr key={index}>
                            <td>
                                <Link
                                    key={competition?.id}
                                    to={`/competitions/${competition?.id}/`}>
                                    {competition?.name}
                                </Link>
                            </td>
                            {area}
                            <td>{`${competition?.currentSeason?.startDate} — ${competition?.currentSeason?.endDate}`}</td>
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
                        <th scope="col">Area</th>
                        <th scope="col">Period</th>
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

export default CompetitionsList;
