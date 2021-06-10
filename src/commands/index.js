import test from "./test.js";
import help from "./help.js";
import upload from "../databases/minio.js";

function parseCommand(comm) {
  if (comm === "test") {
    return test.testfunc();
  }
  if (comm.startsWith("help") || comm.startsWith("도움") || comm === "명령어") {
    return help.help();
  }
  if (comm.startsWith("upload") || comm.startsWith("업")) {
    return;
  }
}

function execute(comm) {
  let retMesg = parseCommand(comm);
  return retMesg;
}

const command = {
  execute
};
export default command;
