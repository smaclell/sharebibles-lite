export default function comparison(a, b) {
  if (a.name === b.name) {
    return 0;
  }

  return a.name > b.name ? 1 : -1;
}
