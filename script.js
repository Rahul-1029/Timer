const startBtn = document.querySelector("#start");
const h1Ele = document.querySelector("h1");
const resetBtn = document.querySelector("#reset");
const pauseAndResumeBtn = document.querySelector("#pauseAndResume");
const errMsgEle = document.querySelector("#errMsg");
const inputEle = document.querySelector("#timerInput");
const successMsgEle = document.querySelector("#successMsg");

let sec = 0;
let min = 0;
let hour = 0;

let timerID = null;

let timerValueInMins = 0;

function display() {
    h1Ele.innerHTML = hour + ':' + min + ':' + sec;
}

function resetTimer() {
    sec = 0;
    min = 0;
    hour = 0;
    display();
}

function runTimer() {
    timerID = setInterval(function timerOf1Sec(){
        sec--;
        if(sec<0){
            min--;
            sec=59;
        }
        if(min<0){
            hour--;
            min=59;
        }
        if(hour==0&&min==0&&sec==0) {
            clearInterval(timerID);
            timerID = null;
            timerValueInMins = 0;
            pauseAndResumeBtn.innerHTML = "Pause";
            resetTimer();
            successMsgEle.innerHTML = "Timer Completed !";
            setTimeout(function successMsgFun() {
                successMsgEle.innerHTML = "";
            }, 5*1000);
        }
        display();
    }, 1000);
}

function errMsgReset() {
    setTimeout(function errMsgFun() {
        errMsgEle.innerHTML = "";
    }, 3*1000);
}

function initializeTimer() {
    hour = Math.floor(timerValueInMins / 60);
    min = timerValueInMins % 60;
    display();
}

startBtn.addEventListener("click", function startBtnEventHandler(event){
    if(timerID==null) {
        if(timerValueInMins > 0) {
            initializeTimer();
            runTimer();
        }
        else {
            errMsgEle.innerHTML = "Enter proper timer value !!";
        }
    }
    else {
        errMsgEle.innerHTML = "Timer is already running !!";
        errMsgReset();
    }
});

resetBtn.addEventListener("click", function resetBtnClickListener() {
    if(timerID != null) {
        clearInterval(timerID);
        timerID = null;
        pauseAndResumeBtn.innerHTML = "Pause";
        resetTimer();
    }
    else {
        errMsgEle.innerHTML = "There is no timer running !!";
        errMsgReset();
    }
});

pauseAndResumeBtn.addEventListener("click", function pauseAndResumeBtnClickListener() {
    if(pauseAndResumeBtn.innerHTML == "Pause") {
        if(timerID != null) {
            clearInterval(timerID);
            pauseAndResumeBtn.innerHTML = "Resume";
        }
        else {
            errMsgEle.innerHTML = "There is no timer running !!";
            errMsgReset();
        }
    }
    else {
        runTimer();
        pauseAndResumeBtn.innerHTML = "Pause";
    }
});

inputEle.addEventListener("input", function timerInputEventListener() {
    timerValueInMins = parseInt(inputEle.value);
    if(isNaN(timerValueInMins)&&timerID==null) {
        timerValueInMins = 0;
        errMsgEle.innerHTML = "Timer input cannot be empty !!";
    }
    else if((timerValueInMins < 0)&&timerID==null) {
        timerValueInMins = 0;
        errMsgEle.innerHTML = "Timer input value cannot be negative !!";
    }
    else {
        errMsgEle.innerHTML = "";
    }
});