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

    let today = new Date();
    getClockData().then(data => {
        drawClock(today, data);
    });
};

const drawClock = (date, clockData) => {
    let main = document.querySelector('.main');
    console.log("drawing");
    let html = clockData.map(chars => renderChars(chars)).join('');
    main.innerHTML = `<table border="1">` + html + `</table>`;
    console.log("done drawing");
};

const renderChars = (chars) => {
    let html = `<tr class="chars">`;
    html += chars.map(char => renderChar(char)).join('');
    html += `</tr>`;
    return html;
};

const renderChar = (char) => {
    let html = `<td class="char">${char}</td>`;
    return html;
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
            ["I", "T", "L", "I", "S", "A", "S", "T", "I", "M", "E"],
            ["A", "C", "Q", "U", "A", "R", "T", "E", "R", "D", "C"],
            ["T", "W", "E", "N", "T", "Y", "F", "I", "V", "E", "X"],
            ["H", "A", "L", "F", "B", "T", "E", "N", "F", "T", "O"],
            ["P", "A", "S", "T", "E", "R", "U", "N", "I", "N", "E"],
            ["O", "N", "E", "S", "I", "X", "T", "H", "R", "E", "E"],
            ["F", "O", "U", "R", "F", "I", "V", "E", "T", "W", "O"],
            ["E", "I", "G", "H", "T", "E", "L", "E", "V", "E", "N"],
            ["S", "E", "V", "E", "N", "T", "W", "E", "L", "V", "E"],
            ["T", "E", "N", "S", "E", "O", "C", "L", "O", "C", "K"]
        ];
        resolve(items)
    });
};

function coordinatesForValue(value) {

    switch (value) {
        case 5:
            return [[2,6],[2,7],[2,8],[2,9]];
        case 20:
            return [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5]];
        case 25:
            return [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[2,8],[2,9]];
    }
}