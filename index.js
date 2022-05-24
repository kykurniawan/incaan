#! /usr/bin/env node
const process = require('process')
const express = require('express')
const { createCanvas } = require('canvas')

const app = express()
const arguments = process.argv
const port = parseInt(arguments[2] || 3000)

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

app.get('/:size/:background/:foreground/:fontSize?', (req, res) => {
    try {
        let { text } = req.query
        let { size, background, foreground, fontSize } = req.params

        if (!text) {
            text = size
        }

        let [width, height] = extractSize(size)

        if (!fontSize) {
            fontSize = '12px'
        }

        const canvas = createCanvas(width, height)
        const context = canvas.getContext("2d")
        context.fillStyle = `#${background}`
        context.fillRect(0, 0, width, height)

        context.fillStyle = `#${foreground}`
        context.textAlign = 'center'
        context.font = `${fontSize} Sans-serif`
        context.fillText(text, width / 2, height / 2)
        const buffer = canvas.toBuffer("image/png")
        return res
            .setHeader('Content-Disposition', 'inline')
            .contentType('image/png')
            .send(buffer)

    } catch (error) {
        res.status(400).send(error.message)
    }
})

app.listen(port, () => {
    console.info('---------------------------------------------------------------------')
    console.info('Incaan image server started...')
    console.info('---------------------------------------------------------------------')
    console.info('If you want to run with custom port, type npx incaan <port>')
    console.info('Example: npx incaan 5000')
    console.info('')
    console.info('Server info')
    console.info(`url         -> http://127.0.0.1:${port}`)
    console.info('path        -> /:size/:background/:foreground/:fontSize?')
    console.info('')
    console.info('Path description')
    console.info(':size       -> Image size, format: 600x400 or just 600(square)')
    console.info(':background -> Image background color in hex, ex: dddddd')
    console.info(':foreground -> Image text color in hex, ex: ffffff')
    console.info(':fontSize?  -> (Optional) Image font size, ex: 20px. Default is 12px')
    console.info('')
    console.info('Query param')
    console.info('text        -> (Optional) Text inside image')
    console.info('')
    console.info('Full example')
    console.info(`http://127.0.0.1:${port}/400x300/dddddd/000000/20px?text=Incaan+Image`)
})