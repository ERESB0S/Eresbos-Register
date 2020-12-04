const Discord = require("discord.js");
const client = new Discord.Client();
const database = require("quick.db");

exports.run = (client, message, args) => {
    const eresbosemb = new Discord.MessageEmbed().setColor(0x2c0032).setFooter(`❤️ Eresbos`, client.user.avatarURL()).setTimestamp()
    let eresbos = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    if(!message.member.hasPermission('ADMINISTRATOR') && !message.member.roles.cache.get("YETKILI_ROL_ID")) return message.react("746308515940925441");
    if(!eresbos) return message.channel.send(eresbosemb.setDescription(`Lütfen Geçmiş Kullanıcı Adlarını Görmek İstediğin Kullanıcıyı Etiketle.`)).then (e => (e.delete({ timeout: 6000 })));

    let isimgecmisi = database.get(`isimler_${eresbos.id}`)
    let liste=""
    if (isimgecmisi) {
        var sayı = 0
        sayı = isimgecmisi.lenght
        for(let i = 0;i<isimgecmisi.length;i++){
            liste+=`\n\`${i+1}.\` ${isimgecmisi[i]}`
        }
    } else {
        message.channel.send(eresbosemb.setDescription(`${eresbos} Adlı Kullanıcının Geçmiş Kullanıcı Adları \n\nBu Kullanıcının Geçmiş Adı Bulunmuyor.`)).then(e => (e.delete({ timeout: 10000 })))
        return
    }

    message.channel.send(eresbosemb.setDescription(`${eresbos} Adlı Kullanıcının Geçmiş Kullanıcı Adları **[${isimgecmisi.length}]** \n${liste}`)).then(e => (e.delete({ timeout: 10000 })))
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "isimler",
  description: "Kod denemek için kullanılır.",
  usage: "isimler"
};