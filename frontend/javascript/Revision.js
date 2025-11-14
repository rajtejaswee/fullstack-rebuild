// =========================================================
// JAVASCRIPT INTERVIEW REVISION + PRACTICE GUIDE
// =========================================================
//
// Author: Raj Tejaswee
// Purpose: One-file revision before any interview or project
// Topics Covered: setTimeout, setInterval, callbacks,
// Promises, async/await, try-catch, event loop,
// hoisting, TDZ, microtasks/macrotasks.
//
// =========================================================

// ---------------------------------------------------------
// 1 setTimeout and Execution Order
// ---------------------------------------------------------
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");

// Output:
// A
// C
// B
// Explanation:
// setTimeout() sends its callback to Web API → macrotask queue.
// JS executes synchronously (A, then C).
// When call stack is empty, event loop pushes macrotask back → prints B.

// ---------------------------------------------------------
// 2 setInterval and clearInterval
// ---------------------------------------------------------
let counter = 1;
const id = setInterval(() => {
  console.log("Count:", counter);
  counter++;
  if (counter > 3) clearInterval(id);
}, 1000);

// Output:
// Count: 1
// Count: 2
// Count: 3
// Explanation:
// setInterval schedules repeating tasks every 1000 ms until cleared.

// ---------------------------------------------------------
// 3 Callback Flow (classic asynchronous pattern)
// ---------------------------------------------------------
function task(name, callback) {
  console.log("Starting", name);
  setTimeout(() => {
    console.log("Completed", name);
    callback();
  }, 1000);
}
task("Task 1", () => console.log("All done"));
console.log("Outside");

// Output:
// Starting Task 1
// Outside
// Completed Task 1
// All done
// Explanation:
// setTimeout’s callback runs later. Main thread doesn’t wait.

// ---------------------------------------------------------
// 4 Promise Creation and Resolution
// ---------------------------------------------------------
const promiseExample = new Promise((resolve, reject) => {
  console.log("Promise started");
  setTimeout(() => resolve("Resolved ✅"), 1000);
});

promiseExample.then((val) => console.log(val));

// Output:
// Promise started
// Resolved ✅
// Explanation:
// Promise executor runs immediately (synchronous).
// Resolution (.then) runs later (microtask queue).

// ---------------------------------------------------------
// 5 Promise Execution Order
// ---------------------------------------------------------
console.log("1");
new Promise((resolve) => {
  console.log("2");
  resolve();
}).then(() => console.log("3"));
console.log("4");

// Output:
// 1
// 2
// 4
// 3
// Explanation:
// Promise body executes immediately (sync).
// .then() runs later via microtask queue.

// ---------------------------------------------------------
// 6 Promise Chaining
// ---------------------------------------------------------
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

// Output:
// Step 1 (after 1s)
// Step 2 (after 2s)
// Step 3 (after 3s)
// Explanation:
// Each .then returns a new Promise, causing sequential delay execution.

// ---------------------------------------------------------
// 7 Promise Rejection + Catch + Chain Continuation
// ---------------------------------------------------------
Promise.reject("Error!")
  .then(() => console.log("Then"))
  .catch((err) => console.log("Caught:", err))
  .then(() => console.log("Done"));

// Output:
// Caught: Error!
// Done
// Explanation:
// .catch() handles rejection and returns a resolved Promise.
// Chain continues normally → prints “Done”.

// ---------------------------------------------------------
// 8 async/await Flow
// ---------------------------------------------------------
async function test() {
  console.log("1");
  await new Promise((res) => setTimeout(res, 1000));
  console.log("2");
}
test();
console.log("3");

// Output:
// 1
// 3
// 2
// Explanation:
// await pauses only inside the async function.
// The rest of the program continues → prints “3” before “2”.

// ---------------------------------------------------------
// 9 try...catch for async errors
// ---------------------------------------------------------
const wait = (ms) => new Promise((res) => setTimeout(res, ms));

async function testError() {
  try {
    console.log("Start");
    await wait(1000);
    throw new Error("Something went wrong!");
  } catch (e) {
    console.log("Error caught:", e.message);
  }
}
testError();

// Output:
// Start
// (after 1s) Error caught: Something went wrong!
// Explanation:
// Errors inside async functions automatically reject the Promise.
// try/catch handles both sync and async exceptions.

// ---------------------------------------------------------
// 10 Promisified setTimeout Utility
// ---------------------------------------------------------
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function delayDemo() {
  console.log("Start");
  await delay(2000);
  console.log("End after 2s");
}
delayDemo();

// Output:
// Start
// (2s delay)
// End after 2s
// Explanation:
// delay() returns a Promise that resolves after ms → pause with await.

// ---------------------------------------------------------
// 11 Sequential Async Execution Example
// ---------------------------------------------------------
async function sequence() {
  console.log(1);
  await delay(1000);
  console.log(2);
  await delay(1000);
  console.log(3);
}
sequence();

// Output:
// 1
// (1s)
// 2
// (1s)
// 3
// Explanation:
// await ensures each line waits for the Promise before continuing.

// ---------------------------------------------------------
// 12 Microtask vs Macrotask Order
// ---------------------------------------------------------
console.log("A");
setTimeout(() => console.log("Timer (macrotask)"), 0);
Promise.resolve().then(() => console.log("Promise (microtask)"));
console.log("B");

// Output:
// A
// B
// Promise (microtask)
// Timer (macrotask)
// Explanation:
// Microtasks (Promises) run before macrotasks (Timers) once stack clears.

// ---------------------------------------------------------
// 13 Hoisting and TDZ (Temporal Dead Zone)
// ---------------------------------------------------------
// console.log(x); // undefined (var is hoisted)
// console.log(y); // ReferenceError (TDZ for let)
// var x = 10;
// let y = 20;
// Explanation:
// var declarations are hoisted with value undefined.
// let/const are hoisted but inaccessible until initialization (TDZ).

// ---------------------------------------------------------
// 14 Value vs Reference
// ---------------------------------------------------------
let a = 10;
let b = a;
b = 20;
console.log(a, b); // 10 20

const arr1 = [1, 2];
const arr2 = arr1;
arr2.push(3);
console.log(arr1); // [1,2,3]
// Explanation:
// Primitives → copied by value.
// Objects/arrays → assigned by reference.

// ---------------------------------------------------------
// 15 const with Objects
// ---------------------------------------------------------
const obj = { name: "Raj" };
obj.name = "Tejaswee";
console.log(obj.name); // Tejaswee
// obj = {}; // ❌ TypeError
// Explanation:
// const prevents reassignment of the variable, not mutation of the object.

// ---------------------------------------------------------
// QUICK RECAP (Read This Before Interview)
// ---------------------------------------------------------
//
// setTimeout(fn, ms) → schedules fn after ms (macrotask).
// setInterval(fn, ms) → repeats fn every ms until cleared.
// Promise → represents a future value (resolve/reject).
// .then() → runs when resolved (microtask).
// .catch() → runs when rejected.
// async → always returns a Promise.
// await → pauses inside async, unwraps Promise.
// try/catch → handles async & sync errors in one block.
// Microtasks (Promises) → run before Macrotasks (Timers).
// TDZ → let/const exist but inaccessible before initialization.
// Primitives → pass by value. Objects → by reference.
// const object → can mutate, can’t reassign.
//
// Mnemonics:
// - "Promises before timers."
// - "Catch heals the chain."
// - "Await unwraps a Promise."
// - "Async always returns a Promise."
// - "Await pauses inside, not outside."
//
// ---------------------------------------------------------
// END OF FILE
// ---------------------------------------------------------
