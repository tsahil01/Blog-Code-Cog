// We are having two fn- to get date & to get only day.
// module.exports is a js object (like JSON)
// module.exports has shortcut ---> module.exprots = exports

const x = {
    "S":"t",
    "A":"q",
    "Random Post":"Lorem ipsum ipsum"
};
exports.pushData = function(heading, content){
    x[heading] = content;
    // return  x;
}

exports.getData = function(){
    return  x;
}

