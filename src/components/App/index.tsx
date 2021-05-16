import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import React from 'react';
import PageListQuizzes from './../../pages/ListQuizzes';
import PageQuizz from './../../pages/Quizz';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <div className="container pt-3 pb-3">
        <h1>
          <img
            src="https://uploads-ssl.webflow.com/5fad10eff31430525bd54730/60119d46d6c43627046196b8_Tilda%20Logo%20(1).png"
            alt="Tilda"
            title="Tilda"
          /> Quizzes
        </h1>

        <Router>
          <div>
            <Switch>
              <Route exact path="/">
                <PageListQuizzes />
              </Route>
              <Route path="/quizz/:idQuiz" children={<PageQuizz />} />
              <Route path="*">
                <h1>Oops, 404 :(</h1>
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </>
  );
};

export default App;
