import React from 'react';
import { t } from 'i18next';
import ROUTES from '../../routes.js';

const NoMatch = () => (
  <div className="text-center">
    <h1 className="h4 text-muted">{t('noMatch.pageNotFound')}</h1>
    <p className="text-muted">
      {t('noMatch.routing.canGo')}
      <a href={ROUTES.root}>
        {t('noMatch.routing.toPage')}
      </a>
    </p>
  </div>
);

export default NoMatch;
