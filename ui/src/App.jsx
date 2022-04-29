import "core-js/stable";
import "regenerator-runtime/runtime";
import 'whatwg-fetch';
import React from 'react';
import { createRoot } from 'react-dom/client';

import IssueList from './IssueList.jsx';

const element = <IssueList />;
const root = createRoot(document.getElementById('contents'));

root.render(element);

if (module.hot) {
  module.hot.accept();
}
