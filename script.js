





// Model
let gameMode,chrono,currentLevel,message
player1 = {
    type: "human",
    generatedSequence : [],
    playedSequence : [],
    name :"",
    lifes:0,
    setValues(objet){
        player1.name = objet.name,
        player1.life = objet.life
    }, //setter
    sequenceGenerator (){

    }
},
player2 = {
    type: "human",
    generatedSequence : [],
    playedSequence : [],
    name :"",
    lifes:0,
    setValues(objet){
        player1.name = objet.name,
        player1.life = objet.life
    }, //setter
    sequenceGenerator (){

    }
}


// Vue
function hasClass(ele,cls) {
    return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
  }
  
  function addClass(ele,cls) {
    if (!hasClass(ele,cls)) ele.className += " "+cls;
  }
  
  function removeClass(ele,cls) {
    if (hasClass(ele,cls)) {
      var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
      ele.className=ele.className.replace(reg,' ');
    }
  }

let anchorMode = document.querySelectorAll(".anchorMode"),
inputPlayerName1 = document.querySelector("#inputPlayerName1"),
inputPlayerName2 = document.querySelector("#inputPlayerName2"),
inputLifeNumber = document.querySelector("#inputLifeNumber"),
inputStarLevel = document.querySelector(`#inputStarLevel`),
anchorStart = document.querySelector(`.anchorStart`),
buttonStartSequence = document.querySelector("#buttonStartSequence"),
inputCurrentPlayerName = document.querySelector(`#inputCurrentPlayerName`),
inputRemainingLife = document.querySelector(`#inputRemainingLife`),
inputCurrentLevel = document.querySelector(`#inputCurrentLevel`),
divCases = document.querySelectorAll('.playButton'), //(#9)
modalMessage = new bootstrap.Modal(document.getElementById('modalMessage'), {
    keyboard: false
}),
divModalMessageContent = document.querySelector(`#divModalMessageContent`)
burttonRecord = document.querySelector(`#burttonRecord`)


// Controler


function chooseMode (event){
    gameMode = event.target.getAttribute('data-value')
    console.log(gameMode)
    switch (gameMode) {
        case "solo":
            addClass(inputPlayerName2.closest(".d-flex"),"d-none")
            player2.type="computer"
        break;
        case "duel":
            player2.type="human"
            player1.type="human"
            player2.type="human"

            addClass(inputLifeNumber.closest(".input-group"),"d-none")
        break;
        default:
        break;
    }
}


function startGame(event){
    let allowToContinue = false

    let inputIsEmpty =  elm=>elm.value==""

    switch (gameMode) {
        case "solo":
            allowToContinue  = !inputIsEmpty(inputPlayerName1)&&!inputIsEmpty(inputLifeNumber)
        break;
        case "duel":
            allowToContinue  = !inputIsEmpty(inputPlayerName1)&&!inputIsEmpty(inputPlayerName2)
        break;
        default:
        break;
    }

    if(!allowToContinue){

    }else{

    }
}





for (let index = 0; index < anchorMode.length; index++) {
    const element = anchorMode[index];
    element.addEventListener("click",chooseMode)
}

anchorStart.addEventListener('click',startGame)
