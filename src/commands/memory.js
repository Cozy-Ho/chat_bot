import { createMemory, deleteMemory, getMemory } from "../databases/mongo.js";
import uuidv4 from "uuid/v4.js";

export async function saveMemo(memo) {
  let id = uuidv4();
  let date = Date.now();
  memo.id = id;
  memo.date = date;
  let result = null;
  if (memo.key != null && memo.value != null) {
    result = await createMemory(memo);
  } else {
    result = "입력 형식을 맞춰주세요!";
  }
  return result;
}

export async function deleteMemo(memo) {
  let result = null;
  if (memo.key != null) {
    result = await deleteMemory(memo);
  } else {
    result = "입력 형식을 맞춰주세요!";
  }
  return result;
}

export async function getMemo(memo) {
  let result = null;
  if (memo.key != null) {
    result = await getMemory(memo);
  } else {
    result = "입력 형식을 맞춰주세요!";
  }
  return result;
}
