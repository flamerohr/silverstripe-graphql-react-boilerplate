import { graphql } from 'react-apollo';
import readQueryCreator, { readQueryHandler } from 'lib/graphql/readQueryCreator';
import { fields, pluralName as name } from 'schemas/Todo';

const params = {
  ID: 'ID',
  Description: 'String',
  IsDone: 'Boolean',
};

const query = readQueryCreator(name, fields, { paginate: true });

const config = {
  props: readQueryHandler(name, { paginate: true }),
};

export { query, params };

export default graphql(query, config);
