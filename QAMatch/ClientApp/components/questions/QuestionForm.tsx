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
        this.handleSave = this.handleSave.bind(this);
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
        return <form onSubmit={this.handleSave}>
            <div className="form-group-row">
                <input type="hidden" name="id" value={question.id} />
            </div>
            <div className="form-group-row">
                <label className=" control-label col-md-12" htmlFor="Title">Title</label>
                <div className="col-md-4">
                    <input className="form-control" type="text" name="title" defaultValue="question.title"></input>
                </div>
            </div>
        </form>;
    }
}