const { createCanvas } = require('canvas')

const wrapText = (ctx, text, x, y, maxWidth) => {
    const words = text.split(' ')
    let line = ''
    for (let index = 0; index < words.length; index++) {
        let testLine = line + words[index] + ' '
        let metrics = ctx.measureText(testLine)
        let testWidth = metrics.width
        if (testWidth > maxWidth && index > 0) {
            ctx.fillText(line, x, y)
            line = words[index] + ' '
            y += metrics.emHeightAscent
        } else {
            line = testLine
        }
    }
    ctx.fillText(line, x, y)
}

const extractSize = (size) => {
    try {
        const sizeArray = size.split('x')
        if (sizeArray.length == 1) {
            return [
                parseInt(sizeArray[0]),
                parseInt(sizeArray[0]),
            ]
        }

        return [
            parseInt(sizeArray[0]),
            parseInt(sizeArray[1]),
        ]
    } catch (error) {
        throw Error('Failed to get image size')
    }
}

const drawImage = (width, height, background, foreground, fontSize, text, wrap = false) => {
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = `#${background}`
    ctx.fillRect(0, 0, width, height)

    ctx.fillStyle = `#${foreground}`
    ctx.textAlign = 'center'
    ctx.font = `${fontSize} Sans-serif`
    if (wrap) {
        wrapText(ctx, text, width / 2, height - (.85 * height), .85 * width)
    } else {
        ctx.fillText(text, width / 2, height / 2)
    }
    return canvas.toBuffer('image/png')
}

const drawAvatar = (size, background, foreground) => {
    const width = parseInt(size)
    const height = parseInt(size)
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = `#${background}`
    ctx.fillRect(0, 0, width, height)

    ctx.beginPath()
    ctx.fillStyle = `#${foreground}`
    ctx.arc(width / 2, height - (.6 * height), .2 * width, 0, 2 * Math.PI, false)
    ctx.fill()

    ctx.beginPath()
    ctx.strokeStyle = `#${foreground}`
    ctx.arc(width / 2, height + (.1 * height), .45 * width, 0, 2 * Math.PI, false)
    ctx.fill()

    return canvas.toBuffer('image/png')
}

module.exports = {
    extractSize,
    drawImage,
    drawAvatar
}