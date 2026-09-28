/*
import fs from "fs";

fs.readFile("work.js", "utf-8", (err, data) =>
  console.log("1. Read Result: ", err, "\n data", data));

console.log("2. After readFile");

console.log("3. Hellooo from work.js");
*/

/*

import fs from "fs/promises";

fs
  .readFile("wodrk.js", "utf-8")
  .then((data) => data.substring(0, 20))
  .then((subData) => console.log("1. ", subData))
  .catch((reason) => fs.readFile("work.js", "utf-8"))
  .then((data) => data.substring(0, 20))
  .then((subData) => console.log("1. ", subData))
  .catch((reason) => console.log(reason))

console.log("3. After readFile");

console.log("4. Hellooo from work.js");
*/

/*

import fs from "fs/promises";

async function main() {
  try {
    const data = await fs.readFile("work.js", "utf-8");
    const subdata = data.substring(0, 20);
    console.log("1. ", subdata);
  } catch (reason) {
    console.log(reason);
  }

  console.log("3. After readFile");

  console.log("4. Hellooo from work.js");
}

main();

console.log("5. After main");

*/

function* Nats(max = 10) {
  let n = 0;
  while (n < max) {
    yield n;
    n++;
  }
}

// const Nats10 = Nats();

// for (let n of Nats10){
// console.log(n)
// }

const Nats5 = Nats(5).map((x) => x ** 2);

for (let n of Nats5) {
  console.log(n);
}
