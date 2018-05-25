// For now the structure of these items is roughly the same
// If that changes break these methods up
function filter(thing, selected, status) {
  const result = {};

  thing.forEach((resource) => {
    const { key, statuses } = resource;
    if (statuses.includes(status) && selected[key]) {
      result[key] = selected[key];
    }
  });

  return result;
}

// eslint-disable-next-line import/prefer-default-export
export function filterResources(resources, selected, status) {
  return filter(resources, selected, status);
}
