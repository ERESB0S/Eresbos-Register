const Discord = require("discord.js");
const client = new Discord.Client();
const eayarlar = require("../ayarlar.json");
const database = require("quick.db");

exports.run = (client, message, args) => {
    const eresbosemb = new Discord.MessageEmbed().setColor(0x2c0032).setFooter(`❤️ Eresbos`, client.user.avatarURL()).setTimestamp()
    let eresbos = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    
    if(!message.member.hasPermission('ADMINISTRATOR') && !message.member.roles.cache.get("768125386235969557")) return message.react("746308515940925441");
    if(!eresbos) return message.react("746308516284989470") && message.reply(`Hangi Kullanıcının Geçmiş İsimlerini Temizlemek İstiyorsun?`).then (message => (message.delete({timeout:6000})))

    database.delete(`isimler_${eresbos.id}`)
    message.channel.send(eresbosemb.setDescription(`${eresbos} Adlı Kullanıcının Geçmiş İsimleri Başarıyla Temizlendi.`)).then(e => (e.delete({ timeout: 6000 })));
};

exports.conf = {
    aliases: ["isimlertemizle", "itemizle", "eresbostemizle"]
};

exports.help = {
    name: "isimlertemizle"
};
