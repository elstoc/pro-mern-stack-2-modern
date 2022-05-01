import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import IssueList from './IssueList.jsx';
import IssueReport from './IssueReport.jsx';
import IssueEdit from './IssueEdit.jsx';

const NotFound = () => <h1>Page Not Found</h1>;

export default function Contents() {
  return (
    <Container>
      <Routes>
        <Route path="/issues/*" element={<IssueList />} />
        <Route path="/report" element={<IssueReport />} />
        <Route path="/edit/:id" element={<IssueEdit />} />
        <Route path="/" element={<Navigate to="/issues" />} />
        <Route element={<NotFound />} />
      </Routes>
    </Container>
  );
}
