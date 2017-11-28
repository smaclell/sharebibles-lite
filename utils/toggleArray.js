export default function toggleArray(key, array) {
  return array.includes(key) ?
    array.filter(x => x !== key) :
    array.concat(key);
}
