import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Question } from '../services/questions/Question';
import { IQuestionRepos } from '../services/questions/IQuestionRepos';
import 'isomorphic-fetch';


interface QuestionsState {
    questions: Question[];
    loading: boolean;
}

interface QuestionsProps {
    routeProps: RouteComponentProps<{}>;
    repos: IQuestionRepos;
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
            ? Questions.renderLoading()
            : Questions.renderTable(this.state.questions);

        return <div>
            <h1>Questions</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
            <button onClick={() => { this.fetchAndSetQuestions() }}>Fetch</button>
        </div>;
    }

    private static renderLoading() {
        return <p><em>Loading Questions...</em></p>;
    }

    private static renderTable(questions: Question[]) {
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
                </tr>
            </thead>
            <tbody>
                {questions.map(question =>
                    <tr key={question.order}>
                        <td>{question.kind}</td>
                        <td>{question.id}</td>
                        <td>{question.order}</td>
                        <td>{question.title}</td>
                        <td>{question.description}</td>
                        <td>{question.choices && question.choices.length}</td>
                        <td>{question.weight}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}