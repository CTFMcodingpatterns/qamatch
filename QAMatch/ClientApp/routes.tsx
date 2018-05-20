import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Questions } from './components/Questions';

export const routes = (questionRepos) => <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={Counter} />
    <Route path='/fetchdata' component={ FetchData } />
    <Route path='/questions' render={(routeProps) =>
        <Questions routeProps={routeProps} repos={questionRepos} />} />
</Layout>;
