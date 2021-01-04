let content = [
    ["Cosmology deals with the world as the totality of space, time and all phenomena. Historically, it has had quite a broad scope, and in many cases was founded in religion. In modern use metaphysical cosmology addresses questions about the Universe which are beyond the scope of science."],
    ["Medicine provides another example of practically oriented investigation of nature among the Ancient Greeks. It has been pointed out that Greek medicine was not the province of a single trained profession and there was no accepted method of qualification of licensing. "]
]

let para = document.querySelector("#content-to-type");
let start = document.querySelector("#start");

start.addEventListener("click", loadContent);

function loadContent(){
    if(start.innerHTML==="Start"){
        start.innerHTML = "Pause";
        let paraNumber = randomParaGenerator();
        para.innerHTML = content[paraNumber];
    }
    else if (start.innerHTML === "Pause"){
        start.innerHTML="Start";
    }
}
function randomParaGenerator(){
    return Math.floor(Math.random()*2);
}
