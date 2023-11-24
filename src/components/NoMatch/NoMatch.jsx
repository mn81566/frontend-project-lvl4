import React from 'react';
import { useLocation } from 'react-router-dom';

const NoMatch = () => {
  const location = useLocation();

  return (
    <>
      {/* <h1>404</h1>
      <div>
        No location
        {' '}
        <code>{location.pathname}</code>
      </div> */}
<div class="text-center"><img alt="Страница не найдена" class="img-fluid h-25" src="https://cdn2.hexlet.io/assets/error-pages/404-4b6ef16aba4c494d8101c104236304e640683fa9abdb3dd7a46cab7ad05d46e9.svg"><h1 class="h4 text-muted">Страница не найдена</h1><p class="text-muted">Но вы можете перейти <a href="/">на главную страницу</a></p></div>      
    </>
  );
};

export default NoMatch;
