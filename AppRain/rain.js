/*********************************************************
 * 
 * Application "Rain" ('25.09.20)
 * 
 *********************************************************/

const WINDOW_BG = "#f0f0f0"

function initial() {

    /**
     * Full size display area
     */
    const _html = document.querySelector("#_html");
    _html.style.width = "100%";
    _html.style.height = "100%";
    _html.style.margin = 0;
    _html.style.padding = 0;
    const _body = document.querySelector("#_body");
    _body.style.width = "100%"
    _body.style.height = "100%"
    _body.style.margin = 0;
    _body.style.padding = 0;
    const _canvas = document.querySelector("#_canvas");
    _canvas.style.display = "block";
    _canvas.style.width = "100%";
    _canvas.style.height = "100%";

    /**
     * Cavas initialize
     */
    _canvas.width = _canvas.clientWidth;   // draw area
    _canvas.height = _canvas.clientHeight; //   <- display area
    _canvas.style.backgroundColor = WINDOW_BG;

    /**
     * Rain start
     */
    new Rain(_canvas).start();
}

/*********************************************************/

const RIPPLE_COLOR = "blue"
const FRAME_INTERVAL = 20;
const RIPPLE_NUM = 10;
const RIPPLE_STEP = 50;

class Rain {
    
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas_w = canvas.width;
        this.canvas_h = canvas.height;

        this.context = canvas.getContext('2d');
        this.ripples = [];
    }

    start() {
        this.intervalId = setInterval(()=>{this.draw()}, FRAME_INTERVAL);
    }
    stop() {
        clearInterval(this.intervalId)
    }

    draw() {
        if(this.ripples.length < RIPPLE_NUM) {
            const _x = Math.floor(Math.random() * this.canvas_w);
            const _y = Math.floor(Math.random() * this.canvas_h);
            const _step = Math.floor(Math.random() * RIPPLE_STEP);
            const _ripple = new Ripple(this.canvas, _x, _y, _step)
            this.ripples.push(_ripple)
        }
        this.context.clearRect(0, 0, this.canvas_w, this.canvas_h);
        for(let _index in this.ripples) {
            const _result = this.ripples[_index].draw()
            if(!_result) {
                this.ripples.splice(_index, 1)
            }
        }
    }
}

class Ripple {

    constructor(canvas, x, y, step) {
        this.context = canvas.getContext('2d');
        this.center_x = x;
        this.center_y = y;
        this.radius = 0;
        this.step = step;
    }

    draw() {
        this.context.beginPath();
        this.context.strokeStyle = RIPPLE_COLOR;
        this.context.arc(
            this.center_x, this.center_y, this.radius, 
            0, Math.PI * 2, true
        );
        this.context.stroke();

        this.radius += 5;
        this.step --;

        if(this.step > 0) return true; 
        else return false;
    }
}