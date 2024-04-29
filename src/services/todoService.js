const endpoint = 'http://localhost:3000/todos';

const getAll = () => {
  return fetch(endpoint).then((value) => value);
};

export default {
  getAll: getAll,
};
