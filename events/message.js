const ayarlar = require('../ayarlar.json');
const Discord = require("discord.js");
const db = require('quick.db');

module.exports = async message => {

  if(message.author.bot||message.channel.type === "dm") return;
  let client = message.client;
  const prefix = ayarlar.prefix || client.user.id

  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length)
  let params = message.content.split(' ').slice(1)
  let perms = client.elevation(message);
  let color = ayarlar.color;
  let cmd;
  if (client.commands.has(command)) cmd = client.commands.get(command);
  else if (client.aliases.has(command)) cmd = client.commands.get(client.aliases.get(command));

  let KARA_LISTE_K = await db.fetch(`kara_liste_${message.author.id}`)
  let KARA_LISTE_S = await db.fetch(`kara_liste_${message.guild.id}`)

  if (KARA_LISTE_S) {
    if (cmd.help.name == `karaliste`) {
      if (perms < cmd.conf.permLevel) return message.channel.send("Sunucu kara listede olduğu için bot komutlarını kullanamazsınız.")
      return cmd.run(client, message, params, perms)
    }
    return message.channel.send("Sunucu kara listede olduğu için bot komutlarını kullanamazsınız.")
  }


  if (KARA_LISTE_K) {
    if (cmd.help.name == `karaliste`) {
      if (perms < cmd.conf.permLevel) return message.channel.send("Kara listede olduğunuz için bot komutlarını kullanamazsınız.")
      return cmd.run(client, message, params, perms)
    }
    return message.channel.send("Kara listede olduğunuz için bot komutlarını kullanamazsınız.")
  }

  if (!KARA_LISTE_S || !KARA_LISTE_K) {

    if (cmd) {
      if (perms < cmd.conf.permLevel) return;
      cmd.run(client, message, params, perms);
    }


  }


};