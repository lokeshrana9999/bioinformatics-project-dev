import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import resources from './locales';

const NavLinkWithI18n = translate('sequence')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/sequence" className="nav-link" activeClassName="active">
    {t('sequence:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [<Route exact path="/sequence" component={loadable(() => import('./containers/Sequence').then(c => c.default))} />],
  navItem: [
    <MenuItem key="/sequence">
      <NavLinkWithI18n />
    </MenuItem>
  ],
  localization: [{ ns: 'sequence', resources }]
});
