import gql from 'graphql-tag';

const readQueryCreator = (pluralName, fields, fragments) => (
  gql`query Read${pluralName}($limit:Int, $offset:Int) {
    read${pluralName}(limit: $limit, offset: $offset) {
      edges {
        node {
          ${fields.join('\n')}
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
