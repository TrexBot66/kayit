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
    let kod = "`"
  if(!ardademr) return  message.channel.send(new Discord.MessageEmbed().setColor('#3fe4ff').setDescription(`${message.author}, bir seçenek belirtmelisin. ${kod}ayarla${kod} veya ${kod}kapat${kod}`));
    if (ardademr == 'ayarla' || ardademr == 'aç') {
        if(db2.get(`isimkanali_${message.guild.id}`)) return message.channel.send(new Discord.MessageEmbed().setColor('#3fe4ff').setDescription(`${message.author}, zaten bir kanal ayarlanmış.`))
  let isimkanali = message.mentions.channels.first();
  if (!isimkanali) return message.channel.send(new Discord.MessageEmbed().setColor('#3fe4ff').setDescription(`${message.author}, bunun için ${kod}!isim-kanal ayarla #kanal${kod} yazarak kanal ayarlamalısın. `))
  let isimkanali2 = await  db2.set(`isimkanali_${message.guild.id}`, message.mentions.channels.first().id)
    message.channel.send(new Discord.MessageEmbed().setColor('#3fe4ff').setDescription(`${message.author}, isim belirtme kanalı <#${isimkanali2}> olarak ayarlandı.`))
     
  } 
// ArdaDemr Youtube Kanalına ait yapay zekalı kayıt botu altyapısı
  if (ardademr == 'kapat' || ardademr == 'sıfırla') {
    if(!db2.get(`isimkanali_${message.guild.id}`)) return message.channel.send(new Discord.MessageEmbed().setColor('#3fe4ff').setDescription(`${message.author}, zaten herhangi bir kanal ayarlanmamış.`))
        db2.delete(`isimkanali_${message.guild.id}`)

        message.channel.send(new Discord.MessageEmbed().setColor('#3fe4ff').setDescription(`${message.author}, isim belirtme kanalı devre dışı bırakıldı.`))
  }
};
  
  
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['isim-kanalı'],
    permLevel: 0
}

exports.help = {
    name: 'isim-kanal'
}