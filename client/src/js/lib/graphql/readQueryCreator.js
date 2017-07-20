import gql from 'graphql-tag';
import { mapFields, buildDefs, buildArgs } from 'lib/graphql/helpers';

/**
 * Create the query graphql tag for the apollo-client to use.
 *
 * @param {string} pluralName
 * @param {string[]} fields
 * @param {string} fragments
 * @param {object} params - format: { field: InputType }
 */
const readQueryCreator = (
  pluralName,
  fields = [],
  { fragments = '', params = {} } = {},
) => (
  gql`query Read${pluralName}(
    $limit: Int,
    $offset: Int
    ${buildDefs(params)}
  ) {
    read${pluralName}(
      limit: $limit,
      offset: $offset
      ${buildArgs(params)}
    ) {
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
  ${fragments}`
);

/**
 * Juggle the graphql data obtained to a more meaningful structure, similar to mapStateToProps
 *
 * @param {string} name
 */
const readQueryHandler = name => ({ data }) => {
  const list = data[`read${name}`];
  const { refetch: reload, error, loading } = data;

  return {
    reload,
    [name]: list && list.edges.map(edge => edge.node),
    totalCount: list && list.pageInfo.totalCount,
    loading,
    error,
  };
};

export { readQueryHandler };

export default readQueryCreator;
