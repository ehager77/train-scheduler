var original = [1,3,3,3,1,5];
var unique = [];

for(var i=0; i<original.length; i++){
    if(unique.indexOf(original[i])>-1){

    }
    else{
        unique.push(original[i]);
    }
}

console.log(unique);