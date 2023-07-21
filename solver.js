
const shader = require('./shader1');
const Jimp = require('jimp');

let width = 71;
let height= 40;

new Jimp(width, height, function (err, image) {
    if (err) throw err;

    for(let y=0;y<height;++y) {
        for(let x=0;x<width;++x) {
            let answer = shader.solve(x, y);
            let hexColor = Jimp.rgbaToInt(answer.rgb.r, answer.rgb.g, answer.rgb.b, 0xff);
            image.setPixelColor(hexColor, x, y);
        }
    }

    image.write('shader.png', (err) => {
      if (err) throw err;
    });
});
