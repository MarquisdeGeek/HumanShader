// const barop = require('./barop');

exports.solve = solveShader1;

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


function solveShader1(x, y) {
    let state = {
        x: x,
        y: y,
        u: x - 36,
        v: 18 - y,
    };

    state.h = (state.u*state.u) + (state.v*state.v)

    if (state.h < 200) {
        return solveB(state);
    } else if (state.v < 0) {
        return solveC(state);
    }
    return solveD(state);
}

function solveB(state) {
    // B1-6
    state.R = 420;
    state.B = 520;
    state.t = 5000 + 8*state.h;
    state.p = barop((state.t * state.u), 2)
    state.q = barop((state.t * state.v), 2)
    state.s = 2 * state.q;
    // B7
    state.w = barop(1000 + state.p - state.s, 2) + 8;
    if (state.w > 0) {
        state.R += state.w*state.w;
    }
    state.o = state.s + 2200;
    // B10
    state.R = barop(state.R * state.o, 4);
    state.B = barop(state.B * state.o, 4);
    // B12
    if (state.p > - state.q) {
        state.w = barop(state.p + state.q, 1);
        state.R += state.w;
        state.B += state.h;
    }

    return solveE(state);
}


function solveC(state) {
    // C1-C4
    state.R = 150 + 2*state.v;
    state.B = 50;
    state.p = state.h + 8*state.v*state.v;
    state.c = (-240*state.v) - state.p;
    // C5
    if (state.c > 1200) {
        state.o = barop(6 * state.c, 1);
        state.o = state.c * (1500 - state.o);
        state.o = barop(state.o, 2) - 8360;
        state.R = barop(state.R * state.o, 3);
        state.B = barop(state.B * state.o, 3);
    }
    // C11
    state.r = state.c + state.u*state.v;
    state.d = 3200 - state.h - 2*state.r;
    // C13
    if (state.d > 0) {
        state.R += state.d;
    }

    return solveE(state);
}

function solveD(state) {
    state.c = state.x + 4*state.y;
    state.R = 132 + state.c;
    state.B = 192 + state.c;

    return solveE(state);
}


function solveE(state) {
    state.R = Math.min(state.R, 255);
    state.B = Math.min(state.B, 255);
    state.G = barop(7*state.R + 3*state.B, 1);

    // Not in the instructions, but needed I feel
    state.G = Math.min(state.G, 255);

    return {
        rgb: {r: state.R, g: state.G, b: state.B},
        working: state
    }
}
