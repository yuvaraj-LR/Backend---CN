// Please don't change the pre-written code
// Import the necessary modules here

export default class ArtPiece {
  constructor(id, title, artist, year, imageUrl) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.year = year;
    this.imageUrl = imageUrl;
  }

  static db = [];

  static create({ title, artist, year, imageUrl }) {
    const artPiece = new ArtPiece(
      ArtPiece.db.length + 1,
      title,
      artist,
      year,
      imageUrl
    );
    ArtPiece.db.push(artPiece);
    return ArtPiece.findAll();
  }

  static findAll(query) {
    // Write your code here to retrieve all art pieces
    let artPieces = ArtPiece.db;
    return artPieces;
  }

  static findOne(id) {
    // Write your code here to retrieve a specific art piece by its id
    return ArtPiece.db.filter((artPiece) => artPiece.id == id);
  }

  static update(id, data) {
    // Write your code here to update the details of a specific art piece
    let toChangeValue = ArtPiece.findOne(id);
    toChangeValue.data = data;
    return this.findAll();
  }

  static delete(id) {
    // Write your code here to delete a specific art piece
    let artPieceId = ArtPiece.db.find((artPiece) => artPiece.id == id).id;
    ArtPiece.db.splice(artPieceId, 1);
    return this.findAll();
  }
}
