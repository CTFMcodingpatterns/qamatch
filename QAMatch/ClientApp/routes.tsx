import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Questions } from './components/Questions';
import { QuestionForm } from './components/QuestionForm';
import { QuestionDetail} from './components/QuestionDetail';

export const routes = (questionRepos) => <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={Counter} />
    <Route path='/fetchdata' component={ FetchData } />
    <Route exact path='/questions' render={(routeProps) => <Questions routeProps={routeProps} repos={questionRepos} />} />
    <Route exact path='/questions/detail/:id' render={(routeProps) => <QuestionDetail routeProps={routeProps} repos={questionRepos} />} />
    <Route exact path='/questions/create' render={(routeProps) => <QuestionForm routeProps={routeProps} repos={questionRepos} />} />
    <Route path='/questions/edit/:id' render={(routeProps) => <QuestionForm routeProps={routeProps} repos={questionRepos} />} />
</Layout>;
