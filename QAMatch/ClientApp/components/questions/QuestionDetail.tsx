import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Question } from '../../services/questions/Question';
import { IQuestionRepos } from '../../services/questions/IQuestionRepos';
import { PropTypes } from 'react';

interface DetailProps {
    routeProps: RouteComponentProps<{}>;
    repos: IQuestionRepos;
}

interface DetailState {
    loading: boolean,
    question: Question
}

export class QuestionDetail extends React.Component<DetailProps, DetailState> {
    constructor(props: DetailProps) {
        super(props);
        this.state = {
            loading: true,
            question: null
        };
        const id: number = this.props.routeProps.match.params["id"];
        this.fetchAndSetQuestion(id);
    }

    private fetchAndSetQuestion(id: number) {
        this.props.repos.getQuestionByIdAsync(id)
            .then(data => this.setState({question: data, loading: false}))
            .catch(reason => console.log("reason: " + reason));
    }

    public render() {
        let contents = this.state.loading
            ? this.renderLoading()
            : this.renderDetail(this.state.question);
        return <div>
            <h1>Question Detail</h1>
            {contents}
        </div>;
    }

    private renderLoading() {
        return <div>
            <p><em>Loading Question Detail ...</em></p>
            <p>route path: {this.props.routeProps.match.path}</p>
            <p>route params.id: {this.props.routeProps.match.params["id"]}</p>
        </div>;
    }

    private renderDetail(question: Question) {
        //TODO
        return <table className="table">
            <thead>
                <tr>
                    <th style={{ width: '10%' }}></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Kind: </td>
                    <td>{question.kind}</td>
                </tr>
                <tr>
                    <td>Id: </td>
                    <td>{question.id}</td>
                </tr>
                <tr>
                    <td>Order: </td>
                    <td>{question.order}</td>
                </tr>
                <tr>
                    <td>Title: </td>
                    <td>{question.title}</td>
                </tr>
                <tr>
                    <td>Description: </td>
                    <td>{question.description}</td>
                </tr>
                <tr>
                    <td>Weight: </td>
                    <td>{question.weight}</td>
                </tr>
                <tr>
                    <td>Choices: </td>
                    <td>{question.choices.map(choice => <p>{choice}</p>)}</td>
                </tr>
            </tbody>
        </table>;
    }
}