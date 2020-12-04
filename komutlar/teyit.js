const Discord = require("discord.js");
const eayarlar = require('../ayarlar.json');
const db = require("quick.db");

exports.run = async (client , message, args) => {
    let eresbosemb = new Discord.MessageEmbed().setFooter(`❤️ Eresbos`, client.user.avatarURL()).setColor(0x49003e).setTimestamp()
    let eresbos = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author

    if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has("ROL_ID")) return message.react("746308515940925441");
    if (!eresbos) return message.channel.send(eresbosemb.setDescription(`Toplam Teyit Sayısına Bakmak İstediğiniz Kullanıcıyı \`.teyit <@ERESBOS/ID>\` Şeklinde Belirtiniz.`)).then(e => (e.delete({ timeout: 10000 })));

    let selam = await db.fetch(`Erkek_${eresbos.id}`)
    let ben = await db.fetch(`Kız_${eresbos.id}`)
    let eresboss = await db.fetch(`ToplamKayit_${eresbos.id}`)
    if (!selam) selam = "0"
    if (!ben) ben = "0"
    if (!eresboss) eresboss = "0"

    message.channel.send(eresbosemb.setDescription(`${eresbos} Adlı Kullanıcının Toplam **${eresboss}** Kaydı Bulunmaktadır. (**\`${selam}\` Erkek, \`${ben}\` Kız**)`)).then(e => (e.delete({ timeout: 10000 })));
}

exports.conf = {
    aliases: ["kayıt", "teyit", "bilgi"]
};

exports.help = {
    name: "teyit"
};
