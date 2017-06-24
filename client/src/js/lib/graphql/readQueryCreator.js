import gql from 'graphql-tag';
import mapFields from 'lib/graphql/mapFields';

const buildDefs = params => (
  Object.entries(params)
    .reduce((prev, [key, type]) => (
      `${prev}, $${key}: ${type}`
    ), '')
);

const buildArgs = params => (
  Object.keys(params)
    .reduce((prev, key) => (
      `${prev}, ${key}: $${key}`
    ), '')
);

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
