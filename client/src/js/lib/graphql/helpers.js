const pagination = {
  limit: 'Int',
  offset: 'Int',
};

const mapFields = (fields, paginated = false) => {
  const map = fields.map(field => (
    (Array.isArray(field))
      ? `{ ${mapFields(field, paginated)} }`
      : field
  )).join(' ');

  if (paginated) {
    return `edges { node { ${map} } } pageInfo { totalCount }`;
  }

  return map;
};

const buildDefs = (params, paginated = false) => (
  Object.entries((paginated) ? { ...params, ...pagination } : params)
    .map(([key, type]) => (
      `$${key}: ${type}`
    ))
    .join(', ')
);

const buildArgs = (params, paginated = false) => (
  Object.keys((paginated) ? { ...params, ...pagination } : params)
    .map((key) => (
      `${key}: $${key}`
    ))
    .join(', ')
);

export { mapFields, buildDefs, buildArgs };
