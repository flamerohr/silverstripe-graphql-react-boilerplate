const mapFields = fields => (
  fields.map(field => (
    (Array.isArray(field))
      ? `{ ${mapFields(field)} }`
      : field
  )).join(' ')
);

const buildDefs = params => (
  Object.entries(params)
    .reduce((prev, [key, type]) => (
      `${prev}, $${key}: ${type}`
    ), '')
);

const buildArgs = params => (
  Object.keys(params)
    .reduce((prev, key) => (
      `${prev}, ${key}: $${key}`
    ), '')
);

export { mapFields, buildDefs, buildArgs };
