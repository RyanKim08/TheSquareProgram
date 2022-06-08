/*
 * Course: CS 4722
 * Section: W01
 * Name: Ryan Kim
 * Professor: Alan Shaw
 * Assignemnt 1: Exercise 1 - The Square Program
 */

"use strict";

var gl;
var points;
var height = document.getElementById("sHeight").value;
var width = document.getElementById("sWidth").value;
//var outputHeight;
//var outputWidth;
console.log(height, width);

function updateHeight(args) {
    //document.getElementById("sHeight").value = args;
    console.log(args);
    height = args;
    window.location.reload();
}

function updateWidth(args) {
    //document.getElementById("sHeight").value = args;
    console.log(args);
    width = args;
    window.location.reload();
}

/*height.oninput = function () {
    outputHeight.innerHTML = this.value;
    updateRect();
}

width.oninput = function () {
    outputWidth.innerHTML = this.value;
    updateRect();
}*/

// Four Vertices
var vertices = [
    vec2(-(width), -(height)),
    vec2(-(width), (height)),
    vec2(width, height),
    vec2(width, -(height))
];

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    //
    //  Configure WebGL
    //
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 0.0, 0.0, 1.0);

    //  Load shaders and initialize attribute buffers

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    render();
};


function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}