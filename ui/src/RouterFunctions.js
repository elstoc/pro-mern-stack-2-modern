import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

function withLocation(Component) {
  return props => <Component {...props} location={useLocation()} />;
}

function withNavigate(Component) {
  return props => <Component {...props} navigate={useNavigate()} />;
}

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

export { withLocation, withNavigate, withParams };
