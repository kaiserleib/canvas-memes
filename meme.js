var canvas, ctx, fileUpload, img, topText, bottomText, downloadLink;

initializeCanvas = function() {
    canvas = document.getElementById("memeCanvas");
    canvas.width = Math.min(800, window.innerWidth * 0.8);
    canvas.height = Math.min(500, window.innerHeight * 0.8);

    ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffcc";
    ctx.fill();
}

initializeUploader = function() {
    fileUpload = document.getElementById("fileUpload");
    fileUpload.addEventListener("change", function() {
        var reader = new FileReader();
        reader.onload = function(e) {
            img = new Image();
            img.onload = function() {
                ctx.drawImage(img, 0, 0);
            }
            img.src = reader.result;
            canvas.width = img.width;
            canvas.height = img.height;
        }
        reader.readAsDataURL(fileUpload.files[0]);
    });
}

initializeTopText = function() {
    topText = document.getElementById("topText");
    topText.addEventListener("input", drawText); 
}

initializeBottomText = function() {
    bottomText = document.getElementById("bottomText");
    bottomText.addEventListener("input", drawText);
}

initializeDownload = function() {
    downloadLink = document.getElementById("downloadLink");
    downloadLink.addEventListener("click", function() {
        var data = canvas.toDataURL();
        downloadLink.href = data;
    });
}
drawText = function() {
    clearCanvas();
    ctx.lineWidth = 2;
    ctx.font = "30pt sans-serif";
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    var text = topText.value;
    text = text.toUpperCase();
    ctx.beginPath();
    ctx.strokeText(text, canvas.width / 2, canvas.height / 10);
    ctx.fillText(text, canvas.width / 2, canvas.height / 10);
    text = bottomText.value;
    text = text.toUpperCase();
    ctx.beginPath();
    ctx.strokeText(text, canvas.width / 2, canvas.height - canvas.height / 10);
    ctx.fillText(text, canvas.width / 2, canvas.height - canvas.height / 10);
}

clearCanvas = function () {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (img) {
        ctx.drawImage(img, 0, 0);
    } else {
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffcc";
        ctx.fill();
    }
}

window.onload = function() {
    initializeCanvas();
    initializeUploader();
    initializeTopText();
    initializeBottomText();
    initializeDownload();
}