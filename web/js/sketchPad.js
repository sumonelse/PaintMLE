class SketchPad{
    constructor(container, size=400){
        this.canvas = document.createElement("canvas")
        this.canvas.width = size
        this.canvas.height = size
        this.canvas.style = `
            background-color: white;
            box-shadow: 4px 4px 12px 2px rgb(0,0,0,0.08), 
                        -4px -4px 12px rgb(255,255,255,1);
        `
        container.appendChild(this.canvas)
        
        this.undoBtn = document.createElement("button")
        this.undoBtn.classList.add("btn")
        this.undoBtn.classList.add("undo")
        this.undoBtn.innerHTML = "UNDO"
        container.appendChild(this.undoBtn)

        this.ctx = this.canvas.getContext("2d")

        this.reset()

        this.#addEventListeners()
        // this.fun()
    }

    /* fun(){
        // Experimenting PRIVATE FUNCTION and FUNCTION call in constructor :) 
        console.log("Nice one! Daaamit")
        this.#addEventListeners()
    } */
    
    reset(){
        this.paths = []
        this.isDrawing = false
        this.#redraw()
    }

    #addEventListeners(){
        this.canvas.onmousedown = (evt) => {
            const mouse = this.#getMouse(evt)
            this.paths.push([mouse])
            this.isDrawing = true
            // console.log(this.paths)
        }
        this.canvas.onmousemove = (evt) => {
            if(!this.isDrawing) return
            const mouse = this.#getMouse(evt)
            const lastPath = this.paths[this.paths.length - 1]
            lastPath.push(mouse)
            this.#redraw()
        }
        document.onmouseup = () => {
            this.isDrawing = false
        }

        this.undoBtn.onclick = () => {
            this.paths.pop()
            this.#redraw()
        }

        // FOR TOUCH-SCREENS
        this.canvas.ontouchstart = (evt) => {
            const loc = evt.touches[0]
            // console.log(loc)
            this.canvas.onmousedown(loc)
        }
        this.canvas.ontouchmove = (evt) => {
            const loc = evt.touches[0]
            this.canvas.onmousemove(loc)
        }
        document.ontouchend = () => {
            document.onmouseup()
        }
    }

    #redraw = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        draw.paths(this.ctx, this.paths)
        if(this.paths.length > 0){
            this.undoBtn.disabled = false
        }else{
            this.undoBtn.disabled = true
        }
    }

    #getMouse = (evt) => {
        const rect = this.canvas.getBoundingClientRect()
        const mouse = [
            Math.round(evt.clientX - rect.left),
            Math.round(evt.clientY - rect.top)
        ]
        return mouse
    }

    #disableMouse = () => {
        
    }
}