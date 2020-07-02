  var express = require('express')
  var app = express();
  app.get("/", (request, response) => {
    response.sendStatus(200);
  });
  app.listen(process.env.PORT);

  //Remove my slashes to stop the program running.

  const Discord = require('discord.js'); 
  const client = new Discord.Client();
  const broadcast = client.createVoiceBroadcast();
  const ytdl = require('ytdl-core');
  const streamOptions = { seek: 0, volume: 1 };
  const Enmap = require('enmap');
  const EnmapSQLite = require('enmap-sqlite');
  const Levels = new Enmap({ provider: new EnmapSQLite({ name: 'Levels' }) });
  Levels.defer.then(() => console.log(Levels.size + " keys loaded"))
  const Leader = new Enmap({ provider: new EnmapSQLite({ name: 'Leader' }) });
  Leader.defer.then(() => console.log(Leader.size + " keys loaded"))
  const Recruits = new Enmap({ provider: new EnmapSQLite({ name: 'Recruits' }) });
  Recruits.defer.then(() => console.log(Recruits.size + " keys loaded"))
  const invites = {};
  const wait = require('util').promisify(setTimeout);
  const version = '2.6.2'
  let TicketNum = 0

  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Running MULTIBOT Version ${version} by Alexandar Rampono Kelly`);
    client.user.setActivity('wisermc.net')
    wait(1000);
    client.guilds.forEach(g => {
      g.fetchInvites().then(guildInvites => {
          invites[g.id] = guildInvites;
      });
    });
  });

  client.on('message', msg => {
    try{
  //Checks
  if (msg.author.bot) return;
  const args = msg.content.trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  //Levelling
  console.log(`Old Value for ${msg.author.id}: ${Levels.get(msg.author.id)}`);
  if(!Levels.has(msg.author.id)) Levels.set(msg.author.id, 0);
  let Level = Levels.get(msg.author.id)
  Level++
  Levels.set(msg.author.id, Level)
  console.log(`New value for ${msg.author.id}: ${Levels.get(msg.author.id)}`);
  //Leaderboard
  let Fscore = Leader.get("first", "score");
  let Sscore = Leader.get("second", "score");
  let Tscore = Leader.get("third", "score");
  if (Level > Fscore) {
    let stats = {
      score: Level,
      name: msg.author.id
    }
    Leader.set("first", stats)
  }else if(Level>Sscore){
  let stats = {
    score: Level,
    name: msg.author.id
  }
  Leader.set("second", stats)
}else if(Level>Tscore){
  let stats = {
    score: Level,
    name: msg.author.id
  }
  Leader.set("third", stats)
}

  

  //Commands
  if (command === '!top'){
    let Fscore = Leader.get("first", "score");
    let Sscore = Leader.get("second", "score");
    let Tscore = Leader.get("third", "score");
    let Fname = Leader.get("first", "name");
    let Sname = Leader.get("second", "name");
    let Tname = Leader.get("third", "name");
    let embed = {
      "title": "**Leaderboard**",
      "description": "First, second and third can contact me for a $30 gift voucher for BlockBuster Videos",
      "color": 16098851,
      "footer": {
        "icon_url": "https://cdn.discordapp.com/attachments/630616832063176714/630696121336856576/image0.jpg",
        "text": "wisermc.net"
      },
      "thumbnail": {
        "url": "https://cdn.discordapp.com/attachments/630616832063176714/630696121336856576/image0.jpg"
      },
      "fields": [
        {
          "name": "**First place**",
          "value": `<@${Fname}>, with a score of ${Fscore}!`
        },
        {
          "name": "**Second place**",
          "value": `<@${Sname}>, with a score of ${Sscore}!`
        },
        {
          "name": "**Third place**",
          "value": `<@${Tname}>, with a score of ${Tscore}!`
        }
      ]
    };
    msg.channel.send({ embed });
  }
  if(command === '!level'){
    let level = Levels.get(msg.author.id)
    if (level > 10) var rank = 1;
    if (level > 25) var rank = 2;
    if (level > 50) var rank = 3;
    if (level > 70) var rank = 4;
    if (level > 100) var rank = 5;
    if (level > 150) var rank = 6;
    if (level > 200) var rank = 7;
    if (level > 275) var rank = 8;
    if (level > 350) var rank = 9;
    if (level > 450) var rank = 10;
    if (level > 600) var rank = 11;
    if (level > 800) var rank = 12;
    if (level > 1000) var rank = 13;
    if (level > 1500) var rank = 14;
    let embed = {
      "color": 16098851,
      "footer": {
        "icon_url": "https://cdn.discordapp.com/attachments/630616832063176714/630696121336856576/image0.jpg",
        "text": "wisermc.net"
      },
      "fields": [
        {
        "name": `You are currently on level ${rank}, having sent ${level} messages! `,
        "value": "Get a higher level by being active on the WiserMC Discord Server!"
      },
    ]
  };
    msg.channel.send({ embed });
}
//Auto Respond  
  if (command === 'oof') {
    msg.channel.send('oof');
  }
  if(command ==='!test'){
  msg.channel.send(`Fully Functional on version ${version} by starfihgter #7943`)
  }
  if (command === '!invites'){
    if (args.length === 0){
    let uinvite = Recruits.get(msg.author.id)
    let embed = {
      "color": 16098851,
      "footer": {
        "icon_url": "https://cdn.discordapp.com/attachments/630616832063176714/630696121336856576/image0.jpg",
        "text": "wisermc.net"
      },
      "fields": [
        {
          "name": "**Your Invites**",
          "value": `You have invited ${uinvite} members to the WiserMC Discord Server!`
        },
      ]
    };
      msg.channel.send({ embed });
  }
  if (args.length === 1){
    let uinvite = Recruits.get(msg.mentions.members.first().id)
    let embed = {
      "color": 16098851,
      "footer": {
        "icon_url": "https://cdn.discordapp.com/attachments/630616832063176714/630696121336856576/image0.jpg",
        "text": "wisermc.net"
      },
      "fields": [
        {
          "name": `**${msg.mentions.members.first()} Invites**`,
          "value": `${msg.mentions.members.first()} has invited ${uinvite} members to the WiserMC Discord Server!`
        },
      ]
    };
      msg.channel.send({ embed });
  }
}
  if (command === '!store') {
    let embed = {
      "color": 16098851,
      "footer": {
        "icon_url": "https://cdn.discordapp.com/attachments/630616832063176714/630696121336856576/image0.jpg",
        "text": "wisermc.net"
      },
      "fields": [
        {
          "name": "**Store**",
          "value": "Visit the store at: http://store.wisermc.org/"
        },
      ]
    };
      msg.channel.send({ embed });
  }
if (command === '!ip') {
  let embed = {
    "color": 16098851,
    "footer": {
      "icon_url": "https://cdn.discordapp.com/attachments/630616832063176714/630696121336856576/image0.jpg",
      "text": "wisermc.net"
    },
    "fields": [
      {
        "name": "**IP**",
        "value": "The server IP is: wisermc.net (1.8)"
      },
    ]
  };
    msg.channel.send({ embed });
  }
 if (command === '!rules') {
   let embed = {
      "color": 16098851,
      "footer": {
        "icon_url": "https://cdn.discordapp.com/attachments/630616832063176714/630696121336856576/image0.jpg",
        "text": "wisermc.net"
      },
      "fields": [
        {
          "name": "**Server Rules**",
          "value": "See the rules at http://wisermc.net/rules"
        },
      ]
    };
      msg.channel.send({ embed });
    }
if (msg.content === '!help') {
  let embed = {
    "title": "**List of Commands**",
    "description": "*If something is not working as if should please contact @starfihgter#7943*",
    "color": 16098851,
    "footer": {
      "icon_url": "https://cdn.discordapp.com/attachments/630616832063176714/630696121336856576/image0.jpg",
      "text": "wisermc.net"
    },
    "thumbnail": {
      "url": "https://cdn.discordapp.com/attachments/630616832063176714/630696121336856576/image0.jpg"
    },
    "fields": [
      {
        "name": "**!store**",
        "value": "Gives the link to the server store"
      },
      {
        "name": "**!rules**",
        "value": "Gives the link to the server rules"
      },
      {
        "name": "**!ip**",
        "value": "Gives the server ip"
      },
      {
        "name": "**!invites**",
        "value": "See how many people you've invited to the WiserMC Discord"
      },
      {
        "name": "**!new**",
        "value": "opens a new support ticket"
      },
      {
        "name": "**!close**",
        "value": "Closes a ticket (Ticket channels only)"
      },
      {
        "name": "**!level**",
        "value": "Shows your server level! \n *Please note there is a 10 second cooldown on messages*"
      },
      {
        "name": "**!bug [description of bug]**",
        "value": "Reports a bug to be investigated by the staff team"
      },
      {
        "name": "**!suggest [suggestion]**",
        "value": "Create a suggestion to be voted on by the community"
      },
      {
        "name": "**!help mod**",
        "value": "Secret Commands for Server Staff"
      }
    ]
  };
  msg.channel.send({ embed });
}

//Tickets
if (command === '!new') {
    const Name = msg.author.username
    TicketNum++;
    msg.guild.createChannel('Ticket-'+TicketNum, 'text')
    console.log(`Ticket Channel Created`)
    function ps() {
    let chan = msg.guild.channels.find("name", 'ticket-'+TicketNum)
    chan.setParent('634176228399775765')
    wait(3000)
    const staff = msg.guild.roles.find("name", "Support Team")
    chan.overwritePermissions(msg.guild.id, {
      SEND_MESSAGES: false,
      READ_MESSAGES: false,
    })
    chan.overwritePermissions(msg.author, {
      SEND_MESSAGES: true,
      READ_MESSAGES: true,
      READ_CHANNEL: true,
    })
    chan.overwritePermissions(staff, {
      SEND_MESSAGES: true,
      READ_MESSAGES: true,
    })
    chan.send(`Thanks ${msg.author} for creating a ticket! A member of the ${staff} will be with you soon!`)
    console.log(`Ticket ${TicketNum} opened.`)
    }
    setTimeout(ps, 2000)
}
  if (command === '!close'){ 
    if (msg.channel.parentID !== '634176228399775765') {
      msg.channel.send("This is not a Ticket Channel")
      return;
    }
    msg.channel.delete()
    msg.author.send('Your ticket has now been closed. Feel free to open another one if you need help!')
    console.log(`Ticket Closed.`)
}
if (command === '!bug'){
  let suggestion = args.slice(0).join(" ");
  const channel = msg.guild.channels.find(ch => ch.name === 'bug-reports');
  let embed = {
    "title": "**Bug Report!**",
    "description": `From ${msg.author}`,
    "color": 16098851,
    "footer": {
      "icon_url": "https://cdn.discordapp.com/attachments/630616832063176714/630696121336856576/image0.jpg",
      "text": "wisermc.net"
    },
    "fields": [
      {
        "name": `${suggestion}`,
        "value": `**Thanks for reporting! A staff member will investigate this shortly.**`
      }
    ]
  };
  channel.send({ embed });
  msg.delete();
}
if (command === '!suggest'){
  let suggestion = args.slice(0).join(" ");
  const channel = msg.guild.channels.find(ch => ch.name === 'suggestions');
  let embed = {
    "title": "**New Suggestion!**",
    "description": `From ${msg.author}`,
    "color": 16098851,
    "footer": {
      "icon_url": "https://cdn.discordapp.com/attachments/630616832063176714/630696121336856576/image0.jpg",
      "text": "wisermc.net"
    },
    "fields": [
      {
        "name": `${suggestion}`,
        "value": `**React below to vote for this suggestion!**`
      }
    ]
  };
  channel.send({ embed });
  msg.delete();
  function ReactionA() {
  const Sugmes = client.user.lastMessage
  Sugmes.react('✅')
  Sugmes.react('❌')
  }
  setTimeout(ReactionA, 2000)
}
//Moderation
if (msg.member.roles.find("name", "Developer") || msg.member.roles.find("name", "Owner") || msg.member.roles.find("name", "Server Staff") || msg.member.roles.find("name", "Support Team" ) || msg.member.roles.find("name", "Administrator") ){
  if (msg.content === '!help mod'){
    let embed = {
      "title": "**Admin Commands**",
      "description": "*Administrative commands*",
      "color": 16098851,
      "footer": {
        "icon_url": "https://cdn.discordapp.com/attachments/630616832063176714/630696121336856576/image0.jpg",
        "text": "wisermc.net"
      },
      "thumbnail": {
        "url": "https://cdn.discordapp.com/attachments/630616832063176714/630696121336856576/image0.jpg"
      },
      "fields": [
        {
          "name": "**!mute [@User]**",
          "value": "Indefinetly mutes a user, stopping them from sending messages or connecting to voice channels"
        },
        {
          "name": "**!tmute [@user] [minutes]**",
          "value": "temporarily mutes a user, stopping them from sending messages or connecting to voice channels"
        },
        {
          "name": "**!unmute [@user]**",
          "value": "unmutes a user"
        },
        {
          "name": "**!kick [@user]**",
          "value": "kicks a user"
        },
        {
          "name": "**!ban [@user]**",
          "value": "Bans a user"
        },
        {
          "name": "**!purge [Number of Messages]**",
          "value": "removes up to 500 messages from a channel"
        },
        {
          "name": "**!gstart [hours] [item]**",
          "value": "starts a giveaway"
        }
      ]
    };
    msg.channel.send({ embed });
  }
  if (command === '!mute'){
    var member = msg.mentions.members.first()
    var mute = msg.guild.roles.find("name", "Muted")
    member.addRole(mute)
  }  
  if (command === '!tmute'){
    var member = msg.mentions.members.first()
    var time = args[1]*60000
    var mute = msg.guild.roles.find("name", "Muted")
    function unmute() {
    member.removeRole(mute)
  }
    member.addRole(mute)
    setTimeout(unmute, time)
  }
  if (command === '!unmute'){
    var member = msg.mentions.members.first()
    var mute = msg.guild.roles.find("name", "Muted")
    member.removeRole(mute)
  }
  if (command === '!kick'){
    let victim = msg.mentions.members.first()
    let reason = args.slice(1).join(" ");
    victim.kick(reason);
  }
  if (command === '!ban'){
    let victim = msg.mentions.members.first()
    let reason = args.slice(1).join(" ")
    victim.ban(reason)
  }
  if (command === '!purge'){
    if (args[0] > 100){
      msg.channel.bulkDelete(100)
      let n = 100
    if (args[0] > 200){
      msg.channel.bulkDelete(100)
      let n = 200
    if (args[0] > 300){
      msg.channel.bulkDelete(100)
      let n = 300
    if (args[0] > 400) {
      msg.channel.bulkDelete(100)
      let n = 400
    if (args[0] > 500) {
      msg.channel.bulkDelete(100)
      let n = 500
    }
    }
    }
    }
      let b = args[0]-n
      msg.channel.bulkDelete(b)
    }else msg.channel.bulkDelete(args[0])
    msg.channel.send(`${args[0]} messages deleted.`)
  }
if (command === '!gstart'){
  const time = args[0]
  let item = args.slice(1).join(" ");
  msg.delete()
  let embed = {
      "color": 16098851,
      "footer": {
       "icon_url": "https://cdn.discordapp.com/attachments/630616832063176714/630696121336856576/image0.jpg",
        "text": "wisermc.net"
      },
      "fields": [
        {
          "name": `**${item} Giveaway!**`,
          "value": `React with ✅ below to have a chance to win ${item}! The winner will be drawn in ${time/24} days!`
        },
      ]
  };
  msg.channel.send({ embed });
  function Reaction(){
    const Giveaway = client.user.lastMessage
    Giveaway.react('✅');
    const Time = args[0]*3600000
    function GiveAwayF() {
      let mes = Giveaway.reactions.get('✅')
      let contesters = mes.users.array()
      var winner = contesters[Math.floor(Math.random()*contesters.length)];
      let embed = {
        "color": 16098851,
        "footer": {
         "icon_url": "https://cdn.discordapp.com/attachments/630616832063176714/630696121336856576/image0.jpg",
          "text": "wisermc.net"
        },
        "fields": [
          {
            "name": `**${item} Giveaway Results!**`,
            "value": `Congratulations ${winner}! You have won ${item}! Contact ${msg.author} for your prize!`
          },
        ]
    };
    msg.channel.send({ embed });
  }
    setTimeout(GiveAwayF, Time)
  }
  setTimeout(Reaction, 2000)
  }
} else{
 if (command === '!mute' || command === '!tmute' || command === '!kick' || command === '!ban' || command === '!unmute' || command === '!purge' || command === '!gstart' || msg.content === '!help mod'){
 msg.channel.send('You do not have permission to use this command.')
 }
 return;
}
    }catch(err){
      console.log(err.message);
    }
});
client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'welcome');
  if (!channel) return;
  var join = member.guild.roles.find("name", "Member")
  member.removeRole(join)
  member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const recruiter = invite.inviter
    if(!Recruits.has(recruiter.id)) Recruits.set(recruiter.id, 0);
    let rnum = Recruits.get(recruiter.id)
    rnum++
    Recruits.set(recruiter.id, rnum)
    let embed = {
      "description": `**Welcome <@${member.id}> to the WiserMC Discord Server!**`,
      "color": 16098851,
      "footer": {
        "icon_url": "https://cdn.discordapp.com/attachments/630616832063176714/630696121336856576/image0.jpg",
        "text": "wisermc.net"
      },
      "thumbnail": {
        "url": "https://cdn.discordapp.com/attachments/630616832063176714/630696121336856576/image0.jpg"
      },
      "fields": [
        {
          "name": `**Play at wisermc.net - Visit the store at http://store.wisermc.net - feel free to make a ticket with !new if you need help!**`,
          "value": `<@${member.id}> was invited by <@${recruiter.id}>, who now has invited ${rnum} people`
        },
      ]
    };
    channel.send({ embed });
  });
});
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.login('NDc0ODQ3MjY3NjE1MTQ1OTg2.XZr_ZA.CtnqCqshxXAmtEuczxsRLaXQbtk');