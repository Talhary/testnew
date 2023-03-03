const fs = require('fs');
const { youtube } = require("ytdownloader-fts");
module.exports = ytdownloader=  async(link,client, id)=>{

    youtube(link).then(function(response){
 let file = fs.createWriteStream('./files/video.mp4')
   file.write(response.download[1].ul)
   file.on('finish', ()=>{
  console.log('done writing')
    client.sendMessage(
        id, 
        { video: { url:'./files/video.mp4'}, mimetype: 'video/mp4' } , { url: './files/video.mp4' }  ).then(()=>{fs.unlinkSync('./files/video.mp4'); console.log('done sending')}
        )
   })
    


      }); 
       
       }  

