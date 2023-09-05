"use strict";

export function wcount(s){
    var res = {};
    var arr = s.split(' ');
    for (var word of arr){
        if(res[word]) {
            res[word]++;
        }
        else{
            res[word]=1;
        }

    }
    return res;
}

export function WrdLst(str) {
    this.wordsCnt = wcount(str);
    this.wordsKeys = Object.keys(this.wordsCnt);
    this.getWords = function()
    {
        var words= []
        for (var word of this.wordsKeys)
        {
            words.push(word);
        }
        words.sort();
        return words;
    };
    this.getCount = function(word){
        return this.wordsCnt[word] || 0;
    }
    var Values = Object.values(this.wordsCnt);
    Values.sort();
    this.maxCountWord = function(){
        var n=Values.length-1;
        var maxWrds=[];
        for (var word of this.getWords()){
            if (this.getCount(word)===Values[n])
            {
                maxWrds.push(word);
            }
        }
        return maxWrds.sort()[0];
    };
    this.minCountWord = function(){
        var maxWrds=[];
        for (var word of this.getWords()){
            if (this.getCount(word)===Values[0])
            {
                maxWrds.push(word);
            }
        }
        return maxWrds.sort()[0];
    };

    this.applyWordFunc = function(f)
    {
        return this.getWords().map(word => f(word));
    };


}
