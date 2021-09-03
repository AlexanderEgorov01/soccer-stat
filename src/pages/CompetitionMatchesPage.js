import React from "react";
import CompetitionMatches from "../components/competition-matches/CompetitionMatches";

const CompetitionMatchesPage = ({competitionId}) => {
    return (<CompetitionMatches competitionId={competitionId}/>);
}

export default CompetitionMatchesPage