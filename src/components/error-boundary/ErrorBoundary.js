import React from 'react';

import ErrorIndicator from '../error-indicator/ErrorIndicator';

export default class ErrorBoundary extends React.Component {

    state = {
        hasError: false
    };

    componentDidCatch(error, info) {
        this.setState({
            hasError: true
        });
    }

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator/>
        }

        return this.props.children;
    }
}
