import { Stdt, FrStdt } from "./exercise3.mjs";
import { Prom } from "./exercise4.mjs";

// Create some students
const student1 = new Stdt("Doe", "John", 123);
const student2 = new FrStdt("Smith", "Jane", 456, "French");
const student3 = new Stdt("Johnson", "Bob", 789);
const student4 = new FrStdt("Lee", "Sarah", 101, "Chinese");

// Create a promotion and add the students
const prom = new Prom();
prom.add(student1);
prom.add(student2);
prom.add(student3);
prom.add(student4);

// Test the size method
console.log(prom.size()); // Output: 4

// Test the get method
console.log(prom.get(1).toString()); // Output: student: Smith, Jane, 456, French

// Test the print method
console.log(prom.print());
// Output:
// student: Doe, John, 123
// student: Smith, Jane, 456, French
// student: Johnson, Bob, 789
// student: Lee, Sarah, 101, Chinese

// Test the write and read methods
const serializedProm = prom.write();
const deserializedProm = new Prom();
deserializedProm.read(serializedProm);
console.log(deserializedProm.print());
// Output:
// student: Doe, John, 123
// student: Smith, Jane, 456, French
// student: Johnson, Bob, 789
// student: Lee, Sarah, 101, Chinese

// Test the saveToFile and readFromFile methods
deserializedProm.saveToFile("prom.json");
const loadedProm = new Prom();
loadedProm.readFromFile("prom.json");
console.log(loadedProm.print());
// Output:
// student: Doe, John, 123
// student: Smith, Jane, 456, French
// student: Johnson, Bob, 789
// student: Lee, Sarah, 101, Chinese
