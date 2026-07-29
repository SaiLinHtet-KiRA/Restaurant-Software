import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer: MongoMemoryServer;

export const dbConnect = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
  mongoServer = await MongoMemoryServer.create({
    instance: {
      args: [
        "--setParameter",
        "indexBuildMinAvailableDiskSpaceMB=0",
      ],
    },
  });
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
};

export const dbDisconnect = async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
};
