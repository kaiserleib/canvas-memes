var canvas, ctx, fileUpload, img, topText, bottomText, topSize, bottomSize, downloadLink;

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

    bottomSize = document.getElementById("bottomSize");
    bottomSize.addEventListener("input", drawText);
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

    var size = topSize.value ? topSize.value : "30";
    ctx.font = "bold " + size + "pt impact";
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.lineJoin = "bevel";
    var text = topText.value;
    text = text.toUpperCase();
    var topLines = getLines(text);
    for (i = 0; i < topLines.length; i++) {
        ctx.beginPath();
        ycoord =  (canvas.height / 10) + (size * 1.2 * i) + 10;
        ctx.strokeText(topLines[i], canvas.width / 2, ycoord);
        ctx.fillText(topLines[i], canvas.width / 2, ycoord);
    };

    size = bottomSize.value ? bottomSize.value : "30";
    ctx.font = "bold " + bottomSize.value + "pt impact";
    text = bottomText.value;
    text = text.toUpperCase();
    var bottomLines = getLines(text);
    for (i = 0; i < bottomLines.length; i++) {
        ctx.beginPath();
        ycoord =  canvas.height - ((bottomLines.length - i) * (size * 1.2));
        ctx.strokeText(bottomLines[i], canvas.width / 2, ycoord);
        ctx.fillText(bottomLines[i], canvas.width / 2, ycoord);
    }
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