const sharp = require("sharp");
const axios = require("axios");


exports.getImgGrayscale = async (imageUrl) => {
    const input = (await axios({ url: imageUrl, responseType: "arraybuffer" })
        .then(response => { 
            return response.data 
        })
        .catch(error => {
        return ''
        }));
    if (input != '') {
        const buffer = Buffer.from(input);
        const result = await sharp(buffer).greyscale().toBuffer();
        return result.toString('base64');
    }
    return ''.toString('base64');
}
