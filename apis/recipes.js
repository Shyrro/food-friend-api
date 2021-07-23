const connectToDb = require('../dbUtils/connect');

const initRecipesAPI = (app) => {
  app.get("/recipes", async (req, res) => {
    const client = await connectToDb();

    const collection = client
      .db(process.env["DB_NAME"])
      .collection("Recipees");
    collection.find({}).toArray(function (err, ingredients) {
      if (err) throw err;

      return res.send(ingredients);
    });
  });

  app.put("/recipes", async (req, res) => {
    const client = await connectToDb();
    const content = req.body;

    if (!content) return res.status(400).send("Write");

    await client
      .db(process.env["DB_NAME"])
      .collection("Recipees")
      .updateOne({ _id: content._id }, { $set: content }, { upsert: true });

    return res.send(content._id);
  });
};

module.exports = initRecipesAPI;