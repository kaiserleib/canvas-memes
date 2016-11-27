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
    ctx.lineWidth = 5;
    ctx.font = "bold 30pt impact";
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.lineJoin = "bevel";
    var text = topText.value;
    text = text.toUpperCase();
    var topLines = getLines(text);
    for (i = 0; i < topLines.length; i++) {
        ctx.beginPath();
        ycoord =  (canvas.height / 10) + 40 * i;
        ctx.strokeText(topLines[i], canvas.width / 2, ycoord);
        ctx.fillText(topLines[i], canvas.width / 2, ycoord);
    };
    text = bottomText.value;
    text = text.toUpperCase();
    var bottomLines = getLines(text);
    for (i = 0; i < bottomLines.length; i++) {
        ctx.beginPath();
        ycoord =  canvas.height - ((bottomLines.length - i) * 40);
        ctx.strokeText(bottomLines[i], canvas.width / 2, ycoord);
        ctx.fillText(bottomLines[i], canvas.width / 2, ycoord);
    }
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

getLines = function(text) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = [];
    words.forEach(function(word) {
        var width = ctx.measureText(currentLine + " " + word).width;
        if (width < canvas.width * 0.9) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    });
    lines.push(currentLine);
    return lines;
}

window.onload = function() {
    initializeCanvas();
    initializeUploader();
    initializeTopText();
    initializeBottomText();
    initializeDownload();
}