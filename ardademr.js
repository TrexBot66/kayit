const Discord = require("discord.js");
const client = new Discord.Client();
const express = require("express");
const {
    JsonDatabase
  } = require("wio.db");
  const db = new JsonDatabase("myDatabase");
  const db2 = new JsonDatabase("oto-kayit");
const app = express();

const fs = require("fs");
                              // ArdaDemr Youtube Kanalına ait yapay zekalı kayıt botu altyapısı
//Uptime için__________________________________________________________________
app.get("/", (req, res) => {
  res.send("ArdaDemr Discord Bot Altyapısı");
});
app.listen(process.env.PORT);

//KOMUT Algılayıcı______________________________________________________________
client.commands = new Discord.Collection();

fs.readdir("./komutlar/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let cmd = require(`./komutlar/${file}`);
    let cmdFileName = file.split(".")[0];
    console.log(`Komut Yükleme Çalışıyor: ${cmdFileName}`);
    client.commands.set(cmd.help.name, cmd);
  });
});

//EVENTS Yükleyici_______________________________________________________________
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Etkinlik Yükleme Çalışıyor: ${eventName}`);
    client.on(eventName, event.bind(null, client));
  });
});

client.on("ready", () => {
  console.log(`ArdaDemr Discord Bot Altyapısı BOT AKTİF`);
});

client.login(process.env.TOKEN);
// ArdaDemr Youtube Kanalına ait yapay zekalı kayıt botu altyapısı


//---------------------KAYIT SİSTEMİ-------------------------\\
var isimler = require("./isimler");

client.on("message",message=>{
if(message.channel.type=="dm") return false;
if(message.author.bot) return false;
if(message.attachments.size > 0) return false;
let isimkanali = db2.get(`isimkanali_${message.guild.id}`)
const isimkanalimesaj = message.guild.channels.cache.find(kanal => kanal.id === isimkanali);
if(isimkanali) {
  if(message.channel.id == `${isimkanali}`){
    if(!isimler.map(a=>a.name).includes(message.content.toLowerCase().split("")[0].toUpperCase()+message.content.toLowerCase().slice(1))){
	message.reply("gerçek adın nedir?").then(message=>{
setTimeout(function(){
message.delete();
},5000)

});
setTimeout(function(){
message.delete();
},5000)

    }else{
        let verilecekrol = db2.fetch(`isimrol_${message.guild.id}`)
        let alinacakrol = db2.fetch(`isimrolal_${message.guild.id}`)
        var tag = db2.get(`isimtag_${message.guild.id}`) || "";
setTimeout(function(){
  message.guild.member(message.author.id).setNickname(tag+" "+message.content.toLowerCase().split("")[0].toUpperCase()+message.content.toLowerCase().slice(1));
},1500)
setTimeout(function(){
  if(db2.has(`isimrolal_${message.guild.id}`)) {
    message.guild.member(message.author).roles.remove(alinacakrol);
      }
},2500)
setTimeout(function(){
  if(db2.has(`isimrol_${message.guild.id}`)) {
    message.guild.member(message.author).roles.add(verilecekrol);
      }
},3500)
       };
     }
  }
});
//---------------------KAYIT SİSTEMİ-------------------------\\