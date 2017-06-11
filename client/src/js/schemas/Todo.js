import PropTypes from 'prop-types';

const fields = [
  'ID',
  'IsDone',
  'Description',
  'Order',
];

const singularName = 'Todo';

const pluralName = 'Todos';

const propTypes = {
  ID: PropTypes.string, // php's graphql defines an ID as string
  IsDone: PropTypes.bool,
  Description: PropTypes.string,
};

const defaultProps = {
  IsDone: false,
  Decription: 'New todo',
};

export { fields, singularName, pluralName, propTypes, defaultProps };
