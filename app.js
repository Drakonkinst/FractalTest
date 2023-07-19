//https://progur.com/2017/02/create-mandelbrot-fractal-javascript.html
// for more fancy customizations

function checkIfBelongsToMandelbrotSet(x, y) {
    var realComponentOfResult = x;
    var imaginaryComponentOfResult = y;
    var maxIterations = 200;

    for(var i = 0; i < maxIterations; i++) {
         // Calculate the real and imaginary components of the result
         // separately
         var tempRealComponent = realComponentOfResult * realComponentOfResult
                                 - imaginaryComponentOfResult * imaginaryComponentOfResult
                                 + x;

         var tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult
                                 + y;

         realComponentOfResult = tempRealComponent;
         imaginaryComponentOfResult = tempImaginaryComponent;

        if (realComponentOfResult * imaginaryComponentOfResult > 5)
            return (i / maxIterations * 100); // return number as percentage
    }

    return 0; // return 0 if in set
}

function getRndColor() {
    var r = 100*Math.random() + 50|0,
        g = 0,
        b = 100*Math.random() + 50|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function start() {
    var myCanvas = document.createElement("canvas");
    myCanvas.width=600;
    myCanvas.height=600;
    document.body.appendChild(myCanvas);
    var ctx = myCanvas.getContext("2d");

    var magnificationFactor = 1800;
    var panX = 0.8;
    var panY = 0.6;
    for(var x=0; x < myCanvas.width; x++) {
       for(var y=0; y < myCanvas.height; y++) {
           var belongsToSet = checkIfBelongsToMandelbrotSet(x / magnificationFactor - panX, y / magnificationFactor - panY);
           if(belongsToSet == 0) {
                ctx.fillStyle = "#000";
                ctx.fillRect(x, y, 1, 1);
           } else {
               ctx.fillStyle = "hsl(312, 100%, " + belongsToSet + "%)";
               ctx.fillRect(x, y, 1, 1);
           }
       } 
    }
}

start();
