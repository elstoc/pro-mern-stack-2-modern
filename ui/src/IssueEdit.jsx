import React from 'react';
import { Link } from 'react-router-dom';
import { withParams } from './RouterFunctions.jsx';
import {
  Row, Col, Card, Form, ButtonToolbar, Button,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import graphQLFetch from './graphQLFetch.js';
import NumInput from './NumInput.jsx';
import DateInput from './DateInput.jsx';
import TextInput from './TextInput.jsx';

class IssueEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      issue: {},
      invalidFields: {},
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { params: { id: prevId } } = prevProps;
    const { params: { id } } = this.props;
    if (id !== prevId) {
      this.loadData();
    }
  }

  onValidityChange(event, valid) {
    const { name } = event.target;
    this.setState((prevState) => {
      const invalidFields = { ...prevState.invalidFields, [name]: !valid };
      if (valid) delete invalidFields[name];
      return { invalidFields };
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { issue } = this.state;
    const query = `mutation issueUpdate(
      $id: Int!
      $changes: IssueUpdateInputs!
    ) {
      issueUpdate(
        id: $id
        changes: $changes
      ) {
        id title status owner
        effort created due description
      }
    }`;

    const { id, created, ...changes } = issue;
    const data = await graphQLFetch(query, { changes, id });
    if (data) {
      this.setState({ issue: data.issueUpdate });
      alert('Updated issue successfully'); // eslint-disable-line no-alert
    }
  }

  onChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    const value = naturalValue === undefined ? textValue : naturalValue;
    this.setState((prevState) => ({
      issue: { ...prevState.issue, [name]: value },
    }));
  }

  async loadData() {
    const query = `query issue($id: Int!) {
      issue(id: $id) {
        id title status owner
        effort created due description
      }
    }`;

    const { params: { id } } = this.props;
    const data = await graphQLFetch(query, { id: parseInt(id) });
    this.setState({ issue: data ? data.issue : {}, invalidFields: {} });
  }

  render() {
    const { issue: { id } } = this.state;
    const { params: { id: propsId } } = this.props;
    if (id == null) {
      if (propsId != null) {
        return <h3>{`Issue with ID ${propsId} not found.`}</h3>;
      }
      return null;
    }

    const { invalidFields } = this.state;
    let validationMessage;
    if (Object.keys(invalidFields).length !== 0) {
      validationMessage = (
        <div className="error">
          Please correct invalid fields before submitting.
        </div>
      );
    }

    const { issue: { title, status } } = this.state;
    const { issue: { owner, effort, description } } = this.state;
    const { issue: { created, due } } = this.state;

    return (
      <Card>
        <Card.Header>
          <Card.Title>{`Editing issue: ${id}`}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={this.handleSubmit} className='edit-form'>
            <Form.Group as={Row}>
              <Col as={Form.Label} sm={3}>Created</Col>
              <Col sm={9}>
                <Form.Control as={TextInput} value={created.toDateString()} readOnly />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col as={Form.Label} sm={3}>Status</Col>
              <Col sm={9}>
                <Form.Control
                  as={Form.Select}
                  name="status"
                  value={status}
                  onChange={this.onChange}
                >
                  <option value="New">New</option>
                  <option value="Assigned">Assigned</option>
                  <option value="Fixed">Fixed</option>
                  <option value="Closed">Closed</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col as={Form.Label} sm={3}>Owner</Col>
              <Col sm={9}>
                <Form.Control
                  as={TextInput}
                  name="owner"
                  value={owner}
                  onChange={this.onChange}
                  key={id}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col as={Form.Label} sm={3}>Effort</Col>
              <Col sm={9}>
                <Form.Control
                  as={NumInput}
                  name="effort"
                  value={effort}
                  onChange={this.onChange}
                  key={id}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col as={Form.Label} sm={3}>Due</Col>
              <Col sm={9}>
                <Form.Control
                  as={DateInput}
                  onValidityChange={this.onValidityChange}
                  name="due"
                  value={due}
                  onChange={this.onChange}
                  isInvalid={invalidFields.due}
                  key={id}
                />
                <Form.Control.Feedback />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col as={Form.Label} sm={3}>Title</Col>
              <Col sm={9}>
                <Form.Control
                  as={TextInput}
                  size={50}
                  name="title"
                  value={title}
                  onChange={this.onChange}
                  key={id}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col as={Form.Label} sm={3}>Description</Col>
              <Col sm={9}>
                <Form.Control
                  as={TextInput}
                  tag="textarea"
                  rows={4}
                  cols={50}
                  name="description"
                  value={description}
                  onChange={this.onChange}
                  key={id}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col sm={{span: 3, offset: 3}}>
                <ButtonToolbar>
                  <Button variant="primary" type="submit">Submit</Button>
                  <LinkContainer to="/issues">
                    <Button variant="link">Back</Button>
                  </LinkContainer>
                </ButtonToolbar>
              </Col>
            </Form.Group>
          </Form>
          {validationMessage}
        </Card.Body>
        <Card.Footer>
          <Link to={`/edit/${id - 1}`}>Prev</Link>
          {' | '}
          <Link to={`/edit/${id + 1}`}>Next</Link>
        </Card.Footer>
      </Card>
    );
  }
}

export default withParams(IssueEdit);
