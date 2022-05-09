const radioInput = document.querySelectorAll('.radioInput');

document.addEventListener('DOMContentLoaded', function() {
    const titleSecond = document.querySelectorAll('.title-second');
    for(title of titleSecond) 
    {
        const titleText = title.innerText.split(' ');
        if (titleText.length > 1) {
            title.innerHTML = `${titleText[0]} <span class="purple">${titleText[1]}</span> ${title.innerText.slice(Number(titleText[0].length) + Number(titleText[1].length + 2))}`
        }

    }
    function disableSelection(element) {
        if(typeof element.onselectstart != 'undefined') {
            element.onselectstart = function() {
                return false;
            }
        }
        else if (typeof element.style.MozUserSelect != 'undefined') {
            element.style.MozUserSelect = 'none';
        }
        else {
            element.onmousedown = function() {
                return false;
            }
        }
    }
    radioInput.forEach(el => disableSelection(el))
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

const dogelonMarsCtx = document.getElementById('dogelonMars').getContext('2d');
const shibaCtx = document.getElementById('shiba').getContext('2d');
const dogecoinCtx = document.getElementById('dogecoin').getContext('2d');

let gradient = dogelonMarsCtx.createLinearGradient(0, 400, 0, 0);

const titleTooltip = (tooltipItems) => {return 'Капитализация'}

const tooltipPointRadius = (tooltipItem) => {
    if(window.innerWidth < 768) {
        return 8;
    }
    return 14;
}

const titleTooltipSize = (element) => {
    if(window.innerWidth < 768) {
        return 16;
    }
    return 20;

}

const bodyTooltipSize = (element) => {
    if(window.innerWidth < 768) {
        return 28;
    }
    return 35;
}

const graphOptions = {
    hoverRadius: tooltipPointRadius,
    hitRadius: 5,
    hoverBackgroundColor: '#fff',
    scales: {
        x: {
            grid: {
                borderColor: '#6C5E7B',
                borderWidth: 2,
            },
            ticks: {
                display: false
            }
        },
        y: {
            min: 0,
            max: 55,
            grid: {
                borderColor: '#6C5E7B',
                borderWidth: 2,
            },
            ticks: {
                display: false
            }
        }
    },
    elements: {
        point: {
            radius: 0,
            backgroundColor: '#fff',
        }
    },
    plugins: {
        tooltip: {
            displayColors: false,
            backgroundColor: '#7A18D5',
            padding: 20,
            titleFont: {
                size: titleTooltipSize
            },
            bodyFont: {
                size: bodyTooltipSize,
            },
            cornerRadius: 20,
            callbacks: {
                title: titleTooltip,
                label: function(context) {
                    let label = context.dataset.label || '';

                    if (label) {
                        label = '';
                    }
                    if (context.parsed.y !== null) {
                        label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                    }
                    return label + 'B';
                }
            }
        },
        legend: {
            display: false,
        },
    }
}
const labelAndDataFill = (fillElement, fillerElement, typeEl) => {
    fillElement.splice(0, fillElement.length);
    if(typeEl === 'data') {
        fillerElement.forEach(el => fillElement.push(el));
    }
    else if (typeEl === 'label') {
        for(let i = 0; i < fillerElement.length; i++) {
            fillElement.push(i);
        }
    }

}



const dataArrayDogelon = new Array();
const dataArrayShiba = new Array();
const dataArrayDogecoin = new Array();

const desktopArrayDogelon = new Array(300.2, 310.43, 304.22, 308, 500.34, 325.2, 310, 305.71, 295, 294, 293, 292, 291, 290.34, 295, 295, 295, 295.71, 295, 350.2, 325.34, 310, 308, 306, 304.43, 302, 300.43, 298, 300.22, 302, 304, 306.71, 308.34, 312, 330, 315, 325, 340, 525, 450, 500, 480, 490, 470.34, 478, 472, 450, 478, 440, 450, 448, 446, 440.71, 436, 470.34, 465, 463, 460, 466, 464.34, 462, 458.71, 454.5, 450, 455, 455, 430, 390, 400, 410.52, 405, 400, 420, 440, 435.22, 430, 422, 413.52, 422, 435, 455, 448.22, 441, 475, 465.5, 455, 440, 440, 452.5, 444, 436.22, 446, 454.71, 485, 454, 444.71, 448, 452, 456, 450.22, 446, 442, 436, 430.61);
const mobileArrayDogelon = desktopArrayDogelon.slice(34, desktopArrayDogelon.length);


const desktopArrayShiba = new Array(5.33, 5.33, 5.34, 5.35, 5.37, 5.39, 5.41, 5.44, 5.46, 5.48, 5.51, 5.52, 5.53, 5.54, 5.55, 5.56, 5.57, 5.58, 5.8, 5.6, 5.6, 10.33, 15.8, 13.4, 7.44, 7.81, 7.13, 7.13, 7.13, 7.4, 7.84, 7.77, 7.7, 7.6, 7.51, 7.2, 7.01, 6.88, 7.21, 7.5, 7.35, 7.2, 7.2, 7.2, 7.2, 7.2, 10.34, 15.66, 16.5, 13.43, 18.83, 24.23, 20.50, 16.77, 19.31, 16.3, 17.05, 16.3, 15.65, 15.5, 15.35, 15.12, 15.8, 15.2, 15, 14.78, 15.04, 14.05, 13.01, 13.01, 14.5, 15.99, 15.4, 15.88, 13.53, 13.96, 13.46, 13.06, 13.5, 13.94, 13.94, 13.4, 14);
const mobileArrayShiba = desktopArrayShiba.slice(19, desktopArrayShiba.length);  

const desktopArrayDogecoin = new Array(15.06, 15.07, 15.08, 15.09, 15.06, 15.07, 15.08, 15.09, 15.1, 15.11, 15.12, 15.13, 15.14, 15.15, 15.16, 15.17, 15.18, 15.19, 15.2, 15.21, 15.22, 15.23, 15.24, 15.25, 15.26, 15.27, 15.28, 15.29, 15.3, 15.28, 15.26, 15.24, 15.24, 15.24, 15.24, 15.24, 15.24, 15.24, 15.24, 15.24, 15.24, 15.24, 15.24, 15.24, 15.24, 15.24, 15.24, 15.24, 15.24, 15.24, 15.24, 15.24, 15.24, 15.24, 15.24, 15.24, 15.24, 15.24, 15.24, 15.24, 15.24, 15.45, 15.66, 15.45, 20.4,25.35, 22.8, 24.44, 20, 16.56, 20.33, 18.4, 17.5, 19.02, 17.57, 17, 17.54, 16.7, 16.97, 16.5, 16.03, 18, 19.23);
const mobileArrayDogecoin = desktopArrayDogecoin.slice(48, desktopArrayDogecoin.length);



let labelArrayDogelon = new Array();
let labelArrayShiba = new Array();
let labelArrayDogecoin = new Array();




function initSlider() {
    sliderWidth = document.querySelector('.main__slider-slider').offsetWidth;
    sliderLine.style.width = sliderWidth * sliderImages.length + 'px';
    sliderImages.forEach(el => {
        el.style.width = sliderWidth + 'px';
        el.style.height = 'auto';
    });
    rollSlider();
    if(window.innerWidth < 768) {

        gradient.addColorStop(0, 'rgba(122,24,213,0.05)');
        gradient.addColorStop(1, 'rgba(122,24,213,0.13)');

        // Data Mobile Fill

        labelAndDataFill(dataArrayDogelon, mobileArrayDogelon, 'data');
        labelAndDataFill(dataArrayShiba, mobileArrayShiba, 'data');
        labelAndDataFill(dataArrayDogecoin, mobileArrayDogecoin, 'data');

        // Label Mobile Fill

        labelAndDataFill(labelArrayDogelon, mobileArrayDogelon, 'label');
        labelAndDataFill(labelArrayShiba, mobileArrayShiba, 'label');
        labelAndDataFill(labelArrayDogecoin, mobileArrayDogecoin, 'label');

    }
    else {

        // Data Desktop Fill

        labelAndDataFill(dataArrayDogelon, desktopArrayDogelon, 'data');
        labelAndDataFill(dataArrayShiba, desktopArrayShiba, 'data');
        labelAndDataFill(dataArrayDogecoin, desktopArrayDogecoin, 'data');

        // Label Desktop Fill

        labelAndDataFill(labelArrayDogelon, desktopArrayDogelon, 'label');
        labelAndDataFill(labelArrayShiba, desktopArrayShiba, 'label');
        labelAndDataFill(labelArrayDogecoin, desktopArrayDogecoin, 'label');

        gradient.addColorStop(0, 'rgba(122,24,213,0.1)');
        gradient.addColorStop(1, 'rgba(122,24,213,1)');


        

    }
    tooltipPointRadius();
    titleTooltipSize();
    bodyTooltipSize();
}

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


const dogelonMars = new Chart(dogelonMarsCtx, {
    type: 'line',
    data: {
        labels: labelArrayDogelon,
        datasets: [{
            label: 'Капитализация', 
            data: dataArrayDogelon,
            fill: true,
            backgroundColor: gradient,
            borderColor: '#fff',
            borderWidth: 3,
        }],
    },
    options: {
        hoverRadius: tooltipPointRadius,
    hitRadius: 5,
    hoverBackgroundColor: '#fff',
    scales: {
        x: {
            grid: {
                borderColor: '#6C5E7B',
                borderWidth: 2,
            },
            ticks: {
                display: false
            }
        },
        y: {
            max: 800,
            grid: {
                borderColor: '#6C5E7B',
                borderWidth: 2,
            },
            ticks: {
                display: false
            }
        }
    },
    elements: {
        point: {
            radius: 0,
            backgroundColor: '#fff',
        }
    },
    plugins: {
        tooltip: {
            displayColors: false,
            backgroundColor: '#7A18D5',
            padding: 20,
            titleFont: {
                size: titleTooltipSize
            },
            bodyFont: {
                size: bodyTooltipSize,
            },
            cornerRadius: 20,
            callbacks: {
                title: titleTooltip,
                label: function(context) {
                    let label = context.dataset.label || '';

                    if (label) {
                        label = '';
                    }
                    if (context.parsed.y !== null) {
                        label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                    }
                    return label + 'B';
                }
            }
        },
        legend: {
            display: false,
        },
    }
    },

})

const shiba = new Chart(shibaCtx, {
    type: 'line',
    data: {
        labels: labelArrayShiba,
        datasets: [{
            label: 'Капитализация', 
            data: dataArrayShiba,
            fill: true,
            backgroundColor: gradient,
            borderColor: '#fff',
            borderWidth: 3,
        }],
    },
    options: graphOptions,
})

const dogecoin = new Chart(dogecoinCtx, {
    type: 'line',
    data: {
        labels: labelArrayDogecoin,
        datasets: [{
            label: 'Капитализация', 
            data: dataArrayDogecoin,
            fill: true,
            backgroundColor: gradient,
            borderColor: '#fff',
            borderWidth: 3,
        }],
    },
    options: graphOptions,
})

window.addEventListener('resize', initSlider)
