const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs').promises;
const ParentRolesGuildMemberUpdateListener = require('./event/parentRolesGuildMemberUpdateListener.js')

let config;
let parentRolesGuildMemberUpdateListenerObj;

async function readConfig(){
  try {
    data = await fs.readFile('./config.json', 'utf-8');
    config = JSON.parse(data);
    parentRolesGuildMemberUpdateListenerObj = new ParentRolesGuildMemberUpdateListener(config);
  } catch(err){
    console.error('An error occurred while reading the config.json file at the root of the bot: ', err);
  } 
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
  parentRolesGuildMemberUpdateListenerObj.execute(oldMember, newMember);
});

readConfig().then(() =>{
  client.login(config.botToken);
});