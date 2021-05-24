import React from 'react';
import AOS from 'aos';
import { createAppStore } from './store';
import { Provider } from 'react-redux';
import { Router } from './router';
import { createGlobalStyle } from 'styled-components';

import './App.css';
import 'aos/dist/aos.css';

AOS.init({ once: true });
const Store = createAppStore();

const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Viga', 'Kosugi', 'Noto Sans SC', 'Montserrat', sans-serif;
        font-size: 1rem;
    }
    body{
        background: #0a1420;
        color: #c6e8e7;
    }
`;

const App = () => {
    return (
        <Provider store={Store}>
            <Router />
            <GlobalStyle />
        </Provider>
    );
};

export { App };
