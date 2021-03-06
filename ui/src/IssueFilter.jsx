import React from 'react';
import URLSearchParams from '@ungap/url-search-params';
import { 
  ButtonToolbar, Button, Form, InputGroup,
  Row, Col,
} from 'react-bootstrap';
import { withNavigate, withLocation } from './RouterFunctions.jsx';

class IssueFilter extends React.Component {
  constructor({ location: { search } }) {
    super();
    const params = new URLSearchParams(search);
    this.state = {
      status: params.get('status') || '',
      effortMin: params.get('effortMin') || '',
      effortMax: params.get('effortMax') || '',
      changed: false,
    };
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeEffortMin = this.onChangeEffortMin.bind(this);
    this.onChangeEffortMax = this.onChangeEffortMax.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.showOriginalFilter = this.showOriginalFilter.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { location: { search: prevSearch } } = prevProps;
    const { location: { search } } = this.props;
    if (prevSearch !== search) {
      this.showOriginalFilter();
    }
  }

  onChangeStatus(e) {
    this.setState({ status: e.target.value, changed: true });
  }

  onChangeEffortMin(e) {
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/)) {
      this.setState({ effortMin: e.target.value, changed: true });
    }
  }

  onChangeEffortMax(e) {
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/)) {
      this.setState({ effortMax: e.target.value, changed: true });
    }
  }

  showOriginalFilter() {
    const { location: { search } } = this.props;
    const params = new URLSearchParams(search);
    this.setState({
      status: params.get('status') || '',
      effortMin: params.get('effortMin') || '',
      effortMax: params.get('effortMax') || '',
      changed: false,
    });
  }

  applyFilter() {
    const { status, effortMin, effortMax } = this.state;
    const { navigate } = this.props;
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    if (effortMin) params.set('effortMin', effortMin);
    if (effortMax) params.set('effortMax', effortMax);

    const search = params.toString() ? `?${params.toString()}` : '';
    navigate({ pathname: '/issues', search });
  }

  render() {
    const { status, changed } = this.state;
    const { effortMin, effortMax } = this.state;
    return (
      <Row>
        <Col xs={6} sm={4} md={3} lg={2}>
          <Form.Group>
            <Form.Label>Status:</Form.Label>
            <Form.Select
              value={status}
              onChange={this.onChangeStatus}
            >
              <option value="">(All)</option>
              <option value="New">New</option>
              <option value="Assigned">Assigned</option>
              <option value="Fixed">Fixed</option>
              <option value="Closed">Closed</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs={6} sm={4} md={3} lg={2}>
          <Form.Group>
            <Form.Label>Effort between:</Form.Label>
            <InputGroup>
              <Form.Control value={effortMin} onChange={this.onChangeEffortMin} />
              <InputGroup.Text>-</InputGroup.Text>
              <Form.Control value={effortMax} onChange={this.onChangeEffortMax} />
            </InputGroup>
          </Form.Group>
        </Col>
        <Col xs={6} sm={4} md={3} lg={2}>
          <Form.Group>
            <Form.Label>&nbsp;</Form.Label>
            <ButtonToolbar>
              <Button variant="primary" type="button" onClick={this.applyFilter}>
                Apply
              </Button>
              <Button
                type="button"
                onClick={this.showOriginalFilter}
                disabled={!changed}
              >
                Reset
              </Button>
            </ButtonToolbar>
          </Form.Group>
        </Col>
      </Row>
    );
  }
}

export default withLocation(withNavigate(IssueFilter));
