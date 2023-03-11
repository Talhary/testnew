const instagramGetUrl = require("instagram-url-direct")
const fs= require('fs')
const https = require('https')
 module.exports = instadownloader=  async(link,client, id, path)=>{
    instagramGetUrl(link).then((response)=>{
    response.url_list.forEach(url => {
    const file = fs.createWriteStream(path);
    https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
    file.close();
    client.sendMessage(id,{ video: { url:path}, mimetype: 'video/mp4' } , { url: path }  ).then(()=>{fs.unlinkSync(path)})});})
});
})
}
