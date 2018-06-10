import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './Layout';
import { Home } from './Home';
//for surveys:
import { Surveys } from './surveys/Surveys';
import { ISurveyRepos } from '../services/surveys/ISurveyRepos';
import { SurveysInMemory } from '../services/surveys/SurveysInMemory';
//for questions:
import { Questions } from './questions/Questions';
import { QuestionForm } from './questions/QuestionForm';
import { QuestionDetail } from './questions/QuestionDetail';
import { IQuestionRepos } from '../services/questions/IQuestionRepos';
import { QuestionsInMemory } from '../services/questions/QuestionsInMemory';
import { Question } from '../services/questions/Question';
//for answers:
import { Answers } from './answers/Answers';
import { IAnswerRepos } from 'ClientApp/services/answers/IAnswerRepos';

interface AppProps {
}

interface AppState {
    surveysRepos: ISurveyRepos;
    questionsRepos: IQuestionRepos;
    answersRepos: IAnswerRepos;
    //currentQuestions: Question[]; //check: cache of repos
}

export class App extends React.Component<AppProps, AppState>  {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            surveysRepos: new SurveysInMemory(),
            questionsRepos: new QuestionsInMemory(),
            answersRepos: null //todo
        };
        //TODO
    }

    public render() {
        const surveyRepos = this.state.surveysRepos;
        const questionRepos = this.state.questionsRepos;
        const answerRepos = this.state.answersRepos;

        return <Layout>
            <Route exact path='/' component={Home} />

            <Route exact path='/surveys' render={(routeProps) => <Surveys routeProps={routeProps} repos={surveyRepos} />} />

            <Route exact path='/surveys/:sid/questions' render={(routeProps) => <Questions routeProps={routeProps} repos={questionRepos} />} />
            <Route exact path='/surveys/:sid/questions/create' render={(routeProps) => <QuestionForm routeProps={routeProps} repos={questionRepos} />} />
            <Route exact path='/surveys/:sid/questions/:qid/detail' render={(routeProps) => <QuestionDetail routeProps={routeProps} repos={questionRepos} />} />
            <Route path='/surveys/:sid/questions/:qid/edit' render={(routeProps) => <QuestionForm routeProps={routeProps} repos={questionRepos} />} />

            <Route exact path='/surveys/:sid/answers' render={(routeProps) => <Answers routeProps={routeProps} repos={answerRepos} />} />
        </Layout>;
    }
}