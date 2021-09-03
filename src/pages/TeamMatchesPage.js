import React from "react";
import TeamMatches from "../components/team-matches/TeamMatches";

const TeamMatchesPage = ({teamId}) => {
    return (<TeamMatches teamId={teamId}/>);
}

export default TeamMatchesPage