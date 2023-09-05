"use strict";

import {Stdt, FrStdt} from "../exercise3.mjs";
const student = new Stdt("Dupond", "John", 1835);
console.log(student.toString());  
const frenchStudent = new FrStdt("Doe", "John", 432, "French");
console.log(frenchStudent.toString());  