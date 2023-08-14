require("./config")
const express = require('express')
const http = require("http");
const socketIO = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const moment = require('moment-timezone')
const port = 3000
const {
  default: SatzganzDevsStart,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  generateForwardMessageContent,
  prepareWAMessageMedia,
  generateWAMessageFromContent,
  generateMessageID,
  downloadContentFromMessage,
  makeInMemoryStore,
  jidDecode,
  proto,
  getAggregateVotesInPollMessage,
  MessageType,
} = require("@whiskeysockets/baileys");
const pino = require("pino");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const axios = require("axios");
const path = require('path')
const FileType = require("file-type");
const chalk = require("chalk");
const figlet = require("figlet");
const _ = require("lodash");
const { smsg } = require('./public/lib/smsg')
const PhoneNumber = require("awesome-phonenumber");
const { jadibot } = require('./public/lib/clone')
const {
imageToWebp,
videoToWebp,
writeExifImg,
writeExifVid,
} = require("./public/lib/exif");
const store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store" }) });
const color = (text, color) => {
  return !color ? chalk.green(text) : chalk.keyword(color)(text);
};
app.use(express.static('public'));
app.use(express.static('public/web'));
app.use(express.json());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/web/main.html'));
});
app.get('/css', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/styles.css'));
});
app.get('/img1', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/img1.jpg'));
});
app.get('/img2', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/img2.jpg'));
});
app.get('/img3', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/img3.jpg'));
});
app.get('/img4', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/img4.jpg'));
});

  const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}

function formatDate(dateString) {
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];

  const date = new Date(dateString);
  const day = days[date.getDay()];
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');

  return `${day} ${hour}:${minute}`;
}

function runtime (seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

async function connectCloneBots() {
  const cloneSessionsDirectory = "./public/Cloning"; 
  let cloneSessionFolders;
  try {
    cloneSessionFolders = fs.readdirSync(cloneSessionsDirectory);
  } catch (error) {
    console.error('Sepertinya belum ada Bot clone.');
    return;
  }
  for (const folder of cloneSessionFolders) {
      const clonedBot = await jadibot('satria', folder + "@s.whatsapp.net");
      console.log(`Bot Kloning untuk ${folder + "@s.whatsapp.net"} telah berhasil dihubungkan!`);
  }
}

async function connectSmart() {
  const { state, saveCreds } = await useMultiFileAuthState(`./${sessionName ? sessionName : "session"}`);
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`using WA v${version.join(".")}, isLatest: ${isLatest}`);
  console.log(
    color(
      figlet.textSync("SatganzDevs", {
        font: "Standard",
        horizontalLayout: "default",
        vertivalLayout: "default",
        whitespaceBreak: false,
      }),
      "cyan"
    )
  );

  const satria = SatzganzDevsStart({
    logger: pino({ level: "silent" }),
    printQRInTerminal: true,
    browser: ["SatganzDevs (Personal Bot)", "Safari", "1.0.0"],
      auth: state,
      getMessage: async (key) => {
      if (store) {
        const msg = await store.loadMessage(key.remoteJid, key.id);
        return msg.message || undefined;
      }
      return {
        conversation: "Hai Im Juna Bot",
      };
    },
    });

  store.bind(satria.ev);
  
  satria.ev.on("messages.upsert", async (chatUpdate) => {
   try {
      mek = chatUpdate.messages[0];
      if (!mek.message) return;
      mek.message =
        Object.keys(mek.message)[0] === "ephemeralMessage"
          ? mek.message.ephemeralMessage.message
          : mek.message;
      if (!satria.public && !mek.key.fromMe && chatUpdate.type === "notify")
        return;
      if (mek.key.id.startsWith("BAE5") && mek.key.id.length === 16) return;
      if (mek.key.id.startsWith("FatihArridho_")) return;
      m = smsg(satria, mek, store);
      require("./satganzdevs")(satria, m, chatUpdate, store);
    } catch (err) {
      console.log(err);
    }
  });

  // respon cmd pollMessage
  async function getMessage(key) {
    if (store) {
      const msg = await store.loadMessage(key.remoteJid, key.id);
      return msg?.message;
    }
    return {
      conversation: "Hai Im juna Bot",
    };
  }
  satria.ev.on("messages.update", async (chatUpdate) => {
    for (const { key, update } of chatUpdate) {
      if (update.pollUpdates && key.fromMe) {
        const pollCreation = await getMessage(key);
        if (pollCreation) {
          const pollUpdate = await getAggregateVotesInPollMessage({
            message: pollCreation,
            pollUpdates: update.pollUpdates,
          });
          var toCmd = pollUpdate.filter((v) => v.voters.length !== 0)[0]?.name;
          if (toCmd == undefined) return;
          var prefCmd = prefix + toCmd;
          satria.appenTextMessage(prefCmd, chatUpdate);
        }
      }
    }
  });
  
  // Handle error
  const unhandledRejections = new Map();
  process.on("unhandledRejection", (reason, promise) => {
    unhandledRejections.set(promise, reason);
    console.log("Unhandled Rejection at:", promise, "reason:", reason);
  });
  process.on("rejectionHandled", (promise) => {
    unhandledRejections.delete(promise);
  });
  process.on("Something went wrong", function (err) {
    console.log("Caught exception: ", err);
  });

  // Setting
  satria.decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {};
      return (decode.user && decode.server && decode.user + "@" + decode.server) || jid;
    } else return jid;
  };

  satria.ev.on("contacts.update", (update) => {
    for (let contact of update) {
      let id = satria.decodeJid(contact.id);
      if (store && store.contacts) store.contacts[id] = { id, name: contact.notify };
    }
  });

  
// Group Update
satria.ev.on("groups.update", async (pea) => {
  try {
    for (let ciko of pea) {
const fkontak = { key: {participant: `0@s.whatsapp.net`, ...(ciko.id ? { remoteJid: `status@broadcast` } : {}) }, message: { 'contactMessage': { 'displayName': '「 Group Notification 」', 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;'NOTIFICATION',;;;\nFN:$pushname},\nitem1.TEL;waid=0:0\nitem1.X-ABLabell:Ponsel\nEND:VCARD`, 'jpegThumbnail': fs.readFileSync('./public/src/thumb.jpg'), thumbnail: fs.readFileSync('./public/src/thumb.jpg'), sendEphemeral: true }}}
      // Get Profile Picture Group
      try {
        ppgc = await satria.profilePictureUrl(ciko.id, "image");
      } catch {
        ppgc = "https://tinyurl.com/yx93l6da";
      }
      let _useTag = await ciko.participants;
      if (ciko.announce == true) {
       satria.sendMessage(ciko.id, {text:`「 Group Settings Change 」\n\nGroup has been closed by admin. Now only admins can send messages!`, mentions: [_useTag]},{quoted:fkontak});
      } else if (ciko.announce == false) {
        satria.sendMessage(ciko.id, {text:`「 Group Settings Change 」\n\nGroup has been opened by admin. Now participants can send messages!`, mentions: [_useTag]},{quoted:fkontak});
      } else if (ciko.restrict == true) {
        satria.sendMessage(ciko.id, {text:`「 Group Settings Change 」\n\nGroup info has been restricted. Now only admins can edit group info!`, mentions: [_useTag]},{quoted:fkontak});
      } else if (ciko.restrict == false) {
        satria.sendMessage(ciko.id, {text:`「 Group Settings Change 」\n\nGroup info has been opened. Now participants can edit group info!`, mentions: [_useTag]},{quoted:fkontak});
      } else {
        satria.sendMessage(ciko.id, {text:`「 Group Settings Change 」\n\nGroup Subject has been changed to *${ciko.subject}*`, mentions: [_useTag]},{quoted:fkontak});
      }
    }
  } catch (err) {
    console.log(err);
  }
});


  satria.ev.on("group-participants.update", async (anu) => {
    console.log(anu);
    try {
      const fkontak = { key: {participant: `0@s.whatsapp.net`, ...(anu.id ? { remoteJid: `status@broadcast` } : {}) }, message: { 'contactMessage': { 'displayName': '「 Group Update 」', 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;'NOTIFICATION',;;;\nFN:$pushname},\nitem1.TEL;waid=0:0\nitem1.X-ABLabell:Ponsel\nEND:VCARD`, 'jpegThumbnail': fs.readFileSync('./public/src/thumb.jpg'), thumbnail: fs.readFileSync('./public/src/thumb.jpg'), sendEphemeral: true }}}
      let metadata = await satria.groupMetadata(anu.id);
      let participants = anu.participants;
      for (let num of participants) {
        // Get Profile Picture User
        try {
          ppuser = await satria.profilePictureUrl(num, "image");
        } catch {
          ppuser = "https://tinyurl.com/yx93l6da";
        }
  
        // Get Profile Picture Group
        try {
          ppgroup = await satria.profilePictureUrl(anu.id, "image");
        } catch {
          ppgroup = "https://tinyurl.com/yx93l6da";
        }
  
        if (anu.action == "add") {
          satria.sendMessage(anu.id, {
            text: `Welcome to ${metadata.subject}! @${num.split("@")[0]}, we are delighted to have you here.`,
            contextInfo: {
              mentionedJid: [num],
              isForwarded: true,
              externalAdReply: {
                title: `「 Welcome Message 」`,
                body: `Powered By ❤️ SatganzDevs`,
                previewType: "PHOTO",
                renderLargerThumbnail: true,
                thumbnail: fs.readFileSync('./public/src/welcome.png'),
                sourceUrl: `https://chat.whatsapp.com/G6W25LQb4Ce2i8r4Z0du1q`,
              },
            },
          },{quoted:fkontak});
        } else if (anu.action == "remove") {
          satria.sendMessage(anu.id, {
            text: `@${num.split("@")[0]} has left the ${metadata.subject}. We'll miss you!`,
            contextInfo: {
              mentionedJid: [num],
              isForwarded: true,
              externalAdReply: {
                title: `「 Goodbye Message 」`,
                body: `Powered By ❤️ SatganzDevs`,
                previewType: "PHOTO",
                mediaType: 1,
                renderLargerThumbnail: true,
                thumbnail: fs.readFileSync('./public/src/goodbye.png'),
                sourceUrl: `https://chat.whatsapp.com/G6W25LQb4Ce2i8r4Z0du1q`,
              },
            },
          },{quoted:fkontak});
        } else if (anu.action == "promote") {
          satria.sendMessage(anu.id, {
            text: `Congratulations, @${num.split("@")[0]}! You have been promoted in ${metadata.subject}. Keep up the good work!`,
            contextInfo: {
              mentionedJid: [num],
              isForwarded: true,
            },
          },{quoted:fkontak});
        } else if (anu.action == "demote") {
          satria.sendMessage(anu.id, {
            text: `@${num.split("@")[0]}, you have been demoted in ${metadata.subject}. Don't worry, keep contributing to the group!`,
            contextInfo: {
              mentionedJid: [num],
              isForwarded: true,
            },
          },{quoted:fkontak});
        }
      }
    } catch (err) {
      console.log(err);
    }
  });

   /**
   *
   * @param {*} jid
   * @param {*} name
   * @param [*] values
   * @returns
   */
  satria.sendPoll = (jid, name = "", values = [], selectableCount = 1) => {
    return satria.sendMessage(jid, { poll: { name, values, selectableCount } });
  };
  
  satria.sendTextWithMentions = async (jid, text, quoted, options = {}) =>
    satria.sendMessage(
      jid,
      {
        text: text,
        mentions: [...text.matchAll(/@(\d{0,16})/g)].map(
          (v) => v[1] + "@s.whatsapp.net"
        ),
        ...options,
      },
      { quoted }
    );

  /**
   *
   * @param {*} jid
   * @param {*} path
   * @param {*} quoted
   * @param {*} options
   * @returns
   */

    satria.downloadMediaMessage = async (message) => {
    let mime = (message.msg || message).mimetype || "";
    let messageType = message.mtype
      ? message.mtype.replace(/Message/gi, "")
      : mime.split("/")[0];
    const stream = await downloadContentFromMessage(message, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    return buffer;
  };
  // example satria.sendGroupV4Invite("120363022284397832@g.us", sender, "https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq", '99999', 'KONTOL', 'JOIN SINI BOSS', thumb)
     satria.sendGroupV4Invite = async (jid, participant, inviteCode, inviteExpiration, caption = 'Invitation to join my WhatsApp group', options = {}) => {
                const msg = generateWAMessageFromContent(
                  participant,
                  proto.Message.fromObject({
                    groupInviteMessage: {
                        inviteCode,
                        groupJid: jid,
                        groupName: await satria.getName(jid),
                        jpegThumbnail: thumb,
                        caption
                    }}));
                await satria.relayMessage(participant, msg.message, { messageId: msg.key.id, additionalAttributes: { ...options } })
                return msg
        }
  satria.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path)
      ? path
      : /^data:.*?\/.*?;base64,/i.test(path)
      ? Buffer.from(path.split`,`[1], "base64")
      : /^https?:\/\//.test(path)
      ? await getBuffer(path)
      : fs.existsSync(path)
      ? fs.readFileSync(path)
      : Buffer.alloc(0);
    let buffer;
    if (options && (options.packname || options.author)) {
      buffer = await writeExifImg(buff, options);
    } else {
      buffer = await imageToWebp(buff);
    }

    await satria.sendMessage(
      jid,
      { sticker: { url: buffer }, ...options },
      { quoted }
    );
    return buffer;
  };
    satria.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path)
      ? path
      : /^data:.*?\/.*?;base64,/i.test(path)
      ? Buffer.from(path.split`,`[1], "base64")
      : /^https?:\/\//.test(path)
      ? await getBuffer(path)
      : fs.existsSync(path)
      ? fs.readFileSync(path)
      : Buffer.alloc(0);
    let buffer;
    if (options && (options.packname || options.author)) {
      buffer = await writeExifVid(buff, options);
    } else {
      buffer = await videoToWebp(buff);
    }

    await satria.sendMessage(
      jid,
      { sticker: { url: buffer }, ...options },
      { quoted }
    );
    return buffer;
  };
  satria.getName = (jid, withoutContact = false) => {
    id = satria.decodeJid(jid);
    withoutContact = satria.withoutContact || withoutContact;
    let v;
    if (id.endsWith("@g.us"))
      return new Promise(async (resolve) => {
        v = store.contacts[id] || {};
        if (!(v.name || v.subject)) v = satria.groupMetadata(id) || {};
        resolve(v.name || v.subject || PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber("international"));
      });
    else
      v =
        id === "0@s.whatsapp.net"
          ? {
              id,
              name: "WhatsApp",
            }
          : id === satria.decodeJid(satria.user.id)
          ? satria.user
          : store.contacts[id] || {};
    return (withoutContact ? "" : v.name) || v.subject || v.verifiedName || PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber("international");
  };

  satria.setStatus = (status) => {
    satria.query({
      tag: "iq",
      attrs: {
        to: "@s.whatsapp.net",
        type: "set",
        xmlns: "status",
      },
      content: [
        {
          tag: "status",
          attrs: {},
          content: Buffer.from(status, "utf-8"),
        },
      ],
    });
    return status;
  };

  satria.public = true;

  satria.serializeM = (m) => smsg(satria, m, store);
  satria.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      if (reason === DisconnectReason.badSession) {
        console.log(`Bad Session File, Please Delete Session and Scan Again`);
        process.exit();
      } else if (reason === DisconnectReason.connectionClosed) {
        console.log("Connection closed, reconnecting....");
        connectSmart();
      } else if (reason === DisconnectReason.connectionLost) {
        console.log("Connection Lost from Server, reconnecting...");
        connectSmart();
      } else if (reason === DisconnectReason.connectionReplaced) {
        console.log("Connection Replaced, Another New Session Opened, Please Restart Bot");
        process.exit();
      } else if (reason === DisconnectReason.loggedOut) {
        console.log(`Device Logged Out, Please Delete Folder Session ${sessionName} and Scan Again.`);
        process.exit();
      } else if (reason === DisconnectReason.restartRequired) {
        console.log("Restart Required, Restarting...");
        connectSmart();
      } else if (reason === DisconnectReason.timedOut) {
        console.log("Connection TimedOut, Reconnecting...");
        connectSmart();
      } else {
        console.log(`Unknown DisconnectReason: ${reason}|${connection}`);
        connectSmart();
      }
    } else if (connection === "open") {
      console.log(color("Created By SatganzDevs", "green"));
      console.log(color(moment().tz('Asia/Jakarta').format('dddd DD MMMM HH:mm'), "yellow"));
      console.log(color("Personal Bot Has Connected!"));
    }
  });

  satria.ev.on("creds.update", saveCreds);

  const getBuffer = async (url, options) => {
    try {
      options ? options : {};
      const res = await axios({
        method: "get",
        url,
        headers: {
          DNT: 1,
          "Upgrade-Insecure-Request": 1,
        },
        ...options,
        responseType: "arraybuffer",
      });
      return res.data;
    } catch (err) {
      return err;
    }
  };

  satria.sendImage = async (jid, path, caption = "", quoted = "", options) => {
    let buffer = Buffer.isBuffer(path)
      ? path
      : /^data:.*?\/.*?;base64,/i.test(path)
      ? Buffer.from(path.split`,`[1], "base64")
      : /^https?:\/\//.test(path)
      ? await await getBuffer(path)
      : fs.existsSync(path)
      ? fs.readFileSync(path)
      : Buffer.alloc(0);
    return await satria.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted });
  };

  satria.sendText = (jid, text, quoted = "", options) => satria.sendMessage(jid, { text: text, ...options }, { quoted });

    satria.downloadAndSaveMediaMessage = async (
    message,
    filename,
    attachExtension = true
  ) => {
    let quoted = message.msg ? message.msg : message;
    let mime = (message.msg || message).mimetype || "";
    let messageType = message.mtype
      ? message.mtype.replace(/Message/gi, "")
      : mime.split("/")[0];
    const stream = await downloadContentFromMessage(quoted, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    let type = await FileType.fromBuffer(buffer);
    trueFileName = attachExtension ? filename + "." + type.ext : filename;
    // save to file
    await fs.writeFileSync(trueFileName, buffer);
    return trueFileName;
  };









    satria.copyNForward = async (
    jid,
    message,
    forceForward = false,
    options = {}
  ) => {
    let vtype;
    if (options.readViewOnce) {
      message.message =
        message.message &&
        message.message.ephemeralMessage &&
        message.message.ephemeralMessage.message
          ? message.message.ephemeralMessage.message
          : message.message || undefined;
      vtype = Object.keys(message.message.viewOnceMessage.message)[0];
      delete (message.message && message.message.ignore
        ? message.message.ignore
        : message.message || undefined);
      delete message.message.viewOnceMessage.message[vtype].viewOnce;
      message.message = {
        ...message.message.viewOnceMessage.message,
      };
    }

    let mtype = Object.keys(message.message)[0];
    let content = await generateForwardMessageContent(message, forceForward);
    let ctype = Object.keys(content)[0];
    let context = {};
    if (mtype != "conversation") context = message.message[mtype].contextInfo;
    content[ctype].contextInfo = {
      ...context,
      ...content[ctype].contextInfo,
    };
    const waMessage = await generateWAMessageFromContent(
      jid,
      content,
      options
        ? {
            ...content[ctype],
            ...options,
            ...(options.contextInfo
              ? {
                  contextInfo: {
                    ...content[ctype].contextInfo,
                    ...options.contextInfo,
                  },
                }
              : {}),
          }
        : {}
    );
    await satria.relayMessage(jid, waMessage.message, {
      messageId: waMessage.key.id,
    });
    return waMessage;
  };
  satria.cMod = (jid, copy, text = "", sender = satria.user.id, options = {}) => {
    //let copy = message.toJSON()
    let mtype = Object.keys(copy.message)[0];
    let isEphemeral = mtype === "ephemeralMessage";
    if (isEphemeral) {
      mtype = Object.keys(copy.message.ephemeralMessage.message)[0];
    }
    let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message;
    let content = msg[mtype];
    if (typeof content === "string") msg[mtype] = text || content;
    else if (content.caption) content.caption = text || content.caption;
    else if (content.text) content.text = text || content.text;
    if (typeof content !== "string")
      msg[mtype] = {
        ...content,
        ...options,
      };
    if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant;
    else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant;
    if (copy.key.remoteJid.includes("@s.whatsapp.net")) sender = sender || copy.key.remoteJid;
    else if (copy.key.remoteJid.includes("@broadcast")) sender = sender || copy.key.remoteJid;
    copy.key.remoteJid = jid;
    copy.key.fromMe = sender === satria.user.id;

    return proto.WebMessageInfo.fromObject(copy);
  };

  return satria;
}

io.on("connection", (socket) => {
  console.log("New client connected");

  // Menerima perintah dari website dan mengeksekusinya di terminal
  socket.on("execute-command", (command) => {
    console.log(`Received command: ${command}`);
    exec(command, (error, stdout, stderr) => {
      const output = stdout || stderr || "No output";
      console.log(`Output: ${output}`);
      socket.emit("command-output", output);
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(3000, () => {
  console.log(`Server running on port 3000`);
});

connectSmart();

connectCloneBots()


let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
