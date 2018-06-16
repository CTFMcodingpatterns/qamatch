import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import 'isomorphic-fetch';
import { Answer } from '../../services/answers/Answer';
import { IAnswerRepos } from '../../services/answers/IAnswerRepos';
import { Question } from '../../services/questions/Question';
import { IQuestionRepos } from '../../services/questions/IQuestionRepos';
import { QAndA } from './QAndA';

interface AnswersProps {
    routeProps: RouteComponentProps<{}>;
    answerRepos: IAnswerRepos;
    questionRepos: IQuestionRepos;
}

interface AnswersState {
    qandas: QAndA[];
    loading: boolean;
}

export class Answers extends React.Component<AnswersProps, AnswersState> {
    constructor(props: AnswersProps) {
        super(props);
        this.state = {
            qandas: [],
            loading: false,
        };
    }

    public render() {
        const sid = this.props.routeProps.match.params["sid"];
        let table = this.state.loading
            ? this.renderLoading()
            : this.renderTable(this.state.qandas);
        return <div>
            <h1>Survey {sid} / Answers</h1>
            {table}
        </div>;
    }

    private renderLoading() {
        return <p><em>Loading Answers...</em></p >;
    }

    private renderTable(qandas: QAndA[]) {
        const myUrl = this.props.routeProps.match.url;
        const sortedQandas = qandas
            .slice()
            .sort((qa1, qa2) => qa1.question.order - qa2.question.order);
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
                {sortedQandas.map(qanda =>
                    <tr key={qanda.answer.id}>
                        <td>{qanda.answer.id}</td>
                        <td>{qanda.question.order}</td>
                        <td>
                            <Link to={`${myUrl}/${qanda.answer.id}/detail`}>{qanda.question.title}</Link>
                        </td>
                        <td>{qanda.question.choices && Object.keys(qanda.question.choices).length}</td>
                        <td>{qanda.answer.weight}</td>
                        <td>
                            <Link to={myUrl + "/" + qanda.answer.id + "/edit"}>Edit</Link>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}
