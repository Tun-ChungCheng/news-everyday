const express = require("express");
const app = express();
const linebot = require("linebot");
const mongoose = require("mongoose");
require("dotenv").config;
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("2e0a97b0e60746ff84e8fa08ffdbef59");
const schedule = require("node-schedule");

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

const message = [];

const job = schedule.scheduleJob("30 * * * *", function () {
  newsapi.v2
    .topHeadlines({
      country: "tw",
    })
    .then((response) => {
      response.articles.map((article, index) => {
        message.push({
          index: ++index,
          title: article.title,
          url: article.url,
        });
      });
      console.log(message);
    });
  bot.reply("早上好台灣! 我是主播狗仔，以下為昨天的焦點新聞" + message);
});

const linebotParser = bot.parser();
app.post("/linewebhook", linebotParser);

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, World!\n");
});

/* Connect To port 8080 */
const port = process.env.PORT || 8080;
const hostname = "localhost";

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
