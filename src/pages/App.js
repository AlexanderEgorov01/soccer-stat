import React from 'react';

import {SettingsContextProvider} from "../contexts/SettingsContext";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ErrorBoundary from "../components/error-boundary/ErrorBoundary";
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import NotFoundPage from "./NotFoundPage";
import WelcomePage from "./WelcomePage";
import FootballDataApiService from "../services/FootballDataApiService";
import CompetitionsListPage from "./CompetitionsListPage";
import TeamsListPage from "./TeamsListPage";
import CompetitionMatchesPage from "./CompetitionMatchesPage";
import TeamMatchesPage from "./TeamMatchesPage";

export default class App extends React.Component {

    settings = {
        api: {
            footballDataApiService: new FootballDataApiService()
        }
    };

    render() {
        return (
            <ErrorBoundary>
                <SettingsContextProvider settings={this.settings}>
                    <Router>
                        <div>
                            <Header/>

                            <div className="container mb-auto">
                                <Switch>
                                    <Route path="/" exact component={WelcomePage}/>

                                    <Route path="/competitions/" exact component={CompetitionsListPage}/>
                                    <Route path="/competitions/:competitionId"
                                           render={({match: {params: {competitionId}}}) => {
                                               return <CompetitionMatchesPage competitionId={competitionId}/>
                                           }}
                                    />
                                    <Route path="/teams/" exact component={TeamsListPage}/>
                                    <Route path="/teams/:teamId"
                                           render={({match: {params: {teamId}}}) => {
                                               return <TeamMatchesPage teamId={teamId}/>
                                           }}
                                    />

                                    <Route component={NotFoundPage}/>
                                </Switch>
                            </div>

                            <Footer/>
                        </div>
                    </Router>
                </SettingsContextProvider>
            </ErrorBoundary>
        );
    }
}
