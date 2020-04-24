const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


const Discord = require('discord.js');
const bot = new Discord.Client();

var test = ['a'['a','b'],'b'['a','b']]

const token = process.env.TOKEN;

var PREFIX = '!';

var version = '0.0.1'

const footer = 'Bot designed by @Mitch9604#4902 for DaMitchServer'
const embedImage = 'https://cdn.discordapp.com/avatars/257714467301752835/993e938906f9be2bb8d45616a0bdf1a1.png?size=128'

const embedColor = '#008080'

//Hashtable function

function hashKey(s, tableSize) {
    let hash = 17

    for (var i = 0; i < s.length; i++){
        hash = (7 * hash * s.charCodeAt(i)) % tableSize;
    }
    return hash;
}


class Hashtable {
    
    table = new Array(5)
    
    setItem = (key, value) => {
        const idx = hashKey(key, this.table.length);
        if(this.table[idx]){
            this.table[idx].push([key, value])
        }else{
            this.table[idx] = [[key, value]];
        }
    };

    getItem = key => {
        const idx = hashKey(key, this.table.length)
        if(!this.table[idx]) {
            return null 
        }
        return this.table[idx].find(x => x[0] === key)[1];
    };

    removeItem = key => {
        const idx = hashKey(key, this.table.length)
        if(!this.table[idx]){
            return null;
        }else{
            this.table[idx] = null;
        }
    };
}

//////////-End of hashtable function-\\\\\\\\\\\


var serverIDList = new Hashtable();

var warnChannelList = new Hashtable();

var reportChannelList = new Hashtable();

var unbanLogsChannelList = new Hashtable();


bot.on('ready', () =>{
    console.log("I'm online!");
})

bot.on('message', message=>{
    
    let args = message.content.substring(PREFIX.length).split(' ')

    if(args[0]=='sync'){
        
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.reply("Sorry, you can't do that!")

        if(!serverIDList.getItem(message.guild.id) == null) return message.reply("Bot has already been synced.");
        serverIDList.setItem(message.guild.id, message.guild.id);
        message.channel.send("I have finished syncing to your server")
    
    }else{};
    if(args[0] == 'set'){
        switch(args[1]){
        
            case 'warnchannel':
                var channelID = args[2];
                if(channelID.length !== 18){
                    return message.reply('This ID is not valid.')
                }
                
                if(warnChannelList.getItem(message.guild.id) == null){
                    warnChannelList.setItem(message.guild.id, channelID);
                }else{
                    warnChannelList.removeItem(message.guild.id)
                    warnChannelList.setItem(message.guild.id, channelID)
                }
                
                message.reply('Set Warn Channel!')
            break;
            case 'reportlogchannel':
                var channelID = args[2];
                if(channelID.length !== 18){
                    return message.reply('This ID is not valid.')
                }

                if(reportChannelList.getItem(message.guild.id) == null){
                    reportChannelList.setItem(message.guild.id, channelID);
                }else{
                    reportChannelList.removeItem(message.guild.id)
                    reportChannelList.setItem(message.guild.id, channelID)
                }

                message.reply('Set Report logs Channel')
            break;
            case 'unbanlogchannel':
                var channelID = args[2];
                if(channelID.length !== 18){
                    return message.reply('This ID is not valid.')
                }
                
                if(unbanLogsChannelList.getItem(message.guild.id) == null){
                    unbanLogsChannelList.setItem(message.guild.id, channelID);
                }else{
                    unbanLogsChannelList.removeItem(message.guild.id)
                    unbanLogsChannelList.setItem(message.guild.id, channelID)
                }

                message.reply('Set Unban Logs Channel')
            break;
        }
        
        if (args[1] == null){
            return message.reply('Wrong usage! The correct usages are: `!set warnchannel {Channel ID}`, `!set reportlogchannel {Channel ID}`, `!set unbanlogchannel {Channel ID}`')
        }    
    }
    
    if(!warnChannelList.getItem(message.guild.id)){
        var warnChannelID = message.channel.id
    }else{
        var warnChannelID = warnChannelList.getItem(message.guild.id);
    };

    
    if(!reportChannelList.getItem(message.guild.id)){
        var reportChannelID = message.channel.id;
    }else{
        var reportChannelID = reportChannelList.getItem(message.guild.id);
    };

    if(!unbanLogsChannelList.getItem(message.guild.id)){
        var unbanLogsChannelID = message.channel.id
    }else{
        var unbanLogsChannelID = unbanLogsChannelList.getItem(message.guild.id)
    };
    
    
    
    
    const warnChannel = bot.channels.cache.find(channel => channel.id === warnChannelID);
    const reportChannel = bot.channels.cache.find(channel => channel.id === reportChannelID);
    const unbanLogsChannel = bot.channels.cache.find(channel => channel.id === unbanLogsChannelID);

    switch(args[0]){
        case 'prefix':
            
             
            
            if(!message.guild.member(message.author).hasPermission(['ADMINISTRATOR', 'KICK_MEMBERS'])) return message.reply("Sorry you can't do that!");
        
        
        
        
            switch(args[1]){
                case 'change':
                    let anouncementChannelID = '689612836292395127'
                    let anouncmentChannel = bot.channels.cache.find(channel => channel.id === anouncementChannelID)
                    
                    PREFIX = args[2]
                    
                    anouncmentChannel.send('Prefix has been changed to "' + args[2] + '" !');
                break;
                case 'info':
                    message.channel.send('Correct usages:')
                    message.channel.send("`!prefix change {new prefix}`")
                    message.channel.send("`!prefix say`")
                break;
                case 'say':
            }
            if(args[1] == null){
                message.channel.send("Incorrect syntax -- do '!prefix info' for more information")
            }   
            

        break;      
        case 'hi':
            

            message.channel.send('Hello ' + message.author + '!');
            break; 
        case 'warn':

    
            if(!message.guild.member(message.author).hasPermission(['KICK_MEMBERS', 'ADMINISTRATOR'])) return message.reply("Sorry you can't do that!");

            const wUser = message.mentions.users.first();
            if(!wUser) return message.reply('user does not exsist');
            
            let wMember = message.guild.member(wUser);
            if(!wMember) return message.reply('Couldnt find member');

            

            const wRole = message.mentions.roles.first();
            if (!wRole) return message.reply('Please specify a role');
            
            const roletag = wRole.name ; 

            
            
            if(!message.guild.roles == wRole) return message.reply('Couldnt find role');
            
            let gRole = wRole.id ;
            if(wMember.roles.cache.has(gRole)) return message.reply("this user has already been given this role");
            
            wMember.roles.add(gRole); 
            
            
            const warnreason = args.join(' ').slice(51);
            
            wUser.createDM();
                wUser.send(`You have been warned on DaMitchServer for "${warnreason}."`);
            
            
            

            const warnembed = new Discord.MessageEmbed();

            warnembed.setTitle(`Warn | ${wMember.username}`);
            
            warnembed.addFields(
                {name:'User', value: wMember, inline: true},
                {name:'Modarator', value: message.author, inline: true},
                {name: 'Role', value: wRole, inline: true},
                {name:'Warn Reason', value: '"' + warnreason + '"'}
            );

            
            
            
            
            if(!message.guild.id === '691048098990129163'){
            
                if(wRole.id === '347788390764380162'){
                warnembed.setColor('#c24d00');
                }else{};
                        
                if(wRole.id === '354764833415102476'){
                warnembed.setColor('#b61118');
                }else{};
            
            }else{
                warnembed.setColor('#c24d00')
            };
            
            warnembed.setFooter(footer, embedImage);



            
            

            //message.channel.send(wMember.user.username + ' has been warned. Reason:' +warnreason+ '. their role is now ' + wRole.name);
            warnChannel.send(warnembed);
            
            

        break;
        case 'reportuser':
            const rUser = message.mentions.users.first();
            if(!rUser) return message.reply("This user doesn't exsist.");

            const rMember = message.guild.member(rUser);
            if(!rMember) return message.reply("Couldn't find member.");

            
            
            let reportReason = args.join(' ').slice(30);
            
            rUser.createDM();
            rUser.send(`You have been reported on ${message.guild.name} for "${reportReason}."`);
            
            
            
            let reportEmbed = new Discord.MessageEmbed ;

            reportEmbed.addFields(
                {name: 'Reported user', value: rMember},
                {name: 'Reporter', value: message.author, inline: true},
                {name: 'Reason', value: reportReason, inline: true}
            );
            
            reportEmbed.setColor('#fff60f')

            reportEmbed.setFooter(footer, embedImage);

            //const reportChannnelID = '689597720348196895'
            //const reportChannnel = bot.channels.cache.find(channel => channel.id === reportChannnelID)
                
            reportChannel.send(reportEmbed);
        break;    
        case 'kick':
            if(!message.guild.member(message.author).hasPermission('KICK_MEMBERS')) return message.reply('Sorry, you cant do that!')
            
            const kUser = message.mentions.users.first()
            if(!kUser) return message.reply('Please specify a user.');
        
            const kMember = message.guild.member(kUser);
            if(!kMember) return message.reply("Couldn't find user.");
        
          
            const kickReason = args.join(' ').slice(28);
            
            kUser.createDM();
            kUser.send(`You have been kicked from ${message.guild.name} for "${kickReason}."`)



        
            kMember.kick(kickReason);        
        
            const kickEmbed = new Discord.MessageEmbed();
        
            kickEmbed.setTitle(`Kick | ${kUser.username}`);
        
            kickEmbed.addFields(
                {name: 'User', value: kUser, inline: true},
                {name: 'Modarator', value: message.author, inline: true},
                {name: 'Reason', value: kickReason}
            );
            
            kickEmbed.setColor('#770d14');

            kickEmbed.setFooter(footer, embedImage);
            
            warnChannel.send(kickEmbed);
        
        
        break;
        case 'ban':
            if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("Sorry, you can't do that!");
                
            const bUser = message.mentions.users.first();
            if(!bUser) return message.reply('Please specify a user.');

            const bMember = message.guild.member(bUser);
            if(!bMember) return message.reply("Couldn't find user.")

            const banReason = args.join(' ').slice(27);

            bUser.createDM();
            bUser.send(`You have been banned from ${message.guild.name} for: ${banReason}`);

            message.guild.members.ban(bMember);

            const banEmbed = new Discord.MessageEmbed();

            banEmbed.setTitle(`Ban | ${kUser.username}`);

            banEmbed.addFields(
                {name: 'Member', value: kUser, inline: true},
                {name: 'Modarator', value: message.author, inline: true},
                {name: 'Reason', value: banReason}
            );
            
            banEmbed.setFooter(footer, embedImage);

            warnChannel.send(banEmbed);
        
        break;
        case 'unban':
            if(!message.guild.member(message.author).hasPermission('BAN_MEMBERS', "ADMINISTRATOR")) return message.reply("Sorry, you can't do that!");


            const unbUser = args[1];
            if(!unbUser) return message.reply('Please specify a user ID! (Without < and >)');

            
            message.guild.members.unban(unbUser)

            const unbanEmbed = new Discord.MessageEmbed();
            
            unbanReason = args.join(' ').slice(27);


            unbUser.createDM();
            unbUser.send(`You have been unbanned on ${message.guild.name} for: ${unbanReason}`);

            const unbMember = message.guild.members.fetch(unbUser);

            unbanEmbed.setTitle(`Unban | ${unbMember.username}`);
            
            unbanEmbed.addFields(
                {name: 'User', value: unbUser, inline: true},
                {name: 'Modarator', value: message.author, inline: true},
                {name: 'Reason', value: unbanReason}
            );
            
            unbanEmbed.setColor(embedColor);

            unbanEmbed.setFooter(footer, embedImage);

            unbanLogsChannel.send(unbanEmbed);



        break;
        case 'updateversion':
            if(!message.guild.member(message.author).hasPermission('MANAGE_WEBHOOKS')) return message.channel.reply('Sorry you cant do that!');
            version = args[1];
            message.reply(`Version has been changed to ${version}`);
        break;    
        case 'version':
            const versionembed = new Discord.MessageEmbed();
            
            
            //var embedimage = 'https://cdn.discordapp.com/avatars/257714467301752835/993e938906f9be2bb8d45616a0bdf1a1.png?size=128'


            versionembed.setTitle('Version');
            versionembed.addField('Version:', version);
            versionembed.setColor(embedColor);
            versionembed.setThumbnail(embedImage);
            versionembed.setFooter(footer, embedImage);
            

            message.reply(versionembed);
        break;
        case 'fetchchannel':
            if(!message.guild.member(message.author).hasPermission('MANAGE_WEBHOOKS')) return message.reply("Sorry, you can't do that!")
            
            var target = message.channel.id;
            
            message.channel.send(target);

             


        break;
        case 'dmuser':
            if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.reply("Sorry, you can't do that!");
        
            let dmUser = args[1]
            if(!args[1]) return message.reply("Please specify a user id!");
            if(dmUser.length !== 18) return message.reply("Please specify a user id!");

            
            dmUser.createDM();
            dmUser.send(`${dmMessage} -- Message sent by: ${message.author}`);

            message.channel.send('Message sent!')
            .then(bDmMessage => { bDmMessage.delete(3000); });
            
            message.delete(3000);

        break;
        case 'help':
            
            //switch(args[1]){
            //    case 'cosmetic':
                    
            //    break;
            //    case 'moderator':

            //    break;
            //}
        
        
        
            const helpEmbed = new Discord.MessageEmbed ;
            
            helpEmbed.setTitle('Help')
            helpEmbed.setThumbnail(embedImage)
            
            helpEmbed.addFields(
                {name: '`!help`', value: 'Brings up this help menu.'},
                {name: '`!hi`', value: 'A Cosmetic command that returns "Hello {user}" when typed.'},
                {name: '`!reportuser {user} {reason}`', value: 'Reports {user} for {reason}'},
                {name: '`!prefix info`', value: 'Shows all valid prefix commands.'},
                {name: '`!version`', value: 'Shows my version.'}
            );

            helpEmbed.addField('---', 'Modarator Commands')
            
            helpEmbed.addFields(
                {name: '`!warn {user} {role} {reason}`', value: 'Warns {user} for {reason}, and gives {user} {role}.'},
                {name: '`!kick {user} {reason}`', value: 'Kicks {user} for {reason}.'}
            )
            helpEmbed.setColor(embedColor)
            
            helpEmbed.setFooter(footer, embedImage)
            
            
            message.channel.send(helpEmbed)

        break;
        case 'verify':
        
            if(message.guild.member(message.author).hasPermission('USE_EXTERNAL_EMOJIS')) return message.reply('You cant do that!');
        
        
            message.author.createDM()
            message.author.send('You have been verified!');
        
            const vRoleID = '682458782097211401';
        
        
            message.guild.member(message.author).roles.add(vRoleID);
        
        
        
        
        
        
            const vLogChannelID = '682697618362466329';
            const vLogChannel = bot.channels.cache.find(channel => channel.id === vLogChannelID);
       
            vLogChannel.send(`${message.author} has been verified!`)
        break;
        case 'fetchrole':
            if(!message.guild.member(message.author).hasPermission('MANAGE_WEBHOOKS')) return message.reply('Sorry, you cant do that!');
        
            const roleTarget = message.mentions.roles.first();
        
            message.channel.send(roleTarget.id);
        break;
    }



})

bot.login(token);