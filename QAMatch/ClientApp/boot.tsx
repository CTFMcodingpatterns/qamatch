import './css/site.css';
import 'bootstrap';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer as HotContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components/App';

let app = App; //check: required for hot-loader???

function renderApp() {
    const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;

    ReactDOM.render(
        <HotContainer>
            <BrowserRouter basename={baseUrl}>
                <App/>
            </BrowserRouter>
        </HotContainer>,
        document.getElementById('react-app')
    );
}

renderApp();

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept('./components/App', () => {
        app = require<typeof App>('./components/App');
        renderApp();
    });
}
