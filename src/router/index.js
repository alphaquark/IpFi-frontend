import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ProtocolScreen } from '../screen';
import { Header } from '../containers';
import { IntlProvider } from 'react-intl';
import { languageMap } from '../translations';
import { useSelector } from 'react-redux';

export const Router = (props) => {
    const lang = useSelector((state) => state.lang.currentLang);
    const langStorage = localStorage.getItem('aqtDeFiLang');
    return (
        <IntlProvider
            locale={langStorage ? langStorage : lang}
            messages={languageMap[langStorage ? langStorage : lang]}>
            <BrowserRouter>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>AQT</title>
                </Helmet>
                <Header />
                <Switch>
                    <Route exact path="/" component={ProtocolScreen} />
                    <Route path="**">
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </BrowserRouter>
        </IntlProvider>
    );
};
