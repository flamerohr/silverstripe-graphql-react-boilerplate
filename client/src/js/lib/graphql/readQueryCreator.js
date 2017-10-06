import gql from 'graphql-tag';
import { mapFields, buildDefs, buildArgs } from 'lib/graphql/helpers';

/**
 * Create the query graphql tag for the apollo-client to use.
 *
 * @param {string} pluralName
 * @param {string[]} fields
 * @param {string} fragments
 * @param {object} params - format: { field: InputType }
 * @param {boolean} paginate
 */
const readQueryCreator = (
  pluralName,
  fields = [],
  { fragments = '', params = {}, paginate = false } = {},
) => (
  gql`query Read${pluralName}(
    ${buildDefs(params, paginate)}
  ) {
    read${pluralName}(
      ${buildArgs(params, paginate)}
    ) {
      ${mapFields(fields, paginate)}
    }
  }
  ${fragments}`
);

/**
 * Juggle the graphql data obtained to a more meaningful structure, similar to mapStateToProps
 *
 * @param {string} name
 * @param {boolean} paginate
 */
const readQueryHandler = (name, { paginate = false } = {}) => ({ data }) => {
  const results = data[`read${name}`];
  const list = (paginate)
    ? results && results.edges.map(edge => edge.node)
    : results;
  const totalCount = (paginate)
    ? results && results.pageInfo.totalCount
    : list && list.length;
  const { refetch: reload, error, loading } = data;

  return {
    reload,
    [name]: list,
    totalCount,
    loading,
    error,
  };
};

export { readQueryHandler };

export default readQueryCreator;
