export default class Song {
    constructor(data) {
        this.title = data.trackName || data.title;
        this.albumArt = data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
        this.artist = data.artistName || data.artist;
        this.album = data.collectionName || data.album;
        this.price = data.trackPrice || data.price;
        this.preview = data.previewUrl || data.preview;
        this._id = data.trackId || data._id;
    }

    get Template() {
        return /*html*/ `
        <div class="card my-3 p-2 bg-dark text-light">
        <div class="row">
            <div class="col-4 d-flex align-items-center">
                <img class="img-fluid ml-2 my-2 rounded-circle" src="${this.albumArt}" alt="${this.album}">
            </div>
            <div class="col-6">
                <div class="col-12 my-3">
                    <h4>${this.album} - ${this.title} - ${this.artist} - <small>$${this.price}</small></h4>
                </div>
                <div class="col-12">
                    <audio controls>
                        <source src="${this.preview}" type="audio/wav">
                    </audio>
                </div>
            </div>
            <div class="col-2 d-flex justify-content-end">
                <i class="fa fa-plus-square fa-2x text-success" aria-hidden="true" onclick="app.songsController.addToPlaylist('${this._id}')">
                </i>
            </div>
        </div>
    </div>`
    }

    get PlaylistTemplate() {
        return /*html */ `
    <div class="card my-3 p-2 bg-dark text-light">
        <div class="row">
            <div class="col-4 d-flex align-items-center">
                <img class="img-fluid ml-2 my-2 rounded-circle" src="${this.albumArt}" alt="${this.album}">
            </div>
            <div class="col-6">
                <div class="col-12 my-3">
                    <h4>${this.album} - ${this.title} - ${this.artist} - <small>$${this.price}</small></h4>
                </div>
                <div class="col-12">
                    <audio controls>
                        <source src="${this.preview}" type="audio/wav">
                    </audio>
                </div>
            </div>
            <div class="col-2 d-flex justify-content-end">
                <i class="fa fa-minus-square fa-2x text-danger" aria-hidden="true" onclick="app.songsController.removeSong('${this._id}')">
                </i>
            </div>
        </div>
    </div>`
    }
}