import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function withLocation(Component) {
  return props => <Component {...props} location={useLocation()} />;
}

function withNavigate(Component) {
  return props => <Component {...props} navigate={useNavigate()} />;
}

export { withLocation, withNavigate };
