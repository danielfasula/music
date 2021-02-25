export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this._id = data.trackId || data._id;
    //  
  }

  get Template() {
    return /*html*/ `
<div class="card my-1 p-1 bg-dark text-light">
    <div class="row">
        <div class="col-4 d-flex align-items-center">
            <img class="img-fluid ml-2" src="${this.albumArt}" alt="" srcset="">
        </div>
        <div class="col-6">
            <h4>${this.title} - ${this.artist}</h4>
            <h4>$${this.price}</h4>
            <audio controls style="width: 90%;">
              <source src="${this.preview}" type="audio/wav">
            </audio>
        </div>
        <div class="col-2 d-flex justify-content-end">
          <i class="fa fa-plus-square fa-2x text-success mr-2 mt-2" onclick="app.songsController.addToPlaylist('${this._id}')" aria-hidden="true"></i>
        </div>
    </div>
</div>
        `;
  }

  get PlaylistTemplate() {
    return /*html */ `
<div class="card my-2 p-2 bg-dark text-light">
        <div class="row">
            <div class="col-4 d-flex align-items-center">
                <img class="img-fluid ml-2 my-2 rounded-circle" src="${this.albumArt}" alt="" srcset="">
            </div>
            <div class="col-6 d-flex align-text-center">
                <div class="row">
                    <div class="col-12">
                        <h4 onclick="">${this.title} - ${this.artist} - <small>$${this.price}</small></h4>
                    </div>
                <div class="col-12">
                    <audio controls class="d-flex align-items-end">
                        <source src="${this.preview}" type="audio/wav">
                    </audio>
                </div>
                </div>
            </div>
            <div class="col-2 d-flex justify-content-end">
                <i class="fa fa-minus-square fa-2x text-danger" aria-hidden="true"
                    onclick="app.songsController.removeSong('${this._id}')">
                </i>
            </div>
        </div>
    </div>
        `;
  }
}
