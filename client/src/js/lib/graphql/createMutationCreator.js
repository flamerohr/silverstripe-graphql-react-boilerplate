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

/**
 * Provides an action that could be called by providing the input data, so the component
 * is agnostic to the structure of graphql.
 *
 * @param {function} afterMutation
 * @param {string[]} allowedFields
 */
const createMutateHandler = (afterMutation, allowedFields) => ({ mutate, ownProps }) => ({
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
    }).then((data) => {
      if (typeof afterMutation === 'function') {
        afterMutation(data, ownProps);
      }
      return data;
    })
  ),
});

export { createMutateHandler };

export default createMutationCreator;
