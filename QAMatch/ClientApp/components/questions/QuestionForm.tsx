import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Question } from '../../services/questions/Question';
import { IQuestionRepos} from '../../services/questions/IQuestionRepos';
import { PropTypes } from 'react';

interface FormProps {
    routeProps: RouteComponentProps<{}>;
    repos: IQuestionRepos;
}

interface FormState {
    loading: boolean,
    question: Question
}

export class QuestionForm extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);
        this.state = {
            loading: true,
            question: null
        };
        const id: number = this.props.routeProps.match.params["id"];
        this.fetchAndSetQuestion(id);
        this.handleSave = this.handleSave.bind(this);
    }

    private fetchAndSetQuestion(id: number) {
        this.props.repos.getQuestionByIdAsync(id)
            .then(data => this.setState({
                loading: false,
                question: data
            }))
            .catch(reason => console.log("reason: " + reason));
    }

    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        //TODO
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
        const orderStr: string = question.order.toString();
        const weightStr: string = question.weight.toString();

        return <form onSubmit={this.handleSave}>
            <div className="form-group-row">
                <input type="hidden" name="id" value={question.id} />
            </div>
            <div className="form-group-row">
                <label className="control-label col-sm-3" htmlFor="Order">Order</label>
                <div className="col-sm-9">
                    <input className="form-control" type="number" name="order" defaultValue={orderStr}></input>
                </div>
            </div>
            <div className="form-group-row">
                <label className="control-label col-sm-3" htmlFor="kind">kind</label>
                <div className="col-sm-9">
                    <input className="form-control" type="text" name="kind" defaultValue={question.kind}></input>
                </div>
            </div>
            <div className="form-group-row">
                <label className="control-label col-sm-3" htmlFor="Title">Title</label>
                <div className="col-sm-9">
                    <input className="form-control" type="text" name="title" defaultValue={question.title}></input>
                </div>
            </div>
            <div className="form-group-row">
                <label className="control-label col-sm-3" htmlFor="kind">kind</label>
                <div className="col-sm-9">
                    <input className="form-control" type="text" name="kind" defaultValue={question.kind}></input>
                </div>
            </div>
            <div className="form-group-row">
                <label className="control-label col-sm-3" htmlFor="description">description</label>
                <div className="col-sm-9">
                    <input className="form-control" type="text" name="description" defaultValue={question.description}></input>
                </div>
            </div>
            <div className="form-group-row">
                <label className="control-label col-sm-3" htmlFor="weight">weight</label>
                <div className="col-sm-9">
                    <input className="form-control" type="text" name="weight" defaultValue={weightStr}></input>
                </div>
            </div>
            <div className="form-group-row">
                <label className="control-label col-sm-3" htmlFor="choices">choices</label>
                <div className="col-sm-9">
                    <input className="form-control" type="text" name="choices" defaultValue={question.choices}></input>
                </div>
            </div>

        </form>;
    }
}