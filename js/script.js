let table = document.getElementById('game_table');
let rows = 6;
let cell = 6;
let numbres = [];
let number_cell;
let btn_start = document.getElementById('start');
let btn_restart = document.getElementById('restart');
let timer = document.getElementById('timer');
let number = 75;
let timer_number = number;
let timer_text = timer.textContent;
let all_td_numbers = [];
let timerGo;
let all_td;

btn_start.addEventListener('click', startGame);
btn_restart.addEventListener('click', restartGame);

function startGame() {
    btn_start.style.display = 'none';

    for (let i = 1; i <= rows; i++) {
        let tr = document.createElement('tr');

        for (let j = 1; j <= cell; j++) {
            let td = document.createElement('td');

            td.innerHTML = randomNumber(1, rows * cell);
            tr.append(td);
        }
        table.append(tr);
    }

    let td = document.querySelectorAll('td');

    for (let item of td) {
        item.style.fontSize = randomSize();
        item.style.color = randomColor();
    }

    timer.innerHTML = `Времени осталось: ${timer_number}`;
    timerGo = setInterval(timerGoFunc, 1000);
    td_click();
}
function restartGame() {
    btn_restart.style.display = 'none';
    timer_number = number;
    table.innerHTML = '';
    startGame();
}
function td_click() {
    all_td = document.querySelectorAll('td');

    for (let item of all_td) {
        all_td_numbers.push(item.textContent);
        item.addEventListener('click', td_bg);
    }
};
function td_bg() {
    all_td_numbers.sort(function sorting(a, b) {
        if (+a > +b) return 1;
        if (+a < +b) return - 1;
    });

    if (this.textContent == all_td_numbers[0]) {
        this.style.backgroundColor = 'red';
        all_td_numbers.shift();
        if (all_td_numbers.length == 0) {
            if (timer_number > 0) {
                clearInterval(timerGo);
                timer.innerHTML = 'Вы выиграли';
                for (let item of all_td) {
                    item.removeEventListener('click', td_bg);
                }
                btn_restart.style.display = 'block';
            }
        }
    }
}
function timerGoFunc() {
    if (timer_number <= 0) {
        clearInterval(timerGo);
        timer.innerHTML = 'Вы проиграли';
        for (let item of all_td) {
            item.removeEventListener('click', td_bg);
        }
        btn_restart.style.display = 'block';
    } else {
        timer_number = timer_number - 1;
        timer.innerHTML = `Времени осталось: ${timer_number}`;
    }
}
function randomInterval(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
function randomNumber(min, max) {
    number_cell = randomInterval(min, max);
    let counter = 0;

    for (let k = 0; k < numbres.length; k++) {
        if (numbres[k] == number_cell) {
            counter++;
        }
    }

    if (counter == 0) {
        numbres.push(number_cell);
    } else {
        randomNumber(min, max);
    }

    return number_cell;
}
function randomSize() {
    numbres = [];
    return `${randomNumber(14, 40)}px`;
}
function randomColor() {
    numbres = [];
    return `rgb(${randomNumber(0, 255)}, ${randomNumber(0, 255)}, ${randomNumber(0, 255)})`;
}
