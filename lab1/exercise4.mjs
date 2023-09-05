"use strict";

import {Stdt, FrStdt} from "./exercise3.mjs";
import * as fs from "node:fs";

export class Prom {
    constructor(){
    this.students = [];
    }
    add(student){
        this.students.push(student);
    }
    size(){
        return this.students.length;
    }
    get(i){
        return this.students[i];
    }
    print(){
        let result = ""
        for(let i=0;i<this.size();i++){
            console.log(this.get(i).toString());
            result+= this.get(i).toString() +'\n';
        }
        return result;
    }
    write(){
        return JSON.stringify(this.students);
    }
    read(str){
        let students_obj = JSON.parse(str);
        for (let stud of students_obj){
            if(stud.nationality){
                this.students.push(new FrStdt(stud.lastName, stud.firstName, stud.id, stud.nationality));
            }
            else{
                this.students.push(new Stdt(stud.lastName, stud.firstName, stud.id));
            }
        }
    }
    saveToFile(fileName){
        fs.writeFileSync(fileName,this.write());
    }
    readFromFile(fileName){
        return this.read(fs.readFileSync(fileName,"utf-8"))
    }
}