const Discord = require('discord.js');

// ArdaDemr Youtube Kanalına ait yapay zekalı kayıt botu altyapısı
module.exports.run = async (client, message, args) => {
    let kod = "`"
    var embed = new Discord.MessageEmbed()
    .setTitle(`Otomatik Kayıt Sistemi`)
    .addField(`Kanal Ayarla`,`Ayarladığınız kanalda otomatik isim değiştirmeye başlar.\n${kod}!isim-kanal ayarla #kanal${kod}`)
    .addField(`Kanal Sıfırla`,`Ayarladığınız kanalı devre dışı bırakır.\n${kod}!isim-kanal kapat${kod}`)
    .addField(`Tag Ayarla`,`İsimleri değiştirirken başına tag ekler.\n${kod}!isim-tag ayarla tag${kod}`)
    .addField(`Tag Sıfırla`,`Ayarladığınız tagı kaldırır.\n${kod}!isim-tag kapat${kod}`)
    .addField(`Rol Verme`,`İsimleri değiştirirken kullanıcıya rol verir.\n${kod}!isim-rol-ver ayarla @rol${kod}`)
    .addField(`Rol Verme Sıfırla`,`İsimleri değiştirirken rol vermeyi kapatır.\n${kod}!isim-rol-ver kapat${kod}`)
    .addField(`Rol Alma`,`İsimleri değiştirirken kullanıcının rolünü alır.\n${kod}!isim-rol-al ayarla @rol${kod}`)
    .addField(`Rol Alma Sıfırla`,`İsimleri değiştirirken rol almayı kapatır.\n${kod}!isim-rol-al kapat${kod}`)
    .setColor(`#3fe4ff`)
    message.channel.send(embed)
    // ArdaDemr Youtube Kanalına ait yapay zekalı kayıt botu altyapısı 

}

exports.conf = {
 enabled: true,
 guildOnly: true,
 aliases: ["help"],
 permLevel: 0
};
    
exports.help = {
 name: "kayıt-sistemi"
};