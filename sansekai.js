const { BufferJSON, WA_DEFAULT_EPHEMERAL,makeWASocket, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType ,MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys')
const wa = require('@adiwajshing/baileys')
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const { Configuration, OpenAIApi } = require("openai")




const ttsv1 = require('./ttsv1.js')
require('dotenv').config();
let message = ''
let users = []
let key = true
const instadownloader = require('./insta.js')
const ytdownload = require('./ytdownload')

const path = require('path')


let pathofsound1 = path.join(__dirname , 'files', 'output4.mp3') 



console.log('running still')
module.exports = sansekai = async (client, m, chatUpdate, store) => {
   
    try {

		if (m.text == 'stopbot') {
            key = false
            m.reply('bot is turned off')
        }
        if( m.text == 'startbot'){
            key = true
           
            m.reply('bot is turned on')
        }
	   

	   console.log(message);
	   console.log(m.text);
		console.log(m.mtype);
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
        var budy = (typeof m.text == 'string' ? m.text : '')
        // var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/"
        var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/"
        const isCmd2 = body.startsWith(prefix)
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const pushname = m.pushName || "No Name"
        const botNumber = await client.decodeJid(client.user.id)
       
        const itsMe = m.sender == botNumber ? true : false
        let text = q = args.join(" ")
        const arg = budy.trim().substring(budy.indexOf(' ') + 1 )
        const arg1 = arg.trim().substring(arg.indexOf(' ') + 1 )

        const from = m.chat
        const reply = m.reply
        const sender = m.sender
        const mek = chatUpdate.messages[0]

        const color = (text, color) => {
            return !color ? chalk.green(text) : chalk.keyword(color)(text)
        }
	
        // Group
        const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''

        // Push Message To Console
        let argsLog = (budy.length > 30) ? `${q.substring(0, 30)}...` : budy

        if (true) {
            // Push Message To Console && Auto Read
            if (argsLog && !m.isGroup) {
            // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
            console.log(chalk.black(chalk.bgWhite('[ LOGS ]')), color(argsLog, 'turquoise'), chalk.magenta('From'), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace('@s.whatsapp.net', '')} ]`))
            } else if (argsLog && m.isGroup) {
            // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
            console.log(chalk.black(chalk.bgWhite('[ LOGS ]')), color(argsLog, 'turquoise'), chalk.magenta('From'), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace('@s.whatsapp.net', '')} ]`), chalk.blueBright('IN'), chalk.green(groupName))
            }
        } else if (!true) {
            if (isCmd2 && !m.isGroup) {
                console.log(chalk.black(chalk.bgWhite('[ LOGS ]')), color(argsLog, 'turquoise'), chalk.magenta('From'), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace('@s.whatsapp.net', '')} ]`))
                } else if (isCmd2 && m.isGroup) {
                console.log(chalk.black(chalk.bgWhite('[ LOGS ]')), color(argsLog, 'turquoise'), chalk.magenta('From'), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace('@s.whatsapp.net', '')} ]`), chalk.blueBright('IN'), chalk.green(groupName))
                }
        }
    if(budy == '/menu'){
        m.reply(`send "startbot to turn on bot" <br> send "stopbot" to stop bot <br> send Clear to "delete" history`)
    }
    
          
    
    if ( key ) {
	
      users.push(m.sender)

      
        if (budy) {
        console.log(budy);
         let budytext = budy.split(' ')
         let budyp = budytext.indexOf('Say')
         let ai= budytext.indexOf('Img')
         let ytLink = budy.split('.')[0] == 'https://youtu';
         let insta = budy.split('.')[1] == 'instagram'
            try { if(insta){
                console.log('running insta')
                instadownloader(budy, client, m.sender, `./users/${m.sender.split('@')[0]}video.mp4`)
            }
               else if(budy.startsWith('tts')){
               let text = budy.split(' ').splice(2)
               let lang = budy.split(' ')[1]
               console.log(text)
               
                ttsv1(`${text}`, client ,pathofsound1, lang)

            }
               else if(ytLink){
                 console.log('runnning yt')
                 console.log(m.chat)
                    ytdownload(budy, client, m.sender, m)
                  
                
                }else if(budy == 'Clear'){
                       fs.unlinkSync(`./user/${m.sender.split('@')[0]}.json`)
                        client.sendMessage(m.sender, {text: 'Cleared old data'})
                        console.log('running clear')
                      
                }
				else if(budy == 'Data'  || budy == 'data'  || budy == 'logs'){
					if(fs.existsSync(`./users/${m.sender.split('@')[0]}.json`)){
                        console.log('i am running exirs')   
                       let  user = fs.readFileSync(`./users/${m.sender.split('@')[0]}.json`, {encoding:'utf-8'})
                       
                        user = JSON.parse(user)

                       await client.sendMessage(m.sender, {text: user.message})
                        
                 
                      }else{
                        await client.sendMessage(m.sender, {text: 'No data'})
                      }
                      
					return
				} else if(budy == 'Owner'  || budy == 'owner' ){
                      m.reply('Talha')               
                 
                    
					return
				}else if(budy == 'users'  || budy == 'Users' ){
					m.reply(users)
                   
					return
				}else if(ai > -1){
               
					let text = budytext.splice(ai +1)
                    text = text.join(' ')
                   
                //    img(text, client, m.sender)
                //     img2(text, client, m.sender)
                    // imgv3(text, client, m.sender)
                   
				}else if(budyp > -1){
                    
                    let up = Number(budytext[budyp+1])
                    let text = budytext.splice(budyp +2)
                  
                
                //   for(let i = 0; i< up ; i++ ){
                //     m.reply(text)
                //   }
                let i = 0
                  function func() {
                      let tome =   setTimeout(() => {
                            
                            console.log(text)
                            m.reply(`${text.join(' ')}`)
                           
                            if (i < up && up < 1001)
                                func()
                                i++
                        }, 50)
                    }
                    func()
                    // for(i = Number(below); i< Number(up); i++ ){
                    //    console.log(text)
					// }
					return
				}
                
            else if (process.env.API_KEY === 'ISI_APIKEY_OPENAI_DISINI') return reply('Apikey belum diisi\n\nSilahkan isi terlebih dahulu apikeynya di file key.json\n\nApikeynya bisa dibuat di website: https://beta.openai.com/account/api-keys')
        else {   try {
            let data = []
            if(!fs.existsSync(`./user/${m.sender.split('@')[0]}.json`)){
                let user = {role: "user", content: budy}
               data.push(user)
               fs.writeFileSync(`./user/${m.sender.split('@')[0]}.json`, JSON.stringify([user]))
               
            } else if (fs.readFileSync(`./user/${m.sender.split('@')[0]}.json`).length > 3000){
                fs.unlinkSync(`./user/${m.sender.split('@')[0]}.json`)
                client.sendMessage(m.sender, {text: 'Cleared old data limit exceeded'})
            }
            else{
                let user =  fs.readFileSync(`./user/${m.sender.split('@')[0]}.json`)
                user = JSON.parse(user)
                user.push({role: "user", content: budy})
             console.log(user.splice(10, user.length))       
             console.log('user>>>>>>',user)
             data = user
             fs.writeFileSync(`./user/${m.sender.split('@')[0]}.json`, JSON.stringify(user))
             console.log(fs.readFileSync(`./user/${m.sender.split('@')[0]}.json`).length)
             console.log(budy)
            }  
            const configuration = new Configuration({
                apiKey: process.env.API_KEY,
              });
              const openai = new OpenAIApi(configuration);
              console.log(data)
               openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages:data,
              }).then((response)=>{
              console.log(response.data.choices[0].message)
               let user =  fs.readFileSync(`./user/${m.sender.split('@')[0]}.json`)
               user = JSON.parse(user)
            user.push(response.data.choices[0].message)
            fs.writeFileSync(`./user/${m.sender.split('@')[0]}.json`, JSON.stringify(user))

            const buttons = [
                {buttonId: 'id1', buttonText: {displayText: `tts en ${response.data.choices[0].message.content}`}, type: 1},
                {buttonId: 'id2', buttonText: {displayText: `tts hi ${response.data.choices[0].message.content}`}, type: 1}
              
              ]
              
              const buttonMessage = {
                  text: `${response.data.choices[0].message.content}  \n\n\n>>>>press for audio<<<<\nen for english\nhi for hindi/urdu`,
                  footer: 'ChatGpt',
                  buttons: buttons,
                  headerType: 1
              }
              
             client.sendMessage(m.sender, buttonMessage).then(()=>{console.log('its done')})
                // client.sendMessage(m.sender, {text: `${response.data.choices[0].message.content}  \n\n\n>>>>Wait For Audio<<<<\n\n`})
                // tts(`${response.data.choices[0].message.content}  \n\n`, client ,pathofsound1)
                // ttsv1(`${response.data.choices[0].message.content}  \n\n`, client ,pathofsound1)
                
            })
          
            
          } catch (error) {
            if (error.response) {
              console.log(error.response.status);
              console.log(error.response.data);
              console.log(`${error.response.status}\n\n${error.response.data}`);
            } else {
              console.log(error);
              m.reply("Api key error :" + error.message);
            }
          }
        }
           
            } catch(err) {
                // console.log(err)
               
            }
        }
    }  
   
    if (!true) {
        if (isCmd2) {
            switch(command) { 
                case 'ai':
                    try {
                        if (process.env.API_KEY === 'ISI_APIKEY_OPENAI_DISINI') return reply('Api key has not been filled in\n\nPlease fill in the apikey first in the key.json file\n\nThe apikey can be created in website: https://beta.openai.com/account/api-keys')
                        if (!text) return reply(`Chat dengan AI.\n\nContoh:\n${prefix}${command} Apa itu resesi`)
                        const configuration = new Configuration({
                            apiKey: process.env.API_KEY,
                        });
                        const openai = new OpenAIApi(configuration);
                    
                        const response = await openai.createCompletion({
                            model: "text-davinci-003",
                            prompt: text,
                            temperature: 0.3,
                            max_tokens: 3000,
                            top_p: 1.0,
                            frequency_penalty: 0.0,
                            presence_penalty: 0.0,
                        });
                        m.reply(`${response.data.choices[0].text}\n\n`)
                    } catch (err) {
                        console.log(err)
                        m.reply('Maaf, sepertinya ada yang error')
                    }
                    break
                    
                default:{
                
                    if (isCmd2 && budy.toLowerCase() != undefined) {
                        if (m.chat.endsWith('broadcast')) return
                        if (m.isBaileys) return
                        if (!(budy.toLowerCase())) return
                        if (argsLog || isCmd2 && !m.isGroup) {
                            // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
                            console.log(chalk.black(chalk.bgRed('[ ERROR ]')), color('command', 'turquoise'), color(argsLog, 'turquoise'), color('tidak tersedia', 'turquoise'))
                            } else if (argsLog || isCmd2 && m.isGroup) {
                            // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
                            console.log(chalk.black(chalk.bgRed('[ ERROR ]')), color('command', 'turquoise'), color(argsLog, 'turquoise'), color('tidak tersedia', 'turquoise'))
                            }
                    }
                }
            }
        }
    }
        
    } catch (err) {
        m.reply(util.format(err))
    }
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
// const webjs = require('whatsapp-web.js');
// const qrcode = require('qrcode-terminal');
// const client = new webjs.Client();

// client.on('qr', (qr) => {

// });

// client.on('ready', () => {
 
//     console.log('Client is ready!');
// });
// client.on('message', message => {
// 	if(message.body === 'ping') {
// 		message.reply('pong');
// 	}
// });
 

// client.initialize();
 
