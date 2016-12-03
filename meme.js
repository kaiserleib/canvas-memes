var canvas, ctx, fileUpload, img, topText, bottomText, topSize, bottomSize, fontFace, downloadLink;

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
                var ratio = Math.min(800 / img.width, 500 / img.height);

                canvas.width = img.width * ratio;
                canvas.height = img.height * ratio;
                ctx.drawImage(img, 
                              0, 0, img.width,    img.height ,     
                              0, 0, canvas.width, canvas.height);
            }
            img.src = reader.result;
        }
        reader.readAsDataURL(fileUpload.files[0]);
    });
}

initializeText = function() {
    topText = document.getElementById("topText");
    topText.addEventListener("input", drawText); 

    bottomText = document.getElementById("bottomText");
    bottomText.addEventListener("input", drawText);

    topSize = document.getElementById("topSize");
    topSize.addEventListener("input", drawText);
    topSize.value = 30;

    bottomSize = document.getElementById("bottomSize");
    bottomSize.addEventListener("input", drawText);
    bottomSize.value = 30;

    fontFace = document.getElementById("fontFace");
    fontFace.addEventListener("change", drawText);

    fontStyle = document.getElementById("fontStyle");
    fontStyle.addEventListener("change", drawText);

    topOffset = document.getElementById("topOffset");
    topOffset.addEventListener("input", drawText);
    topOffset.value = -10;

    bottomOffset = document.getElementById("bottomOffset");
    bottomOffset.addEventListener("input", drawText);
    bottomOffset.value = -30;
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

    size = topSize.value ? topSize.value : "30";
    setStyle(topSize);
    var text = topText.value;
    text = text.toUpperCase();
    var topLines = getLines(text);
    var topY = topOffset.value ? +(topOffset.value) : 10;
    for (i = 0; i < topLines.length; i++) {
        ctx.beginPath();
        ycoord =  (canvas.height / 10) + (size * 1.2 * i) + topY;
        if (fontStyle.value == "outline") {
            ctx.strokeText(topLines[i], canvas.width / 2, ycoord);
        }
        ctx.fillText(topLines[i], canvas.width / 2, ycoord);
    };

    size = bottomSize.value ? bottomSize.value : "30";
    setStyle(bottomSize);
    text = bottomText.value;
    text = text.toUpperCase();
    var bottomLines = getLines(text);
    var bottomY = bottomOffset.value ? +(bottomOffset.value) : 10;
    for (i = 0; i < bottomLines.length; i++) {
        ctx.beginPath();
        ycoord =  canvas.height - ((bottomLines.length - i) * (size * 1.2)) - bottomY;
        if (fontStyle.value == "outline") {
            ctx.strokeText(bottomLines[i], canvas.width / 2, ycoord);
        }
        ctx.fillText(bottomLines[i], canvas.width / 2, ycoord);
    }
}

setStyle = function(pole) {
    var size = pole.value ? pole.value : "30";
    ctx.font = "bold " + size + "pt " + fontFace.value;

    if (fontStyle.value == "outline") {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "black";
        ctx.fillStyle = "white";
        ctx.lineJoin = "bevel";
    } else if (fontStyle.value == "black") {
        ctx.lineWidth = 1;
        ctx.fillStyle = "black";
    } else if (fontStyle.value == "white") {
        ctx.lineWidth = 1;
        ctx.fillStyle = "white";
    }

    ctx.textAlign = "center";
}

clearCanvas = function () {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (img) {
       ctx.drawImage(img, 
                     0, 0, img.width,    img.height ,     
                     0, 0, canvas.width, canvas.height);
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
    initializeText();
    initializeDownload();
}