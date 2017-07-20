import { graphql } from 'react-apollo';
import createMutationCreator, { createMutateHandler } from 'lib/graphql/createMutationCreator';
import { singularName as name } from 'schemas/Todo';

const mutation = createMutationCreator(name);

const allowedFields = [
  'Description',
  'IsDone',
];

/**
 * Wraps a component with graphql data fetching, juggles the data to a more meaningful
 * structure that is to be expected in the DataObjectScaffolding.
 *
 * @param {function} afterMutation
 * @return {WrapWithApollo}
 */
const createWrapper = (afterMutation) => {
  const config = {
    props: createMutateHandler(allowedFields, afterMutation),
  };

  return graphql(mutation, config);
};

export default createWrapper;
