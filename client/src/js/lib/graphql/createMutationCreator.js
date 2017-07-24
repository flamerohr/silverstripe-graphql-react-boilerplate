import gql from 'graphql-tag';
import { mapFields, buildDefs, buildArgs } from 'lib/graphql/helpers';

/**
 * Creates the mutation graphql tag for the apollo-client to use.
 *
 * @param {string} singularName
 * @param {string[]} fields
 * @param {string} fragments
 * @param {object} params - format: { field: InputType }
 */
const createMutationCreator = (
  singularName,
  fields = [],
  { fragments = '', params = {} } = {},
) => (
  gql`mutation Create${singularName}(
    $Input:${singularName}CreateInputType!
    ${buildDefs(params)}
  ) {
    create${singularName}(
      Input: $Input
      ${buildArgs(params)}
    ) {
      ${mapFields(fields) || 'ID'}
    }
  }
  ${fragments}`
);

// this is the "standard way" to update the apollo store...
const update = ({ singularName, pluralName, query, params }) => (client, { data: results }) => {
  if (!singularName || !query) {
    return;
  }

  const created = results[`create${singularName}`];
  const variables = Object.keys(params).reduce((prev, key) => ({
    ...prev,
    [key]: null,
  }), { limit: null, offset: null });

  try {
    const data = client.readQuery({ query, variables });
    const queryName = `read${pluralName}`;

    // add the new node in
    data[queryName].edges = [
      ...data[queryName].edges,
      {
        node: {
          ...created,
          __typename: singularName,
        },
        __typename: `${queryName}Edge`,
      }
    ];
    client.writeQuery({ query, variables, data });
  } catch (e) {
    console.error(e);
    // unable to read or write query, so leave it
  }
};

/**
 * Provides an action that could be called by providing the input data, so the component
 * is agnostic to the structure of graphql.
 *
 * @param {string[]} allowedFields
 * @param {string} singularName
 * @param {string} pluralName
 * @param {object} query
 * @param {object} params
 * @param {function} afterMutation - callback for after a mutation is made, receives the following params:
 *      * {object} data - data that was saved and received from the mutation
 *      * {object} ownProps - the props of the components which called the mutation was wrapped
 *      * {ApolloClient} client - the apollo client instance used for the mutation
 */
const createMutateHandler = ({
  allowedFields,
  singularName,
  pluralName,
  queryToUpdate: query,
  params,
  afterMutation,
}) => (
  ({ mutate, ownProps }) => ({
    mutate: submitData => (
      mutate({
        variables: {
          Input: (allowedFields)
            ? allowedFields.reduce((prev, field) => ({
              ...prev,
              [field]: submitData[field],
            }), {})
            : submitData,
        },
        update: update({ singularName, pluralName, query, params }),
      }).then((data) => {
        if (typeof afterMutation === 'function') {
          afterMutation(data, ownProps);
        }
        return data;
      })
    ),
  })
);

export { createMutateHandler };

export default createMutationCreator;
