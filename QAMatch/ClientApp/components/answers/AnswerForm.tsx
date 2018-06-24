import * as React from 'react';
import { PropTypes } from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { Answer } from '../../services/answers/Answer';
import { IAnswerRepos } from '../../services/answers/IAnswerRepos';

interface FormProps {
    routeProps: RouteComponentProps<{}>;
    repos: IAnswerRepos;
}

interface FormState {
    loading: boolean,
    answer: Answer,
    formInput: {}
}

export class AnswerForm extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);
        this.state = {
            loading: true,
            answer: null,
            formInput: {}
        };
        //todo
    }

    public render() {
        let contents = this.state.loading
            ? this.renderLoading()
            : this.renderForm(this.state.answer);
        return <div>
            <h1>Answer Form</h1>
            {contents}
        </div>;
    }

    private renderLoading() {
        return <div>
            <p><em>Loading Answer Form ...</em></p>
            <p>route path: {this.props.routeProps.match.path}</p>
            <p>route params.aid: {this.props.routeProps.match.params["aid"]}</p>
        </div>;
    }

    private renderForm(answer: Answer) {
        //TODO
    }
}