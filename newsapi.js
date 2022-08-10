const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("2e0a97b0e60746ff84e8fa08ffdbef59");
const schedule = require("node-schedule");
const message = [];
// const job = schedule.scheduleJob("21 * * * *", function () {

newsapi.v2
  .topHeadlines({
    country: "tw",
  })
  .then((response) => {
    response.articles.map((article, index) => {
      // console.log(index + 1, article.title);
      message.push({ index: ++index, title: article.title, url: article.url });
    });
    console.log(message);
  });

// });
