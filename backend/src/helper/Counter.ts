import mongoose from "mongoose";

const Counter = mongoose.connection.useDb("Counter").model(
  "Counter",
  new mongoose.Schema({
    _id: String,
    sequence_value: Number,
  }),
);

export async function getNextSequence(name: "ItemId" | "UserId" | "TableId") {
  const counter = await Counter.findOneAndUpdate(
    { _id: name },
    { $inc: { sequence_value: 1 } },
    {
      new: true,
      upsert: true,
    },
  );

  return counter.sequence_value;
}

export async function reduceSequence(name: "ItemId" | "UserId" | "TableId") {
  await Counter.findOneAndUpdate(
    { _id: name },
    { $inc: { sequence_value: -1 } },
    {
      new: true,
      upsert: true,
    },
  );
}
