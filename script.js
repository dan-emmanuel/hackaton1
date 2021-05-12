





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
function disableCases(){
    for (let index = 0; index < divCases.length; index++) {
        const element = divCases[index];
        addClass(element,"disabled")
        element.disabled=true

        element.style.cursor =  "not-allowed";
    }
}
function unableCases(){
    for (let index = 0; index < divCases.length; index++) {
        const element = divCases[index];
        removeClass(element,"disabled")
        element.disabled=false
        element.style.cursor =  "pointer";
    }
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
   if(event==undefined||event==true){
    setTimeout(() => {
    cube.style.backgroundColor ="white"
   }, 900);}
}
function  unlightAcube(event) {
    let cube = event.target 
    cube.style.backgroundColor ="white"
}

function launchChrono(message){
    addClass(buttonStartSequence,"d-none")
    addClass(burttonRecord,"d-none")

    chrono = 3
    divModalMessageContent.innerHTML  = `${chrono}`
    modalMessage.show()


    let timerInterval = setInterval( chronoset, 1000);


    function chronoset(){
        chrono--
        divModalMessageContent.innerHTML  = `${chrono}`
        if(chrono==0){
            divModalMessageContent.innerHTML = message;
            clearInterval(timerInterval)
            setTimeout(() => {
                console.log(1)

                modalMessage.hide()
            }, 500);

        
        }
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
            addClass(inputRemainingLife.closest(".input-group"),"d-none")
            currentPhase="onWait"
            disableCases()
            removeClass(burttonRecord,"d-none")

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
    console.log("laaaaaaaaaaaa")
    launchChrono("top")
    currentPhase = "onplay"
    setTimeout(() => {
        let otherPlayer = currentPlayer==player1?player2:player1
        let sequenceToPlay = gameMode=="solo" ?currentPlayer.generatedSequence:otherPlayer.generatedSequence
        if(gameMode=="solo"){
            player1.playedSequence = []
        }

        for (let index = 0; index < sequenceToPlay.length; index++) {
            const element = sequenceToPlay[index];
            if(index>0){
                setTimeout(() => {
                    lightAcube(divCases[element],element)
 
                }, 1000*index);
            }else{
                lightAcube(divCases[element],element)

            }

            
        }
        setTimeout(() => {
            divModalMessageContent.innerHTML  = `Now it's your turn ${currentPlayer.name}`
            modalMessage.show()
            setTimeout(() => {

                modalMessage.hide()
                currentPlayer = currentPlayer==player1?player2:player1 
                currentPhase = "redoTheSequence"
                unableCases()
            }, 1500);
        }, 1000*currentLevel+1500);
       
        
    }, 4300);
 

    
}

function    listenSequence(event){
    console.log(currentPhase)
    switch (currentPhase) {
        case "redoTheSequence":
            for (let index = 0; index < divCases.length; index++) {
                const element = divCases[index];
                if(element==event.target){
                    lightAcube(event.target,index,event)
                    otherPlayer = currentPlayer==player1?player2:player1
                    if (gameMode=="solo") {
                        currentPlayer.playedSequence.push(index)
                        if(currentPlayer.playedSequence.length==currentLevel){
                            currentPhase = "checkSequence"
                            setTimeout(() => {
                                unlightAcube(event)
                                checkSequence()
                            }, 200);
                        }
                    }else{
                        otherPlayer.playedSequence.push(index)
                        console.log(otherPlayer.playedSequence)
                        console.log(otherPlayer.generatedSequence)
                        console.log(currentPlayer.playedSequence)
                        console.log(currentPlayer.generatedSequence)

                        
                        if(otherPlayer.playedSequence.length==currentLevel&&
                            otherPlayer.generatedSequence.length==currentLevel&&
                            currentPlayer.playedSequence.length==currentLevel&&
                            currentPlayer.generatedSequence.length==currentLevel){
                                setTimeout(() => {
                                    unlightAcube(event)
                                    checkSequence()
                                }, 1000);
                        }else{
                            if(otherPlayer.playedSequence.length==currentLevel){
                                divModalMessageContent.innerHTML  = `youre answer has been recorded`
                                disableCases()

                                setTimeout(() => {
                                    unlightAcube(event)

                                    modalMessage.show()
        
                                }, 1000);
                                setTimeout(() => {
                    console.log(1)

                                    modalMessage.hide()
                                    currentPhase="onWait"
                                    disableCases()
                                    removeClass(burttonRecord,"d-none")
    
                                }, 2000);
    
                                currentPlayer = currentPlayer==player1?player2:player1 
                               
                            }
    
                        }
                          
                    }
                }
                   
            }
            break;
        case "record":
            for (let index = 0; index < divCases.length; index++) {
                const element = divCases[index];
                if(element==event.target){
     
                    console.log(element)
                    currentPlayer.generatedSequence.push(index)
                    lightAcube(event.target,index,currentPlayer.generatedSequence.length==currentLevel)
                    if(currentPlayer.generatedSequence.length==currentLevel){
                        currentPlayer = currentPlayer==player1?player2:player1 

                        otherPlayer = currentPlayer==player1?player2:player1
                        divModalMessageContent.innerHTML  = `Now it's ${currentPlayer.name}'s tour`
                        inputCurrentPlayerName.value = currentPlayer.name 
                        disableCases()
                        setTimeout(() => {
                            unlightAcube(event)

                            modalMessage.show()

                        }, 1000);

                        setTimeout(() => {
                    console.log(1)

                            modalMessage.hide()
                            currentPhase = "redoTheSequence"


                            // otherPlayer.playedSequence = []
                            currentPhase="onWait"
                            disableCases()
                            removeClass(buttonStartSequence,"d-none")

                        }, 2000);
                        
                    }
                }
            }
        break;
        default:
            event.preventDefault()
        break;
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
  


    
       
        if(gameMode=="solo"){
            divModalMessageContent.innerHTML  = `Good Job next level `
            modalMessage.show()
          
            if(arraysMatch(currentPlayer.playedSequence,otherPlayer.generatedSequence)){
                setTimeout(() => {
                    console.log(1)
        
                    modalMessage.hide()
                    
                }, 1000);
                player1.generatedSequence = []
                player1.playedSequence = []
                player2.generatedSequence = []
                player2.playedSequence = []
                currentLevel++
                inputCurrentLevel.value=currentLevel 

                player2.sequenceGenerator()
                currentPhase="onWait"
                disableCases()
                removeClass(buttonStartSequence,"d-none")
            }else{
                player2.sequenceGenerator()
               
                player1.lifes--
                divModalMessageContent.innerHTML  =player1.lifes==0? `you lost, last level reached : ${currentLevel}`:`you made at leat one mistake, you lose a life, try again`
    
                inputRemainingLife.value = player1.lifes
                modalMessage.show()
                if(player1.lifes>0){
                 
                    setTimeout(() => {
                        modalMessage.hide()
                        removeClass(buttonStartSequence,"d-none")

                    }, 1000);
                }else{
                    currentPhase="onWait"
                    disableCases()
                    return false

                }
            }
        }else{
            let otherWon = arraysMatch(currentPlayer.generatedSequence,otherPlayer.playedSequence)
            let currentWon = arraysMatch(otherPlayer.generatedSequence,currentPlayer.playedSequence)
            function nextRound (){
                currentPlayer.generatedSequence = []
                currentPlayer.playedSequence = []
                otherPlayer.generatedSequence = []
                otherPlayer.playedSequence = []
                currentPhase="onWait"
                disableCases()
                removeClass(burttonRecord,"d-none")
                

            }
            if(otherWon&&currentWon){

                divModalMessageContent.innerHTML  = `you both won next Level `
                nextRound()

                modalMessage.show()
                setTimeout(() => {
                    console.log(1)
                    modalMessage.hide()
                }, 1000);
                currentLevel++
                inputCurrentLevel.value=currentLevel
            }else if(!otherWon&&!currentWon){
                nextRound()

                divModalMessageContent.innerHTML  = `you both lost redo the same level `

                modalMessage.show()
                setTimeout(() => {
                    console.log(1)

                    modalMessage.hide()
                }, 1000);
            }else{
          

                divModalMessageContent.innerHTML  = `and the winer is  ${otherWon?otherPlayer.name:currentPlayer.name}`

                modalMessage.show()
                return false

            }


        }
    
    currentPlayer = currentPlayer==player1?player2:player1 
}

function recordsequence(){

    currentPhase='record'

    launchChrono(`ok ${currentPlayer.name} let's reccord your sequence`)
    unableCases()
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

burttonRecord.addEventListener("mousedown",recordsequence)
