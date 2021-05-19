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
        <Router>
          <Switch>
            <Route exact path="/">
              <PageListQuizzes />
            </Route>
            <Route path="/quizz/:idQuiz" children={<PageQuizz />} />
            <Route path="*">
              <h1>Oops, 404 :(</h1>
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
};

export default App;
