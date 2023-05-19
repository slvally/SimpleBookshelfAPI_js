const {addBooksHandler, getAllBooksHandler, getDetailBooksHandler, editBooksByIdHandler, deleteBookByIdHandler,} = require('./handler');
  
const routes = [
    {
        method: '*',
        path: '/{any*}',
        handler: () => 'Pages not found',
    },
    {
      method: 'POST',
      path: '/books',
      handler: addBooksHandler,
    },
    {
      method: 'GET',
      path: '/books',
      handler: getAllBooksHandler,
    },
    {
      method: 'GET',
      path: '/books/{bookId}',
      handler: getDetailBooksHandler,
    },
    {
      method: 'PUT',
      path: '/books/{bookId}',
      handler: editBooksByIdHandler,
    },
    {
      method: 'DELETE',
      path: '/books/{bookId}',
      handler: deleteBookByIdHandler,
    },
];

module.exports = routes;