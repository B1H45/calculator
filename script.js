console.log("HELLO");

let val1;
let val2;
let op;

let operate = function(val1, val2, op) {
    switch (op) {
        case "add":
            return val1 + val2;
        case "subtract":
            return val1 - val2;
        case "multiply":
            return val1 * val2;
        case "divide":
            return val1 / val2;
    }
}

