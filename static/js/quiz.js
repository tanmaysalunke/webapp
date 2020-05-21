const start = document.getElementById("start");
const qno = document.getElementById("qno");
const exit = document.getElementById("exit");
const qncol = document.getElementById("qncol");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choice1 = document.getElementById("never");
const choice2 = document.getElementById("rarely");
const choice3 = document.getElementById("often");
const choice4 = document.getElementById("always");
const next = document.getElementById("next");
const analysis=document.getElementById("analysis")
const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");
const score3 = document.getElementById("score3");
const score4 = document.getElementById("score4");
const head = document.getElementById("head");
const home = document.getElementById("home");


let questions = [
    {
        question : "Having little or no interest in day-to-day actvities!",
        choice1 : "Never",
        choice2 : "Rarely",
        choice3 : "Often",
        choice4 : "Always"
    },
    {
        question : "Do you feel guilty or tearful for no reason?",
        choice1 : "Never",
        choice2 : "Rarely",
        choice3 : "Often",
        choice4 : "Always"
    },{
        question : "Trouble falling or staying asleep, due to nightmares?",
        choice1 : "Never",
        choice2 : "Rarely",
        choice3 : "Often",
        choice4 : "Always"
    },
    {
        question : "Feeling tired or drained out of energy at once",
        choice1 : "Never",
        choice2 : "Rarely",
        choice3 : "Often",
        choice4 : "Always"
    },
    {
        question : "For no reason, you have been very angry or hostile.",
        choice1 : "Never",
        choice2 : "Rarely",
        choice3 : "Often",
        choice4 : "Always"
    },
    {
        question : "Thinking that you are a failure and have let your family down.",
        choice1 : "Never",
        choice2 : "Rarely",
        choice3 : "Often",
        choice4 : "Always"
    },
    {
        question : "Trouble concentrating on studies and daily activities?",
        choice1 : "Never",
        choice2 : "Rarely",
        choice3 : "Often",
        choice4 : "Always"
    },
    {
        question : "Do you get into moods where you feel restless or irritable.",
        choice1 : "Never",
        choice2 : "Rarely",
        choice3 : "Often",
        choice4 : "Always"
    },
    {
        question : "Do you ever have suicidal or self-harm thoughts? ",
        choice1 : "Never",
        choice2 : "Rarely",
        choice3 : "Often",
        choice4 : "Always"
    },
    {
        question : "You feel depressed even when good things happen to you.",
        choice1 : "Never",
        choice2 : "Rarely",
        choice3 : "Often",
        choice4 : "Always"
    },
];


const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let c1=0;
let c2=0;
let c3=0;
let c4=0;
let scorepos=0;
let scoreneg=0;


function renderQuestion(){
    let q = questions[runningQuestion];    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choice1.innerHTML = q.choice1;
    choice2.innerHTML = q.choice2;
    choice3.innerHTML = q.choice3;
    choice4.innerHTML = q.choice4;
}

start.addEventListener("click",startQuiz);

function startQuiz(){
    next.style.display="block"
    exit.style.display= "block";
    qncol.style.display= "block";
    //qno.style.display= "block";
    start.style.display = "none";
    quiz.style.display = "block";
    renderQuestion();

}

//next.addEventListener("click",nextQuestion);

//function nextQuestion(){}

function storeAnswer(answer){
    if( answer == questions[runningQuestion].choice1){
        c1++;
    }else if( answer == questions[runningQuestion].choice2){
        c2++;
    }else if( answer == questions[runningQuestion].choice3){
        c3++;
    }else if( answer == questions[runningQuestion].choice4){
        c4++;
    }

    scorepos=c1+c2;
    scoreneg=c3+c4;
    console.log(c1);
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        return renderQuestion();
    }else{
        next.style.display="none"
        qncol.style.display= "none";
        quiz.style.display = "none";
        score1.style.display ="block";
        score2.style.display ="block";
        score3.style.display ="block";
        score4.style.display ="block";
        graphRender(scorepos,scoreneg);
        scoreRender(c1,c2,c3,c4);
        renderAnalysis(scorepos,scoreneg,c1,c2,c3,c4)
        home.style.display ="block";
        head.style.display ="block";
        score1.innerHTML = "<p>C1:"+ c1 +"</p>";
        score2.innerHTML = "<p>C2:"+ c2 +"</p>";
        score3.innerHTML = "<p>C3:"+ c3 +"</p>";
        score4.innerHTML = "<p>C4:"+ c4 +"</p>";
    }
}

console.log(c1);


function renderAnalysis(scorepos,scoreneg,c1,c2,c3,c4){
    if (scorepos>scoreneg){
        if(c1>c2){
            analysis.innerHTML= "<p>You look to be in the best of mental state these days!</p>"
        }
        else{
            analysis.innerHTML= "<p>You look to be in the right place regarding your mental health these days!</p>"
        }
    }
    else{
        if(c3>c4){
            analysis.innerHTML= "<p>Hello there friend! You are doing just fine.<br> Hang in there for sometime we are out here to help you for good!<br>You are being asked to visit our councillor right in the college.<br>We hope to see you there</p>"
        }
        else{
            analysis.innerHTML= "<p>Hello there friend! You are doing just fine.<br> Hang in there for sometime we are out here to help you for good!<br>You are being asked to visit our councillor right in the college.<br>We hope to see you there</p>"
        }
    }
}


function graphRender(scorepos,scoreneg){
    var chart1 = anychart.pie([
        ["Positive",scorepos],
        ["Negative",scoreneg]
        ]);
    chart1.container('container');
    // initiate chart drawing
    chart1.draw();
}


function scoreRender(c1,c2,c3,c4){
    var chart = anychart.bar([
    ['Never', c1],
    ['Rarely', c2],
    ['Often', c3],    
    ['Always', c4]
]);
    chart.container('container1');
    // initiate chart drawing
    chart.draw();
}


function sendData(c1,c2,c3,c4,scorepos,scoreneg){
    
}