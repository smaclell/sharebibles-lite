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

export function filterResources(resources, selected, status) {
  return filter(resources, selected, status);
}

export function filterTags(tags, selected, status) {
  return filter(tags, selected, status);
}
