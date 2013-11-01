// canvas drawing test

// **************
// CONSTANTS
// **************

// canvas constants

var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;
var COLOR_GRID = "#eee";
var COLOR_LINE = "#000";

// **************
// ENUMS
// **************

var drawModes = Object.freeze({ lines: {}, rectangles: {} });

// **************
// GLOBALS
// **************

// canvas globals

var c_canvas;
var context;

// mouse position globals

var positions = new Array();
var positionsString = "";

// **************
// MOUSE TRACKING
// **************

// init mouse tracking

trackMouseClickPosition();
trackMousePosition();

// Tracks the mouse position

function trackMousePosition()
{
    jQuery(document).ready(function()
    {
        $('#c').mousemove(function(e)
        {
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;

            drawPreviewLine(x, y);

            $('#trackpos').html(x + ', ' + y);
        });
    })
}

// Gets the current click position

function trackMouseClickPosition()
{
    jQuery(document).ready(function()
    {
        $('#c').click(function(e)
        {
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;

            drawPermanentLine(x, y);
            printPosition(x, y);
        });
    })
}

// **************
// functional objects
// **************

// container object for mouse positions

function MousePosition(x, y)
{
    this.x = x;
    this.y = y;
}

// container object for paths

function Path(startX, startY, endX, endY)
{
    this.startPos = new MousePosition(startX, startY);
    this.endPos = new MousePosition(endX, endY);
}

// **************
// HTML OUTPUT
// **************

function printPosition(x, y)
{
    positionsString += '(' + x + ', ' + y + ');';
    $('#clickpos').html(positionsString);
}

// **************
// CANVAS FUNCTIONS
// **************

function initCanvas()
{
    c_canvas = document.getElementById("c");
    c_canvas.width = CANVAS_WIDTH;
    c_canvas.height = CANVAS_HEIGHT;

    context = c_canvas.getContext("2d");

    drawGrid();
}

function resetCanvas()
{
    positionsString = "";
    positions.length = 0;

    $('#clickpos').html('0, 0');
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    drawGrid();
}

function drawGrid()
{
    context.beginPath();

    for (var x = 0.5; x < CANVAS_WIDTH; x += 10)
    {
        context.moveTo(x, 0);
        context.lineTo(x, CANVAS_HEIGHT);
    }

    for (var y = 0.5; y < CANVAS_HEIGHT; y += 10)
    {
        context.moveTo(0, y);
        context.lineTo(CANVAS_WIDTH, y);
    }

    context.strokeStyle = COLOR_GRID;
    context.stroke();

    context.beginPath();
}

function drawPreviewLine(x, y)
{
    if (positions.length > 0)
    {
        refreshDrawing();

        drawLine(positions[positions.length - 1].x,
            positions[positions.length - 1].y,
            x, y);
    }
}

function drawPermanentLine(x, y)
{
    var mousePosition = new MousePosition(x, y);
    positions.push(mousePosition);

    var length = positions.length;
    if (length > 1)
    {
        drawLine(positions[length - 2].x,
            positions[length - 2].y,
            positions[length - 1].x,
            positions[length - 1].y);
    }
}

function drawLines()
{
    context.beginPath();

    //console.debug(positions.length);
    for (var i = 1; i < positions.length; i++)
    {
        //console.debug('x=' + positions[i].x + 'y=' + positions[i].y)
        addLineToPath(positions[i - 1].x, positions[i - 1].y, positions[i].x, positions[i].y)
    }

    context.strokeStyle = COLOR_LINE;
    context.stroke();

    //positions = [];
}

function addLineToPath(startX, startY, endX, endY)
{
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
}

function drawLine(startX, startY, endX, endY)
{
    context.beginPath();

    context.moveTo(startX, startY);
    context.lineTo(endX, endY);

    context.strokeStyle = COLOR_LINE;
    context.stroke();
}

function refreshDrawing()
{
    c_canvas.width = c_canvas.width;
    drawGrid();
    drawLines();
}
