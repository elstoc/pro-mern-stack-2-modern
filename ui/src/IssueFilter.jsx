import React from 'react';
import URLSearchParams from '@ungap/url-search-params';
import { withNavigate, withLocation } from './RouterFunctions.js';

class IssueFilter extends React.Component {
  constructor() {
    super();
    this.onChangeStatus = this.onChangeStatus.bind(this);
  }

  onChangeStatus(e) {
    const status = e.target.value;
    const { navigate } = this.props;
    navigate({
      pathname: '/issues',
      search: status ? `?status=${status}` : '',
    });
  }

  render() {
    const { location: { search } } = this.props;
    const params = new URLSearchParams(search);
    return (
      <div>
        Status:
        {' '}
        <select value={params.get('status') || '' } onChange={this.onChangeStatus}>
          <option value="">(All)</option>
          <option value="New">New</option>
          <option value="Assigned">Assigned</option>
          <option value="Fixed">Fixed</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
    );
  }
}

export default withLocation(withNavigate(IssueFilter));
