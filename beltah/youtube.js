const { zokou } = require("../framework/zokou");
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const fs = require('fs');
const yt=require("../framework/dl/ytdl-core.js")
const ffmpeg = require("fluent-ffmpeg");
const yts1 = require("youtube-yts");
//var fs =require("fs-extra")

zokou({
  nomCom: "song",
  categorie: "Search",
  reaction: "🔊"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
     
  if (!arg[0]) {
    repondre("wich song do you want.");
    return;
  }

  try {
    let topo = arg.join(" ")
    const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0 && videos[0]) {
      const urlElement = videos[0].url;
          
       let infoMess = {
          image: {url : videos[0]. thumbnail},
         caption : `> ᴋᴇɴᴢɪ ꜱᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ...\n*╭−−−−−−−−−−−−−−−−−−−−◯*\n*│*   `© KENZI MD  🩷✨`\n*╰−−−−−−−−−−−−−−−−−−−−◯*\n     *│*                             *│*\n----------------------------------------------\n🌟 `𝖭𝖠𝖬𝖤 :` _${videos[0].title}_\n⏰ `𝖳𝖨𝖬𝖤   :`  _${videos[0].timestamp}_\n⛓‍💥 `𝖫𝗂𝗇𝗄  :` _${videos[0].url}_\n----------------------------------------------\n~ ✅ 𝒀𝒐𝒖𝒓 𝑺𝒐𝒏𝒈 𝑺𝒆𝒏𝒅𝒊𝒏𝒈....\n> © 𝙺𝙴𝙽𝚉𝙸 𝙼𝙳`
       }

      

      

      
       zk.sendMessage(origineMessage,infoMess,{quoted:ms}) ;
      // Obtenir le flux audio de la vidéo
      const audioStream = ytdl(urlElement, { filter: 'audioonly', quality: 'highestaudio' });

      // Nom du fichier local pour sauvegarder le fichier audio
      const filename = 'audio.mp3';

      // Écrire le flux audio dans un fichier local
      const fileStream = fs.createWriteStream(filename);
      audioStream.pipe(fileStream);

      fileStream.on('finish', () => {
        // Envoi du fichier audio en utilisant l'URL du fichier local
      

     zk.sendMessage(origineMessage, { audio: { url:"audio.mp3"},mimetype:'audio/mp4' }, { quoted: ms,ptt: false });
        console.log("Envoi du fichier audio terminé !");

     
      });

      fileStream.on('error', (error) => {
        console.error('Erreur lors de l\'écriture du fichier audio :', error);
        repondre('Une erreur est survenue lors de l\'écriture du fichier audio.');
      });
    } else {
      repondre('Aucune vidéo trouvée.');
    }
  } catch (error) {
    console.error('Erreur lors de la recherche ou du téléchargement de la vidéo :', error);
    
    repondre('Une erreur est survenue lors de la recherche ou du téléchargement de la vidéo.');
  }
});

  

zokou({
  nomCom: "video",
  categorie: "Search",
  reaction: "🖥️"
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, ms, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre("insert video name");
    return;
  }

  const topo = arg.join(" ");
  try {
    const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0 && videos[0]) {
      const Element = videos[0];

      let InfoMess = {
        image: { url: videos[0].thumbnail },
        caption: `> ᴋᴇɴᴢɪ ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ...\n*╭−−−−−−−−−−−−−−−−−−−−◯*\n*│*   `© KENZI MD  🩷✨`\n*╰−−−−−−−−−−−−−−−−−−−−◯*\n     *│*                             *│*\n----------------------------------------------\n🌟 `𝖭𝖠𝖬𝖤 :`  _${Element.title}_
        ⏰ `𝖳𝖨𝖬𝖤   :`  _${Element.timestamp}_
        ⛓‍💥 `𝖫𝗂𝗇𝗄  :`  _${Element.url}_
        ----------------------------------------------\n~ ✅ 𝒀𝒐𝒖𝒓 𝑽𝒊𝒅𝒆𝒐 𝑺𝒆𝒏𝒅𝒊𝒏𝒈....\n> © 𝙺𝙴𝙽𝚉𝙸 𝙼𝙳`
      };

      zk.sendMessage(origineMessage, InfoMess, { quoted: ms });

      // Obtenir les informations de la vidéo à partir du lien YouTube
      const videoInfo = await ytdl.getInfo(Element.url);
      // Format vidéo avec la meilleure qualité disponible
      const format = ytdl.chooseFormat(videoInfo.formats, { quality: '18' });
      // Télécharger la vidéo
      const videoStream = ytdl.downloadFromInfo(videoInfo, { format });

      // Nom du fichier local pour sauvegarder la vidéo
      const filename = 'video.mp4';

      // Écrire le flux vidéo dans un fichier local
      const fileStream = fs.createWriteStream(filename);
      videoStream.pipe(fileStream);

      fileStream.on('finish', () => {
        // Envoi du fichier vidéo en utilisant l'URL du fichier local
        zk.sendMessage(origineMessage, { video: { url :"./video.mp4"} , caption: "~✨𝑻𝒉𝒊𝒔 𝒀𝒐𝒖𝒓 𝑽𝒊𝒅𝒆𝒐....\n> `𝙶𝙴𝙽𝙴𝚁𝙰𝚃𝙴𝙳 𝙱𝚈 𝙺𝙴𝙽𝚉𝙸 𝙼𝙳`...", gifPlayback: false }, { quoted: ms });
      });

      fileStream.on('error', (error) => {
        console.error('Erreur lors de l\'écriture du fichier vidéo :', error);
        repondre('Une erreur est survenue lors de l\'écriture du fichier vidéo.');
      });
    } else {
      repondre('No video found');
    }
  } catch (error) {
    console.error('Erreur lors de la recherche ou du téléchargement de la vidéo :', error);
    repondre('Une erreur est survenue lors de la recherche ou du téléchargement de la vidéo.');
  }
});
