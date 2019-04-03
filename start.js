const kvfs = require("kvfs")(".data");
const app = require("./app");

app(kvfs).listen(3923);
