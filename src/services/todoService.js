const endpoint = 'http://localhost:3000/todos';

const getAll = () => {
  return fetch(endpoint).then((value) => value);
};

function create(newObject) {
  fetch(
    endpoint,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newObject),
    },

    console.log('created:', newObject)
  );
}

export default {
  getAll: getAll,
  create: create,
};
