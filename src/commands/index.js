import { test } from "./test.js";
import { help } from "./help.js";
import { saveMemo, deleteMemo, getMemo } from "./memory.js";
// import upload from "../databases/minio.js";

export async function parseCommand(args) {
  let comm = args[0].substring(1);
  if (comm === "test") {
    return test();
  }
  if (comm.startsWith("help") || comm.startsWith("도움") || comm === "명령어") {
    return help();
  }
  if (comm.startsWith("upload") || comm.startsWith("업")) {
    return "아직 개발중이얌 >_<";
  }
  if (comm === "mem" || comm === "기억") {
    let memo = {
      tableName: "memo",
      key: args[1] || null,
      value: args[2] || null
    };
    console.log(memo);
    let retText = await saveMemo(memo);
    return retText;
  }
  if (comm == "del" || comm === "지워") {
    let memo = {
      tableName: "memo",
      key: args[1] || null
    };
    let retText = await deleteMemo(memo);
    return retText;
  }
  if (comm == "what" || comm === "뭐야") {
    let memo = {
      tableName: "memo",
      key: args[1] || null
    };
    let retText = await getMemo(memo);
    return retText;
  }
}
