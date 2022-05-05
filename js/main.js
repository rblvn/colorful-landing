
document.addEventListener('DOMContentLoaded', function() {
    const titleSecond = document.querySelectorAll('.title-second');

    for(title of titleSecond) {
        const titleText = title.innerText.split(' ');
        if (titleText.length > 1) {
            title.innerHTML = `${titleText[0]} <span class="purple">${titleText[1]}</span> ${title.innerText.slice(Number(titleText[0].length) + Number(titleText[1].length + 2))}`
        }
}
})

const tokenNameInput = document.getElementById('tokenName');
const tokenName = document.querySelector('.main__create-name');

const tokenCostInput = document.getElementById('tokenCost');
const tokenCost = document.querySelector('.main__create-cost');

const tokenContactInput = document.getElementById('tokenContact');

const releaseButton = document.getElementById('releaseButton');

const requiredFields = document.querySelectorAll('.formRequired');



tokenNameInput.addEventListener('input', function() {
    tokenName.innerText = tokenNameInput.value;
    if(tokenNameInput.value.length > 16) {
        tokenNameInput.value = tokenNameInput.value.slice(0, 15);
    }
    tokenNameInput.value.length > 10 ? tokenName.classList.add('_big') : tokenName.classList.remove('_big');

});

tokenCostInput.addEventListener('input', function() {
    tokenCost.innerText = tokenCostInput.value + ' ₽';
    if (tokenCostInput.value > 1000000) {
        tokenCostInput.value = 1000000;
    }


});

for(reqField of requiredFields) {
    reqField.addEventListener('input', function() {
        let i = 0;
        requiredFields.forEach(el => {
            if(el.value != '') {
                i++;
            }
        })
        if(i == requiredFields.length) {
            releaseButton.disabled = false;
        }
        else {
            releaseButton.disabled = true;
        }
    })
}

const customImage = document.getElementById('customImage');
const closeCustomImage = document.getElementById('closeImagePopup');

customImage.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).classList.add('_active');
    document.querySelector('body').classList.add('_lock');
})

closeCustomImage.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).classList.remove('_active');
    document.querySelector('body').classList.remove('_lock');
})


const radioInput = document.querySelectorAll('.radioInput');
const resultImage = document.getElementById('resultImage');

for(radio of radioInput) {
    radio.addEventListener('click', function() {
        resultImage.setAttribute('src', this.getAttribute('src'));
    })
}


const sliderImages = document.querySelectorAll('.main__slider-item');
const sliderLine = document.querySelector('.main__slider-line');

const sliderNext = document.querySelector('.main__slider-next');
const sliderPrev = document.querySelector('.main__slider-prev');
const sliderName = document.querySelector('.main__slider-name');

let sliderCount = 0;
let sliderWidth;

function initSlider() {
    sliderWidth = document.querySelector('.main__slider-slider').offsetWidth;
    sliderLine.style.width = sliderWidth * sliderImages.length + 'px';
    sliderImages.forEach(el => {
        el.style.width = sliderWidth + 'px';
        el.style.height = 'auto';
    });
    rollSlider();
}

window.addEventListener('resize', initSlider);
initSlider();

sliderNext.addEventListener('click', function() {
    sliderCount += 1;
    if(sliderCount > sliderImages.length - 1) {
        sliderCount = 0;
    }
    rollSlider();
    sliderNameChange();
})
sliderPrev.addEventListener('click', function() {
    sliderCount -= 1;
    if(sliderCount < 0) {
        sliderCount = sliderImages.length - 1;
    }
    rollSlider();
    sliderNameChange();

})
function rollSlider() {
    sliderLine.style.transform = `translate(-${sliderCount*sliderWidth}px)`;
    sliderImages.forEach(el => el.classList.remove('current-slide'));
}
function sliderNameChange() {
    sliderImages[sliderCount].classList.add('current-slide');
    sliderName.innerText = document.querySelector('.current-slide .main__slider-named').innerText;
}