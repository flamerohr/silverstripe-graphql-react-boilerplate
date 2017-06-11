import gql from 'graphql-tag';

// for more information on fields and types, http://graphql.org/learn/schema/#scalar-types
const createMutationCreator = (singularName, fields, fragments) => (
  gql`mutation Create${singularName}($Input: ${singularName}CreateInputType!) {
    create${singularName}(Input: $Input) {
      ${fields.join('\n')}
    }
  }
  ${fragments || ''}`
);

export default createMutationCreator;
