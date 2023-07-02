import React from 'react';
import { useLocation } from 'react-router-dom';

function NoMatch() {
  const location = useLocation();

  return (
    <>
      <h1>404</h1>
      <div>
        No location
        {' '}
        <code>{location.pathname}</code>
      </div>
    </>
  );
}

export default NoMatch;
