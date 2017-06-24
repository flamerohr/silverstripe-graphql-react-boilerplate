import { graphql } from 'react-apollo';
import readQueryCreator from 'lib/graphql/readQueryCreator';
import readResultsHandler from 'lib/graphql/readResultsHandler';
import { fields, pluralName as name } from 'schemas/Todo';

const params = {
  ID: 'ID',
  Description: 'String',
  IsDone: 'Boolean',
};
const config = {
  props: readResultsHandler(name),
};

const query = readQueryCreator(name, fields, { params });

export default graphql(query, config);
