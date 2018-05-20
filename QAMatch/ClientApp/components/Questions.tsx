import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Question } from '../services/questions/Question';
import { IQuestionRepos } from '../services/questions/IQuestionRepos';
import { QuestionInMemory } from '../services/questions/QuestionInMemory';
import 'isomorphic-fetch';


interface StatementsState {
    //repos: IStatementRepos;
    statements: Question[];
    loading: boolean;
}

interface StatementProps {
    routeProps: RouteComponentProps<{}>;
    repos: IQuestionRepos;
}

export class Statements extends React.Component<StatementProps, StatementsState> {
    constructor(props: StatementProps) {
        super(props);
        this.state = {
            statements: [],
            loading: true
        };
        this.fetchAndSetStatements();
    }

    private fetchAndSetStatements() {
        this.props.repos.getQuestionsAsync()
            .then(data => this.setState({ statements: data, loading: false }))
            .catch(reason => console.log("reason: " + reason));
    }

    public render() {
        let contents = this.state.loading
            ? Statements.renderLoading()
            : Statements.renderTable(this.state.statements);

        return <div>
            <h1>Statements</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
            <button onClick={() => { this.fetchAndSetStatements() }}>Fetch</button>
        </div>;
    }

    private static renderLoading() {
        return <p><em>Loading Statements...</em></p>;
    }

    private static renderTable(statements: Question[]) {
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
                {statements.map(stmt =>
                    <tr key={stmt.order}>
                        <td>{stmt.kind}</td>
                        <td>{stmt.id}</td>
                        <td>{stmt.order}</td>
                        <td>{stmt.title}</td>
                        <td>{stmt.description}</td>
                        <td>{stmt.choices && stmt.choices.length}</td>
                        <td>{stmt.weight}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}