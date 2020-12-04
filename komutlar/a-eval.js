const Discord = require("discord.js");
const client = new Discord.Client();
const eayarlar = require("../ayarlar.json");

exports.run = (client, message, args) => {
    if (message.author.id !== eayarlar.sahip) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bu komutu sadece ${ayarlar.sahip} kullanıcısı kullanabilir.`).setColor(`RED`)).then (message => (message.delete({timeout:6000})));

    if (!args[0]) return message.reply(`Empty`);

    if (args[0] === "client.token") return;
    if (args[0] === "process.env.TOKEN") return;
    try {
        var code = args.join(" ");
        var evaled = eval(code);
        if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
        message.channel.send('const version = 12;', { code: 'js' });
    } catch (err) {
        message.channel.send(`\`HATA\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
    function clean(text) {
        if (typeof text === "string")
        return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
        else return text;
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3
};

exports.help = {
    name: "eval"
};