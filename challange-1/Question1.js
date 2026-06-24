function printPattern(n) {
    for (let i = 1; i <= n; i++) {
        let row = "";

        for (let j = i; j >= 1; j--) {
            row += j;
        }

        console.log(row);
    }
}

printPattern(7);

function printRow(num) {
    if (num === 0) return "";
    return num + printRow(num - 1);
}

function printPattern(n, current = 1) {
    if (current > n) return;

    console.log(printRow(current));
    printPattern(n, current + 1);
}

printPattern(5);

function printPattern(n) {
    for (let i = 1; i <= n; i++) {
        let row = Array.from(
            { length: i },
            (_, index) => i - index
        ).join("");

        console.log(row);
    }
}

printPattern(5);