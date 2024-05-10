var ques=[
    [" What is the height of MT.Everest?","8812m","8848km","8848m","8848cm","3"],
    [" What is Nepal capital city?","Kathmandu","Pokhara","Biratnagar","Lumbini","1"],
    [" What is Nepal largest city?","Kathmandu","Pokhara","Biratnagar","Lumbini","1"],
    [" HTML stands for ?","Hyperactive Text Markup Language","HyperText Markup Language","Hyper Text Machine Language","None of Those","2"],
    [" Which is the correct syntax to include comment in an HTML document?","//","/* Comment */","// Comment //","<!-- Comment -->","4"],
    [" HTML stands for ?","Hyperactive Text Markup Language","HyperText Markup Language","Hyper Text Machine Language","None of Those","2"],
];

i=0;
q=1;
p=0;
var max_size = count_question(ques);
point();
question();
currentq();
totalq(max_size);
function question(){
    var buttons = document.getElementsByClassName("ans");
    for (var k=0;k<buttons.length;k++){
        buttons[k].classList.remove('correct','wrong');
    }

    document.getElementById("question").innerHTML = "Q. "+ ques[i][0];
    document.getElementById("ans1").innerHTML = "1. "+ ques[i][1];
    document.getElementById("ans2").innerHTML = "2. "+ ques[i][2];
    document.getElementById("ans3").innerHTML = "3. "+ ques[i][3];
    document.getElementById("ans4").innerHTML = "4. "+ ques[i][4];
}
function currentq(){
    document.getElementById("currentq").innerHTML = q++;
}
function totalq(max_size){
    document.getElementById("totalq").innerHTML = max_size;
}
function count_question(ques){
    var max_size = ques.length;
    return max_size;
}
function changequestion(){
    if(i < max_size -1){
        i++;
        question();
        currentq();
        enablebtn();
    }
    else{
        alert("NO QUESTION");
    }
}
function checkans(a){
    var selectbtn = document.getElementById("ans"+a);
    var correctbtn = document.getElementById("ans"+ques[i][5]);
    if(a == ques[i][5]){
        point();
        selectbtn.classList.add('correct');
        disablebtn();
    }else{
        selectbtn.classList.add('wrong');
        correctbtn.classList.add('correct');
        disablebtn();
    }
}
function point(){
    document.getElementById("point").innerHTML = p++;
}
function disablebtn(){
    document.getElementById("ans1").disabled = true;
    document.getElementById("ans2").disabled = true;
    document.getElementById("ans3").disabled = true;
    document.getElementById("ans4").disabled = true;
}
function enablebtn(){
    document.getElementById("ans1").disabled = false;
    document.getElementById("ans2").disabled = false;
    document.getElementById("ans3").disabled = false;
    document.getElementById("ans4").disabled = false;
}
// function rightans(){
//     document.querySelector(a).style.backgroundColor = "green";
// }
// function wrongans(){
//     document.querySelector(a).style.backgroundColor = "red";
//     document.querySelector(ques[i][5]).style.backgroundColor = "green"
// }

