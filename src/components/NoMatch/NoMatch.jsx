import React from 'react';
import ROUTES from '../../routes.js';

const NoMatch = () => (
  <div className="text-center">
    <h1 className="h4 text-muted">404 Страница не найдена</h1>
    <p className="text-muted">
      Но вы можете перейти
      <a href={ROUTES.root}> на главную страницу</a>
    </p>
  </div>
);

export default NoMatch;
