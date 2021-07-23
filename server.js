const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());

const { MongoClient } = require("mongodb");
require("dotenv").config({ path: __dirname + "/.env" });
const uri = `mongodb+srv://${process.env["DB_USERNAME"]}:${process.env["DB_PASSWORD"]}@mycluster.g0vxx.mongodb.net/${process.env["DB_NAME"]}?retryWrites=true&w=majority`;

const connectToDb = async () => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  if (!client.isConnected)
    await client.connect().catch((err) => console.log(err));
  return client;
};

app.get("/ingredients", async function (req, res) {
  const client = await connectToDb();

  const collection = client.db("FoodPlanner").collection("Ingredients");
  collection.find({}).toArray(function (err, ingredients) {
    if (err) throw err;

    return res.send(ingredients);
  });
});

app.listen(process.env.PORT || 8080);
