function startTime() {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML =
        h + ":" + m + ":" + s;
    let t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i}  // add zero in front of numbers < 10
    return i;
}

const start = () => {
    startTime();

    getClockData().then(data => {
        drawClock(data);
    });
};

const drawClock = (clockData) => {
    let date = new Date();
    let main = document.querySelector('.main');
    console.log("drawing");
    let html = clockData.map((chars, column) => renderChars(chars, column, date)).join('');
    main.innerHTML = `<table>` + html + `</table>`;
    console.log("done drawing");
    //let t = setTimeout(drawClock(clockData), 500);
};

const renderChars = (chars, column, date) => {
    let html = `<tr class="chars">`;
    html += chars.map((char, row) => renderChar(char, column, row, date)).join('');
    html += `</tr>`;
    return html;
};

const renderChar = (char, column, row, date) => {

    let markCssClass = '';
    let h = date.getHours();
    let hourChars = charsForHour(h);

    let m = date.getMinutes();
    let minute = Math.round(m/5)*5;
    if (minute > 59) {
        minute = 0;
    }
    let minuteChars = charsForMinute(minute);

    let chars = hourChars.concat(minuteChars);

    let l = chars.filter(lala => {
        return (lala[0] === column && lala[1] === row);
    });
    if (l.length > 0) {
        console.log(`current hour char should be coloured`);
        markCssClass = 'mark'
    }

    return `<td class="char ${markCssClass}">${char}</td>`;
};

const renderHeader = () => {
    let html = `<tr class="header">
      <td class="spacer">€</td>`;
    html += `</tr>`;
    return html;
};

const getClockData = () => {
    return new Promise(resolve => {
        let items = [
            ["I", "T", "L", "I", "S", "A", "S", "T", "I", "M", "E"], // 0
            ["A", "C", "Q", "U", "A", "R", "T", "E", "R", "D", "C"], // 1
            ["T", "W", "E", "N", "T", "Y", "F", "I", "V", "E", "X"], // 2
            ["H", "A", "L", "F", "B", "T", "E", "N", "F", "T", "O"], // 3
            ["P", "A", "S", "T", "E", "R", "U", "N", "I", "N", "E"], // 4
            ["O", "N", "E", "S", "I", "X", "T", "H", "R", "E", "E"], // 5
            ["F", "O", "U", "R", "F", "I", "V", "E", "T", "W", "O"], // 6
            ["E", "I", "G", "H", "T", "E", "L", "E", "V", "E", "N"], // 7
            ["S", "E", "V", "E", "N", "T", "W", "E", "L", "V", "E"], // 8
            ["T", "E", "N", "S", "E", "O", "C", "L", "O", "C", "K"]  // 9
        ]; // 0    1    2    3    4    5    6    7    8    9    10
        resolve(items)
    });
};

const charsForMinute = (minute) => {
    let past = [[4,0],[4,1],[4,2],[4,3]];
    let to = [[3,9],[3,10]];
    let litheral = minute < 35 ? past : to;
    let number = charsForMinuteNumber(minute < 35 ? minute : 60-minute);
    if (minute === 0) {
        return number;
    } else {
        return number.concat(litheral);
    }
};

const charsForMinuteNumber = (minute) => {
    switch (minute) {
        case 10:
            return [[3,5],[3,6],[3,7]];
        case 15:
            return [[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,8]];
        case 5:
            return [[2,6],[2,7],[2,8],[2,9]];
        case 20:
            return [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5]];
        case 25:
            return [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[2,8],[2,9]];
        case 30:
            return [[3,0],[3,1],[3,2],[3,3]];
        default:
            return [[0,0]]
    }
};

const charsForHour = (hour) => {
    return hour < 13 ? charsForHourNumber(hour) : charsForHourNumber(hour-12);
};

const charsForHourNumber = (hour) => {
    switch (hour) {
        case 1:
            return [[5,0],[5,1],[5,2]];
        case 2:
            return [[6,8],[6,9],[6,10]];
        case 3:
            return [[5,6],[5,7],[5,8],[5,9]];
        case 4:
            return [[6,0],[6,1],[6,2],[6,3]];
        case 5:
            return [[6,4],[6,5],[6,6],[6,7]];
        case 6:
            return [[5,3],[5,4],[5,5]];
        case 7:
            return [[8,0],[8,1],[8,2],[8,3],[8,4]];
        case 8:
            return [[7,0],[7,1],[7,2],[7,3],[7,4]];
        case 9:
            return [[4,7],[4,8],[4,9],[4,10]];
        case 10:
            return [[9,0],[9,1],[9,2]];
        case 11:
            return [[7,5],[7,6],[7,7],[7,8],[7,9],[7,10]];
        case 12:
            return [[8,5],[8,6],[8,7],[8,8],[8,9],[8,10]];
        default:
            return [[0,0]]
    }
};
