import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import 'isomorphic-fetch';
import { Survey } from '../../services/surveys/Survey';
import { ISurveyRepos } from '../../services/surveys/ISurveyRepos';

interface SurveysProps {
    routeProps: RouteComponentProps<{}>;
    repos: ISurveyRepos;
}


interface SurveysState {
    loading: boolean;
    surveys: Survey[];
}

export class Surveys extends React.Component<SurveysProps, SurveysState> {
    constructor(props: SurveysProps) {
        super(props);
        this.state = {
            loading: true,
            surveys: null
        }
        this.FetchAndSetSurveys();
    }

    private FetchAndSetSurveys() {
        this.props.repos.getSurveysAsync()
            .then(data => this.setState({ loading: false, surveys: data }))
            .catch(reason => console.log("reason: " + reason));
    }

    public render() {
        const content = (this.state.loading)
            ? this.renderLoading()
            : this.renderTable(this.state.surveys);
        return <div>
            <h1>Surveys</h1>
            {content}
        </div>;
    }

    private renderLoading() {
        return <p><em>Loading Surveys...</em></p>;
    }

    private renderTable(surveys: Survey[]) {
        const myUrl = this.props.routeProps.match.url;
        const sortedSurveys = surveys
            .slice()
            .sort((q1, q2) => q1.order - q2.order);
        return <table className='table'>
            <thead>
                <tr>
                    <th style={{ width: '1%' }}>#</th>
                    <th style={{ width: '1%' }}>#</th>
                    <th style={{ width: '20%' }}>Title</th>
                    <th>Description</th>
                    <th/>
                </tr>
            </thead>
            <tbody>
                {sortedSurveys.map(survey =>
                    <tr key={survey.order}>
                        <td>{survey.id}</td>
                        <td>{survey.order}</td>
                        <td>
                            <Link to={`${myUrl}/Detail/${survey.id}`}>{survey.title}</Link>
                        </td>
                        <td>{survey.description}</td>
                        <td>
                            <Link to={myUrl + "/" + survey.id + "/questions"}>Questions</Link>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}
