import * as React from 'react';
import { Route } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { Layout } from './Layout';
import { Home } from './Home';
import { FetchData } from './FetchData';
import { Counter } from './Counter';
import { Questions } from './Questions';
import { QuestionForm } from './QuestionForm';
import { QuestionDetail } from './QuestionDetail';
import { IQuestionRepos } from '../services/questions/IQuestionRepos';
import { QuestionsInMemory } from '../services/questions/QuestionsInMemory';

interface AppProps {
    //routeProps: RouteComponentProps<{}>;
    //questionRepos: IQuestionRepos;
}

interface AppState {
    questionsRepos: IQuestionRepos;
}

export class App extends React.Component<AppProps, AppState>  {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            questionsRepos: new QuestionsInMemory()
        };
        //TODO
    }

    public render() {
        const questionRepos = this.state.questionsRepos;

        return <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetchdata' component={FetchData} />
            <Route exact path='/questions' render={(routeProps) => <Questions routeProps={routeProps} repos={questionRepos} />} />
            <Route exact path='/questions/detail/:id' render={(routeProps) => <QuestionDetail routeProps={routeProps} repos={questionRepos} />} />
            <Route exact path='/questions/create' render={(routeProps) => <QuestionForm routeProps={routeProps} repos={questionRepos} />} />
            <Route path='/questions/edit/:id' render={(routeProps) => <QuestionForm routeProps={routeProps} repos={questionRepos} />} />
        </Layout>;
    }
}