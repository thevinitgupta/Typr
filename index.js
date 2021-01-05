let content = [
    ["Cosmology deals with the world as the totality of space, time and all phenomena. Historically, it has had quite a broad scope, and in many cases was founded in religion. In modern use metaphysical cosmology addresses questions about the Universe which are beyond the scope of science."],
    ["Medicine provides another example of practically oriented investigation of nature among the Ancient Greeks. It has been pointed out that Greek medicine was not the province of a single trained profession and there was no accepted method of qualification of licensing. "]
]

let para = document.querySelector("#content-to-type");
let start = document.querySelector("#start");
let minutes = document.querySelector("#minutes");
let seconds = document.querySelector("#seconds");

start.addEventListener("click", loadContent);

function loadContent(){
    if(start.innerHTML==="Start"){
        let paraNumber = randomParaGenerator();
        para.innerHTML = content[paraNumber];
        startClock(seconds.innerHTML,minutes.innerHTML,start.innerHTML);//start timer
        start.innerHTML = "Pause";
    }
    else if (start.innerHTML==="Resume"){
        startClock(seconds.innerHTML,minutes.innerHTML,start.innerHTML);//resume timer
        start.innerHTML = "Pause";
    }
    else if (start.innerHTML === "Pause"){
        pauseClock(start.innerHTML); //pausing the clock
        start.innerHTML="Resume";
    }
}
function randomParaGenerator(){
    return Math.floor(Math.random()*2);
}
function startClock(secs,mins,condition){
    let secsVal = parseInt(secs);
    let minsVal = parseInt(mins);
    //After every second, check the value of condition
    //If it is start, call the increase seconds function
    //IF not, do nothing


    //using window object because using local variables result in error in pausing the clock because of scoping
     window.timerClockID = setInterval(() => { 
        if(condition==="Start"|| condition==="Resume"){
            secsVal = increaseSeconds(secsVal);
            if(secsVal>59){
                secsVal = 0;
                minsVal=minsVal+1;
            }
            seconds.innerHTML = secsVal;
            minutes.innerHTML = minsVal;
        }
    }, 1000);
}   
function increaseSeconds(secondsValue){
    return secondsValue+1;
}
function pauseClock(condition){
    if(condition==="Pause"){
        clearInterval(window.timerClockID)
    }
}