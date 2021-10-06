const routes = (handler) => [
  {
    method: 'POST',
    path: '/compareFace',
    handler: handler.postNoteHandler,

  },
 
];

module.exports = routes;
