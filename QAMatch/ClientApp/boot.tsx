import './css/site.css';
import 'bootstrap';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import * as RoutesModule from './routes';
import { IQuestionRepos } from './services/questions/IQuestionRepos';
import { QuestionsInMemory} from './services/questions/QuestionsInMemory';
let routes = RoutesModule.routes;

function renderApp() {
    const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;
    const questionsRepos: IQuestionRepos = new QuestionsInMemory();

    ReactDOM.render(
        <AppContainer>
            <BrowserRouter children={ routes(questionsRepos) } basename={ baseUrl } />
        </AppContainer>,
        document.getElementById('react-app')
    );
}

renderApp();

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept('./routes', () => {
        routes = require<typeof RoutesModule>('./routes').routes;
        renderApp();
    });
}
