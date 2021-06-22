import mongoose from "mongoose";
import { memorySchema } from "./schema/memory.js";
import dotenv from "dotenv";

dotenv.config();

let config = process.env;

const MONGO_CONN_URI =
  "mongodb://" + config.MONGO_URI + ":" + config.MONGO_PORT;

export async function connect() {
  await mongoose
    .connect(
      MONGO_CONN_URI,
      { user: config.MONGO_ID, pass: config.MONGO_PW },
      { useNewUrlParser: true }
    )
    .then(() => console.log("success to connect MongoDB"))
    .catch(err => console.log(err));
  await mongoose.set("useFindAndModify", false);
}

export async function createMemory(args) {
  let Memory = mongoose.model(args.tableName, memorySchema);
  try {
    const memory = await Memory.findOneAndUpdate(
      {
        key: args.key
      },
      {
        key: args.key,
        value: args.value,
        date: args.date
      },
      { upsert: true, new: true }
    );
    return "저장 완료!";
  } catch (err) {
    console.log(err);
    return "저장 실패..! 다시 시도해주세요!";
  }
}

export async function deleteMemory(args) {
  let Memory = mongoose.model(args.tableName, memorySchema);
  try {
    const memory = await Memory.findOneAndDelete({
      key: args.key
    });
    console.log(memory);
    return "삭제 완료";
  } catch (err) {
    console.log(err);
    return "삭제 실패";
  }
}

export async function getMemory(args) {
  let Memory = mongoose.model(args.tableName, memorySchema);
  try {
    const memory = await Memory.findOne({
      key: args.key
    });
    console.log(memory);
    return memory.key + " == " + memory.value;
  } catch (err) {
    console.log(err);
    return "기억을 찾을 수 없습니다!";
  }
}
