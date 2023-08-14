require("./config");
require("./public/lib/JSONstringify.d.js");
const {
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  generateWAMessageFromContent,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  areJidsSameUser,
  getContentType,
  downloadContentFromMessage,
} = require("@whiskeysockets/baileys");
const fs = require("fs");
const cron = require("node-cron");
const moment = require("moment-timezone");
const util = require("util");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const chalk = require("chalk");
const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path");
const { toDataURL } = require("qrcode");
const {
  gcc,
  tzy,
  pak,
  kel,
  doc,
  trol,
  ngetrol,
  ftroli,
  ft,
  gc,
  lok,
  aud,
} = require("./public/lib/fake");
const { platform } = require("process");
const { exec, spawn, execSync } = require("child_process");
const {
  Sticker,
  createSticker,
  StickerTypes,
} = require("wa-sticker-formatter");
const Jimp = require("jimp");
const stringSimilarity = require("string-similarity");
const {
  getAllCmd,
  getBuffer,
  getCases,
  tanggal,
  generateProfilePicture,
  sleep,
  getSizeMedia,
  fetchJson,
  parseMention,
  isUrl,
  formatDate,
  pickRandom,
  monospace,
  getGroupAdmins,
  getRandom,
  generateMessageTag,
} = require("./public/lib/functional.js");
const { jadibot, stopjadibot, listjadibot } = require("./public/lib/clone");
const diferentme = require("./public/lib/JSONstringify.js");
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

const GroupSchedule = JSON.parse(
  fs.readFileSync("./public/data/openclose.json")
);

module.exports = satria = async (satria, m, chatUpdate, store) => {
  try {
    var body =
      m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype == "imageMessage"
        ? m.message.imageMessage.caption
        : m.mtype == "videoMessage"
        ? m.message.videoMessage.caption
        : m.mtype == "extendedTextMessage"
        ? m.message.extendedTextMessage.text
        : m.mtype == "buttonsResponseMessage"
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype == "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype == "templateButtonReplyMessage"
        ? m.message.templateButtonReplyMessage.selectedId
        : m.mtype === "messageContextInfo"
        ? m.message.buttonsResponseMessage?.selectedButtonId ||
          m.message.listResponseMessage?.singleSelectReply.selectedRowId ||
          m.text
        : "";
    var budy = typeof m.text == "string" ? m.text : "";
    var prefix = prefa
      ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body)
        ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0]
        : ""
      : prefa ?? global.prefix;
    global.prefix = prefix;
    const isCmd = body.startsWith(prefix);
    global.replyType = pickRandom(["web", "troli", "text"]);
    const command = body
      .replace(prefix, "")
      .trim()
      .split(/ +/)
      .shift()
      .toLowerCase();
    var args = body.trim().split(/ +/).slice(1);
    args = args.concat(["", "", "", "", "", ""]);
    const pushname = m.pushName || "No Name";
    const { type, quotedMsg, mentioned, now, fromMe } = m;
    const isQuotedMsg = type == "extendedTextMessage";
    const isQuotedImage = isQuotedMsg
      ? content.includes("imageMessage")
        ? true
        : false
      : false;
    const isImage = type == "imageMessage";
    const botNumber = await satria.decodeJid(satria.user.id);
    const isCreator =
      m.sender == `${global.owner}@s.whatsapp.net` ? true : false;
    const itsMe = m.sender == botNumber ? true : false;
    const from = m.chat;
    const text = (q = args.join(" ").trim());
    const fatkuns = m.quoted || m;
    const quoted =
      fatkuns.mtype == "buttonsMessage"
        ? fatkuns[Object.keys(fatkuns)[1]]
        : fatkuns.mtype == "templateMessage"
        ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]]
        : fatkuns.mtype == "product"
        ? fatkuns[Object.keys(fatkuns)[0]]
        : m.quoted
        ? m.quoted
        : m;
    const mime = (quoted.msg || quoted).mimetype || "";
    const qmsg = quoted.msg || quoted;
    const isMedia = /image|video|sticker|audio/.test(mime);

    /* New Line */
    const groupMetadata = m.isGroup
      ? await satria.groupMetadata(m.chat).catch((e) => {})
      : "";
    const groupName = m.isGroup ? groupMetadata.subject : "";
    const participants = m.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : "";
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
    const color = (text, color) => {
      return !color ? chalk.green(text) : chalk.keyword(color)(text);
    };

    // Function By SatriaId
    function playRandom(folders) {
      const musicFiles = fs.readdirSync(folders);
      if (musicFiles.length === 0) {
        console.log("The folder is empty. No music files found.");
        return null;
      }
      const randomIndex = Math.floor(Math.random() * musicFiles.length);
      const randomMusicFile = musicFiles[randomIndex];
      const fullPath = path.join(folders, randomMusicFile);
      return fullPath;
    }
    const fkontak = {
      key: {
        participant: `0@s.whatsapp.net`,
        ...(m.chat ? { remoteJid: `status@broadcast` } : {}),
      },
      message: {
        contactMessage: {
          displayName: pushname,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pushname},;;;\nFN:$pushname},\nitem1.TEL;waid=${
            m.sender.split("@")[0]
          }:${m.sender.split("@")[0]}\nitem1.X-ABLabell:Ponsel\nEND:VCARD`,
          jpegThumbnail: global.thumb,
          thumbnail: global.thumb,
          sendEphemeral: true,
        },
      },
    };
    const gc = {
      key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        ...(m.chat ? { remoteJid: "@s.whatsapp.net" } : {}),
      },
      message: {
        groupInviteMessage: {
          groupJid: "120363025461390219@g.us",
          inviteCode: "z0JcSBd3mAhIfSSY",
          inviteExpiration: "Powered By ❤️ SatganzDevs",
          groupName: "Powered By ❤️ SatganzDevs",
          caption: "Powered By ❤️ SatganzDevs",
        },
      },
    };

    const reply = async (teks) => {
      try {
        ppuser = await satria.profilePictureUrl(m.sender, "image");
      } catch (err) {
        ppuser =
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
      }
      if (global.replyType == "web") {
        satria.sendMessage(
          m.chat,
          {
            text: teks,
            contextInfo: {
              mentionedJid: parseMention(`${teks}`),
              externalAdReply: {
                showAdAttribution: true,
                title: `${greetingMessage} ${pushname} 👋`,
                body: `Powered By ❤️ SatganzDevs`,
                previewType: "PHOTO",
                thumbnailUrl: thumb,
                sourceUrl: `https://instagram.com/kurniawan_satriaaaa?igshid=MzNlNGNkZWQ4Mg==`,
              },
            },
          },
          { quoted: m }
        );
      } else if (global.replyType == "troli") {
        var troli = generateWAMessageFromContent(
          m.chat,
          proto.Message.fromObject({
            orderMessage: {
              orderId: "436664297902534",
              sellerJid: "6281268248904@s.whatsapp.net",
              itemCount: 9999999,
              status: "INQUIRY",
              surface: "CATALOG",
              message: teks,
              orderTitle: "Powered By ❤️ SatganzDevs",
              thumbnail: thumb,
              token: "AR6ew8v8oH4gt78Ufm/sMBCeaQJwJlDhOTto8qAZytAdQA==",
            },
          }),
          { userJid: m.chat, quoted: m }
        );
        satria.relayMessage(m.chat, troli.message, {
          messageId: troli.key.id,
        });
      }
      if (global.replyType == "text") {
        satria.sendMessage(
          m.chat,
          {
            text: teks,
            contextInfo: { mentionedJid: parseMention(`${teks}`) },
          },
          { quoted: m }
        );
      }
    };

    // cron.schedule(
    //   "19 21 * * *",
    //   () => {
    //     satria.sendMessage(
    //       "120363133569726490@g.us",
    //       { text: "Dah malem" },
    //       { quoted: gc }
    //     );
    //     satria.groupSettingUpdate("120363133569726490@g.us", "announcement");
    //   },
    //   {
    //     scheduled: true,
    //     timezone: "Asia/Jakarta",
    //   }
    // );
    // cron.schedule(
    //   "20 21 * * *",
    //   () => {
    //     satria.sendMessage(
    //       "120363133569726490@g.us",
    //       { text: "tepat waktu!, Group di buka" },
    //       { quoted: gc }
    //     );
    //     satria.groupSettingUpdate(
    //       "120363133569726490@g.us",
    //       "not_announcement"
    //     );
    //   },
    //   {
    //     scheduled: true,
    //     timezone: "Asia/Jakarta",
    //   }
    // );

    // cron.schedule(
    //   "*/1 * * * *",
    //   () => {
    //     fetchJson("https://thefuckingbot.satganzdevs.repl.co");
    //     console.log("menjalankan fetch agar selalu aktif");
    //   },
    //   {
    //     scheduled: true,
    //     timezone: "Asia/Jakarta",
    //   }
    // );

    if (m.message) {
      satria.readMessages([m.key]);
      console.log(
        chalk.black(chalk.bgWhite("[ PESAN ]")),
        chalk.black(chalk.bgGreen(new Date())),
        chalk.black(
          chalk.bgBlue(
            budy.length > 30 ? `${q.substring(0, 30)}...` : budy || m.mtype
          )
        ) +
          "\n" +
          chalk.magenta("=> Dari"),
        chalk.green(pushname),
        chalk.yellow(`[ ${m.sender.replace("@s.whatsapp.net", "")} ]`) +
          "\n" +
          chalk.blueBright("=> Di"),
        chalk.green(m.isGroup ? pushname : "Private Chat", m.chat)
      );
    }

    let responlist = [];
    try {
      responlist = JSON.parse(
        fs.readFileSync(`./public/respon/${botNumber.split("@")[0]}.json`)
      );
    } catch (err) {
      if (err.code === "ENOENT") {
        fs.writeFileSync(
          `./public/respon/${botNumber.split("@")[0]}.json`,
          "[]"
        );
        console.log("File responlist tidak ditemukan. File baru telah dibuat.");
      } else {
        console.error("Gagal membaca file responlist:", err);
      }
    }
    if (m.text && !m.isGroup) {
      let men = [];
      for (let i of responlist) {
        men.push(i.keyword);
        if (m.text == i.keyword) return reply(i.response);
      }
    }

    const igdl = (url) => {
      return new Promise(async (resolve) => {
        try {
          let json = await (
            await axios.post(
              "https://saveig.app/api/ajaxSearch",
              require("querystring").stringify({
                q: url,
                t: "media",
                lang: "en",
              }),
              {
                headers: {
                  "Content-Type":
                    "application/x-www-form-urlencoded; charset=UTF-8",
                  "Accept-Encoding": "gzip, deflate, br",
                  Origin: "https://saveig.app/en",
                  Referer: "https://saveig.app/en",
                  "Referrer-Policy": "strict-origin-when-cross-origin",
                  "User-Agent": "PostmanRuntime/7.31.1",
                },
              }
            )
          ).data;
          let $ = cheerio.load(json.data);
          let data = [];
          $('div[class="download-items__btn"]').each((i, e) =>
            data.push({
              type: $(e).find("a").attr("href").match(".jpg")
                ? "image"
                : "video",
              url: $(e).find("a").attr("href"),
            })
          );
          if (!data.length)
            return resolve({
              status: false,
            });
          resolve({
            status: true,
            data,
          });
        } catch (e) {
          console.log(e);
          return resolve({
            status: false,
            msg: e.message,
          });
        }
      });
    };

    function didYouMean(inputWord, wordArray) {
      function levenshteinDistance(a, b) {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;

        let matrix = Array(a.length + 1)
          .fill(null)
          .map(() => Array(b.length + 1).fill(null));

        for (let i = 0; i <= a.length; i++) {
          matrix[i][0] = i;
        }

        for (let j = 0; j <= b.length; j++) {
          matrix[0][j] = j;
        }

        for (let i = 1; i <= a.length; i++) {
          for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
              matrix[i - 1][j] + 1,
              matrix[i][j - 1] + 1,
              matrix[i - 1][j - 1] + cost
            );
          }
        }

        return matrix[a.length][b.length];
      }

      if (wordArray.includes(inputWord)) {
        return null;
      }

      let minDistance = Infinity;
      let closestWord = "";

      for (const word of wordArray) {
        const distance = levenshteinDistance(inputWord, word);
        if (distance < minDistance) {
          minDistance = distance;
          closestWord = word;
        }
      }

      const wordLength = Math.max(inputWord.length, closestWord.length);
      const similarity = ((wordLength - minDistance) / wordLength) * 100;
      return {
        correctedWord: closestWord,
        similarity: similarity.toFixed(2),
      };
    }

    if (isCmd) {
      switch (command) {
        case "restart":
          {
            if (!isCreator) return reply(mess.ownerOnly);
            try {
              await reply("restarting");
              const currentDirectory = process.cwd();
              const command = `node index`;
              exec(command, (error, stdout, stderr) => {
                if (error) {
                  console.error("Error:", error);
                  reply("Restart failed");
                } else {
                  console.log("Restart successful");
                  reply("Restart successful");
                }
              });
            } catch (error) {
              console.error("Error:", error);
              reply("An error occurred");
            }
          }
          break;
        case "owner":
          {
            const vcard = `BEGIN:VCARD
VERSION:3.0
N:SatganzDevs
FN:SatganzDevs
ORG:CLAY COMMUNITY;
TEL;TYPE=CELL;TYPE=VOICE;waid=6281316701742:+62 813 1670 1742
EMAIL:satganzdevs@gmail.com
INSTAGRAM:instagram.com/kurniawan_satriaaaa
ADR;TYPE=WORK,PREF:;;Jalan Raya No. 123;Jakarta;DKI Jakarta;12345;Indonesia
END:VCARD`;
            const sentMsg = await satria.sendMessage(
              from,
              {
                contacts: { displayName: "SatganzDevs", contacts: [{ vcard }] },
              },
              { quoted: m }
            );
          }
          break;
        case "menu":
          {
            let _cmd = await getAllCmd();
            let anu = `Hai @${m.sender.split("@")[0]} 👋🏻
Baymax hadir di sini untuk memberikan bantuan seperti sistem otomatis yang Anda sebutkan. Saya adalah sebuah AI (Artificial Intelligence) yang dirancang untuk memberikan dukungan dan informasi dalam berbagai hal melalui berbagai platform, termasuk WhatsApp.

ℹ Informasi tentang Bot:
° *Library* : @whiskeysockets/baileys
° *Version* : 6.4.0
° *Total Hit* : 100
° *Total Fitur* : ${_cmd.length}
° *Hostname* : Replit
° *Tanggal Server* : ${moment.tz("Asia/Jakarta").format("DD/MM/YY")}
° *Waktu Server* : ${moment.tz("Asia/Jakarta").format("HH:mm:ss")}

🚀 ${pickRandom(quotes.motivasi)} ${readMore}${readMore}


〔 𝐀𝐋𝐋𝐌𝐄𝐍𝐔 〕

${_cmd
  .sort((a, b) => a.localeCompare(b))
  .map((v, i) => `⎔ .${v}`)
  .join("\n")}


© 𝟸𝟶𝟸𝟹 ᴋᴜʀɴɪᴀᴡᴀɴ sᴀᴛʀɪᴀ. ᴀʟʟ ʀɪɢʜᴛs ʀᴇsᴇʀᴠᴇᴅ.
`;
            satria
              .sendMessage(
                m.chat,
                {
                  text: anu,
                  contextInfo: {
                    mentionedJid: [m.sender, global.owner + "@s.whatsapp.net"],
                    externalAdReply: {
                      showAdAttribution: true,
                      title: greetingMessage,
                      body: `Powered By © SatganzDevs`,
                      previewType: "PHOTO",
                      mediaType: 1,
                      renderLargerThumbnail: true,
                      thumbnail: fs.readFileSync("./public/src/menu.jpg"),
                      sourceUrl: `https://instagram.com/kurniawan_satriaaaa`,
                    },
                  },
                },
                { quoted: fkontak }
              )
              .then(() => {
                satria.sendMessage(
                  from,
                  {
                    audio: fs.readFileSync(playRandom("./public/sound")),
                    mimetype: "audio/mpeg",
                    ptt: true,
                    waveform: new Uint8Array(64),
                    contextInfo: {
                      externalAdReply: {
                        showAdAttribution: true,
                        title: "👋 Hay Kak :> " + pushname,
                        body: pickRandom(quotes.body),
                        previewType: "PHOTO",
                        mediaType: 1,
                        thumbnail: thumb,
                        sourceUrl: `https://instagram.com/kurniawan_satriaaaa`,
                      },
                    },
                  },
                  { quoted: fkontak }
                );
              });
          }
          break;
        case "jadibot":
          {
            await jadibot(satria, m.sender);
          }
          break;
        case "stopjadibot":
          {
            await stopjadibot(satria, m.sender);
          }
          break;
        case "listjadibot":
          {
            await listjadibot(satria, m);
          }
          break;
        case "pegunungan":
          {
            await axios
              .get(
                "https://a.satganzdevs.repl.co/api/wallpaper/pegunungan?apikey=satganzdevs"
              )
              .then((rspn) => {
                satria.sendMessage(
                  from,
                  { image: { url: rspn.data.url }, caption: "🌄" },
                  { quoted: fkontak }
                );
              });
          }
          break;
        case "addresponse":
          {
            if (!text) return reply(`usage example: addresponse hey|hello`);
            let keyword = q.split("|")[0];
            let response = q.split("|")[1];
            if (!response)
              return reply(
                "please input response, usage example: addresponse hey|hello"
              );
            responlist.push({
              keyword: keyword,
              response: response,
            });
            await fs.writeFileSync(
              `./public/respon/${botNumber.split("@")[0]}.json`,
              JSON.stringify(responlist)
            );
            reply(
              `Successfully added response when someone sends the text ${keyword}\nReply with ${response}`
            );
          }
          break;

        case "delresponse":
          {
            if (!text) return reply(`usage example: delresponse hey`);
            let position = responlist.findIndex((item) => item.keyword === q);
            if (position !== -1) {
              responlist.splice(position, 1);
              await fs.writeFileSync(
                `./public/respon/${botNumber.split("@")[0]}.json`,
                JSON.stringify(responlist)
              );
              reply(`Successfully deleted response for ${q}`);
            } else
              return reply(`Response for ${q} does not exist in the database`);
          }
          break;

        case "responselist":
        case "listresponse":
          {
            let responseListMessage = `*── 「 RESPONSE LIST 」 ──*\nTotal: ${responlist.length}\n\n`;
            for (let i of responlist) {
              responseListMessage += `*KEYWORD:* ${i.keyword}\n*Response:* ${i.response}\n\n`;
            }
            reply(responseListMessage);
          }
          break;
        case "remini":
          {
            await reply("Please Wait...");
            const { remini } = diferentme;
            if (/image/.test(mime)) {
              let media = await satria.downloadMediaMessage(qmsg);
              let proses = await remini(media, "enhance");
              satria.sendMessage(
                m.chat,
                { image: proses, caption: "nih" },
                { quoted: m }
              );
            }
          }
          break;
          case "hdr":
          {
            await reply("Please Wait...");
            const { remini } = diferentme;
            if (/image/.test(mime)) {
              let media = await satria.downloadMediaMessage(qmsg);
              let proses = await remini(media, "enhance");
              let o = await remini(proses, "enhance");
              let o1 = await remini(o, "enhance");
              satria.sendMessage(
                m.chat,
                { image: o1, caption: "nih" },
                { quoted: m }
              );
            }
          }
          break;
        case "candy":
        case "christmas":
        case "3dchristmas":
        case "sparklechristmas":
        case "deepsea":
        case "scifi":
        case "rainbow":
        case "waterpipe":
        case "spooky":
        case "pencil":
        case "circuit":
        case "discovery":
        case "metalic":
        case "fiction":
        case "demon":
        case "transformer":
        case "berry":
        case "thunder":
        case "magma":
        case "3dstone":
        case "neonlight":
        case "glitch":
        case "harrypotter":
        case "brokenglass":
        case "papercut":
        case "watercolor":
        case "multicolor":
        case "neondevil":
        case "underwater":
        case "graffitibike":
        case "snow":
        case "cloud":
        case "honey":
        case "ice":
        case "fruitjuice":
        case "biscuit":
        case "wood":
        case "chocolate":
        case "strawberry":
        case "matrix":
        case "blood":
        case "dropwater":
        case "toxic":
        case "lava":
        case "rock":
        case "bloodglas":
        case "hallowen":
        case "darkgold":
        case "joker":
        case "wicker":
        case "firework":
        case "skeleton":
        case "blackpink":
        case "sand":
        case "glue":
        case "1917":
        case "leaves":
          {
            const textpro = require("./public/lib/textpro");
            if (!q) return reply(`Example : ${prefix + command} satria`);
            await reply(mess.wait);
            let link;
            if (/candy/.test(command))
              link =
                "https://textpro.me/create-christmas-candy-cane-text-effect-1056.html";
            if (/christmas/.test(command))
              link =
                "https://textpro.me/christmas-tree-text-effect-online-free-1057.html";
            if (/3dchristmas/.test(command))
              link =
                "https://textpro.me/3d-christmas-text-effect-by-name-1055.html";
            if (/sparklechristmas/.test(command))
              link =
                "https://textpro.me/sparkles-merry-christmas-text-effect-1054.html";
            if (/deepsea/.test(command))
              link =
                "https://textpro.me/create-3d-deep-sea-metal-text-effect-online-1053.html";
            if (/scifi/.test(command))
              link =
                "https://textpro.me/create-3d-sci-fi-text-effect-online-1050.html";
            if (/rainbow/.test(command))
              link =
                "https://textpro.me/3d-rainbow-color-calligraphy-text-effect-1049.html";
            if (/waterpipe/.test(command))
              link =
                "https://textpro.me/create-3d-water-pipe-text-effects-online-1048.html";
            if (/spooky/.test(command))
              link =
                "https://textpro.me/create-halloween-skeleton-text-effect-online-1047.html";
            if (/pencil/.test(command))
              link =
                "https://textpro.me/create-a-sketch-text-effect-online-1044.html";
            if (/circuit/.test(command))
              link =
                "https://textpro.me/create-blue-circuit-style-text-effect-online-1043.html";
            if (/discovery/.test(command))
              link =
                "https://textpro.me/create-space-text-effects-online-free-1042.html";
            if (/metalic/.test(command))
              link =
                "https://textpro.me/creat-glossy-metalic-text-effect-free-online-1040.html";
            if (/fiction/.test(command))
              link =
                "https://textpro.me/create-science-fiction-text-effect-online-free-1038.html";
            if (/demon/.test(command))
              link =
                "https://textpro.me/create-green-horror-style-text-effect-online-1036.html";
            if (/transformer/.test(command))
              link =
                "https://textpro.me/create-a-transformer-text-effect-online-1035.html";
            if (/berry/.test(command))
              link =
                "https://textpro.me/create-berry-text-effect-online-free-1033.html";
            if (/thunder/.test(command))
              link =
                "https://textpro.me/online-thunder-text-effect-generator-1031.html";
            if (/magma/.test(command))
              link =
                "https://textpro.me/create-a-magma-hot-text-effect-online-1030.html";
            if (/3dstone/.test(command))
              link =
                "https://textpro.me/3d-stone-cracked-cool-text-effect-1029.html";
            if (/neonlight/.test(command))
              link =
                "https://textpro.me/create-3d-neon-light-text-effect-online-1028.html";
            if (/glitch/.test(command))
              link =
                "https://textpro.me/create-impressive-glitch-text-effects-online-1027.html";
            if (/harrypotter/.test(command))
              link =
                "https://textpro.me/create-harry-potter-text-effect-online-1025.html";
            if (/brokenglass/.test(command))
              link =
                "https://textpro.me/broken-glass-text-effect-free-online-1023.html";
            if (/papercut/.test(command))
              link =
                "https://textpro.me/create-art-paper-cut-text-effect-online-1022.html";
            if (/watercolor/.test(command))
              link =
                "https://textpro.me/create-a-free-online-watercolor-text-effect-1017.html";
            if (/multicolor/.test(command))
              link =
                "https://textpro.me/online-multicolor-3d-paper-cut-text-effect-1016.html";
            if (/neondevil/.test(command))
              link =
                "https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html";
            if (/underwater/.test(command))
              link =
                "https://textpro.me/3d-underwater-text-effect-generator-online-1013.html";
            if (/graffitibike/.test(command))
              link =
                "https://textpro.me/create-wonderful-graffiti-art-text-effect-1011.html";
            if (/snow/.test(command))
              link =
                "https://textpro.me/create-snow-text-effects-for-winter-holidays-1005.html";
            if (/cloud/.test(command))
              link =
                "https://textpro.me/create-a-cloud-text-effect-on-the-sky-online-1004.html";
            if (/honey/.test(command))
              link = "https://textpro.me/honey-text-effect-868.html";
            if (/ice/.test(command))
              link = "https://textpro.me/ice-cold-text-effect-862.html";
            if (/fruitjuice/.test(command))
              link = "https://textpro.me/fruit-juice-text-effect-861.html";
            if (/biscuit/.test(command))
              link = "https://textpro.me/biscuit-text-effect-858.html";
            if (/wood/.test(command))
              link = "https://textpro.me/wood-text-effect-856.html";
            if (/chocolate/.test(command))
              link = "https://textpro.me/chocolate-cake-text-effect-890.html";
            if (/strawberry/.test(command))
              link =
                "https://textpro.me/strawberry-text-effect-online-889.html";
            if (/matrix/.test(command))
              link =
                "https://textpro.me/matrix-style-text-effect-online-884.html";
            if (/blood/.test(command))
              link =
                "https://textpro.me/horror-blood-text-effect-online-883.html";
            if (/dropwater/.test(command))
              link = "https://textpro.me/dropwater-text-effect-872.html";
            if (/toxic/.test(command))
              link = "https://textpro.me/toxic-text-effect-online-901.html";
            if (/lava/.test(command))
              link = "https://textpro.me/lava-text-effect-online-914.html";
            if (/rock/.test(command))
              link = "https://textpro.me/rock-text-effect-online-915.html";
            if (/bloodglas/.test(command))
              link =
                "https://textpro.me/blood-text-on-the-frosted-glass-941.html";
            if (/hallowen/.test(command))
              link = "https://textpro.me/halloween-fire-text-effect-940.html";
            if (/darkgold/.test(command))
              link =
                "https://textpro.me/metal-dark-gold-text-effect-online-939.html";
            if (/joker/.test(command))
              link = "https://textpro.me/create-logo-joker-online-934.html";
            if (/wicker/.test(command))
              link = "https://textpro.me/wicker-text-effect-online-932.html";
            if (/firework/.test(command))
              link = "https://textpro.me/firework-sparkle-text-effect-930.html";
            if (/skeleton/.test(command))
              link = "https://textpro.me/skeleton-text-effect-online-929.html";
            if (/blackpink/.test(command))
              link =
                "https://textpro.me/create-blackpink-logo-style-online-1001.html";
            if (/sand/.test(command))
              link =
                "https://textpro.me/write-in-sand-summer-beach-free-online-991.html";
            if (/glue/.test(command))
              link =
                "https://textpro.me/create-3d-glue-text-effect-with-realistic-style-986.html";
            if (/1917/.test(command))
              link =
                "https://textpro.me/1917-style-text-effect-online-980.html";
            if (/leaves/.test(command))
              link = "https://textpro.me/natural-leaves-text-effect-931.html";
            let anu = await textpro.textpro(link, q);
            satria.sendMessage(
              m.chat,
              { image: { url: anu }, caption: `done ga bang?` },
              { quoted: m }
            );
          }
          break;
        case "glitchtext":
        case "writetext":
        case "advancedglow":
        case "typographytext":
        case "pixelglitch":
        case "neonglitch":
        case "flagtext":
        case "flag3dtext":
        case "deletingtext":
        case "blackpinkstyle":
        case "glowingtext":
        case "underwatertext":
        case "logomaker":
        case "cartoonstyle":
        case "papercutstyle":
        case "watercolortext":
        case "effectclouds":
        case "blackpinklogo":
        case "gradienttext":
        case "summerbeach":
        case "luxurygold":
        case "multicoloredneon":
        case "sandsummer":
        case "galaxywallpaper":
        case "1917style":
        case "makingneon":
        case "royaltext":
        case "freecreate":
        case "galaxystyle":
        case "lighteffects":
          {
            const { ephoto } = require("./public/lib/ephoto");
            if (!q) return reply(`Example : ${prefix + command} satria`);
            await reply(mess.wait);
            let link;
            if (/glitchtext/.test(command))
              link =
                "https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html";
            if (/writetext/.test(command))
              link =
                "https://en.ephoto360.com/write-text-on-wet-glass-online-589.html";
            if (/advancedglow/.test(command))
              link = "https://en.ephoto360.com/advanced-glow-effects-74.html";
            if (/typographytext/.test(command))
              link =
                "https://en.ephoto360.com/create-typography-text-effect-on-pavement-online-774.html";
            if (/pixelglitch/.test(command))
              link =
                "https://en.ephoto360.com/create-pixel-glitch-text-effect-online-769.html";
            if (/neonglitch/.test(command))
              link =
                "https://en.ephoto360.com/create-impressive-neon-glitch-text-effects-online-768.html";
            if (/flagtext/.test(command))
              link =
                "https://en.ephoto360.com/nigeria-3d-flag-text-effect-online-free-753.html";
            if (/flag3dtext/.test(command))
              link =
                "https://en.ephoto360.com/free-online-american-flag-3d-text-effect-generator-725.html";
            if (/deletingtext/.test(command))
              link =
                "https://en.ephoto360.com/create-eraser-deleting-text-effect-online-717.html";
            if (/blackpinkstyle/.test(command))
              link =
                "https://en.ephoto360.com/online-blackpink-style-logo-maker-effect-711.html";
            if (/glowingtext/.test(command))
              link =
                "https://en.ephoto360.com/create-glowing-text-effects-online-706.html";
            if (/underwatertext/.test(command))
              link =
                "https://en.ephoto360.com/3d-underwater-text-effect-online-682.html";
            if (/logomaker/.test(command))
              link =
                "https://en.ephoto360.com/free-bear-logo-maker-online-673.html";
            if (/cartoonstyle/.test(command))
              link =
                "https://en.ephoto360.com/create-a-cartoon-style-graffiti-text-effect-online-668.html";
            if (/papercutstyle/.test(command))
              link =
                "https://en.ephoto360.com/multicolor-3d-paper-cut-style-text-effect-658.html";
            if (/watercolortext/.test(command))
              link =
                "https://en.ephoto360.com/create-a-watercolor-text-effect-online-655.html";
            if (/effectclouds/.test(command))
              link =
                "https://en.ephoto360.com/write-text-effect-clouds-in-the-sky-online-619.html";
            if (/blackpinklogo/.test(command))
              link =
                "https://en.ephoto360.com/create-blackpink-logo-online-free-607.html";
            if (/gradienttext/.test(command))
              link =
                "https://en.ephoto360.com/create-3d-gradient-text-effect-online-600.html";
            if (/summerbeach/.test(command))
              link =
                "https://en.ephoto360.com/write-in-sand-summer-beach-online-free-595.html";
            if (/luxurygold/.test(command))
              link =
                "https://en.ephoto360.com/create-a-luxury-gold-text-effect-online-594.html";
            if (/multicoloredneon/.test(command))
              link =
                "https://en.ephoto360.com/create-multicolored-neon-light-signatures-591.html";
            if (/sandsummer/.test(command))
              link =
                "https://en.ephoto360.com/write-in-sand-summer-beach-online-576.html";
            if (/galaxywallpaper/.test(command))
              link =
                "https://en.ephoto360.com/create-galaxy-wallpaper-mobile-online-528.html";
            if (/1917style/.test(command))
              link = "https://en.ephoto360.com/1917-style-text-effect-523.html";
            if (/makingneon/.test(command))
              link =
                "https://en.ephoto360.com/making-neon-light-text-effect-with-galaxy-style-521.html";
            if (/royaltext/.test(command))
              link =
                "https://en.ephoto360.com/royal-text-effect-online-free-471.html";
            if (/freecreate/.test(command))
              link =
                "https://en.ephoto360.com/free-create-a-3d-hologram-text-effect-441.html";
            if (/galaxystyle/.test(command))
              link =
                "https://en.ephoto360.com/create-galaxy-style-free-name-logo-438.html";
            if (/lighteffects/.test(command))
              link =
                "https://en.ephoto360.com/create-light-effects-green-neon-online-429.html";
            let haldwhd = await ephoto(link, q);
            satria.sendMessage(
              m.chat,
              { image: { url: haldwhd }, caption: `done ga bang?` },
              { quoted: m }
            );
          }
          break;
        case "shadow":
        case "write":
        case "romantic":
        case "burnpaper":
        case "smoke":
        case "narutobanner":
        case "love":
        case "undergrass":
        case "doublelove":
        case "coffecup":
        case "underwaterocean":
        case "smokyneon":
        case "starstext":
        case "rainboweffect":
        case "balloontext":
        case "metalliceffect":
        case "embroiderytext":
        case "flamingtext":
        case "stonetext":
        case "writeart":
        case "summertext":
        case "wolfmetaltext":
        case "nature3dtext":
        case "rosestext":
        case "naturetypography":
        case "quotesunder":
        case "shinetext":
          {
            const photooxy = require("./public/lib/photooxy");
            if (!q) return reply(`Example : ${prefix + command} satria`);
            await reply(mess.wait);
            let link;
            if (/stonetext/.test(command))
              link =
                "https://photooxy.com/online-3d-white-stone-text-effect-utility-411.html";
            if (/writeart/.test(command))
              link =
                "https://photooxy.com/logo-and-text-effects/write-art-quote-on-wood-heart-370.html";
            if (/summertext/.test(command))
              link =
                "https://photooxy.com/logo-and-text-effects/3d-summer-text-effect-367.html";
            if (/wolfmetaltext/.test(command))
              link =
                "https://photooxy.com/logo-and-text-effects/create-a-wolf-metal-text-effect-365.html";
            if (/nature3dtext/.test(command))
              link =
                "https://photooxy.com/logo-and-text-effects/make-nature-3d-text-effects-364.html";
            if (/rosestext/.test(command))
              link =
                "https://photooxy.com/logo-and-text-effects/yellow-roses-text-360.html";
            if (/naturetypography/.test(command))
              link =
                "https://photooxy.com/logo-and-text-effects/create-vector-nature-typography-355.html";
            if (/quotesunder/.test(command))
              link =
                "https://photooxy.com/logo-and-text-effects/quotes-under-fall-leaves-347.html";
            if (/shinetext/.test(command))
              link =
                "https://photooxy.com/logo-and-text-effects/rainbow-shine-text-223.html";
            if (/shadow/.test(command))
              link =
                "https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html";
            if (/write/.test(command))
              link =
                "https://photooxy.com/logo-and-text-effects/write-text-on-the-cup-392.html";
            if (/romantic/.test(command))
              link =
                "https://photooxy.com/logo-and-text-effects/romantic-messages-for-your-loved-one-391.html";
            if (/burnpaper/.test(command))
              link =
                "https://photooxy.com/logo-and-text-effects/write-text-on-burn-paper-388.html";
            if (/smoke/.test(command))
              link =
                "https://photooxy.com/other-design/create-an-easy-smoke-type-effect-390.html";
            if (/narutobanner/.test(command))
              link =
                "https://photooxy.com/manga-and-anime/make-naruto-banner-online-free-378.html";
            if (/love/.test(command))
              link =
                "https://photooxy.com/logo-and-text-effects/create-a-picture-of-love-message-377.html";
            if (/undergrass/.test(command))
              link =
                "https://photooxy.com/logo-and-text-effects/make-quotes-under-grass-376.html";
            if (/doublelove/.test(command))
              link =
                "https://photooxy.com/logo-and-text-effects/love-text-effect-372.html";
            if (/coffecup/.test(command))
              link =
                "https://photooxy.com/logo-and-text-effects/put-any-text-in-to-coffee-cup-371.html";
            if (/underwaterocean/.test(command))
              link =
                "https://photooxy.com/logo-and-text-effects/creating-an-underwater-ocean-363.html";
            if (/smokyneon/.test(command))
              link =
                "https://photooxy.com/logo-and-text-effects/make-smoky-neon-glow-effect-343.html";
            if (/starstext/.test(command))
              link =
                "https://photooxy.com/logo-and-text-effects/write-stars-text-on-the-night-sky-200.html";
            if (/rainboweffect/.test(command))
              link =
                "https://photooxy.com/logo-and-text-effects/glow-rainbow-effect-generator-201.html";
            if (/balloontext/.test(command))
              link =
                "https://photooxy.com/logo-and-text-effects/royal-look-text-balloon-effect-173.html";
            if (/metalliceffect/.test(command))
              link =
                "https://photooxy.com/logo-and-text-effects/illuminated-metallic-effect-177.html";
            if (/embroiderytext/.test(command))
              link =
                "https://photooxy.com/logo-and-text-effects/create-embroidery-text-online-191.html";
            if (/flamingtext/.test(command))
              link =
                "https://photooxy.com/logo-and-text-effects/realistic-flaming-text-effect-online-197.html";
            let dehe = await photooxy.photoOxy(link, q);
            satria.sendMessage(
              m.chat,
              { image: { url: dehe }, caption: `done ga bang?` },
              { quoted: m }
            );
          }
          break;
        case "tomp4":
          {
            if (!/webp/.test(mime))
              throw `Reply stiker dengan caption *${prefix + command}*`;
            await reply(mess.loading);
            let { webp2mp4File } = require("./lib/uploader");
            let media = await satria.downloadAndSaveMediaMessage(qmsg);
            let webpToMp4 = await webp2mp4File(media);
            await satria.sendMessage(
              m.chat,
              {
                video: {
                  url: webpToMp4.result,
                  caption: "Convert Webp To Video",
                },
              },
              { quoted: m }
            );
            await fs.unlinkSync(media);
          }
          break;
        case "toaudio":
          {
            if (!/video/.test(mime) && !/audio/.test(mime))
              throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${
                prefix + command
              }`;
            await reply(mess.loading);
            let media = await satria.downloadMediaMessage(qmsg);
            let { toAudio } = require("./public/lib/converter");
            let audio = await toAudio(media, "mp4");
            satria.sendMessage(
              m.chat,
              { audio: audio, mimetype: "audio/mpeg" },
              { quoted: m }
            );
          }
          break;
        case "tomp3":
          {
            if (!/video/.test(mime) && !/audio/.test(mime))
              throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${
                prefix + command
              }`;
            await reply(mess.loading);
            let media = await satria.downloadMediaMessage(qmsg);
            let { toAudio } = require("./lib/converter");
            let audio = await toAudio(media, "mp4");
            satria.sendMessage(
              m.chat,
              {
                document: audio,
                mimetype: "audio/mpeg",
                fileName: `Convert By SatganzDevs.mp3`,
              },
              { quoted: m }
            );
          }
          break;
        case "tovn":
          {
            if (!/video/.test(mime) && !/audio/.test(mime))
              throw `Reply Video/Audio Yang Ingin Dijadikan VN Dengan Caption ${
                prefix + command
              }`;
            await reply(mess.loading);
            let media = await satria.downloadMediaMessage(qmsg);
            let { toPTT } = require("./lib/converter");
            let audio = await toPTT(media, "mp4");
            satria.sendMessage(
              m.chat,
              {
                audio: audio,
                mimetype: "audio/ogg; codecs=opus",
                waveform: new Uint8Array(64),
                ptt: true,
              },
              { quoted: m }
            );
          }
          break;
        case "togif":
          {
            if (!/webp/.test(mime))
              throw `Reply stiker dengan caption *${prefix + command}*`;
            await reply(mess.loading);
            let { webp2mp4File } = require("./lib/uploader");
            let media = await satria.downloadAndSaveMediaMessage(qmsg);
            let webpToMp4 = await webp2mp4File(media);
            await satria.sendMessage(
              m.chat,
              {
                video: {
                  url: webpToMp4.result,
                  caption: "Convert Webp To Video",
                },
                gifPlayback: true,
              },
              { quoted: m }
            );
            await fs.unlinkSync(media);
          }
          break;
        case "ngegalau":
          {
            let bro = await satria.sendMessage(
              from,
              { text: pickRandom(quotes.sad), mentions: [m.sender] },
              { quoted: m }
            );
            satria.sendMessage(
              from,
              {
                audio: fs.readFileSync(playRandom("./public/sound")),
                mimetype: "audio/mpeg",
                ptt: true,
                waveform: new Uint8Array(64),
                contextInfo: {
                  externalAdReply: {
                    showAdAttribution: true,
                    title: ":)",
                    body: pickRandom(quotes.body),
                    previewType: "PHOTO",
                    mediaType: 1,
                    thumbnail: global.thumb,
                    sourceUrl: `https://instagram.com/kurniawan_satriaaaa`,
                  },
                },
              },
              { quoted: bro }
            );
          }
          break;
        case "quotesislami":
          {
            var ha = await fetchJson(
              "https://a.satganzdevs.repl.co/api/randomquote/muslim?apikey=satganzdevs"
            );
            reply(`*${ha.quote}*`);
          }
          break;
        case "verif":
          if (!isCreator) return reply(mess.ownerOnly);
          {
            if (text) {
              let no =
                text.replace(/[^0-9]/g, "").replace(/[^0-9]/g, "") +
                "@s.whatsapp.net";
              let tagsv = no
                .replace(/[@s.whatsapnet]/g, "")
                .replace(/[@S.WHATSAPNET]/g, "");
              var cekon = await satria.onWhatsApp(no);
              if (cekon.length == 0)
                return reply(
                  `Peserta tersebut Sudah Tidak Terdaftar Di WhatsApp`
                );
              if (tagsv == "6281316701742" + "@s.whatsapp.net")
                return reply(`Tidak Bisa Verif My Creator!`);
              var targetnya = m.sender.split("@")[0];
              try {
                var axioss = require("axios");
                let ntah = await axioss.get(
                  "https://www.whatsapp.com/contact/noclient/"
                );
                let email = await axioss.get(
                  "https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=2022"
                );
                let cookie = ntah.headers["set-cookie"].join("; ");
                const cheerio = require("cheerio");
                let $ = cheerio.load(ntah.data);
                let $form = $("form");
                let url = new URL(
                  $form.attr("action"),
                  "https://www.whatsapp.com"
                ).href;
                let form = new URLSearchParams();
                form.append("jazoest", $form.find("input[name=jazoest]").val());
                form.append("lsd", $form.find("input[name=lsd]").val());
                form.append("step", "submit");
                form.append("country_selector", "INDONESIA");
                form.append("phone_number", `${q}`);
                form.append("email", email.data[0]);
                form.append("email_confirm", email.data[0]);
                form.append("platform", "ANDROID");
                form.append(
                  "your_message",
                  `Perdido/roubado: desative minha conta`
                );
                form.append("__user", "0");
                form.append("__a", "1");
                form.append("__csr", "");
                form.append("__req", "8");
                form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0");
                form.append("dpr", "1");
                form.append("__ccg", "UNKNOWN");
                form.append("__rev", "1006630858");
                form.append("__comment_req", "0");

                let res = await axioss({
                  url,
                  method: "POST",
                  data: form,
                  headers: {
                    cookie,
                  },
                });
                let payload = String(res.data);
                if (payload.includes(`"payload":true`)) {
                  reply(`Succes.. Nomor @${tagsv} Telah Out!`);
                } else if (payload.includes(`"payload":false`)) {
                  reply(`Sedang Limit Tunggu Beberapa Saat.`);
                } else reply(util.format(res.data));
              } catch (err) {
                reply(`${err}`);
              }
            } else reply("Masukkan Nomor Target!");
          }
          break;
        case "couple":
          {
            await reply(mess.loading);
            let anu = await fetchJson(
              "https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json"
            );
            let random = anu[Math.floor(Math.random() * anu.length)];
            satria.sendMessage(
              m.chat,
              { image: { url: random.male }, caption: `Couple Male` },
              { quoted: m }
            );
            satria.sendMessage(
              m.chat,
              { image: { url: random.female }, caption: `Couple Female` },
              { quoted: m }
            );
          }
          break;
        case "ytsearch":
          {
            if (!text) throw `Example : ${prefix + command} story wa anime`;
            let yts = require("yt-search");
            let search = await yts(text);
            let teks = "YouTube Search\n\n Result From " + text + "\n\n";
            let no = 1;
            for (let i of search.all) {
              teks += `⭔ No : ${no++}\n⭔ Type : ${i.type}\n⭔ Video ID : ${
                i.videoId
              }\n⭔ Title : ${i.title}\n⭔ Views : ${i.views}\n⭔ Duration : ${
                i.timestamp
              }\n⭔ Upload At : ${i.ago}\n⭔ Author : ${i.author.name}\n⭔ Url : ${
                i.url
              }\n\n─────────────────\n\n`;
            }
            satria.sendMessage(
              m.chat,
              { image: { url: search.all[0].thumbnail }, caption: teks },
              { quoted: m }
            );
          }
          break;
        case "play":
          {
            if (!text) throw `Example : ${prefix + command} story wa anime`;
            let yts = require("yt-search");
            let search = await yts(text);
            let anu =
              search.videos[Math.floor(Math.random() * search.videos.length)];
            console.log(anu);
            try {
              var thumbnya = `https://i.ytimg.com/vi/${anu.url}/hqdefault.jpg`;
            } catch (err) {
              var thumbnya = `https://i.ytimg.com/vi/${anu.url}/default.jpg`;
            }
            try {
              let bro = await ytdl.getInfo(anu.url);
              console.log(bro);
              let mp3File = getRandom(".mp3");
              ytdl(anu.url, {
                filter: "audioonly",
              })
                .pipe(fs.createWriteStream(mp3File))
                .on("finish", async () => {
                  await satria.sendMessage(
                    m.chat,
                    {
                      audio: fs.readFileSync(mp3File),
                      mimetype: "audio/mpeg",
                      contextInfo: {
                        externalAdReply: {
                          showAdAttribution: true,
                          title: anu.title,
                          body: anu.description,
                          previewType: "PHOTO",
                          mediaType: 1,
                          renderLargerThumbnail: true,
                          thumbnailUrl: anu.thumbnail,
                          sourceUrl: `https://instagram.com/kurniawan_satriaaaa?igshid=MzNlNGNkZWQ4Mg==`,
                        },
                      },
                    },
                    { quoted: m }
                  );
                  fs.unlinkSync(mp3File);
                });
            } catch (err) {
              console.log(err);
            }
          }
          break;
        case "ytmp3":
          {
            if (!text)
              throw `Example : ${
                prefix + command
              } https://youtube.com/watch?v=PtFMh6Tccag%27 128kbps`;
            try {
              var thumbnya = `https://i.ytimg.com/vi/${text}/hqdefault.jpg`;
            } catch (err) {
              var thumbnya = `https://i.ytimg.com/vi/${text}/default.jpg`;
            }
            try {
              let bro = await ytdl.getInfo(text);
              let mp3File = getRandom(".mp3");
              ytdl(q, {
                filter: "audioonly",
              })
                .pipe(fs.createWriteStream(mp3File))
                .on("finish", async () => {
                  await satria.sendMessage(
                    m.chat,
                    {
                      audio: fs.readFileSync(mp3File),
                      mimetype: "audio/mpeg",
                      second: 86400,
                      contextInfo: {
                        externalAdReply: {
                          showAdAttribution: true,
                          title: bro.title,
                          body: bro.description,
                          previewType: "VIDEO",
                          mediaType: 1,
                          renderLargerThumbnail: true,
                          thumbnailUrl: thumbnya,
                          sourceUrl: text,
                        },
                      },
                    },
                    { quoted: m }
                  );
                  fs.unlinkSync(mp3File);
                });
            } catch (err) {
              reply(err.toString());
            }
          }
          break;
        case "ytmp4":
          {
            await reply(mess.loading);
            let { ytv } = require("./public/lib/y2mate");
            if (!text)
              throw `Example : ${
                prefix + command
              } https://youtube.com/watch?v=PtFMh6Tccag%27 360p`;
            let quality = args[1] ? args[1] : "360p";
            let media = await ytv(text, quality);
            if (media.filesize >= 100000)
              return m.reply("File Melebihi Batas " + util.format(media));
            satria.sendMessage(
              m.chat,
              {
                video: { url: media.dl_link },
                mimetype: "video/mp4",
                fileName: `${media.title}.mp4`,
                caption: `⭔ Title : ${media.title}\n⭔ File Size : ${
                  media.filesizeF
                }\n⭔ Url : ${isUrl(text)}\n⭔ Ext : MP3\n⭔ Resolusi : ${
                  args[1] || "360p"
                }`,
              },
              { quoted: m }
            );
          }
          break;
        case "tiktok":
          {
            const ttdl = require("@ruhend/tiktok");
            try {
              const Obj = await ttdl(text).then((res) => {
                satria.sendMessage(
                  m.chat,
                  {
                    video: { url: res.video },
                    caption: res.title.replace(/#/g, ""),
                  },
                  { quoted: m }
                );
              });
            } catch (error) {
              const tik = require("tiktod");
              tik.download(text).then((json) => {
                if (json.result.is_image) {
                  for (let i of json.result.media) {
                    satria.sendMessage(
                      m.chat,
                      { image: { url: i } },
                      { quoted: m }
                    );
                  }
                } else if (json.result.is_video) {
                  let Message = {
                    video: { url: json.result.media },
                    caption: `${json.result.caption.replace(/#/g, "")}`,
                  };
                  satria.sendMessage(m.chat, Message, { quoted: m });
                } else {
                  reply("error");
                }
              });
            }
          }
          break;
        case "tiktokmp3":
          {
            try {
              const tik = require("tiktod");
              tik.download(text).then((json) => {
                console.log(json);
                satria.sendMessage(
                  m.chat,
                  {
                    audio: { url: json.result.music.url },
                    mimetype: "audio/mpeg",
                  },
                  { quoted: fkontak }
                );
              });
            } catch (error) {
              console.log(error);
              reply("error");
            }
          }
          break;
        case "jadistiker":
        case "stiker":
        case "s":
          {
            if (/image/.test(mime)) {
              let media = await satria.downloadMediaMessage(qmsg);
              const sticker = new Sticker(media, {
                pack: `\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`,
                author: "@SatganzDevs",
                type: StickerTypes.FULL,
                categories: ["🤩", "🎉"],
                id: "12345",
                quality: 50,
                background: "#000000",
              });
              const buffer = await sticker.toBuffer();
              let memek = await sticker.toFile("sticker.webp");
              satria.sendMessage(
                m.chat,
                { sticker: fs.readFileSync(memek) },
                { quoted: m }
              );
              await fs.unlinkSync(memek);
            } else if (/video/.test(mime)) {
              let media = await satria.downloadMediaMessage(qmsg);
              let encmedia = await satria.sendVideoAsSticker(m.chat, media, m, {
                packname: `\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`,
                author: "@kurniawan_satriaaaa",
              });
              await fs.unlinkSync(encmedia);
            } else {
              reply(
                `Kirim/reply gambar/video/gif dengan caption ${
                  prefix + command
                }\nDurasi Video/Gif 1-9 Detik`
              );
            }
          }
          break;
        case "setppbot":
          {
            if (!isCreator) return reply(mess.ownerOnly);
            let medis = await satria.downloadAndSaveMediaMessage(qmsg, "ppg");
            var { img } = await generateProfilePicture(medis);
            await satria.query({
              tag: "iq",
              attrs: {
                to: botNumber,
                type: "set",
                xmlns: "w:profile:picture",
              },
              content: [
                {
                  tag: "picture",
                  attrs: { type: "image" },
                  content: img,
                },
              ],
            });
            fs.unlinkSync(medis);
            reply("sucess change profile picture");
          }
          break;
        case "akira":
        case "akiyama":
        case "anna":
        case "asuna":
        case "ayuzawa":
        case "boruto":
        case "chitanda":
        case "chitoge":
        case "deidara":
        case "doraemon":
        case "elaina":
        case "emilia":
        case "asuna":
        case "erza":
        case "gremory":
        case "hestia":
        case "hinata":
        case "inori":
        case "isuzu":
        case "itachi":
        case "itori":
        case "kaga":
        case "kagura":
        case "kakasih":
        case "kaori":
        case "kosaki":
        case "kotori":
        case "kuriyama":
        case "kuroha":
        case "kurumi":
        case "loli":
        case "madara":
        case "mikasa":
        case "miku":
        case "minato":
        case "naruto":
        case "natsukawa":
        case "neko2":
        case "nekohime":
        case "nezuko":
        case "nishimiya":
        case "onepiece":
        case "pokemon":
        case "rem":
        case "rize":
        case "sagiri":
        case "sakura":
        case "sasuke":
        case "shina":
        case "shinka":
        case "shizuka":
        case "shota":
        case "tomori":
        case "toukachan":
        case "tsunade":
        case "yatogami":
        case "yuki":
          {
            let res = await fetchJson(
              `https://raw.githubusercontent.com/KazukoGans/database/main/anime/${command}.json`
            );
            let cita = res[Math.floor(Math.random() * res.length)];
            await satria.sendMessage(
              from,
              { image: { url: cita }, caption: "nih" },
              { quoted: fkontak }
            );
          }
          break;
        case "lyrics":
          {
            if (!q) return reply("please input the query!");
            let res = await fetchJson(
              `https://fantox001-scrappy-api.vercel.app/lyrics?search=${q}`
            );
            reply(res.lyrics);
          }
          break;
        case "toqr":
          {
            let mek = await toDataURL(q, { scale: 8 });
            var img = await Buffer.from(mek, "base64");
            satria.sendMessage(
              from,
              { image: img, caption: "nih" },
              { quoted: m }
            );
          }
          break;
        default:
      }
      if (m.text.startsWith(".")) {
        let loli = getAllCmd();
        let suggestion = didYouMean(command, loli);
        if (suggestion !== null) {
          reply(
            `Command *${m.text}* Tidak Ada Dalam List Menu\nMungkin Maksud Anda .*${suggestion.correctedWord}*?`
          );
        }
      }
    }
    if (budy.startsWith(">")) {
      if (!isCreator) return reply(mess.ownerOnly);
      try {
        let evaled = await eval(budy.slice(2));
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
        await reply(evaled);
      } catch (err) {
        await reply(String(err));
      }
    }
    if (budy.startsWith("$")) {
      if (!isCreator) return reply(mess.ownerOnly);
      reply("Executing...");
      exec(budy.slice(2), (err, stdout) => {
        if (err) return reply(`${err}`);
        if (stdout) return reply(stdout);
      });
    }
    if (budy.includes("bot")) {
      let aud = [
        "https://ami.animecharactersdatabase.com/audio/104732/1/104732-1-29.mp4",
        "https://ami.animecharactersdatabase.com/audio/107762/3/107762-3-20.mp4",
        "https://ami.animecharactersdatabase.com/audio/1556/1/1556-1-205.mp4",
        "https://ami.animecharactersdatabase.com/audio/105462/1/105462-1-24.mp4",
      ];
      satria.sendMessage(
        from,
        {
          audio: { url: pickRandom(aud) },
          mimetype: "audio/mpeg",
          ptt: true,
          seconds: 6000,
        },
        { quoted: m }
      );
    }
    // Auto Dl
    if (budy.startsWith("https://")) {
      if (budy.includes("instagram.com")) {
        const ig = require("instagram-url-dl");
        satria.sendMessage(m.chat, {
          react: {
            text: "⏳",
            key: { remoteJid: m.chat, fromMe: false, id: m.key.id },
          },
        });
        await ig(budy).then((res) => console.log(res));
      }
      if (budy.includes("tiktok")) {
        await satria.sendMessage(m.chat, {
          react: {
            text: "🕛",
            key: { remoteJid: m.chat, fromMe: false, id: m.key.id },
          },
        });
        const ttdl = require("@ruhend/tiktok");
        try {
          const Obj = await ttdl(budy).then((res) => {
            console.log(res)
            satria.sendMessage(
              m.chat,
              {
                video: { url: res.video },
                caption: res.title,
              },
              { quoted: m }
            );
          });
        } catch (error) {
          const tik = require("tiktod");
          tik.download(budy).then((json) => {
            if (json.result.is_image) {
              for (let i of json.result.media) {
                satria.sendMessage(
                  m.chat,
                  { image: { url: i } },
                  { quoted: m }
                );
              }
            } else if (json.result.is_video) {
              let Message = {
                video: { url: json.result.media },
                caption: `${json.result.caption}`,
              };
              satria.sendMessage(m.chat, Message, { quoted: m });
            } else {
              reply("error");
            }
          });
        }
      }
    }
    if (isCmd && budy.toLowerCase() != undefined) {
      if (m.chat.endsWith("broadcast")) return;
      if (m.isBaileys) return;
      if (!budy.toLowerCase()) return;
    }
  } catch (err) {
    const errorMessage = `
┌──「 Terjadi Kesalahan 」
│
├ Error : ${util.format(err)}
├ File : ${err.fileName || "Tidak ada informasi file"}
├ Baris : ${err.lineNumber || "Tidak ada informasi baris"}
├ Stack Trace : ${err.stack || "Tidak ada informasi tumpukan panggilan"}
├ Modul : ${err.module || "Tidak ada informasi modul"}
├ Referensi : ${err.reference || "Tidak ada informasi referensi"}
├ Pernyataan Break : ${err.breakStatement || "Tidak ada pernyataan break"}
│
┗─────────────────`;
    console.error(errorMessage);
    satria.sendMessage("6281316701742@s.whatsapp.net", { text: errorMessage });
  }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.blueBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
