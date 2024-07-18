const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const navbar = document.getElementById('navbar');
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const newGameBtn = document.querySelector("#new-btn");
const gameOver = document.querySelector("#game-over-sound");
const clickSound = document.querySelector("#click-sound");
const winnerContainer1 = document.getElementById('winner1');
const winnerContainer2 = document.getElementById('winner2');
const themeSound = document.querySelector("#theme-Sound");
const drawSound = document.querySelector("#draw-Sound");

themeToggle.addEventListener('click', function() {
    if (this.checked) {
        body.classList.add('dark');
        navbar.style.backgroundColor = '#171717'; 
        msg.style.color = "white";
        themeSound.play();
        
    } else {
        body.classList.remove('dark');
        navbar.style.backgroundColor = '#D1D1D1'; 
        msg.style.color = "black";
        themeSound.play();

    }
});

let turnO = true;
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    winnerContainer1.classList.add("hidden");
    winnerContainer2.classList.add("hidden");
    
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        clickSound.play();
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showResult = (result) => {
    msg.innerText = result;
    msgContainer.classList.remove("hide");
    winnerContainer1.classList.remove("hidden");
    winnerContainer2.classList.remove("hidden");
    disableBoxes();

    gameOver.play();
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showResult(`Congratulations, "${pos1Val}" wins the game!`);
                
                return;
            }
        }
    }

    let allFilled = true;
    for (let box of boxes) {
        if (box.innerText === "") {
            allFilled = false;
        }
    }

    if (allFilled) {
        showResult(`The game is a draw! 
            Player1 = Player2`);
            winnerContainer1.classList.add("hidden");
            winnerContainer2.classList.add("hidden");
            drawSound.play();
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
