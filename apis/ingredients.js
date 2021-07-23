const connectToDb = require("../dbUtils/connect");

const initIngredientsAPI = (app) => {
  app.get("/ingredients", async (req, res) => {
    const client = await connectToDb();

    const collection = client
      .db(process.env["DB_NAME"])
      .collection("Ingredients");
      
    collection.find({}).toArray(function (err, ingredients) {
      if (err) throw err;

      return res.send(ingredients);
    });
  });

  app.put("/ingredients", async (req, res) => {
    const client = await connectToDb();
    const content = req.body;

    if (!content) return res.status(400).send("Write");

    await client
      .db(process.env["DB_NAME"])
      .collection("Ingredients")
      .updateOne({ _id: content._id }, { $set: content }, { upsert: true });

    return res.send(content._id);
  });
};

module.exports = initIngredientsAPI;
