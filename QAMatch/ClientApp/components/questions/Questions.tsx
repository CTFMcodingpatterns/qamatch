import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { Question } from '../../services/questions/Question';
import { IQuestionRepos } from '../../services/questions/IQuestionRepos';
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
        this.handleCreate = this.handleCreate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleRead = this.handleRead.bind(this);
    }

    private fetchAndSetQuestions() {
        this.props.repos.getQuestionsAsync()
            .then(data => this.setState({ questions: data, loading: false }))
            .catch(reason => console.log("reason: " + reason));
    }

    private handleCreate(event) {
        //TODO
        console.log("handleCreate called");
    }

    private handleDelete(event, id: number) {
        //TODO
        event.preventDefault();
        this.props.repos.deleteQuestionAsync(id)
            .then(ok => this.props.repos.getQuestionsAsync())
            .then(data => this.setState({ questions: data, loading: false }))
            .catch(reason => console.log("reason: " + reason));
        console.log("handleDelete called");
    }

    private handleRead(event) {
        this.fetchAndSetQuestions();
    }

    public render() {
        let table = this.state.loading
            ? this.renderLoading()
            : this.renderTable(this.state.questions);
        return <div>
            <h1>Questions</h1>
            {table}
            <button onClick={this.handleCreate}>Create</button>
            <button onClick={() => { this.handleRead }}>Fetch</button>
        </div>;
    }

    private renderLoading() {
        return <p><em>Loading Questions...</em></p>;
    }

    private renderTable(questions: Question[]) {
        const myUrl = this.props.routeProps.match.url;
        const sortedQuestions = questions
            .slice()
            .sort((q1, q2) => q1.order - q2.order);
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
                {sortedQuestions.map(question =>
                    <tr key={question.order}>
                        <td>{question.kind}</td>
                        <td>{question.id}</td>
                        <td>{question.order}</td>
                        <td>
                            <Link to={`${myUrl}/Detail/${question.id}`}>{question.title}</Link>
                        </td>
                        <td>{question.description}</td>
                        <td>{question.choices && question.choices.length}</td>
                        <td>{question.weight}</td>
                        <td>
                            <Link to={myUrl + "/Edit/" + question.id}>Edit</Link>
                        </td>
                        <td>
                            <a href="#" onClick={(e) => this.handleDelete(e, question.id)}>Delete</a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}