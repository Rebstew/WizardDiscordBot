const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const ParentRolesGuildMemberUpdateListener = require('event/parentRolesGuildMemberUpdateListener.js')

let config;
let parentRolesGuildMemberUpdateListenerObj;

fs.readFile('config.json', 'utf-8', function(err, data){
  if(err){
    console.err('An error occurred while reading the config.json file at the root of the bot: ', err);
  } else {
    config = data;
    parentRolesGuildMemberUpdateListenerObj = new ParentRolesGuildMemberUpdateListener(config);
  }
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
  parentRolesGuildMemberUpdateListenerObj.execute(oldMember, newMember);
});

if(config){
  client.login(config.botToken);
} else {
  client.destroy();
}