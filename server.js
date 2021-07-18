const express = require("express");
const app = express();

app.get("/food", function (req, res) {
  return res.send(["tomato", "cucumber", "carrot", "oignon"]);
});

app.listen(process.env.PORT || 8080);
