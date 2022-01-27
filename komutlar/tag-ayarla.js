const Discord = require('discord.js')
const {
    JsonDatabase
} = require("wio.db");
// ArdaDemr Youtube Kanalına ait yapay zekalı kayıt botu altyapısı
const db2 = new JsonDatabase("oto-kayit");
// ArdaDemr Youtube Kanalına ait yapay zekalı kayıt botu altyapısı
exports.run = async(client, message, args) => {
    if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(new Discord.MessageEmbed().setColor('#3fe4ff').setDescription(`${message.author}, bu komutu kullanabilmek için **SUNUCUYU YÖNET** iznine sahip olmalısın.`));
    if (!message.member.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setColor('#3fe4ff').setDescription(`${message.author}, bunu yapabilmem için bana **YÖNETİCİ** yetkisi vermelisin.`));
    var ardademr = args[0];
    var tag = args[1];
    let kod = "`"
  if(!ardademr) return  message.channel.send(new Discord.MessageEmbed().setColor('#3fe4ff').setDescription(`${message.author}, bir seçenek belirtmelisin. ${kod}ayarla${kod} veya ${kod}kapat${kod}`));
    if (ardademr == 'ayarla' || ardademr == 'aç') {
  if (!tag) return message.channel.send(new Discord.MessageEmbed().setColor('#3fe4ff').setDescription(`${message.author}, bunun için ${kod}!isim-tag ayarla tag${kod} yazarak tag ayarlamalısın. `))
  let tag2 = await  db2.set(`isimtag_${message.guild.id}`,tag)
    message.channel.send(new Discord.MessageEmbed().setColor('#3fe4ff').setDescription(`${message.author}, sunucu tagınız ${tag2} olarak ayarlandı.`))
     
  } 
// ArdaDemr Youtube Kanalına ait yapay zekalı kayıt botu altyapısı
  if (ardademr == 'kapat' || ardademr == 'sıfırla') {
    if(!db2.get(`isimtag_${message.guild.id}`,tag)) return message.channel.send(new Discord.MessageEmbed().setColor('#3fe4ff').setDescription(`${message.author}, zaten herhangi bir tag ayarlanmamış.`))
    db2.delete(`isimtag_${message.guild.id}`,tag);

        message.channel.send(new Discord.MessageEmbed().setColor('#3fe4ff').setDescription(`${message.author}, tag sistemi devre dışı bırakıldı.`))
  }
};
  
  
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['isim-tagı'],
    permLevel: 0
}

exports.help = {
    name: 'isim-tag'
}