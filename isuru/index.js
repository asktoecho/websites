function ageindays(){
    var birthyear=prompt("Enter your birth year");
    var ageindays=(2020-birthyear)*365;
    var h1=document.createElement('h1');
    var textAnswer=document.createTextNode("you are "+ageindays+" day");
    h1.setAttribute("id","ageindays");
    h1.appendChild(textAnswer);
    document.getElementById("buttonresult").appendChild(h1);
}

function reset(){
    document.getElementById("ageindays").remove();
}

function createcat(){
    var image=document.createElement("img");
    var div=document.getElementById("catgeneratings");
    image.src="https://cdn2.thecatapi.com/images/7vj.gif";
    div.appendChild(image)
}

function rpsGame(yourChoice){
    var humanChoice,botChoice;
    humanchoice=yourChoice.id;
    botChoice=numberToChoice(Math.floor(Math.random()*3));
    results=decideWinner(humanchoice,botChoice);
    message=finalMessage(results);
    rgsFrontEnd(humanchoice,botChoice,message)
}

function numberToChoice(number){
    return["rock","paper","scissor"][number];
}

function decideWinner(yourChoice,botChoice){
    var rgsDatabse={
        "rock":{"scissor":1,"rock":0.5,"paper":0},
        "paper":{"rock":1,"paper":0.5,"scissor":0},
        "scissor":{"paper":1,"scissor":0.5,"rock":0},   
    }
    var yourScore=rgsDatabse[yourChoice][botChoice];
    var computerScore=rgsDatabse[botChoice][yourChoice];
    return [yourScore,computerScore];
}

function finalMessage([yourScore,computerScore]){
    if (yourScore==0){
        return{"message":"You Lost","color":"red"}
    }else if(yourScore===0.5){
        return{"message":"Draw","color":"yellow"}
    }else{
        return{"message":"You Win","color":"green"}
    }
}

function rgsFrontEnd(yourChoice, botChoice, finalMessage){
    var imageDatabase={
        "rock" : document.getElementById("rock").src,
        "paper" : document.getElementById("paper").src,
        "scissor" : document.getElementById("scissor").src
    }
    document.getElementById("scissor").remove();
    document.getElementById("paper").remove();
    document.getElementById("rock").remove();

    var humanDiv=document.createElement("div");
    var botDiv=document.createElement("div");
    var messageDiv=document.createElement("div");

    humanDiv.innerHTML="<img src='"+imageDatabase[yourChoice]+"' height=100 width=100>";
    document.getElementById("flex-box-div").appendChild(humanDiv);

    messageDiv.innerHTML="<h1 style='color:"+finalMessage['color']+"; font-size:60px; padding:30px; '>"+finalMessage['message']+"</h1>";
    document.getElementById("flex-box-div").appendChild(messageDiv);

    botDiv.innerHTML="<img src='"+imageDatabase[botChoice]+"' height=100 width=100>";
    document.getElementById("flex-box-div").appendChild(botDiv);

    
}


//change the color of the buttons
var all_buttons=document.getElementsByTagName("button");

var copyAllButtons=[];
for (let i=0;i<all_buttons.length;i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThigy){
    if (buttonThigy.value==="red"){
        buttonsRed();
    }else if (buttonThigy.value==="green"){
        buttonsGreen();
    }else if (buttonThigy.value=="reset"){
        buttonsReset();
    }else if (buttonThigy.value=="random"){
        buttonsRandom();       
    }
}

function buttonsRed(){
    for (let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add("btn-danger");
    }
}
function buttonsGreen(){
    for (let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add("btn-success");
    }
}
function buttonsReset(){
    for (let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}
function  buttonsRandom(){
    var choices=["btn-primary","btn-danger","btn-warning","btn-success"];

    for (let i=0;i<all_buttons.length;i++){
        let randomColor=Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomColor]);
    }
}

//blackjack

let blackjackGame={
    "You":{"scoresSpan":"your-blackjack-result","div":"your-box","score":0},
    "Dealer":{"scoresSpan":"dealer-blackjack-result","div":"dealer-box","score":0},
    "cards":["2","3","4","5","6","7","8","9","10","K","J","Q","A"],
    "cardsMap":{"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"K":10,"J":10,"Q":10,"A":[1,11]},
    "wins":0,
    "losses":0,
    "draws":0,
    "isStand": false,
    "turnsOver": false,
};

const YOU=blackjackGame["You"];
const DEALER=blackjackGame["Dealer"];

const Hitsound=new Audio("music/card.mp3");
const Winsound=new Audio("music/win.mp3");
const Losssound=new Audio("music/loss.mp3");

document.getElementById("hit").addEventListener("click",blackjackhit);
document.getElementById("stand").addEventListener("click",dealerlogic);
document.getElementById("deal").addEventListener("click",blackjackdeal);

function blackjackhit(){
    if (blackjackGame["isStand"]===false){
        let card=randomcard();
        showcard(card,YOU);
        updateScore(card,YOU);
        showscore(YOU);
    }
}

function showcard(card,Activeplayer){
    if ((Activeplayer["score"])<=21){
        let cardImage=document.createElement("img");
        cardImage.src=`img/${card}.png` ;
        document.getElementsByClassName(Activeplayer["div"])[0].appendChild(cardImage);
        Hitsound.play();
    }
}

function blackjackdeal(){
    if (blackjackGame["turnsOver"]===true){
        blackjackGame["isStand"]=false;
        let yourImage=document.getElementsByClassName(YOU["div"])[0].getElementsByTagName("img");
        let DealerImage=document.getElementsByClassName(DEALER["div"])[0].getElementsByTagName("img");
        let x=yourImage.length;
        let y=DealerImage.length;
        for(i=0; i<x; i++){
            yourImage[0].remove();
        }
        for(i=0; i<y; i++){
            DealerImage[0].remove();
        }
        YOU["score"]=0;
        DEALER["score"]=0;
        document.getElementsByClassName("your-blackjack-result")[0].textContent="0";
        document.getElementsByClassName("your-blackjack-result")[0].style.color="white";
        document.getElementsByClassName("dealer-blackjack-result")[0].textContent="0";
        document.getElementsByClassName("dealer-blackjack-result")[0].style.color="white";
        document.getElementsByClassName("blackjackresult")[0].textContent="Let's Play";
        document.getElementsByClassName("blackjackresult")[0].style.color="black";
        blackjackGame["turnsOver"]=false;
    }
}

function randomcard(){
    let randomIndex=Math.floor(Math.random() * 13);
    return blackjackGame["cards"][randomIndex];
}

function updateScore(card,Activeplayer){
    if (card=="A"){
        if ((Activeplayer["score"]+blackjackGame['cardsMap'][card][1])<=21){
            Activeplayer["score"]+=blackjackGame['cardsMap'][card][1];
        }else{
            Activeplayer["score"]+=blackjackGame['cardsMap'][card][0];
        }
        
    }else{
        Activeplayer["score"]+=blackjackGame['cardsMap'][card];
    }
}

function showscore(Activeplayer){
    if ((Activeplayer["score"])>21){
        document.getElementsByClassName(Activeplayer["scoresSpan"])[0].textContent="BUST";
        document.getElementsByClassName(Activeplayer["scoresSpan"])[0].style.color="red";
    }else{
        document.getElementsByClassName(Activeplayer["scoresSpan"])[0].textContent=Activeplayer["score"];
    }
}

function dealerlogic(){
    blackjackGame["isStand"]=true;
    while (DEALER["score"]<16 && blackjackGame["isStand"]===true){
        let card=randomcard();
        showcard(card,DEALER);
        updateScore(card,DEALER);
        showscore(DEALER);
    }

    blackjackGame["turnsOver"]=true;
    let winner=computewinner();
    showresult(winner);
}

function computewinner(){
    let winner;
    if (YOU["score"]<=21){
        if ((YOU["score"]>DEALER["score"]) || (DEALER["score"]>21)){
            blackjackGame["wins"]++;
            winner=YOU;
        }else if (YOU["score"]<DEALER["score"]){
            blackjackGame["losses"]++;
            winner=DEALER;
        }else if (YOU["score"]===DEALER["score"]){
            blackjackGame["draws"]++;
        }
    }else if ((DEALER["score"]<=21) && (YOU["score"]>21)){
        blackjackGame["losses"]++;
        winner=DEALER;
    }else if ((DEALER["score"]>21) && (YOU["score"]>21)){
        blackjackGame["draws"]++;

    }
    return winner
}

function showresult(winner){
    if((blackjackGame["turnsOver"]===true)){
        let message,messageColour;
        if (winner===YOU){
            document.getElementsByClassName("blackjack-yourwins")[0].textContent=blackjackGame["wins"];
            message="You Won";
            messageColour="green";
            Winsound.play();
        }else if (winner==DEALER){
            document.getElementsByClassName("blackjack-yourlosses")[0].textContent=blackjackGame["losses"];
            message="Dealer Won";
            messageColour="red";
            Losssound.play();
        }else{
            document.getElementsByClassName("blackjack-yourdraws")[0].textContent=blackjackGame["draws"];
            message="Draw";
            messageColour="black";
        }
        document.getElementsByClassName("blackjackresult")[0].textContent=message;
        document.getElementsByClassName("blackjackresult")[0].style.color=messageColour;
        }
}