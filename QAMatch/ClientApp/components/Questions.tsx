import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { Question } from '../services/questions/Question';
import { IQuestionRepos } from '../services/questions/IQuestionRepos';
import 'isomorphic-fetch';


interface QuestionsProps {
    routeProps: RouteComponentProps<{}>;
    repos: IQuestionRepos;
}

interface QuestionsState {
    questions: Question[];
    loading: boolean;
}

export class Questions extends React.Component<QuestionsProps, QuestionsState> {
    constructor(props: QuestionsProps) {
        super(props);
        this.state = {
            questions: [],
            loading: true
        };
        this.fetchAndSetQuestions();
    }

    private fetchAndSetQuestions() {
        this.props.repos.getQuestionsAsync()
            .then(data => this.setState({ questions: data, loading: false }))
            .catch(reason => console.log("reason: " + reason));
    }

    public render() {
        let contents = this.state.loading
            ? this.renderLoading()
            : this.renderTable(this.state.questions);

        return <div>
            <h1>Questions</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
            <button onClick={() => { this.fetchAndSetQuestions() }}>Fetch</button>
        </div>;
    }

    private renderLoading() {
        return <p><em>Loading Questions...</em></p>;
    }

    private renderTable(questions: Question[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Kind</th>
                    <th style={{ width: '1%' }}>#</th>
                    <th style={{ width: '1%'}}>#</th>
                    <th style={{ width: '20%' }}>Title</th>
                    <th>Description</th>
                    <th>Choices</th>
                    <th>Weight</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {questions.map(question =>
                    <tr key={question.order}>
                        <td>{question.kind}</td>
                        <td>{question.id}</td>
                        <td>{question.order}</td>
                        <td>
                            <Link to={`${this.props.routeProps.match.url}/Detail/${question.id}`}>{question.title}</Link>
                        </td>
                        <td>{question.description}</td>
                        <td>{question.choices && question.choices.length}</td>
                        <td>{question.weight}</td>
                        <td>
                            <Link to={this.props.routeProps.match.url + "/Edit/" + question.id}>Edit</Link>
                        </td>
                        <td>
                            <Link to={this.props.routeProps.match.url + "/Delete/" + question.id}>Delete</Link>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}