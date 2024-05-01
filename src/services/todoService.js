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

function update(updatedObject, id) {
  fetch(`${endpoint}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedObject),
  });
}

function deleteTodo(id) {
  return fetch(`${endpoint}/${id}`, {
    method: 'DELETE',
  });
}

export default {
  getAll: getAll,
  create: create,
  update: update,
  deleteTodo: deleteTodo,
};
