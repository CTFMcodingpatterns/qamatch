import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Question } from '../services/questions/Question';
import { IQuestionRepos } from '../services/questions/IQuestionRepos';
import { PropTypes } from 'react';

interface DetailProps {
    routeProps: RouteComponentProps<{}>;
    repos: IQuestionRepos;
}

interface DetailState {
    loading: boolean,
    question: Question
}

export class QuestionDetail extends React.Component<DetailProps, DetailState> {
    constructor(props: DetailProps) {
        super(props);
        this.state = {
            loading: true,
            question: null
        };
    }

    public render() {
        let contents = this.state.loading
            ? this.renderLoading()
            : this.renderDetail(this.state.question);
        return <div>
            <h1>Question Detail</h1>
            {contents}
        </div>;
    }

    private renderLoading() {
        return <div>
            <p><em>Loading Question Detail ...</em></p>
            <p>route path: {this.props.routeProps.match.path}</p>
            <p>route params.id: {this.props.routeProps.match.params["id"]}</p>
        </div>;
    }

    private renderDetail(question: Question) {
        //TODO
        return <div>
            <div className="form-group-row">
                <input type="hidden" name="id" value={question.id} />
            </div>
            <div className="form-group-row">
                <label className=" control-label col-md-12" htmlFor="Title">Title</label>
                <div className="col-md-4">
                    <input className="form-control" type="text" name="title" defaultValue="question.title"></input>
                </div>
            </div>
        </div>;
    }
}