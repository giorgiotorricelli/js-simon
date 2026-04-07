const memoNumbers = document.querySelectorAll('.memo-input');
const generatorBtn = document.querySelector('.generate-numb');
const memoArray = [];
const scrittaTempo = document.querySelector('.timer');

function numberGenerator() {
    memoArray.length = 0;

    while (memoArray.length < memoNumbers.length) {
        let currentValue = Math.ceil(Math.random() * 99);
        if (!memoArray.includes(currentValue)) {
            memoArray.push(currentValue);
        }
    }

    for (let i = 0; i < memoNumbers.length; i++) {
        memoNumbers[i].value = memoArray[i];
    }

    setInterval(

    )

}


function countDown() {
    
}





generatorBtn.addEventListener(
    'click', numberGenerator
);



