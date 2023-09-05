"use strict";

// no recursion
export function fiboIt(n) {
    if (n<=1) return n;
    var old = 0;
    var recent = 1;
    var result=0;
    for(var i=2;i<=n;i++)
    {
        result=old+recent;
        old= recent;
        recent = result;
    }
    return result;
}

// recursive function
export function fibRec(n) {
    if (n<=1) return n;
    return fibRec(n-2)+fibRec(n-1);
}

// use a loop
export function fibArr(t) {
    var resultArr = [];
    for (var i=0;i<t.length;i++){
        resultArr[i]=fibRec(t[i]);
    }
    return resultArr;
}

// use of map
export function fibonaMap(t) {
    return t.map(fibRec)
}