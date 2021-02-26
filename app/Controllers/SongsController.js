import { ProxyState } from "../AppState.js";
import songService from "../Services/SongsService.js";

//Private
function _drawResults() {
  let songs = ProxyState.songs
  let template = ''

  songs.forEach(s => template += s.Template)
  document.getElementById('songs').innerHTML = template

}

function _drawPlaylist() {
  let playlist = ProxyState.playlist
  let template = ''
  playlist.forEach(p => template += p.PlaylistTemplate)
  document.getElementById('playlist').innerHTML = template
}

//Public
export default class SongsController {
  constructor() {
    ProxyState.on('songs', _drawResults)
    ProxyState.on('playlist', _drawPlaylist)
  }

  search(e) {
    e.preventDefault();
    try {
      songService.getMusicByQuery(e.target.query.value);

    } catch (error) {
      console.error(error);
    }
  }

  addToPlaylist(id) { 
    songService.addToPlaylist(id)
  }

  removeSong(id) {
    songService.removeSong(id)
  }
}
