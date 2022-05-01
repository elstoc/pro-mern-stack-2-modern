import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

function withLocation(Component) {
  return function (props) {
    return <Component {...props} location={useLocation()} />;
  };
}

function withNavigate(Component) {
  return function (props) {
    return <Component {...props} navigate={useNavigate()} />;
  };
}

function withParams(Component) {
  return function (props) {
    return <Component {...props} params={useParams()} />;
  };
}

export { withLocation, withNavigate, withParams };
