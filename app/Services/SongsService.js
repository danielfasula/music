import {
  ProxyState
} from "../AppState.js";
import Song from "../Models/Song.js";
import {
  sandBoxApi
} from "./AxiosService.js";

class SongsService {
  constructor() {
    this.getMySongs()
  }

  getMusicByQuery(query) {
    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        ProxyState.songs = res.results.map(rawData => new Song(rawData));
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  async getMySongs() {
    try {
      ProxyState.playlist = ((await sandBoxApi.get('')).data).map(s => new Song(s))
      // ProxyState.playlist = res.data.map(song => new Song(song))
    } catch (error) {
      console.error(error)
    }
  }

  async addToPlaylist(id) {
    try {
      let song = ProxyState.songs.find(s => s._id == id)
      song._id = null
      const res = await sandBoxApi.post('', song)
      this.getMySongs()
    } catch (error) {
      console.error(error);
    }
  }

  async removeSong(id) {
    const res = await sandBoxApi.delete('' + id)
    console.log(res);
    this.getMySongs()
  }
}

const service = new SongsService();
export default service;