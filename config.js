const fs = require("fs");
const chalk = require("chalk");
const moment = require('moment-timezone')
const Dated = moment().tz("Asia/Jakarta").format("HH:mm:ss");





global.prefa = ['/','!','.','#']
global.autodetect = true
global.owner = ["6281316701742"];
global.author = "";
global.packname = "Created By SatganzDevs";
global.sessionName = "Sessions";
global.versionbot = "2.0.0";
global.mess = {
loading: "Sedang memuat...",
ownerOnly: "Fitur ini hanya tersedia untuk pemilik bot.",
fetchingData: "Mengambil data terkini...",
adminOnly: "Fitur ini hanya dapat digunakan oleh admin grup!",
groupOnly: "Fitur ini hanya dapat digunakan dalam grup!",
botAdminRequired: "Bot harus menjadi admin grup terlebih dahulu untuk menggunakan fitur ini!",
};

global.quotes = {
heker: ["Dear kamu yang tertulis di halaman defacementku, Kapan jadi pacarku?","Aku rela ko jadi Processor yg kepanasan, asalkan kmu yg jadi heatsink'y yg setiap saat bisa mendinginkan ku.","Gak usah nyari celah xss deh, karena ketika kamu ngeklik hatiku udah muncul pop up namamu.","berharap setelah aku berhasil login di hati kamu ga akan ada tombol logout, dan sessionku ga bakal pernah expired.","Masa aku harus pake teknik symlink bypass buat buka-buka folder hatimu yg open_basedir enabled.","Diriku dan Dirimu itu ibarat PHP dan MySQL yang belum terkoneksi.","Jangan cuma bisa inject hatinya,tapi harus bisa patchnya juga. Biar tidak selingkuh sama hacker lain.","Aku memang programmer PHP,tapi aku nggak akan php-in kamu kok.","Eneeeng. | Apache? | Km wanita yg paling Unix yg pernah aku kenal |","Sayang, capslock kamu nyala ya? | ngga, kenapa emangnya? | soalnya nama kamu ketulis gede bgt di hati aku | zzz! smile","Aku deketin kamu cuma untuk redirect ke hati temenmu.","Domain aja bisa parkir, masa cintaku ga bisa parkir dihatimu?","Aku boleh jadi pacarmu? | 400(Bad Request) | Aku cium boleh? | 401(Authorization Required) | Aku buka bajumu yah | 402(Payment Required) sad","kamu tau ga beda'y kamu sama sintax PHP, kalo sintax PHP itu susah di hafalin kalo kamu itu susah di lupain","Kamu dulu sekolah SMK ambil kejuruan apa? | Teknik Komputer Jaringan | Terus sekarang bisa apa aja? | Menjaring hatimu lewat komputerku | biggrin","Jika cinta itu Array, maka,cintaku padamu tak pernah empty jika di unset().","SQLI ( Structured Query Love Injection )","aku ingin kamu rm -rf kan semua mantan di otak mu,akulah root hati kamu","Senyumu bagaikan cooler yang menyejukan hatiku ketika sedang overclock.","kamu adalah terminalku, dimana aku menghabiskan waktuku untuk mengetikan beribu baris kode cinta untukmu smile","Aku seneng nongkrong di zone-h, karena disanalah aku arsipkan beberapa website yang ada foto kamunya.","hatiku ibarat vps hanya untukmu saja bukan shared hosting yg bisa tumpuk berbagai domain cinta.","Aku bukanlah VNC Server Tanpa Authentication yg bisa kamu pantau kapan saja.","Jangan men-dualboot-kan hatiku kepadamu.","cintaku kan ku Ctrl+A lalu kan ku Ctrl+C dan kan ku Ctrl+V tepat di folder system hatimu.","KDE kalah Cantiknya, GNOME kalah Simplenya, FluxBox kalah Ringannya, pokonya Semua DE itu Kalah Sama Kamu.","Cintamu bagaikan TeamViewer yang selalu mengendalikan hatiku","cinta kita tak akan bisa dipisahkan walau setebal apapun itu firewall...!!"],
motivasi: [
  "Jangan kamu merasa lemah dan jangan bersedih, sebab kamu paling tinggi derajatnya jika kamu beriman. (Q.S Ali Imran: 139)",
  "Agar kamu tidak bersedih hati terhadap apa yang luput dari kamu dan tidak pula terlalu gembira terhadap apa yang diberikan-Nya kepadamu. Dan Allah tidak menyukai terhadap orang yang sombong dan membanggakan diri. (Q.S Al-Hadid: 23)",
  "Kamu sekali-kali tidak akan melihat pada ciptaan Tuhan Yang Maha Pemurah sesuatu yang tidak seimbang. Maka lihatlah berulang-ulang, adakah kamu lihat sesuatu yang tidak seimbang? (Q.S Al-Mulk: 3)",
  "Dan barangsiapa berbuat kesalahan atau dosa, kemudian dia tuduhkan kepada orang yang tidak bersalah, maka sungguh dia telah memikul suatu kebohongan dan dosa yang nyata. (Q.S An-Nisa’: 112)",
  "Dan janganlah kamu berbuat kerusakan di muka bumi setelah diciptakan dengan baik. (Q.S Al-A'raf: 56)",
  "Dan carilah pada apa yang telah dianugerahkan kepadamu (kebahagiaan) negeri akhirat dan janganlah kamu melupakan bagianmu dari (kenikmatan) duniawi. (Q.S Al-Qashas: 77)",
  "Dan kehidupan dunia ini tidak lain hanyalah kesenangan yang menipu. (Q.S Al-Hadid: 20)",
  "Bagi manusia ada malaikat-malaikat yang selalu mengikutinya di hadapan dan di belakangnya, mereka menjaganya atas perintah Allah. (Q.S Ar-Ra’d: 11)",
  "Dan Allah mengeluarkan kamu dari perut ibumu dalam keadaan tidak mengetahui sesuatu apa pun, dan Dia memberimu pendengaran, penglihatan, dan hati agar kamu bersyukur. (Q.S An-Nahl: 78)",
  "Kebaikan tidak sama dengan kejahatan. Tolaklah kejahatan itu dengan cara yang lebih baik sehingga yang memusuhimu akan seperti teman yang setia. (Q.S Fusshilat: 34)",
  "Barang siapa yang mengerjakan amal saleh, baik laki-laki maupun perempuan dalam keadaan beriman, maka sesungguhnya akan kami berikan kepadanya kehidupan yang baik, dan sesungguhnya akan kami berikan balasan kepada mereka dengan pahala yang lebih baik dari apa yang telah mereka kerjakan. (Q.S An-Nahl: 97)",
  "Hai orang-orang yang beriman, mintalah pertolongan kepada Allah dengan sabar dan salat. Sesungguhnya Allah beserta orang-orang yang sabar. (Q.S Al-Baqarah: 153)",
  "Sesungguhnya Allah tidak akan mengubah nasib suatu kaum sehingga mereka mengubah keadaan yang ada pada diri mereka sendiri. (Q.S Ar-Ra’d: 11)",
  "Apakah manusia itu mengira bahwa mereka dibiarkan (saja) mengatakan, 'Kami telah beriman' sedang mereka tidak diuji lagi? (Q.S Al-'Ankabut: 2)",
  "Telah tampak kerusakan di darat dan di laut disebabkan karena ulah tangan manusia. (Q.S Ar-Rum: 41)",
  "Di mana saja kamu berada, kematian akan mendapatkanmu, kendati pun kamu berada dalam benteng yang tinggi dan kukuh. (Q.S An-Nisa: 78)",
  "Tiap-tiap yang berjiwa pasti akan merasakan mati. (Q.S Ali Imran: 185)",
  "Dan sesungguhnya pada binatang ternak itu benar-benar terdapat pelajaran bagimu. Kami memberimu minum dari apa yang berada dalam perutnya berupa susu yang bersih. (Q.S An-Nahl: 66)",
  "Dan engkau akan melihat gunung-gunung, yang engkau kira tetap berdiri di tempatnya, padahal dia berjalan seperti awan berjalan. (Q.S An-Naml: 88)",
  "Dan tiadalah kehidupan dunia ini, selain dari main-main dan senda gurau belaka. Dan sungguh kampung akhirat itu lebih baik bagi orang-orang yang bertakwa. Maka tidakkah kamu memahaminya? (Q.S Al-An’am: 32)",
  "Dan adapun orang-orang yang takut pada kebesaran Tuhannya dan menahan diri dari keinginan hawa nafsunya, maka sesungguhnya surgalah tempat tinggal mereka. (Q.S An-Nazi’at: 40-41)",
  "Dan jika setan datang menggodamu, maka berlindunglah kepada Allah. Sungguh, Dia Maha mendengar lagi Maha mengetahui. (Q.S Al-A’raf: 200)",
  "Dan siapakah yang lebih sesat daripada orang yang mengikuti hawa nafsunya dengan tidak mendapat petunjuk dari Allah sedikit pun. Sesungguhnya Allah tidak memberi petunjuk kepada orang-orang yang zalim. (Q.S Al-Qashas: 50)",
  "Wahai orang-orang yang beriman, mintalah pertolongan kepada Allah dengan sabar dan salat. Sesungguhnya Allah beserta orang-orang yang sabar. (Q.S Al-Baqarah: 153)",
  "Sesungguhnya Allah tidak akan mengubah nasib suatu kaum sehingga mereka mengubah keadaan yang ada pada diri mereka sendiri. (Q.S Ar-Ra’d: 11)",
  "Apakah manusia itu mengira bahwa mereka dibiarkan (saja) mengatakan, 'Kami telah beriman' sedang mereka tidak diuji lagi? (Q.S Al-'Ankabut: 2)",
  "Telah tampak kerusakan di darat dan di laut disebabkan karena ulah tangan manusia. (Q.S Ar-Rum: 41)",
  "Di mana saja kamu berada, kematian akan mendapatkanmu, kendati pun kamu berada dalam benteng yang tinggi dan kukuh. (Q.S An-Nisa: 78)",
  "Tiap-tiap yang berjiwa pasti akan merasakan mati. (Q.S Ali Imran: 185)",
  "Dan sesungguhnya pada binatang ternak itu benar-benar terdapat pelajaran bagimu. Kami memberimu minum dari apa yang berada dalam perutnya berupa susu yang bersih. (Q.S An-Nahl: 66)",
  "Dan engkau akan melihat gunung-gunung, yang engkau kira tetap berdiri di tempatnya, padahal dia berjalan seperti awan berjalan. (Q.S An-Naml: 88)",
  "Dan tiadalah kehidupan dunia ini, selain dari main-main dan senda gurau belaka. Dan sungguh kampung akhirat itu lebih baik bagi orang-orang yang bertakwa. Maka tidakkah kamu memahaminya? (Q.S Al-An’am: 32)",
  "Dan adapun orang-orang yang takut pada kebesaran Tuhannya dan menahan diri dari keinginan hawa nafsunya, maka sesungguhnya surgalah tempat tinggal mereka. (Q.S An-Nazi’at: 40-41)",
  "Dan jika setan datang menggodamu, maka berlindunglah kepada Allah. Sungguh, Dia Maha mendengar lagi Maha mengetahui. (Q.S Al-A’raf: 200)"],
sad: [
"Dalam gelapnya malam, aku merenungkan kesunyian hatiku yang tak terucapkan.",
"Setiap senyuman yang kurasakan, hanya lapisan tipis yang menyembunyikan rasa hampa di hatiku.",
"Jika rindu bisa melukiskan, maka hatiku adalah kanvas yang dipenuhi lukisan rindu padamu.",
"Kadang kala, diam lebih mengiris hati daripada kata-kata yang menyakitkan.",
"Aku tersesat dalam labirin perasaan, mencari jalan keluar dari kerumitan hati ini.",
"Air mata adalah bahasa hati yang tak bisa kubisikkan padamu.",
"Mencintaimu adalah seperti menatap langit yang tak pernah kutemui ujungnya.",
"Hati ini seperti puing reruntuhan, masih tertinggal kenangan yang sulit kulupakan.",
"Aku terdampar di pantai kesendirian, dikelilingi ombak kerinduan yang tak pernah surut.",
"Dalam senyapku, aku merindukan kehadiranmu yang tak pernah datang.",
"Aku terhanyut dalam cinta yang tak kunjung usai, seperti gelombang yang terus memukul pantai.",
"Rasa ini bagai angin, tak bisa kugapai meski terasa begitu dekat.",
"Dalam sepi, aku menemukan diriku yang hilang dan kesepian yang membekas.",
"Kesunyian malam mempertemukan aku dan rindu yang tak pernah sirna.",
"Aku mencoba mencari arti dari cinta, tapi yang kutemukan adalah kekosongan yang dalam.",
"Bila ada luka yang tak kunjung sembuh, mungkin itu adalah hati yang tak bisa kusembuhkan.",
"Aku seperti bunga layu yang kehilangan hembusan angin penyejuk.",
"Rindu ini seperti bayangan, selalu mengikuti setiap langkahku.",
"Kamu adalah lukisan terindah yang tak pernah kumiliki.",
"Mungkin cinta memang takdir yang tak selalu bahagia.",
"Hati ini hancur berkeping-keping, tersisa luka yang tak kunjung sembuh.",
"Setiap langkahku penuh dengan keraguan, tak tahu kemana harus melangkah.",
"Dalam kesendirian, aku menemukan diriku yang terluka dan terabaikan.",
"Mencintaimu adalah penderitaan yang manis, seperti racun yang tak bisa ku tolak.",
"Aku berharap ada seseorang yang mengerti betapa rapuhnya hatiku, tanpa harus kukatakan.","Air mata adalah bahasa hati yang paling jujur, ia mengatakan apa yang bibir tak bisa sampaikan.",
"Perpisahan adalah pahit, namun kadang-kadang itulah yang diperlukan untuk menemukan kebahagiaan sejati.",
"Hilangnya seseorang yang dicintai adalah seperti kehilangan bagian dari diri sendiri.",
"Ketika rasa sakit tak terbendung, senyuman adalah topeng yang kusimpan rapat-rapat.",
"Cinta sejati adalah ketika hati tetap merindukan seseorang, meski akhirnya harus melepaskan.",
"Dalam hujan yang turun, air mataku bercampur rindu padamu.",
"Aku belajar tentang cinta dari patah hati yang tak pernah sembuh.",
"Seberat apapun beban yang kubawa, kurasakan lebih ringan jika kau ada di sisiku.",
"Cinta adalah perjalanan yang kadang menyakitkan, namun tak pernah sia-sia untuk ditempuh.",
"Setiap detik tanpamu terasa begitu lama, hati ini merasa kehilangan arah.",
"Kehilanganmu adalah lukisan yang tak pernah kuselesaikan.",
"Rindu adalah senyawa yang tak bisa kugantikan dengan apapun.",
"Hatiku seperti angin yang tak pernah menemukan arah, mencari jawaban atas segala rasa yang tak pernah habis.",
"Rasa ini bagai hujan, tak henti mengalir walau langit cerah pun.",
"Kita kadang mencari arti dari cinta, namun yang kutemukan adalah kesedihan yang mendalam.",
"Bila cinta berakhir, hati ini hanyalah reruntuhan puing-puing yang tak berarti.",
"Rasa sakit ini seperti angin yang kencang, menghempaskan hatiku tanpa ampun.",
"Ada kehampaan yang mendalam ketika kau tak lagi hadir dalam setiap sudut kehidupanku.",
"Hati ini hancur menjadi jutaan pecahan, berteriak meminta pertolongan yang tak kunjung datang.",
"Rasa ini bagai samudera yang dalam, kadang tenang namun kadang juga ganas menghantam hati.",
"Ku mencoba tersenyum, namun rasa sakit tak bisa terbendung lagi.",
"Cinta adalah jalan yang berliku, kadang kita tersesat dalam kesedihan yang tak berujung.",
"Luka ini semakin dalam, seiring waktu berjalan tanpa kehadiranmu.",
"Bila cinta berubah menjadi kenangan, hati ini menjadi taman duka yang tak bisa kuungkapkan.",
"Kehilanganmu adalah beban yang tak pernah hilang, seperti bayang-bayang yang selalu mengikuti langkahku."
],
body: [
"Be the change.",
"Find your bliss.",
"Live in the moment.",
"Stay humble.",
"Create your destiny.",
"Choose happiness.",
"Keep it simple.",
"Think positive.",
"Never settle.",
"Do what you love.",
"Fear less, hope more.",
"Focus on the good.",
"Trust the journey.",
"Live with purpose.",
"Dare to dream.",
"Love yourself.",
"Learn from failure.",
"Take a leap.",
"Stay curious.",
"Practice gratitude.",
"Embrace the unknown.",
"Let it go.",
"Stay authentic.",
"Forgive and heal.",
"Believe in miracles.",
"Be brave.",
"Find inner peace.",
"Keep moving forward.",
"Follow your heart.",
"Be present.",
"Make it happen.",
"Never lose hope.",
"Be a light.",
"Find your strength.",
"Cherish the moments.",
"Laugh often.",
"Stay inspired.",
"Seek adventure.",
"Trust yourself.",
"Embrace imperfection.",
"Stay positive, be kind.",
"Live with no regrets.",
"Choose love over fear.",
"Believe in magic.",
"Create your own path.",
"Love conquers all.",
"Be fearless in pursuit.",
"Stay true to yourself.",
"Find your inner spark.",
"Keep the faith."
]
}

global.greetingMessage = "";
if (Dated < "05:00:00") {
  global.greetingMessage = "Good morning! 🌅";
} else if (Dated < "11:00:00") {
  global.greetingMessage = "Good morning! 🌄";
} else if (Dated < "15:00:00") {
  global.greetingMessage = "Good afternoon! 🏙";
} else if (Dated < "18:00:00") {
  global.greetingMessage = "Good afternoon! 🌅";
} else if (Dated < "19:00:00") {
  global.greetingMessage = "Good evening! 🌃";
} else {
  global.greetingMessage = "Good evening! 🌌";
}
global.thumb = fs.readFileSync('./public/src/menu.jpg')

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});