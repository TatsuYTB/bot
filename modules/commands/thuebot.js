module.exports.config = {
  name: 'thuebot',
  version: '0.0.1',
  hasPermssion: 0,
  credits: 'DC-Nam',
  description: 'Quản lí thuê bot', 
  commandCategory: 'Hệ Thống',
  usages: '[]',
  cooldowns: 3
};

let fs = require('fs');


if (!fs.existsSync(__dirname+'/cache/data'))fs.mkdirSync(__dirname+'/cache/data');

let path = __dirname+'/cache/data/thuebot.json';
let data = [];
let save = ()=>fs.writeFileSync(path, JSON.stringify(data));

if (!fs.existsSync(path))save(); else data = require(path);


let form_mm_dd_yyyy = (input = '', split = input.split('/'))=>`${split[1]}/${split[0]}/${split[2]}`;
let invalid_date = date=>/^Invalid Date$/.test(new Date(date));


exports.run = function(o) {
  let send = (msg, callback)=>o.api.sendMessage(msg, o.event.threadID, callback, o.event.messageID);

  if (!["100040472494187"].includes(o.event.senderID))return send(`𝐁𝐚̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐝𝐮̉ 𝐪𝐮𝐲𝐞̂̀𝐧 𝐡𝐚̣𝐧 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠 𝐥𝐞̣̂𝐧𝐡 𝐧𝐚̀𝐲!`);

  switch (o.args[0]) {
    case 'add': {
      if (!o.args[1])return send(`usage {prefix}{command name} add {ID thread} {ID user} ngày/tháng/năm => ngày/tháng/năm`);
      // @usage {prefix}{command name} add {ID thread} {ID user} {time start} => {time end}
      let t_id = o.args[1];
      let id = o.args[2];
      let time_start = o.args[3];
      let time_end = o.args[5];

      if (isNaN(id) || isNaN(t_id))return send(`𝐈𝐃 𝐊𝐡𝐨̂𝐧𝐠 𝐇𝐨̛̣𝐩 𝐋𝐞̣̂!`);
      if (invalid_date(form_mm_dd_yyyy(time_start)) || invalid_date(form_mm_dd_yyyy(time_end)))return send(`𝐓𝐡𝐨̛̀𝐢 𝐆𝐢𝐚𝐧 𝐊𝐡𝐨̂𝐧𝐠 𝐇𝐨̛̣𝐩 𝐋𝐞̣̂!`);

      data.push({
        t_id, id, time_start, time_end,
      });
      send(`𝐃𝐚̃ 𝐭𝐡𝐞̂𝐦 𝐈𝐃 𝐯𝐚̀𝐨 𝐝𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡 𝐭𝐡𝐮𝐞̂ 𝐛𝐨𝐭.`);
    };
      break;
    case 'list': {
      send(`=== [ 𝐃𝐚𝐧𝐡 𝐒𝐚́𝐜𝐡 𝐓𝐡𝐮𝐞̂ 𝐁𝐨𝐭 ] ===\n\n${data.map(($, i)=>`${i+1}. ${global.data.userName.get($.id)}\n📝 𝐓𝐢̀𝐧𝐡 𝐭𝐫𝐚̣𝐧𝐠: ${new Date(form_mm_dd_yyyy($.time_end)).getTime() >= Date.now()+25200000?'𝐂𝐡𝐮̛𝐚 𝐇𝐞̂́𝐭 𝐇𝐚̣𝐧 ✅': '𝐃𝐚̃ 𝐇𝐞̂́𝐭 𝐇𝐚̣𝐧 ❎'}\n🌾 𝐍𝐡𝐨́𝐦: ${(global.data.threadInfo.get($.t_id) || {}).threadName}`).join('\n─────────────────\n')}\n\n→ 𝐑𝐞𝐩𝐥𝐲 𝐒𝐓𝐓 𝐝𝐞̂̉ 𝐱𝐞𝐦 𝐜𝐡𝐢 𝐭𝐢𝐞̂́𝐭.\n→ 𝐑𝐞𝐩𝐥𝐲 𝐝𝐞𝐥 𝐒𝐓𝐓 𝐝𝐞̂̉ 𝐱𝐨́𝐚 𝐤𝐡𝐨̉𝐢 𝐝𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡.\n→ 𝐑𝐞𝐩𝐥𝐲 𝐨𝐮𝐭 𝐒𝐓𝐓 𝐝𝐞̂̉ 𝐭𝐡𝐨𝐚́𝐭 𝐧𝐡𝐨́𝐦 (𝐜𝐚́𝐜𝐡 𝐧𝐡𝐚𝐮 𝐝𝐞̂̉ 𝐜𝐡𝐨̣𝐧 𝐧𝐡𝐢𝐞̂̀𝐮 𝐬𝐨̂́)\n→ 𝐑𝐞𝐩𝐥𝐲 𝐠𝐢𝐚𝐡𝐚𝐧 𝐒𝐓𝐓 {time_start} => {time_end}`, (err, res)=>(res.name = exports.config.name, res.event = o.event, res.data = data, global.client.handleReply.push(res)));
    };
      break;

    default: send(`𝐃𝐮̀𝐧𝐠: ${global.config.PREFIX}𝐭𝐡𝐮𝐞𝐛𝐨𝐭 𝐚𝐝𝐝 → 𝐃𝐞̂̉ 𝐭𝐡𝐞̂𝐦 𝐧𝐡𝐨́𝐦 𝐯𝐚̀𝐨 𝐝𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡 𝐭𝐡𝐮𝐞̂ 𝐛𝐨𝐭\n𝐃𝐮̀𝐧𝐠: ${global.config.PREFIX}𝐭𝐡𝐮𝐞𝐛𝐨𝐭 𝐥𝐢𝐬𝐭 → 𝐃𝐞̂̉ 𝐱𝐞𝐦 𝐝𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡 𝐭𝐡𝐮𝐞̂ 𝐛𝐨𝐭\n𝗛𝗗𝗦𝗗 → ${global.config.PREFIX}𝐭𝐡𝐮𝐞𝐛𝐨𝐭 𝐥𝐞̣̂𝐧𝐡 𝐜𝐚̂̀𝐧 𝐝𝐮̀𝐧𝐠.`)
      break;
  }
  save();
};
exports.handleReply = async function(o) {
  let _ = o.handleReply;
  let send = (msg, callback)=>o.api.sendMessage(msg, o.event.threadID, callback, o.event.messageID);

  if (o.event.senderID != _.event.senderID)return;

  if (isFinite(o.event.args[0])) {
    let info = data[o.event.args[0]-1];

    if (!info)return send(`𝐒𝐓𝐓 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐨̂̀𝐧 𝐭𝐚̣𝐢!`);

    return send(`== [ 𝐓𝐡𝐨̂𝐧𝐠 𝐓𝐢𝐧 𝐓𝐡𝐮𝐞̂ 𝐁𝐨𝐭 ] ==\n─────────────────\n👤 𝐓𝐞̂𝐧 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐭𝐡𝐮𝐞̂: ${global.data.userName.get(info.id)}\n🌐 𝐥𝐢𝐧𝐤 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤: https://www.facebook.com/profile.php?id=${info.id}\n👥 𝐍𝐡𝐨́𝐦: ${(global.data.threadInfo.get(info.t_id) || {}).threadName}\n⚡ 𝐈𝐃 𝐍𝐡𝐨́𝐦: ${info.t_id}\n📆 𝐍𝐠𝐚̀𝐲 𝐓𝐡𝐮𝐞̂: ${info.time_start}\n⏳ 𝐇𝐞̂́𝐭 𝐇𝐚̣𝐧: ${info.time_end}\n📌 𝐂𝐨̀𝐧 ${(()=> {
      let time_diff = new Date(form_mm_dd_yyyy(info.time_end)).getTime()-(Date.now()+25200000);
      let days = (time_diff/(1000*60*60*24))<<0;
      let hour = (time_diff/(1000*60*60)%24)<<0;

      return `${days} 𝐧𝐠𝐚̀𝐲 ${hour} 𝐠𝐢𝐨̛̀ 𝐥𝐚̀ 𝐡𝐞̂́𝐭 𝐡𝐚̣𝐧.`;
    })()}`);
  } else if (o.event.args[0].toLowerCase() == 'del') {
    o.event.args.slice(1).sort((a, b)=>b-a).forEach($=>data.splice($-1, 1));
    send(`Đã xóa thành công!`);
  } else if (o.event.args[0].toLowerCase() == 'giahan') {
    let STT = o.event.args[1];
    let time_start = o.event.args[2];
    let time_end = o.event.args[4];

    if (invalid_date(form_mm_dd_yyyy(time_start)) || invalid_date(form_mm_dd_yyyy(time_end)))return send(`𝐓𝐡𝐨̛̀𝐢 𝐆𝐢𝐚𝐧 𝐊𝐡𝐨̂𝐧𝐠 𝐇𝐨̛̣𝐩 𝐋𝐞̣̂!`);

    if (!data[STT-1])return send(`𝐒𝐓𝐓 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐨̂̀𝐧 𝐭𝐚̣𝐢`);

    let $ = data[STT-1];

    $.time_start = time_start;
    $.time_end = time_end;
    send(`𝐃𝐚̃ 𝐠𝐢𝐚 𝐡𝐚̣𝐧 𝐧𝐡𝐨́𝐦 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠!`);
  } else if (o.event.args[0].toLowerCase() == 'out') {
    for (let i of o.event.args.slice(1)) await o.api.removeUserFromGroup(o.api.getCurrentUserID(), data[i-1].t_id);

    send(`𝐃𝐚̃ 𝐨𝐮𝐭 𝐧𝐡𝐨́𝐦 𝐭𝐡𝐞𝐨 𝐲𝐞̂𝐮 𝐜𝐚̂̀𝐮`);
  };
  save();
};