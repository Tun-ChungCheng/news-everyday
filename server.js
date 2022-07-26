const express = require("express");
const app = express();
const linebot = require("linebot");
require("dotenv").config;

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

bot.on("message", (event) => {
  event
    .reply("大大大優惠")
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

const linebotParser = bot.parser();
app.post("/linewebhook", linebotParser);

/* Connect To port 8080 */
const port = process.env.PORT || 8080;
const hostname = "localhost";

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
