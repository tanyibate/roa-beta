import { connect } from "../../../mongoSetup";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  const { db } = await connect();

  if (req.method === "GET") {
    const docs = await db.collection("posts").find().toArray();

    console.log("Found the following records");
    console.log(docs);
    res.status(200).json(docs);
  }
  if (req.method === "POST") {
    const { post } = req.body;
    const collection = db.collection("posts");
    const result = await collection.insertMany([post]);
    res.status(200).json(result);
  }
  if (req.method === "PUT") {
    const { comment, id } = req.body;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateDoc = {
      $push: {
        "comments.0.subcomments": comment,
      },
    };
    const upVote = {
      $set: {
        "comments.0.subcomments.upvote": 2,
      },
    };

    const collection = db.collection("posts");
    const result = await collection.updateOne(filter, updateDoc, options);
    const result2 = await collection.updateOne(filter, upVote, options);

    res.status(200).json(result);
  }
};
