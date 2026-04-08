const memoNumbers = document.querySelectorAll('.memo-input');
const generatorBtn = document.querySelector('.generate-numb');
const generatorRow = document.querySelector('.generate-row');
const timerRow = document.querySelector('.timer-row');
const pushBtn = document.querySelector('.push-numb');
const alertWarning = document.querySelector('.alert-row');
const memoArray = [];
const answersArray = [];
const scrittaTempo = document.querySelector('.timer');
let myInterval;
let secondi = 5;
const scoreCard = document.querySelector('.score-card')
const scrittaScore = document.querySelector('.score');
const scrittaRight = document.querySelector('.right');
const scrittaWrong = document.querySelector('.wrong');
const memoGroup = document.querySelector('.memo-group')
const easyDifficulty = document.querySelector('#radioDefault1');

if (easyDifficulty.checked === true) {
    memoGroup.innerHTML = `
        <div class="memo-div medium">
                    <input type="text" class="memo-input" readonly>
                </div>
                <div class="memo-div medium">
                    <input type="text" class="memo-input" readonly>
                </div>
                <div class="memo-div medium">
                    <input type="text" class="memo-input" readonly>
                </div>
    `
}

function numberGenerator() {
    scoreCard.classList.add('d-none');
    timerRow.classList.remove('d-none')
    memoArray.length = 0;
    answersArray.length = 0;

    while (memoArray.length < memoNumbers.length) {
        let currentValue = Math.ceil(Math.random() * 99);
        if (!memoArray.includes(currentValue)) {
            memoArray.push(currentValue);
        }
    }

    for (let i = 0; i < memoNumbers.length; i++) {
        memoNumbers[i].value = memoArray[i];
    }

    myInterval = setInterval(
        countDown, 1000
    )

}


function countDown() {
    generatorBtn.removeEventListener('click', numberGenerator)
    scrittaTempo.innerHTML = `Timer: ${secondi}`;
    secondi--;

    if (secondi < 0) {
        console.log(memoArray);

        clearInterval(myInterval);
        scrittaTempo.innerHTML = ``;
        timerRow.classList.add('d-none')
        secondi = 5;
        for (let i = 0; i < memoNumbers.length; i++) {
            memoNumbers[i].value = '';
            memoNumbers[i].readOnly = false;
        }
        generatorRow.classList.add('d-none');
        pushBtn.classList.remove('d-none');
    }
}

function pushAnswer() {
    let validated = true;

    for (let i = 0; i < memoNumbers.length; i++) {
        if (!answersArray.includes(Number(memoNumbers[i].value))) {
            answersArray.push(Number(memoNumbers[i].value))
        } else {
            alertWarning.classList.remove('d-none');
        }

    }

    console.log(answersArray);


    for (let x = 0; x < answersArray.length; x++) {
        if (answersArray[x] === 0 || isNaN(answersArray[x])) {
            alertWarning.classList.remove('d-none');
            answersArray.length = 0;
            validated = false;
        }
    }

    if (validated) {
        alertWarning.classList.add('d-none');
        let score = 0;
        const rightGuess = [];
        const wrongGuess = [];
        for (let i = 0; i < answersArray.length; i++) {
            memoNumbers[i].readOnly = true;
            if (memoArray.includes(answersArray[i])) {
                score++;
                rightGuess.push(answersArray[i])
            } else {
                wrongGuess.push(answersArray[i])
            }
        }


        scrittaScore.innerHTML = `Score: ${score}`;
        scrittaRight.innerHTML = `Right numbers: ${rightGuess}`;
        scrittaWrong.innerHTML = `Wrong numbers: ${wrongGuess}`
        scoreCard.classList.remove('d-none');

        console.log(`Il punteggio è di ${score}, i numeri giusti sono ${rightGuess}, quelli sbagliati ${wrongGuess}`);

        pushBtn.classList.add('d-none');
        generatorRow.classList.remove('d-none');
        generatorBtn.addEventListener(
            'click', numberGenerator
        );

    }




}



generatorBtn.addEventListener(
    'click', numberGenerator
);

pushBtn.addEventListener(
    'click', pushAnswer
)



