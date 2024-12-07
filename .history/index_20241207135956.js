let content = [];
// window.addEventListener('load', getData, false )
async function getData(){
    let minLength = 100;
    let wordLength = 5;
    content = [];
    try{
	const resp = await fetch("random-word-api.herokuapp.com/word?number=25&length="+wordLength);
    	const data = await resp.json();
    	console.log(data);
    	content = [data.content];
    }
    catch(err){
	    console.log(err);
	    content =  [["Cosmology deals with the world as the totality of space, time and all phenomena. Historically, it has had quite a broad scope, and in many cases was founded in religion. In modern use metaphysical cosmology addresses questions about the Universe which are beyond the scope of science."]];
    }
    finally{
    	console.log(content);
    }
}

getData();
 

let para = document.querySelector("#content-to-type");
let start = document.querySelector("#start");
let minutes = document.querySelector("#minutes");
let seconds = document.querySelector("#seconds");
let keys = document.querySelectorAll(".key");
let inputContent = document.querySelector("#input-content");
inputContent.value = "";
let errorVal = document.querySelector("#error-val");
let evaluation = document.querySelector(".evaluation");
let speedVal = document.querySelector("#speed-val");
let scoreVal = document.querySelector("#score-val");
let letters,typingLetterErrors=0;


// let dataKeys = [];
// for(let i = 0;i<keys.length;i++) {
//     dataKeys.push(keys.item(i).attributes[1].value);
// }

//keydown event listener 
document.addEventListener("keydown",keyPress);

//updated input value event listener
inputContent.addEventListener("input",inputChange)

//start typing button event listener
start.addEventListener("click", loadContent,true);


//keypress animation 
function keyPress(event){
    let keyboardCode = event.keyCode;
    if(keyboardCode>=48&&keyboardCode<=57) {
        //inputContent.removeEventListener("input",inputChange);
        // inputContent.innerHTML = inputContent.innerHTML.substr(0,inputContent.length-2)
        // console.log(keyboardCode)
        //inputContent.addEventListener("input",inputChange)
    }
    else {
    keyboardCode+=32;
    
    for(let i = 0;i<keys.length;i++) {
        if(parseInt(keys.item(i).attributes[1].value)===keyboardCode){
             //console.log(keys.item(i).attributes[1].value)
             keys.item(i).classList.add("pressed");
             setTimeout(()=>{
                keys.item(i).classList.remove("pressed"); 
             },100)
             break;
        }
    }
}  
}

function inputChange(event){

    let inputVal = inputContent.value;
    //.classList.remove("current");

    //finding the integer equivalent of the last input character
    let intVal = parseInt(inputContent.value.charAt(inputContent.value.length-1));

    //if integer value is not NaN i.e. it is a number, remove it from the input value
    if(!Number.isNaN(intVal)) inputContent.value = inputVal.substr(0,inputContent.value.length-1);
    // console.log(inputContent.value)
    let keyCode = inputVal.charCodeAt(inputVal.length-1);
    if(inputVal.length<=para.length-1)
   startBlinking(inputVal.length)
    checkInput(keyCode,inputVal);
}
function startBlinking(letterId){

        window.blinkingId = setInterval(()=>{
            blinking(letters.item(letterId));
        },150);
}
function clearBlinking(){
    clearInterval(window.blinkingId);
}
function blinking(letter){
    if(letter!=null && letter.classList[1]==="current")
        letter.classList.remove("current");
        else {
            letter.classList.add("current");
        }
}

//letters.item(inputValue.length-1).innerHTML.charAt(0)==="_"&& inputValue ||

function checkInput(keyCode,inputValue){
    if(inputValue.length===letters.length){
        pauseClock("Pause");
       let [minsCompleted,secsCompleted] = getCurrentTimerValue(minutes.innerHTML,seconds.innerHTML);
       let totalCorrect = letters.length - typingLetterErrors;
       let percentageCorrect = Math.floor(totalCorrect/letters.length * 100);
       let charsPerSecond = Math.floor(totalCorrect/(minsCompleted*60 + secsCompleted));
       let wordsPerMinute = Math.floor(charsPerSecond*60)/10;
       speedVal.innerHTML = wordsPerMinute+" words/min";
       scoreVal.innerHTML = percentageCorrect;
       start.innerHTML = "Restart";
       //start.removeEventListener("click",loadContent,true)
       console.log("Percentage =" +percentageCorrect)
       console.log("Speed "+charsPerMinute+ " per minute")
    }
    else if(inputValue.length<letters.length){
    if(keyCode>=97 && keyCode<=122 || keyCode===32){
        if(keyCode===32) keyCode = 95;
       if(letters.item(inputValue.length-1).innerHTML.charCodeAt(0)===keyCode){
            //console.log(letters.item(inputValue.length-1),inputValue)
            clearBlinking();
            startBlinking(inputValue.length);
            
            letters.item(inputValue.length-1).classList.add("typed");
        }
        else {
            typingLetterErrors++;
            errorVal.innerHTML = typingLetterErrors;
            clearBlinking();
            startBlinking(inputValue.length);
            letters.item(inputValue.length-1).classList.add("wrong");
            console.log("Errors = "+typingLetterErrors)
        }
    }
}
}


    //event.key.charCodeAt(0);

    //console.log(inputVal.charCodeAt(inputVal.length-1))
    //checkCurrentInput(event.key,para.innerHTML.charAt(0)      


function loadContent(){
    if(start.innerHTML==="Restart"){
        window.location.reload();
    }
    inputContent.focus();
    if(start.innerHTML==="Start"){
        setNewContent();
        para = document.querySelector("#content-to-type");
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

function setNewContent(){
    typingLetterErrors=0;
        let paraNumber = randomParaGenerator(1);
        let wordsArray = wordSeparator(content[0].toLocaleLowerCase());
        let typingPara =" ";
        wordsArray = wordsArray.filter((word)=> word.length>=1)
        //limiting to 25 words 
        let letterId = 0;
        for(let wordIndex = 0;wordIndex<Math.min(25,wordsArray.length);wordIndex++){
            let word = wordsArray[wordIndex];
            console.log("word ",wordIndex,word)
            typingPara = typingPara+letterSeparator(word,letterId);
            letterId = letterId+word.length+1;
        }
        
        para.innerHTML = typingPara.trim();
        letters = document.querySelectorAll(".typing");
        startClock(seconds.innerHTML,minutes.innerHTML,start.innerHTML);//start timer
        start.innerHTML = "Pause";
}


function wordSeparator(currContent){
    return currContent.split(/[,. -_]/)
}


function letterSeparator(currContent,id){
    let wordSpan="";
    for(let charIndex=0;charIndex<currContent.length;charIndex++){
        wordSpan= wordSpan + `<div class="typing" id="${id}">${currContent.charAt(charIndex)}</div>`;
        id++;
    }
    wordSpan.trim();
    wordSpan= wordSpan + `<div class="typing" id="${id}">_</div>`
    return wordSpan;
}
function randomParaGenerator(limit){
    return Math.floor(Math.random()*limit);
}
function startClock(secs,mins,condition){
    let timerVals = getCurrentTimerValue(mins,secs);
    let [minsVal,secsVal] = [...timerVals];

    //After every second, check the value of condition
    //If it is start, call the increase seconds function
    //IF not, do nothing

    startBlinking(inputContent.value.length)
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

function getCurrentTimerValue(mins,secs){
    let secsVal = parseInt(secs);
    let minsVal = parseInt(mins);
    let timer = [minsVal,secsVal];
    return timer;
}
function increaseSeconds(secondsValue){
    return secondsValue+1;
}
function pauseClock(condition){
    if(condition==="Pause"){
        clearInterval(window.timerClockID)
    }
}
