function echo(str,num){
    for(var i=0;i<num;i++){
        console.log(str);
    }
}

function grader(arr){
    var avg=0;
    for(var i=0;i<arr.length;i++){
        avg=avg+arr[i];
    }
    avg=avg/(arr.length);
    console.log(Math.round(avg));
}
echo("hello",10);
echo("titu",3)

grader([10,20,33,45])