const mapFields = fields => (
  fields.map(field => (
    (Array.isArray(field))
      ? `{ ${mapFields(field)} }`
      : field
  )).join(' ')
);

export default mapFields;
