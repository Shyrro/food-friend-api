const { MongoClient } = require("mongodb");
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

module.exports = connectToDb;