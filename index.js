const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
app.use(jsonParser);
const teamRouter = require("./team/router");
app.use(teamRouter);
const playerRouter = require("./player/router");
app.use(playerRouter);
const cityRouter = require("./city/router");
app.use(cityRouter);
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
