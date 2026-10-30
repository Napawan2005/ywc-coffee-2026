import { sampleResult } from "./data";

export function fakeAnalyze(file) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (file.name.includes("dark")) {
        reject({ reason: "รูปมืดเกินไป" });
      } else {
        resolve(sampleResult);
      }
    }, 100);
  });
}
