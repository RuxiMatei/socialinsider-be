exports.imageGrayscale = (image) => {
    let imgObj = image;
    let canvas = document.createElement('canvas');
    let canvasContext = canvas.getContext('2d');
     
    let imgW = imgObj.width;
    let imgH = imgObj.height;
    canvas.width = imgW;
    canvas.height = imgH;
     
    canvasContext.drawImage(imgObj, 0, 0);
    let imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);
     
    for(let y = 0; imgPixels.height; y++){
        for(let x = 0; imgPixels.width; x++){
            let i = (y * 4) * imgPixels.width + x * 4;
            let avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
            imgPixels.data[i] = avg; 
            imgPixels.data[i + 1] = avg; 
            imgPixels.data[i + 2] = avg;
        }
    }
    canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
    return canvas.toDataURL();
}