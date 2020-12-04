const Discord = require("discord.js");
const database = require("quick.db");
const eayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
    if (message.author.bot || message.channel.type === "dm") return;
    let kayitLog = message.guild.channels.cache.get(eayarlar.reg["log-k"]);
    let sohbet = message.guild.channels.cache.get(eayarlar.reg.sohbet);
    let eresbos = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let isim = args[1];
    let yas = parseInt(args[2]);
    let eresbos_tamisim = eayarlar.tag + isim + eayarlar.tırnak + yas
    let eresbosemb = new Discord.MessageEmbed().setFooter(`❤️ Eresbos`, client.user.avatarURL()).setColor(0x49003e).setTimestamp()

    if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.get("ROL_ID")) return message.react("746308515940925441");
    if (!eresbos) return message.reply(`Kayıt Edilecek Kullanıcıyı Belirtmelisin.`).then(e => e.delete({ timeout : 6000 }));
    if (!isim) return message.reply(`Kullanıcıyı Kayıt Etmem İçin Bir İsim Yazmalısın.`).then(e => e.delete({ timeout: 6000 }));
    if (!yas) return message.reply(`Kullanıcının Kaydını Tamamlamam İçin Yaşını Belirtmelisin.`).then(e => e.delete({ timeout: 6000 }));

    if (eresbos.roles.cache.get("ERKEK_ROL_ID")) return message.channel.send(eresbosemb.setDescription(`Bu Kullanıcı Zaten Kayıtlı Olduğu İçin Tekrar Kayıt Edemem. \nİsim Değiştirmek İçin \`.isim <@ERESBOS/ID> İsim Yaş\` Komutunu Kullanmalısın.`)).then(e => e.delete({ timeout: 6000 })).catch(err => console.error(error));
    if (eresbos.roles.cache.get("KIZ_ROL_ID")) return message.channel.send(eresbosemb.setDescription(`Bu Kullanıcı Zaten Kayıtlı Olduğu İçin Tekrar Kayıt Edemem. \nİsim Değiştirmek İçin \`.isim <@ERESBOS/ID> İsim Yaş\` Komutunu Kullanmalısın.`)).then(e => e.delete({ timeout: 6000 })).catch(err => console.error(error));

    await eresbos.setNickname(eresbos_tamisim, "Register İsim Değiştirme")
    await eresbos.roles.add(["KIZ_ROL_ID_1", "KIZ_ROL_ID_2"])
    await eresbos.roles.remove("KAYITSIZ_ROL_ID")

    database.add(`Kız_${message.author.id}`, 1)
    database.add(`ToplamKayit_${message.author.id}`, 1)
    database.push(`isimler_${eresbos.id}`, `${eresbos_tamisim} [**<@&KIZ_ROL_ID>**]`);

    let isimgecmisi = database.get(`isimler_${eresbos.id}`)
    let liste = ""
    var sayı = 0
    if(isimgecmisi){
        sayı = isimgecmisi.lenght
        for(let i = 0;i<isimgecmisi.length;i++){
            liste+=`\n\`${i+1}.\` ${isimgecmisi[i]}`
        }
    }else{
        liste=`\nBu Kullanıcının Geçmiş Adı Bulunmuyor.`
    }

    kayitLog.send(eresbosemb.setDescription(`\`•\` **Kayıt Edilen Kullanıcı**: ${eresbos.user} \n\`•\` **Kayıt Eden Yetkili:** ${message.author} \n\`•\` **Kullanıcıya Verilen Roller:** <@&KIZ_ROL_ID_1>, <@&KIZ_ROL_ID_2>`))
    sohbet.send(eresbosemb.setDescription(`\`•\` ${eresbos.user} Aramıza **<@&KIZ_ROL_ID>** Olarak Katıldı. \n\`•\` Sunucuda Toplam **${message.guild.memberCount}** Kişi Olduk. \n\`•\` Sohbete Katılmadan Önce <#KURALLAR_KANAL_ID> Kanalına Göz Atmayı Unutma.`)).then(e => e.delete({ timeout: 6000 }))
    message.channel.send(eresbosemb.setDescription(`\`•\` ${eresbos.user} Adlı Kullanıcıyı **Kız** Olarak Kaydettim. \n\`•\` Kullanıcı Adını **${eresbos_tamisim}** Olarak Güncelleyip Veri Tabanına Kaydettim. \n\n\`•\` Bu Kullanıcı Daha Önceden **${isimgecmisi.length}** Farklı İsimle Kayıt Olmuş. \n${liste}`))
};

exports.conf = {
    aliases: ["kız", "kadın", "k"]
};

exports.help = {
    name: 'kadın'
};
