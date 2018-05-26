import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { Question } from '../../services/questions/Question';
import { IQuestionRepos} from '../../services/questions/IQuestionRepos';
import { PropTypes } from 'react';

interface FormProps {
    routeProps: RouteComponentProps<{}>;
    repos: IQuestionRepos;
}

interface FormState {
    loading: boolean,
    question: Question,
    formInput: {}
}

export class QuestionForm extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);
        this.state = {
            loading: true,
            question: null,
            formInput: {}
        };
        const id: number = this.props.routeProps.match.params["id"];
        if (id != null) {
            this.fetchAndSetQuestion(id);
        } else {
            this.state = {
                loading: false, question: new Question(), formInput: {} };
        }
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    private fetchAndSetQuestion(id: number) {
        this.props.repos.getQuestionByIdAsync(id)
            .then(data => this.setState({
                loading: false,
                question: data
            }))
            .catch(reason => console.log("reason: " + reason));
    }

    private handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            formInput: { ...this.state.formInput, [name]: value }
        });
        console.log(""
            + "\nname: " + name + "| value: " + value
            + "\nstate.formInput.title: " + this.state.formInput['title']
            + "\nstate.formInput.order: " + this.state.formInput['order']
        );
    }

    private handleSave(event) {
        //TODO
        event.preventDefault();
        const formInputs = this.state.formInput;
        const oldQuestion = this.state.question;
        const newQuestion: Question = { ...oldQuestion, ...formInputs };
        this.props.repos.updateQuestionAsync(newQuestion)
            .then(result => this.props.routeProps.history.push("/questions"))
            .catch(reason => console.log("reason: " + reason));
    }

    private handleCancel(event) {
        event.preventDefault();
        this.props.routeProps.history.push("/questions");
    }

    public render() {
        let contents = this.state.loading
            ? this.renderLoading()
            : this.renderForm(this.state.question);
        return <div>
            <h1>Question Form</h1>
            {contents}
        </div>;
    }

    private renderLoading() {
        return <div>
            <p><em>Loading Question Form ...</em></p>
            <p>route path: {this.props.routeProps.match.path}</p>
            <p>route params.id: {this.props.routeProps.match.params["id"]}</p>
        </div>;
    }

    private renderForm(question: Question) {
        //TODO
        const orderStr: string = question.order && question.order.toString();
        const weightStr: string = question.weight && question.weight.toString();

        return <form onSubmit={this.handleSave}>
            <div className="form-group-row">
                <input type="hidden" name="id" value={question.id} />
            </div>
            <div className="form-group-row">
                <label className="control-label col-sm-3" htmlFor="order">Order</label>
                <div className="col-sm-9">
                    <input className="form-control" type="number" name="order" defaultValue={orderStr} onChange={this.handleChange} />
                </div>
            </div>
            <div className="form-group-row">
                <label className="control-label col-sm-3" htmlFor="kind">kind</label>
                <div className="col-sm-9">
                    <input className="form-control" type="text" name="kind" defaultValue={question.kind} onChange={this.handleChange}/>
                </div>
            </div>
            <div className="form-group-row">
                <label className="control-label col-sm-3" htmlFor="title">Title</label>
                <div className="col-sm-9">
                    <input className="form-control" type="text" name="title" defaultValue={question.title} onChange={this.handleChange} />
                </div>
            </div>
            <div className="form-group-row">
                <label className="control-label col-sm-3" htmlFor="kind">kind</label>
                <div className="col-sm-9">
                    <input className="form-control" type="text" name="kind" defaultValue={question.kind} onChange={this.handleChange} />
                </div>
            </div>
            <div className="form-group-row">
                <label className="control-label col-sm-3" htmlFor="description">description</label>
                <div className="col-sm-9">
                    <input className="form-control" type="text" name="description" defaultValue={question.description} onChange={this.handleChange}/>
                </div>
            </div>
            <div className="form-group-row">
                <label className="control-label col-sm-3" htmlFor="weight">weight</label>
                <div className="col-sm-9">
                    <input className="form-control" type="text" name="weight" defaultValue={weightStr} onChange={this.handleChange} />
                </div>
            </div>
            <div className="form-group-row">
                <label className="control-label col-sm-3" htmlFor="choices">choices</label>
                <div className="col-sm-9">
                    <input className="form-control" type="text" name="choices" defaultValue={question.choices} onChange={this.handleChange} />
                </div>
            </div>

            <div className="form-group">
                <button type="submit" className="btn btn-default">Save</button>
                <button className="btn" onClick={this.handleCancel}>Cancel</button>
            </div>

        </form>;
    }
}