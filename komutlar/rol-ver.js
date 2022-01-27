const Discord = require('discord.js')
const client = new Discord.Client()
const {
    JsonDatabase
} = require("wio.db");
// ArdaDemr Youtube Kanalına ait yapay zekalı kayıt botu altyapısı
const db2 = new JsonDatabase("oto-kayit");
// ArdaDemr Youtube Kanalına ait yapay zekalı kayıt botu altyapısı
exports.run = async (client, message, args) => {
    let kod = "`"
    if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(new Discord.MessageEmbed().setColor('#3fe4ff').setDescription(`${message.author}, bu komutu kullanabilmek için **SUNUCUYU YÖNET** iznine sahip olmalısın.`));
    if (!message.member.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setColor('#3fe4ff').setDescription(`${message.author}, bunu yapabilmem için bana **YÖNETİCİ** yetkisi vermelisin.`));
    if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setColor('#3fe4ff').setDescription(`${message.author}, bir seçenek belirtmelisin. ${kod}ayarla${kod} veya ${kod}kapat${kod}`));
    if(args[0] === 'ayarla') {
        var rol = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id == args[1])
        if(!rol) return message.channel.send(new Discord.MessageEmbed().setColor('#3fe4ff').setDescription(`${message.author}, kullanıcılar adını yazdığında hangi rol verilsin? O rolü etiketlemelisin.`));
        let verilecekrol = message.guild.roles.cache.find(x => x.id == `${rol.id}`)
        if (message.guild.me.roles.highest.position <= verilecekrol.position) return message.channel.send(new Discord.MessageEmbed().setColor('#3fe4ff').setDescription(`${message.author}, ${rol} rolünü verebilmem için benim yetkimin daha üstte olması gerek.`));
        db2.set(`isimrol_${message.guild.id}`, rol.id)
        message.channel.send(new Discord.MessageEmbed().setColor('#3fe4ff').setDescription(`${message.author}, kullanıcılar adını yazdığında ${rol} rolünü vereceğim.`));
    } else if(args[0] == 'kapat') {
        if(!db2.has(`isimrol_${message.guild.id}`)) return message.channel.send(new Discord.MessageEmbed().setColor('#3fe4ff').setDescription(`${message.author}, zaten herhangi bir rol ayarlı değil.`)); else {
            db2.delete(`isimrol_${message.guild.id}`)
            message.channel.send(new Discord.MessageEmbed().setColor('#3fe4ff').setDescription(`${message.author}, kullanıcılar adını yazdığında artık rol vermeyeceğim.`));
        }
    }
}
exports.conf = {
    aliases: ['isim-rolü-ver']
}
exports.help = {
    name: "isim-rol-ver"
}