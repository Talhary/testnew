const midjourney = (...args) => import('midjourney-client').then(({default: fetch}) => fetch(...args));

module.exports =  img= async (text ,client, id)=>{
midjourney(text, { width: 1024 }).then(async(imglink)=>{
    
    const buttons = [
        {buttonId: 'id1', buttonText: {displayText: `Img ${text}`}, type: 1},
     
      ]
      
      
    const buttonMessage = {
        image: {url: imglink[0]},
        caption: text,
        buttons:buttons,
        footer: 'Midjourney',
         headerType: 4
    }
    
     await client.sendMessage(id, buttonMessage)
})

}
// bot.command("Imgm", async (ctx) => {
//   const text = ctx.message.text?.replace("/image", "")?.trim().toLowerCase();

//   if (text) {
   
//     midjourney( text ).then((res)=>{

//     if (res) {
//       ctx.sendChatAction("upload_photo");
//       // ctx.sendPhoto(res);
//       // ctx.telegram.sendPhoto()
//       ctx.telegram.sendPhoto(ctx.message.chat.id, res, {
//         reply_to_message_id: ctx.message.message_id,
//       });
//     }})
//   } else {
    
//     ctx.telegram.sendMessage(
//       ctx.message.chat.id,
//       "You have to give some description after /image",
//       {
//         reply_to_message_id: ctx.message.message_id,
//       }
//     );
//   }
// });
