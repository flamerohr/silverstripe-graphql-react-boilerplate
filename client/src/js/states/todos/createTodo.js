import { graphql } from 'react-apollo';
import createMutationCreator, { createMutateHandler } from 'lib/graphql/createMutationCreator';
import { query, params } from 'states/todos/readTodos';
import { singularName, pluralName, fields } from 'schemas/Todo';

const mutation = createMutationCreator(singularName, fields);

const allowedFields = [
  'Description',
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
    props: createMutateHandler({
      // primary argument, still optional
      allowedFields,

      // arguments needed for manually updating the list without a refresh call
      singularName,
      pluralName,
      queryToUpdate: query,
      getParams: (props) => (
        Object.keys(params)
          .reduce((prev, key) => ({ ...prev, [key]: null }))
      ),

      // what to do after everything is done
      afterMutation
    }),
  };

  return graphql(mutation, config);
};

export default createWrapper;
