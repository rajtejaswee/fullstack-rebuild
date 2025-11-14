// ===============================================================
// JAVASCRIPT ARRAYS + OBJECTS REFERENCE (INTERVIEW + PROJECT)
// ===============================================================
//
// Author: Raj Tejaswee
// Purpose: One-stop cheat sheet for core array/object methods.
// Use this during development AND interview revision.
// Every function has syntax + example + explanation.
//
// ===============================================================

// ---------------------------------------------------------------
// 1 Array.prototype.forEach()
// ---------------------------------------------------------------
//
// ✔ Used for looping (does NOT return anything).
// ✔ Not chainable.
// ✔ Perfect for side-effects like logging, updating counters.
//

const nums = [1, 2, 3];

nums.forEach((num, index) => {
  console.log("ForEach:", num, "at index", index);
});

// Output:
// ForEach: 1 at index 0
// ForEach: 2 at index 1
// ForEach: 3 at index 2

// ---------------------------------------------------------------
// 2 Array.prototype.map()
// ---------------------------------------------------------------
//
// ✔ Transforms each element.
// ✔ Returns a NEW ARRAY (same length).
// ✔ Most used transformation method.
//

const doubled = nums.map((num) => num * 2);
console.log("Map:", doubled);

// Output:
// Map: [2, 4, 6]

// ---------------------------------------------------------------
// 3 Array.prototype.filter()
// ---------------------------------------------------------------
//
// ✔ Filter elements based on condition.
// ✔ Returns a NEW ARRAY (may be shorter).
//

const evens = nums.filter((num) => num % 2 === 0);
console.log("Filter:", evens);

// Output:
// Filter: [2]

// ---------------------------------------------------------------
// 4 Array.prototype.find()
// ---------------------------------------------------------------
//
// ✔ Returns the FIRST matching element.
// ✔ If none found → undefined.
//

const found = nums.find((num) => num === 2);
console.log("Find:", found);

// Output:
// Find: 2

// ---------------------------------------------------------------
// 5 Array.prototype.some()
// ---------------------------------------------------------------
//
// ✔ Returns true if ANY element matches condition.
//

const hasEven = nums.some((num) => num % 2 === 0);
console.log("Some:", hasEven);

// Output:
// Some: true

// ---------------------------------------------------------------
// 6 Array.prototype.every()
// ---------------------------------------------------------------
//
// ✔ Returns true ONLY if ALL elements match condition.
//

const allPositive = nums.every((num) => num > 0);
console.log("Every:", allPositive);

// Output:
// Every: true

// ---------------------------------------------------------------
// 7 Array.prototype.reduce()
// ---------------------------------------------------------------
//
// ✔ Used to accumulate values (sum, product, objects, grouping).
// ✔ Extremely important for interviews.
//

const sum = nums.reduce((acc, num) => acc + num, 0);
console.log("Reduce Sum:", sum);

// Output:
// Reduce Sum: 6

// ---------------------------------------------------------------
// 8 Array.prototype.sort()
// ---------------------------------------------------------------
//
// ✔ Mutates original array.
// ✔ Always provide compare function for numbers.
//

const arr = [5, 1, 9, 3];
arr.sort((a, b) => a - b);
console.log("Sort:", arr);

// Output:
// Sort: [1, 3, 5, 9]

// ---------------------------------------------------------------
// 9 Array.prototype.flat()
// ---------------------------------------------------------------
//
// ✔ Flattens nested arrays.
//

const nested = [1, [2, 3], [4, [5]]];
console.log("Flat:", nested.flat(2));

// Output:
// Flat: [1, 2, 3, 4, 5]

// ---------------------------------------------------------------
// 10 Array.prototype.flatMap()
// ---------------------------------------------------------------
//
// ✔ map + flat(1)
// ✔ Used in transformation + flattening.
//

const flatMapped = nums.flatMap((n) => [n, n * 2]);
console.log("FlatMap:", flatMapped);

// Output:
// FlatMap: [1, 2, 2, 4, 3, 6]

// ===============================================================
// 🧱 OBJECTS — MUST KNOW FUNCTIONS + PATTERNS
// ===============================================================

// ---------------------------------------------------------------
// 1 Object.keys()
// ---------------------------------------------------------------
//
// ✔ Returns array of keys.
//

const user = { name: "Raj", age: 21 };
console.log("Keys:", Object.keys(user));

// Output: ["name", "age"]

// ---------------------------------------------------------------
// 2 Object.values()
// ---------------------------------------------------------------
//
// ✔ Returns array of values.
//

console.log("Values:", Object.values(user));

// Output: ["Raj", 21]

// ---------------------------------------------------------------
// 3 Object.entries()
// ---------------------------------------------------------------
//
// ✔ Returns key-value pairs as array.
//

console.log("Entries:", Object.entries(user));

// Output:
// [["name", "Raj"], ["age", 21]]

// ---------------------------------------------------------------
// 4 Object.assign() — Shallow Copy
// ---------------------------------------------------------------

const copy1 = Object.assign({}, user);
console.log("Assign Copy:", copy1);

// ---------------------------------------------------------------
// 5 Spread Operator — Best for Copying Objects
// ---------------------------------------------------------------

const copy2 = { ...user };
console.log("Spread Copy:", copy2);

// ---------------------------------------------------------------
// 6 Spread Operator — Merging Objects
// ---------------------------------------------------------------

const extra = { country: "India" };
const merged = { ...user, ...extra };
console.log("Merged:", merged);

// Output:
// { name: 'Raj', age: 21, country: 'India' }

// ---------------------------------------------------------------
// 7 Object.freeze()
// ---------------------------------------------------------------
//
// ✔ Prevents modification (makes object immutable).
//

const frozen = Object.freeze({ lang: "JS" });
// frozen.lang = "Python"; // ❌ ignored
console.log("Frozen:", frozen);

// ---------------------------------------------------------------
// 8 Destructuring Objects
// ---------------------------------------------------------------
//
// ✔ Extract values cleanly.
//

const { name, age } = user;
console.log("Destructured:", name, age);

// Output: Raj 21

// ---------------------------------------------------------------
// 9 Rest Operator in Objects
// ---------------------------------------------------------------
//
// ✔ Get rest of fields.
//

const { name: n, ...rest } = user;
console.log("Rest Operator:", n, rest);

// Output: Raj { age: 21 }

// ---------------------------------------------------------------
// 10 Deep Copy (Structured Clone)
// ---------------------------------------------------------------
//
// ✔ Best safe method for deep copying.
//

const deepUser = structuredClone(user);
console.log("Deep Copy:", deepUser);

// ===============================================================
// MUST KNOW CHEATSHEET (READ BEFORE INTERVIEW)
// ===============================================================
//
// ✔ forEach → loop (no return)
// ✔ map → transform + return new array
// ✔ filter → keep items
// ✔ find → first match
// ✔ some → any true?
// ✔ every → all true?
// ✔ reduce → accumulate (sum, count, objects)
// ✔ sort → beware mutation
// ✔ flat / flatMap → flatten arrays
//
// ✔ Object.keys / values / entries → iterate objects
// ✔ Spread → copy + merge
// ✔ Rest → exclude fields
// ✔ Object.freeze → make immutable
// ✔ structuredClone → deep copy
//
// ===============================================================
// END OF FILE
// ===============================================================
