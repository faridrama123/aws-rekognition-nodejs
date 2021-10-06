
class NotesHandler {
  constructor(service) {
    this._service = service;

    this.postNoteHandler = this.postNoteHandler.bind(this);
    
  }

  async postNoteHandler(request, h) {
    try {

      const { face1, face2 } = request.payload;

      const noteId = await this._service.addCompareFace(
        face1,face2
      );

      const response = h.response({
        status: 'success',
        //message: 'Catatan berhasil ditambahkan',
        data: 
          noteId,
        
      });
      response.code(201);
      return response;
    } catch (error) {
     
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

}

module.exports = NotesHandler;
