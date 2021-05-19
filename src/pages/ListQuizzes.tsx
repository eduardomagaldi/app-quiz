

import React from 'react';
import Header from '../components/Header';
import ListQuizzes from '../components/ListQuizzes';

const PageListQuizzes: React.FC = () => {
  return (
    <>
      <div className="row">
        <Header />

        <ListQuizzes />
      </div>
    </>
  );
};

export default PageListQuizzes;
