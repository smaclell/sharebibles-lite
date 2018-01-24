function createWrapper(boundary) {
  const offset = 2 * boundary;
  const wrapper = (number) => {
    if (number > boundary) {
      return wrapper(number - offset);
    }

    if (number < -boundary) {
      return wrapper(number + offset);
    }

    return number;
  };

  return wrapper;
}

export const wrapLatitude = createWrapper(90);
export const wrapLongitude = createWrapper(180);
