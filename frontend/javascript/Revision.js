// ===========================================
// 📘 JAVASCRIPT CORE PRACTICE + REVISION FILE
// ===========================================
//
// Author: Raj Tejaswee
// Purpose: Revision + interview prep + project reference
// Topics: setTimeout, setInterval, callbacks, Promises,
// async/await, try-catch, event loop, hoisting, TDZ,
// and general async behavior.
//
// -------------------------------------------
// SECTION 1 — setTimeout + Event Loop
// -------------------------------------------

// 🔹 Example 1: Execution order (macrotask queue)
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
// Output: A → C → B
// Explanation: setTimeout callback goes to Web API → macrotask queue → executes after stack clears.

// 🔹 Example 2: Promisified version of setTimeout
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Example usage:
async function steps() {
  console.log("Start");
  await wait(2000); // pauses only this async function
  console.log("End");
}
// steps();

// -------------------------------------------
// SECTION 2 — setInterval + clearInterval
// -------------------------------------------

// Print 1–5 with 1-second gap and stop.
let counter = 1;
const intervalId = setInterval(() => {
  console.log("Count:", counter);
  counter++;
  if (counter > 5) clearInterval(intervalId);
}, 1000);

// -------------------------------------------
// SECTION 3 — Callbacks
// -------------------------------------------

function task(name, callback) {
  console.log("Starting", name);
  setTimeout(() => {
    console.log("Completed", name);
    callback();
  }, 1000);
}

task("Task 1", () => console.log("All done"));
// Output order:
// Starting Task 1
// Outside
// Completed Task 1
// All done

// -------------------------------------------
// SECTION 4 — Promises
// -------------------------------------------

// A Promise is a container for a future value
const promiseExample = new Promise((resolve, reject) => {
  const success = true;
  setTimeout(() => {
    success ? resolve("✅ Success") : reject("❌ Failure");
  }, 1000);
});

promiseExample
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

// 🔹 Promise chaining example
new Promise((resolve) => setTimeout(resolve, 1000))
  .then(() => {
    console.log("Step 1");
    return new Promise((resolve) => setTimeout(resolve, 1000));
  })
  .then(() => {
    console.log("Step 2");
    return new Promise((resolve) => setTimeout(resolve, 1000));
  })
  .then(() => console.log("Step 3"));

// -------------------------------------------
// SECTION 5 — Async/Await
// -------------------------------------------

async function asyncDemo() {
  console.log("1");
  await new Promise((res) => setTimeout(res, 1000));
  console.log("2");
}
asyncDemo();
console.log("3");
// Output: 1 → 3 → 2

// 🔹 Error handling with try...catch
async function testError() {
  try {
    console.log("Start");
    await wait(1000);
    throw new Error("Something went wrong");
  } catch (e) {
    console.log("Error caught:", e.message);
  }
}
testError();

// -------------------------------------------
// SECTION 6 — Promise Flow Understanding
// -------------------------------------------

console.log("1");
new Promise((resolve) => {
  console.log("2");
  resolve();
}).then(() => console.log("3"));
console.log("4");
// Output: 1 → 2 → 4 → 3

// -------------------------------------------
// SECTION 7 — Common Interview Patterns
// -------------------------------------------

// 🔹 Promisify setTimeout
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 🔹 Sequential async operations (await chaining)
async function printSequence() {
  console.log(1);
  await delay(1000);
  console.log(2);
  await delay(1000);
  console.log(3);
}
printSequence();

// 🔹 Promise rejection flow
Promise.reject("Error!")
  .then(() => console.log("Then"))
  .catch((e) => console.log("Caught:", e))
  .then(() => console.log("Done"));
// Output: Caught: Error! → Done

// -------------------------------------------
// SECTION 8 — Quick Revision Notes
// -------------------------------------------
//
// setTimeout(fn, delay) → Schedules task (macrotask).
// setInterval(fn, delay) → Repeats task until cleared.
// clearInterval(id) → Stops interval.
// Promise → Resolves (success) or rejects (failure).
// .then() → handles resolve.
// .catch() → handles reject.
// async/await → sugar for Promise-based code.
// await → pauses inside async function only.
// try/catch → handles both sync and async errors.
// Microtasks (Promises) run before Macrotasks (Timers).
// Promisify → convert callback-based async to Promise.
// “Await pauses inside, not outside.”
//
// Mnemonics:
// - Promises before timers.
// - Catch heals the chain.
// - Async always returns a Promise.
// - Await unwraps the Promise.

// -------------------------------------------
// END OF FILE
// -------------------------------------------
//
// Save as: javascript-core-practice.js
// Commit message: "JS Fundamentals Practice and Revision"
// Push to: https://github.com/<your-username>/javascript-core-practice
//
