/*********************************************************
 * 
 * Application "Rain"
 * 
 *********************************************************/

const CANVAS_BG = "#f0f0f0"

function execRain() {

    /**
     * Full size window
     */
    const _html = document.querySelector("#_html");
    _html.style.margin = 0;
    _html.style.padding = 0;
    const _body = document.querySelector("#_body");
    _body.style.margin = 0;
    _body.style.padding = 0;

    /**
     * Canvas initialization
     */
    const _canvas = document.querySelector("#_canvas");
    _canvas.style.display = "block";
    _canvas.width = window.innerWidth;          // Canvas size
    _canvas.height = window.innerHeight;        //   <- Window size
    _canvas.style.backgroundColor = CANVAS_BG;

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
            const _ripple = new _Ripple(this.context, _x, _y, _step)
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

class _Ripple {

    constructor(context, x, y, step) {
        this.context = context;
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