export const parseQueryParams = (params = {}) => {
  let result = '';

  Object.keys(params).forEach((key, i, arr) => {
    const isLast = i === arr.length - 1;

    if (params[key as keyof object]) {
      result += `${key}=${params[key as keyof object]}${isLast ? '' : '&'}`;
    }
  });

  return result;
};
