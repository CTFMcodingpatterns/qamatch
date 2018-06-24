import * as React from 'react';
import { PropTypes } from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { Answer } from '../../services/answers/Answer';
import { Question } from '../../services/questions/Question';
import { IAnswerRepos } from '../../services/answers/IAnswerRepos';
import { IQuestionRepos } from '../../services/questions/IQuestionRepos';

interface FormProps {
    routeProps: RouteComponentProps<{}>;
    answerRepos: IAnswerRepos;
    questionRepos: IQuestionRepos;
}

interface FormState {
    loading: boolean,
    answer: Answer,
    question: Question,
    formInput: {}
}

export class AnswerForm extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);
        this.state = {
            loading: true,
            answer: null,
            question: null,
            formInput: {}
        };
        const sid: number = this.props.routeProps.match.params["sid"];
        const qid: number = this.props.routeProps.match.params["qid"];
        const aid: number = this.props.routeProps.match.params["aid"];
        this.fetchAndSetQanda(sid, qid, aid);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //todo
    }

    private fetchAndSetQanda(sid: number, qid: number, aid: number) {
        //TODO
        //this.props.questionRepos.getQuestionByIdAsync(sid, qid)
        //    .then(data => this.setState({ loading: false, question: data }))
        //    .catch(reason => console.log("getquestion error: " + reason));
        //this.props.answerRepos.getAnswerById(aid)
        //    .then(data => this.setState({ loading: false, answer: data }))
        //    .catch(reason => console.log("getanswer error: " + reason));
        const questionPromise = this.props.questionRepos.getQuestionByIdAsync(sid, qid);
        const answerPromise = this.props.answerRepos.getAnswerById(aid);
        Promise.all([questionPromise, answerPromise])
            .then(data => this.setState({ loading: false, question: data[0], answer: data[1] }))
            .catch(reason => console.log("getQanda error: " + reason));
    }

    private handleCancel(event) {
        event.preventDefault();
        this.props.routeProps.history.goBack();
    }

    private handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            formInput: { ...this.state.formInput, [name]: value }
        });
        console.log(""
            + "\nname: " + name + "| value: " + value
            + "\nstate.formInput.scale: " + this.state.formInput['scale']
        );
    }

    private handleSave(event) {
        //TODO
    }

    public render() {
        let contents = this.state.loading
            ? this.renderLoading()
            : this.renderForm(this.state.question, this.state.answer);
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

    private renderForm(question: Question, answer: Answer) {
        //TODO
        const orderStr: string = question.order && question.order.toString();
        const weightStr: string = question.weight && question.weight.toString();
        const scaleStr: string = question.scale && question.scale.toString();

        return <form onSubmit={this.handleSave}>
            <div className="form-group-row">
                <label className="control-label col-sm-3" htmlFor="id">Id</label>
                <div className="col-sm-9">
                    <input className="form-control" type="number" name="id" value={question.id} readOnly />
                </div>
            </div>
            <div className="form-group-row">
                <label className="control-label col-sm-3" htmlFor="order">Order</label>
                <div className="col-sm-9">
                    <input className="form-control" type="number" name="order" defaultValue={orderStr} readOnly />
                </div>
            </div>
            <div className="form-group-row">
                <label className="control-label col-sm-3" htmlFor="title">Title</label>
                <div className="col-sm-9">
                    <input className="form-control" type="text" name="title" defaultValue={question.title} readOnly />
                </div>
            </div>
            <div className="form-group-row">
                <label className="control-label col-sm-3" htmlFor="description">description</label>
                <div className="col-sm-9">
                    <input className="form-control" type="text" name="description" defaultValue={question.description} readOnly />
                </div>
            </div>
            <div className="form-group-row">
                <label className="control-label col-sm-3" htmlFor="weight">weight</label>
                <div className="col-sm-9">
                    <input className="form-control" type="text" name="weight" defaultValue={weightStr} onChange={this.handleChange} />
                </div>
            </div>
            <div className="form-group-row">
                <label className="control-label col-sm-3" htmlFor="scale">scale</label>
                <div className="col-sm-9">
                    <input className="form-control" type="text" name="scale" defaultValue={scaleStr} onChange={this.handleChange} />
                </div>
            </div>

            <div className="form-group">
                <button type="submit" className="btn btn-default">Save</button>
                <button className="btn" onClick={this.handleCancel}>Cancel</button>
            </div>

        </form>;
    }
}