﻿import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import 'isomorphic-fetch';
import { Answer } from '../../services/answers/Answer';
import { IAnswerRepos } from '../../services/answers/IAnswerRepos';
//import { Question } from '../../services/questions/Question';
//import { IQuestionRepos } from '../../services/questions/IQuestionRepos';

interface AnswersProps {
    routeProps: RouteComponentProps<{}>;
    repos: IAnswerRepos;
}

interface AnswersState {
    answers: Answer[];
    loading: boolean;
}

export class Answers extends React.Component<AnswersProps, AnswersState> {
    constructor(props: AnswersProps) {
        super(props);
        this.state = {
            answers: [],
            loading: false,
        };
    }

    public render() {
        const sid = this.props.routeProps.match.params["sid"];
        let table = this.state.loading
            ? this.renderLoading()
            : this.renderTable(this.state.answers);
        return <div>
            <h1>Survey {sid} / Answers</h1>
            {table}
        </div>;
    }

    private renderLoading() {
        return <p><em>Loading Answers...</em></p >;
    }

    private renderTable(answers: Answer[]) {
        const myUrl = this.props.routeProps.match.url;
        const sortedAnswers = answers
            .slice()
            .sort((q1, q2) => q1.order - q2.order);
        return <table className='table'>
            <thead>
                <tr>
                    <th style={{ width: '1%' }}>#</th>
                    <th style={{ width: '1%' }}>#</th>
                    <th style={{ width: '20%' }}>Title</th>
                    <th>Choices</th>
                    <th>Weight</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {sortedAnswers.map(answer =>
                    <tr key={answer.order}>
                        <td>{answer.id}</td>
                        <td>{answer.order}</td>
                        <td>
                            <Link to={`${myUrl}/${answer.id}/detail`}>{answer.title}</Link>
                        </td>
                        <td>{answer.choices && Object.keys(answer.choices).length}</td>
                        <td>{answer.weight}</td>
                        <td>
                            <Link to={myUrl + "/" + answer.id + "/edit"}>Edit</Link>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}
