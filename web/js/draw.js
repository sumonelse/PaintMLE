const draw = {}

draw.path = (ctx, path, color="black") => {
    ctx.strokeStyle = color
    ctx.lineWidth = 3
    ctx.beginPath()
    // console.log(...path[0])
    ctx.moveTo(...path[0])
    for(let i = 1; i < path.length; i++){
        ctx.lineTo(...path[i])
    }
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.stroke()
}

draw.paths = (ctx, paths, color="black") => {
    // console.log(paths)
    for(const path of paths){
        draw.path(ctx, path, color)
    }
}