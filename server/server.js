const app = require("./app");
const { appConfig } = require("./config");

app.listen(appConfig.port, () => {
  console.log(`App listening on port ${appConfig.port}`);
});
