import React from 'react';
import DocumentTitle from 'react-document-title';

const title = docTitle => (
  Section => (
    props => (
      <DocumentTitle title={docTitle}>
        <Section {...props} />
      </DocumentTitle>
    )
  )
);

export default title;
