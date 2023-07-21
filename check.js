const shader = require('./shader1');

let x = process.argv[2] || 39;
let y = process.argv[3] || 13;

x = parseInt(x);
y = parseInt(x);

let answer = shader.solve(x, y);

console.log(answer.rgb);
console.log(answer.working);
