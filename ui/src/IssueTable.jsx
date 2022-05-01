import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import { Button, Tooltip, OverlayTrigger, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaRegTrashAlt, FaRegWindowClose, FaEdit } from 'react-icons/fa';

function IssueRow({ issue, 
  closeIssue, 
  deleteIssue,
  index, 
}) {
  const { search } = useLocation();
  const selectLocation = { pathname: `/issues/${issue.id}`, search };
  const editTooltip = (
    <Tooltip id="close-tooltip" placement="top">Edit Issue</Tooltip>
  );
  const closeTooltip = (
    <Tooltip id="close-tooltip" placement="top">Close Issue</Tooltip>
  );
  const deleteTooltip = (
    <Tooltip id="delete-tooltip" placement="top">Delete Issue</Tooltip>
  );

  function onClose(e) {
    e.preventDefault();
    closeIssue(index);
  }

  function onDelete(e) {
    e.preventDefault();
    deleteIssue(index);
  }

  const tableRow = (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.status}</td>
      <td>{issue.owner}</td>
      <td>{issue.created.toDateString()}</td>
      <td>{issue.effort}</td>
      <td>{issue.due ? issue.due.toDateString() : ''}</td>
      <td>{issue.title}</td>
      <td>
        <LinkContainer to={`/edit/${issue.id}`}>
          <span>
            <OverlayTrigger delayShow={1000} overlay={editTooltip}>
              <Button size="sm">
                <FaEdit size="1.2em" />
              </Button>
            </OverlayTrigger>
          </span>
        </LinkContainer>
        {' '}
        <OverlayTrigger delayShow={1000} overlay={closeTooltip}>
          <Button size="sm" onClick={onClose}>
            <FaRegWindowClose size="1.2em" />
          </Button>
        </OverlayTrigger>
        {' '}
        <OverlayTrigger delayShow={1000} overlay={deleteTooltip}>
          <Button size="sm" onClick={onDelete}>
            <FaRegTrashAlt size="1.2em" />
          </Button>
        </OverlayTrigger>
      </td>
    </tr>
  );
  
  return (
    <LinkContainer to={selectLocation}>
      {tableRow}
    </LinkContainer>
  );
}

export default function IssueTable({ issues, closeIssue, deleteIssue }) {
  const issueRows = issues.map((issue, index) => (
    <IssueRow 
      key={issue.id} 
      issue={issue} 
      closeIssue={closeIssue}
      deleteIssue={deleteIssue}
      index={index}
    />
  ));

  return (
    <Table bordered size="sm" hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
          <th>Effort</th>
          <th>Due Date</th>
          <th>Title</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {issueRows}
      </tbody>
    </Table>
  );
}
