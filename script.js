





// Model
let gameMode,chrono = 3,currentLevel,message,currentPhase="playSequence",
player1 = {
    numberPlayer : 1,
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
    numberPlayer : 2,
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
        player2.generatedSequence = []
        for (let index = 0; index < currentLevel; index++) {
            console.log(index)
            player2.generatedSequence.push(Math.floor(Math.random()*(9)))
        }
    }
},
currentPlayer = player2
colors = ["blue","green","purple","yellow","orange","pink","red","violet","indigo"]

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

function  lightAcube(cube,colorIndex,event=undefined) {
   cube.style.backgroundColor = colors[colorIndex]
   if(event==undefined){
   setTimeout(() => {
    cube.style.backgroundColor ="white"
   }, 900);}
}
function  unlightAcube(event) {
    let cube = event.target 
    cube.style.backgroundColor ="white"
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
    switch (gameMode) {
        case "solo":
            addClass(inputPlayerName2.closest(".d-flex"),"d-none")
            player2.type="computer"
        break;
        case "duel":
            player2.type="human"
            player2.type="human"
            addClass(inputLifeNumber.closest(".input-group"),"d-none")
            currentPlayer = player1
        break;
        default:
        break;
    }
}


function startGame(event){
    let allowToContinue = true,inputIsEmpty =  elm=>elm.value=="",required
    inputCurrentLevel.value=currentLevel = inputStarLevel.value
    switch (gameMode) {
        case "solo":
            required = [inputPlayerName1,inputLifeNumber]
            addClass(burttonRecord,"d-none")
            player2.sequenceGenerator()
            inputCurrentPlayerName.value = player1.name = inputPlayerName1.value
            inputRemainingLife.value = player1.lifes = parseInt(inputLifeNumber.value)
        break;
        case "duel":
            inputCurrentPlayerName.value = player1.name = inputPlayerName1.value
            player2.name = inputPlayerName2.value
            player2.type = "human"
            required = [inputPlayerName1,inputPlayerName2]
            addClass(buttonStartSequence,"d-none")
        break;
        default:
        break;
    }

    for (let index = 0; index < required.length; index++) {
        let element  = required[index]
        if(inputIsEmpty(element)){
            allowToContinue = false
            addClass(element,"is-invalid")
        }else{
            removeClass(element,"is-invalid")

        }
        
    }

    if(!allowToContinue){
        event.preventDefault()
    }
}


function playTheSequence(){
    addClass(buttonStartSequence,"d-none")
    chrono = 3
    divModalMessageContent.innerHTML  = `${chrono}`
    modalMessage.show()


    let timerInterval = setInterval( chronoset, 1000);


    function chronoset(){
        chrono--
        divModalMessageContent.innerHTML  = `${chrono}`
        if(chrono==0){
            divModalMessageContent.innerHTML = "top";
            clearInterval(timerInterval)
            modalMessage.hide()

        
        }
    }
    

    setTimeout(() => {
        for (let index = 0; index < currentPlayer.generatedSequence.length; index++) {
            const element = currentPlayer.generatedSequence[index];
            if(index>0){
                setTimeout(() => {
                    lightAcube(divCases[element],element)
 
                }, 1000*index);
            }else{
                lightAcube(divCases[element],element)

            }

            
        }
        setTimeout(() => {
            divModalMessageContent.innerHTML  = `Now it's your turn`
            modalMessage.show()
            setTimeout(() => {
                modalMessage.hide()
                currentPlayer = currentPlayer==player1?player2:player1  
                currentPhase = "redoTheSequence"
                currentPlayer.playedSequence = []
            }, 1000);
        }, 1000*currentPlayer.generatedSequence.length+500);
       
        
    }, 4000);
 

    
}

function listenSequence(event){
    if(currentPhase=='redoTheSequence'){
        for (let index = 0; index < divCases.length; index++) {
            const element = divCases[index];
            if(element==event.target){
                lightAcube(event.target,index,event)
                currentPlayer.playedSequence.push(index)
                if(currentPlayer.playedSequence.length==currentLevel){
                    currentPhase = "checkSequence"
                    setTimeout(() => {
                        checkSequence()
                    }, 200);
                    
                }
            }
        }
    }else{
        event.preventDefault()
    }
}

function  arraysMatch (arr1, arr2) {

	// Check if the arrays are the same length
	if (arr1.length !== arr2.length) return false;

	// Check if all items exist and are in the same order
	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}

	// Otherwise, return true
	return true;

};

function checkSequence() {
 
    let otherPlayer = currentPlayer==player1?player2:player1 
  


    if(arraysMatch(currentPlayer.playedSequence,otherPlayer.generatedSequence)){
        divModalMessageContent.innerHTML  = `Good Job next level `
        modalMessage.show()
        setTimeout(() => {
            modalMessage.hide()
            
        }, 1000);
        currentLevel++
        inputCurrentLevel.value=currentLevel 
        if(gameMode=="solo"){
            player2.sequenceGenerator()
            removeClass(buttonStartSequence,"d-none")
        }else{

        }
    }else{
        if(gameMode=="solo"){
            player2.sequenceGenerator()
            removeClass(buttonStartSequence,"d-none")
            player1.lifes--
            divModalMessageContent.innerHTML  =player1.lifes==0? `you lost, last level reached : ${currentLevel}`:`you made at leat one mistake, you lose a life, try again`

            inputRemainingLife.value = player1.lifes
            modalMessage.show()
            
            if(player1.lifes>0){
            setTimeout(() => {
                modalMessage.hide()
            }, 1000);}

            

        }else{
            
        }
    }
    currentPlayer = currentPlayer==player1?player2:player1 
}



for (let index = 0; index < anchorMode.length; index++) {
    const element = anchorMode[index];
    element.addEventListener("click",chooseMode)
}

anchorStart.addEventListener('click',startGame)
buttonStartSequence.addEventListener('click',playTheSequence)



for (let index = 0; index < divCases.length; index++) {
    const element = divCases[index];
    element.addEventListener("mousedown",listenSequence)
    element.addEventListener("mouseup",unlightAcube)

}

// burttonRecord.addEventListener
