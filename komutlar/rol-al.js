const Discord = require('discord.js')
const client = new Discord.Client()
const {
    JsonDatabase
} = require("wio.db");
// ArdaDemr Youtube Kanalına ait yapay zekalı kayıt botu altyapısı
const db2 = new JsonDatabase("oto-kayit");

exports.run = async (client, message, args) => {
    let kod = "`"
    if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(new Discord.MessageEmbed().setColor('#3fe4ff').setDescription(`${message.author}, bu komutu kullanabilmek için **SUNUCUYU YÖNET** iznine sahip olmalısın.`));
    if (!message.member.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setColor('#3fe4ff').setDescription(`${message.author}, bunu yapabilmem için bana **YÖNETİCİ** yetkisi vermelisin.`));
    if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setColor('#3fe4ff').setDescription(`${message.author}, bir seçenek belirtmelisin. ${kod}ayarla${kod} veya ${kod}kapat${kod}`));
    if(args[0] === 'ayarla') {
        var rol = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id == args[1])
        if(!rol) return message.channel.send(new Discord.MessageEmbed().setColor('#3fe4ff').setDescription(`${message.author}, kullanıcılar adını yazdığında hangi rol alınsın? O rolü etiketlemelisin.`));
        let verilecekrol = message.guild.roles.cache.find(x => x.id == `${rol.id}`)
        if (message.guild.me.roles.highest.position <= verilecekrol.position) return message.channel.send(new Discord.MessageEmbed().setColor('#3fe4ff').setDescription(`${message.author}, ${rol} rolünü alabilmem için benim yetkimin daha üstte olması gerek.`));
        db2.set(`isimrolal_${message.guild.id}`, rol.id)
        message.channel.send(new Discord.MessageEmbed().setColor('#3fe4ff').setDescription(`${message.author}, kullanıcılar adını yazdığında ${rol} rolünü alacağım.`));
    } else if(args[0] == 'kapat') {
        if(!db2.has(`isimrolal_${message.guild.id}`)) return message.channel.send(new Discord.MessageEmbed().setColor('#3fe4ff').setDescription(`${message.author}, zaten herhangi bir rol ayarlı değil.`)); else {
            db2.delete(`isimrolal_${message.guild.id}`)
            message.channel.send(new Discord.MessageEmbed().setColor('#3fe4ff').setDescription(`${message.author}, kullanıcılar adını yazdığında artık rol almayacağım.`));
        }
    }
}
exports.conf = {
    aliases: ['isim-rolü-al']
}
exports.help = {
    name: "isim-rol-al"
}

// ArdaDemr Youtube Kanalına ait yapay zekalı kayıt botu altyapısı