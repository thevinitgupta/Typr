let content = [
    ["Cosmology deals with the world as the totality of space, time and all phenomena. Historically, it has had quite a broad scope, and in many cases was founded in religion. In modern use metaphysical cosmology addresses questions about the Universe which are beyond the scope of science."],
    ["Medicine provides another example of practically oriented investigation of nature among the Ancient Greeks. It has been pointed out that Greek medicine was not the province of a single trained profession and there was no accepted method of qualification of licensing."]
]

let para = document.querySelector("#content-to-type");
let start = document.querySelector("#start");
let minutes = document.querySelector("#minutes");
let seconds = document.querySelector("#seconds");
let keys = document.querySelectorAll(".key");
let inputContent = document.querySelector("#input-content");
let errorVal = document.querySelector("#error-val");
let letters,typingLetterErrors=0;


// let dataKeys = [];
// for(let i = 0;i<keys.length;i++) {
//     dataKeys.push(keys.item(i).attributes[1].value);
// }

//keydown event listener 
document.addEventListener("keydown",keyPress);

//updated input value event listener
document.querySelector("#input-content").addEventListener("input",inputChange)

//start typing button event listener
start.addEventListener("click", loadContent);


//keypress animation 
function keyPress(event){
    let keyboardCode = event.keyCode;
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

function inputChange(){

    let inputVal = inputContent.value;
    let keyCode = inputVal.charCodeAt(0);

    checkInput(keyCode,inputVal);
}

function checkInput(keyCode,inputValue){
    if(keyCode>=97 && keyCode<=122 || keyCode===32){
        if(letters.item(inputValue.length-1).innerHTML===inputValue.charAt(inputValue.length-1)){
            //console.log(letters.item(inputValue.length-1),inputValue)
            letters.item(inputValue.length-1).classList.add("typed");
        }
        else {
            typingLetterErrors++;
            errorVal.innerHTML = typingLetterErrors;
            letters.item(inputValue.length-1).classList.add("wrong");
            console.log(typingLetterErrors)
        }
    }
}


    //event.key.charCodeAt(0);

    //console.log(inputVal.charCodeAt(inputVal.length-1))
    //checkCurrentInput(event.key,para.innerHTML.charAt(0)      


function loadContent(){
    inputContent.focus();
    if(start.innerHTML==="Start"){
        let paraNumber = randomParaGenerator();
        let wordsArray = wordSeparator(content[paraNumber].toString().toLocaleLowerCase());
        let typingPara =" ";
        wordsArray = wordsArray.filter((word)=> word.length>=1)
        //limiting to 25 words 
        let letterId = 0;
        for(let wordIndex =0;wordIndex<25;wordIndex++){
            let word = wordsArray[wordIndex];
            typingPara = typingPara+letterSeparator(word,letterId);
            letterId = letterId+word.length+1;
        }
        
        para.innerHTML = typingPara.trim();
        letters = document.querySelectorAll(".typing");
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
function wordSeparator(content){
    return content.split(/[,. -_]/)
}
function letterSeparator(content,id){
    let wordSpan=" ";
    for(let charIndex=0;charIndex<content.length;charIndex++){
        wordSpan= wordSpan + `<div class="typing" id="${id}">${content.charAt(charIndex)}</div>`;
        id++;
    }
    wordSpan.trim();
    wordSpan= wordSpan + `<div class="typing" id="${id}"> </div>`
    return wordSpan;
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
