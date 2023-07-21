exports.barop = barop;


function barop(value, n) { // remove last n digits
    let asString = "" + Math.abs(value); // handle -ve
    let len = asString.length;
    let lhs = asString.substring(0, len - n);
    let cropped = lhs ? parseInt(lhs) : 0; // if value=0 this parses to NaN

    // REM: Rounding!
    let roundValue = parseInt(asString.substring(len-n+1, 1));
    if (roundValue >= 5) {
        ++cropped;
    }

    if (value < 0) {
        cropped = -cropped;
    }

    return cropped;
}
