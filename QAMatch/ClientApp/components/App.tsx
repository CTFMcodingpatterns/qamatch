import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './Layout';
import { Home } from './Home';

import { Questions } from './questions/Questions';
import { QuestionForm } from './questions/QuestionForm';
import { QuestionDetail } from './questions/QuestionDetail';
import { IQuestionRepos } from '../services/questions/IQuestionRepos';
import { QuestionsInMemory } from '../services/questions/QuestionsInMemory';
import { Question } from 'ClientApp/services/questions/Question';

import { Surveys } from './surveys/Surveys';

interface AppProps {
}

interface AppState {
    questionsRepos: IQuestionRepos;
    currentQuestions: Question[]; //check: cache of repos
}

export class App extends React.Component<AppProps, AppState>  {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            questionsRepos: new QuestionsInMemory(),
            currentQuestions: []
        };
        //TODO
    }

    public render() {
        const questionRepos = this.state.questionsRepos;

        return <Layout>
            <Route exact path='/' component={Home} />

            <Route exact path='/questions' render={(routeProps) => <Questions routeProps={routeProps} repos={questionRepos} />} />
            <Route exact path='/questions/detail/:id' render={(routeProps) => <QuestionDetail routeProps={routeProps} repos={questionRepos} />} />
            <Route exact path='/questions/create' render={(routeProps) => <QuestionForm routeProps={routeProps} repos={questionRepos} />} />
            <Route path='/questions/edit/:id' render={(routeProps) => <QuestionForm routeProps={routeProps} repos={questionRepos} />} />

            <Route path='/surveys' render={(routeProps) => <Surveys routeProps={routeProps} /> }/>
        </Layout>;
    }
}