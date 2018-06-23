import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import 'isomorphic-fetch';
import { Answer } from '../../services/answers/Answer';
import { IAnswerRepos } from '../../services/answers/IAnswerRepos';
import { Question } from '../../services/questions/Question';
import { IQuestionRepos } from '../../services/questions/IQuestionRepos';
import { QAndA } from './QAndA';
import { DOMElement } from 'react';

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
            loading: true,
        };
        const uid: number = 0; //todo
        const sid: number = this.props.routeProps.match.params["sid"];
        this.fetchAndSetQandas(uid, sid);
    }

    private fetchAndSetQandas(uid: number, sid: number) {
        const questionsPromise = this.props.questionRepos.getQuestionsAsync(sid);
        const answersPromise = this.props.answerRepos.getAnswersAsync(uid, sid);
        Promise.all([questionsPromise, answersPromise])
            .then(data => this.mergeQandas(data))
            .then(data => this.setState((prev, props) => {
                return {loading: false, qandas: data}
            }))
            //.then(data => this.setState({ loading: false, qandas: data }))
            .catch(reason => console.log("no qandas reason: " + reason));
    }

    private mergeQandas(data: [Question[],Answer[]]): QAndA[] {
        const questions: Question[] = data[0];
        const answers: Answer[] = data[1];
        const qandas: QAndA[] = questions
            .map(question => {
                const answer = answers.filter(answer => answer.questionId == question.id)[0] || null;
                const qanda: QAndA = question && { question, answer };
                return qanda;
            })
            .filter(qanda => qanda != null);
        return qandas;
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

    private linkIfAnswer(answer: Answer, baseUrl: string, subUrl: string, name: string): any {
        return (answer)
            ? <Link to={baseUrl + "/" + answer.id + "/" + subUrl}>{name}</Link>
            : <Link to="">Empty</Link>;
    }

    private renderTable(qandas: QAndA[]) {
        const myUrl = this.props.routeProps.match.url;
        const questionsUrl = myUrl.replace("answers", "questions"); //check
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
                    <th>Scale</th>
                    <th>Weight</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {sortedQandas.map(qanda =>
                    <tr key={qanda.question.id}>
                        <td>{qanda.question.id}</td>
                        <td>{qanda.question.order}</td>
                        <td>
                            <Link to={`${questionsUrl}/${qanda.question && qanda.question.id}/detail`}>{qanda.question.title}</Link>
                        </td>
                        <td>{qanda.question.choices && Object.keys(qanda.question.choices).length}</td>
                        <td>{qanda.answer && qanda.answer.scale}</td>
                        <td>{qanda.answer && qanda.answer.weight}</td>
                        <td>{(qanda.answer)
                            ? <Link to={myUrl + "/" + qanda.answer.id + "/edit"}>Edit</Link>
                            : <Link to={myUrl}>Empty</Link>
                        }
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}
