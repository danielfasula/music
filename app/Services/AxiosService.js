// @ts-ignore

export const appleApi = axios.create({
  baseURL: 'https:/itunes.apple.com',
  timeout: 3000
})
export const sandBoxApi = axios.create({
  //TODO Change YOURNAME to your actual name
  baseURL: "https://bcw-sandbox.herokuapp.com/api/daniel&ethan/songs",
  timeout: 3000
});
