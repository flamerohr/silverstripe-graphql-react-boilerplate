import gql from 'graphql-tag';
import mapFields from 'lib/graphql/mapFields';

// for more information on fields and types, http://graphql.org/learn/schema/#scalar-types
const createMutationCreator = (singularName, fields, fragments) => (
  gql`mutation Create${singularName}($Input:${singularName}CreateInputType!) {
    create${singularName}(Input: $Input) {
      ${mapFields(fields)}
    }
  }
  ${fragments || ''}`
);

export default createMutationCreator;
