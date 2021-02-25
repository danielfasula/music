import { ProxyState } from "../AppState.js";
import Song from "../Models/Song.js";
import { sandBoxApi } from "./AxiosService.js";

class SongsService {
  constructor() {
    this.getMySongs()
  }
  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  getMusicByQuery(query) {
    //NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    // @ts-ignore
    $.getJSON(url)
    .then(res => {
        console.log(res.results);
        
        ProxyState.songs = res.results.map(rawData => new Song(rawData));
      })
      .catch(err => {
        throw new Error(err);
      });
    }

    /**
     * Retrieves the saved list of songs from the sandbox
     */
    async getMySongs() {
      //TODO What are you going to do with this result
      try {
      const res = await sandBoxApi.get('')
      ProxyState.playlist = res.data.map(song => new Song(song))
      console.log(ProxyState.playlist);
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async addToPlaylist(id) {
    try {
      let song = ProxyState.songs.find(s => s._id == id)
      song._id = null
      const res = await sandBoxApi.post('', song)
      this.getMySongs()
    } catch (error) {
      console.error(error);
    }
    
    //TODO you only have an id, you will need to find it in the store before you can post it
    //TODO After posting it what should you do?
  }
  
  
  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async removeSong(id) {
    const res = await sandBoxApi.delete('' + id)
    console.log(res);
    this.getMySongs()
    //TODO Send the id to be deleted from the server then update the store
  }
  togglePlaying(playing) {
    playing = !playing
  }
}

const service = new SongsService();
export default service;
