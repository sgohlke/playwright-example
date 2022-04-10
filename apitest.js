const fetch = require('cross-fetch');

fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => {
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    return res.json();
  })
  .then(todoItem => {
    console.log(todoItem);
  })
  .catch(err => {
    console.error(err);
  });