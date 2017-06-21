import gql from 'graphql-tag';
import mapFields from 'lib/graphql/mapFields';

const buildDefs = (params) => {
  const defs = Object.entries(params)
    .map(([key, type]) => (
      `$${key}: ${type}`
    ))
    .join(', ');

  if (defs.length) {
    return `, ${defs}`;
  }
  return '';
};

const buildArgs = (params) => {
  const args = Object.entries(params)
    .map(([key]) => (
      `${key}: $${key}`
    ))
    .join(', ');

  if (args.length) {
    return `, ${args}`;
  }
  return '';
};

const readQueryCreator = (pluralName, fields, { fragments, params } = {}) => (
  gql`query Read${pluralName}($limit: Int, $offset: Int${buildDefs(params)}) {
    read${pluralName}(limit: $limit, offset: $offset${buildArgs(params)}) {
      edges {
        node {
          ${mapFields(fields)}
        }
      }
      pageInfo {
        totalCount
      }
    }
  }
  ${fragments || ''}`
);

export default readQueryCreator;
