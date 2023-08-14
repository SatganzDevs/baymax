const {
default: SatzzHasStart,
useMultiFileAuthState,
DisconnectReason,
fetchLatestBaileysVersion,
makeInMemoryStore,
jidDecode,
proto,
getContentType,
messageType,
downloadContentFromMessage
} = require("@whiskeysockets/baileys");
const pino = require("pino");
const { Boom } = require("@hapi/boom");
const QRCode = require("qrcode");
const fs = require("fs");
const chalk = require("chalk");
const figlet = require("figlet");
const FileType = require("file-type");
const { smsg } = require('./smsg')
const color = (text, color) => {
return !color ? chalk.green(text) : chalk.keyword(color)(text);
};
const bot = {}
async function jadibot(satria, jied) { 
const store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store" }) });
const { state, saveCreds } = await useMultiFileAuthState(`./Cloning/${jied.split('@')[0]}`);
bot[jied] = SatzzHasStart({
logger: pino({ level: "silent" }),
printQRInTerminal: true,
browser: [`SatganzDevs (CLONE)`, "Chrome", "1.0.0"],
patchMessageBeforeSending: (message) => {
const requiresPatch = !!(
message.buttonsMessage
|| message.templateMessage
|| message.listMessage
);
if (requiresPatch) {
message = {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadataVersion: 2,
deviceListMetadata: {},
},
...message,
},
},
};
}
return message;
},
auth: state,
});
store.bind(bot[jied].ev);

bot[jied].ev.on("contacts.update", (update) => {
for (let contact of update) {
let id = bot[jied].decodeJid(contact.id);
if (store && store.contacts)
store.contacts[id] = { id, name: contact.notify };
}
});
bot[jied].ev.on("connection.update", async (update) => {
const { connection, qr, lastDisconnect } = update;
if (connection === "open") {
return bot[jied].sendMessage(jied, { text: "```Connected to server.```" });
console.log(color("Created By SatganzDevs", "green"));
console.log(color(Date.now(), "yellow"));
console.log(color(`${bot[jied]} Bot Has Connected!`));
}
if (qr) {
const buffer = await QRCode.toBuffer(qr, { scale: 8 });
return satria.sendMessage(jied, {
image: buffer,
caption: "Scan QR ini untuk jadi bot sementara\n\n1. Klik titik tiga di pojok kanan atas\n2. Klik Perangkat tertaut\n3. Klik Tautkan Perangkat\n4. Scan QR Ini\n\nKalau Mau Berhentiin Jadibot Silahkan Ketik .stopjadibot",
});
}

if (connection === "close") {
let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
if (reason === DisconnectReason.badSession) {
console.log(`Bad Session File, Please Delete Session and Scan Again`);
process.exit();
} else if (reason === DisconnectReason.connectionClosed) {
console.log("Connection closed, reconnecting....");
jadibot(satria, jied)
} else if (reason === DisconnectReason.connectionLost) {
console.log("Connection Lost from Server, reconnecting...");
jadibot(satria, jied)
} else if (reason === DisconnectReason.connectionReplaced) {
console.log("Connection Replaced, Another New Session Opened, Please Restart Bot");
process.exit();
} else if (reason === DisconnectReason.loggedOut) {
console.log(`Device Logged Out, Please Delete Folder Session ${sessionName} and Scan Again.`);
process.exit();
} else if (reason === DisconnectReason.restartRequired) {
console.log("Restart Required, Restarting...");
jadibot(satria, jied)
} else if (reason === DisconnectReason.timedOut) {
console.log("Connection TimedOut, Reconnecting...");
jadibot(satria, jied)
} else {
console.log(`Unknown DisconnectReason: ${reason}|${connection}`);
}
}
});
bot[jied].ev.on("creds.update", saveCreds);
bot[jied].ev.on("messages.upsert", async (chatUpdate) => {
try {
mek = chatUpdate.messages[0];
if (!mek.message) return;
await bot[jied].sendPresenceUpdate('recording', mek.keyRemoteJid) 
mek.message = Object.keys(mek.message)[0] === "ephemeralMessage" ? mek.message.ephemeralMessage.message : mek.message;
if (mek.key && mek.key.remoteJid === "status@broadcast") { bot[jied].readMessages([mek.key]); } 
if (!bot[jied].public && !mek.key.fromMe && chatUpdate.type === "notify") return;
if (mek.key.id.startsWith("BAE5") && mek.key.id.length === 16) return;
m = smsg(bot[jied], mek, store);
require("./satganzdevs")(bot[jied], m, chatUpdate, store);
} catch (err) {
console.log(err);
}
})
bot[jied].public = true;
bot[jied].decodeJid = (jid) => {
if (!jid) return jid;
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {};
return (decode.user && decode.server && decode.user + "@" + decode.server) || jid;
} else return jid;
};
bot[jied].downloadAndSaveMediaMessage = async (
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
}

async function stopjadibot(satria, jied) {
try {
bot[jied].end("Stop");
} catch {}
try {
bot[jied].logout();
} catch {}
delete bot[jied]
}

async function listjadibot(satria, m) {
let from = m.key.remoteJid;

// Cari bot yang terkait dengan percakapan saat ini berdasarkan JID
const botJids = Object.keys(bot);
const relatedBots = botJids.filter((jid) => from.includes(jid));

if (relatedBots.length === 0) {
return satria.sendMessage(from, {
text: "Anda belum menjalankan bot apa pun.",
});
}

// Buat daftar mention bot
const mentions = relatedBots.map((jid) => ({
jid: bot[jid].user.jid,
tag: jid.split("@")[0],
}));

// Buat teks daftar bot untuk dikirimkan sebagai pesan balasan
let text = mentions.map((mention, index) => `=> @${mention.tag}`).join("\n");

// Kirim daftar bot sebagai pesan balasan
return satria.sendMessage(from, {
text: `List Jadi Bot :\n${text}`,
mentions,
});
}


module.exports = { bot, jadibot, stopjadibot, listjadibot }