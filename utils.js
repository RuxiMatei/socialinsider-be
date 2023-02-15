const sharp = require("sharp");
const axios = require("axios");

exports.getReplacement = async () => {
    await axios({ 
        url: 'https://w7.pngwing.com/pngs/978/825/png-transparent-smiley-face-emoticon-drawing-sad-emoji-miscellaneous-face-smiley-thumbnail.png', 
        responseType: "arraybuffer" })
            .then(resp => { 
            console.log(resp.data)
            return resp.data 
    })
}
exports.getImgGrayscale = async (imageUrl) => {
    const input = (await axios({ url: imageUrl, responseType: "arraybuffer" })
        .then(response => { 
            return response.data 
        })
        .catch(async error => {
            let x = await this.getReplacement();
            console.log("HERE",error, x)
            return x;
        }));
    // if (input != '') {
        const buffer = Buffer.from(input);
        const result = await sharp(buffer).greyscale().toBuffer();
        return result.toString('base64');
    // }
    // return ''.toString('base64');
}
