import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import 'isomorphic-fetch';

interface SurveysProps {
    routeProps: RouteComponentProps<{}>;
}


interface SurveysState {
    loading: boolean;
}

export class Surveys extends React.Component<SurveysProps, SurveysState> {
    constructor(props: SurveysProps) {
        super(props);
        this.state = {
            loading: true
        }
    }

    public render() {
        const content = (this.state.loading)
            ? this.renderLoading()
            : null;
        return <div>
            <h1>Surveys</h1>
            {content}
        </div>;
    }

    private renderLoading() {
        return <p><em>Loading Surveys...</em></p>;
    }
}
