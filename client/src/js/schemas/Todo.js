import PropTypes from 'prop-types';

const fields = [
  'ID',
  'IsDone',
  'Description',
  'Order',
  'Created',
  'LastEdited',
];

const singularName = 'Todo';

const pluralName = 'Todos';

const propTypes = {
  ID: PropTypes.string, // php's graphql defines an ID as string
  IsDone: PropTypes.bool,
  Description: PropTypes.string,
  Order: PropTypes.number,
};

const defaultProps = {
  IsDone: false,
  Description: '',
};

export { fields, singularName, pluralName, propTypes, defaultProps };
