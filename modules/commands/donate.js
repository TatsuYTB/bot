module.exports.config = {
  name: "donate",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "TatsuYTB",
  description: "Donate cho thằng admin nghèo khổ",
  commandCategory: "Hệ Thống",
  usages: "",
  cooldowns: 5,
};

module.exports.handleEvent = async ({ event, api, Threads }) => {
  const moment = require("moment-timezone");
  const time = process.uptime();
     var hours = Math.floor(time / (60 * 60));
    var minutes = Math.floor((time % (60 * 60)) / 60);
  var seconds = Math.floor(time % 60);
  var { threadID, messageID, body, senderID } = event;
  //if (senderID == global.data.botID) return;
  if ((this.config.credits) != "TatsuYTB") { return api.sendMessage(`...`, threadID, messageID)}
  function out(data) {
    api.sendMessage(data, threadID, messageID)
  }
  var dataThread = (await Threads.getData(threadID));
  var data = dataThread.data; 
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};

  var arr = ["donate"];
  arr.forEach(i => {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() | body === i | str === body) {
    const prefix = threadSetting.PREFIX || global.config.PREFIX;
      if (data.PREFIX == null) {
        return out(`𝐃𝐨𝐧𝐚𝐭𝐞 𝐜𝐡𝐨 𝐭𝐡𝐚̆̀𝐧𝐠 𝐚𝐝𝐦𝐢𝐧 𝐧𝐠𝐡𝐞̀𝐨 𝐤𝐡𝐨̂̉\n---------------------\n𝐌𝐁𝐁𝐚𝐧𝐤: 036319189999\nNguyễn Tuấn Ninh\n---------------------\n𝐕𝐢𝐞𝐭𝐂𝐨𝐦𝐁𝐚𝐧𝐤: 1041959515\nNguyễn Tuấn Ninh\n---------------------`)
      }
      else return out(`---------------------\n𝐌𝐁𝐁𝐚𝐧𝐤: 036319189999\nNguyễn Tuấn Ninh\n---------------------\n𝐕𝐢𝐞𝐭𝐂𝐨𝐦𝐁𝐚𝐧𝐤: 1041959515\nNguyễn Tuấn Ninh\n---------------------` + data.PREFIX)
    }

  });
};
module.exports.run = async({ event, api }) => {
    return api.sendMessage({body:`𝐓𝐡𝐨̛̀𝐢 𝐆𝐢𝐚𝐧 𝐁𝐨𝐭 𝐃̄𝐚̃ 𝐎𝐧𝐥𝐢𝐧𝐞 \n================\n ${hours} 𝐠𝐢𝐨̛̀ ${minutes} 𝐩𝐡𝐮́𝐭 ${seconds} 𝐠𝐢𝐚̂𝐲`, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://vnhhoang.vnhoang06.repl.co/image/phongcanh')).data.data,
method: "GET",
responseType: "stream"
})).data                                      }, event.threadID)
      }