#! /usr/bin/env node
const process = require('process')
const express = require('express')
const { drawImage, drawAvatar, extractSize } = require('./utils')

const app = express()
const arguments = process.argv
const port = parseInt(arguments[2] || 3000)


app.get('/avatar/:size/:background/:foreground', (req, res) => {
    try {
        const { size, background, foreground } = req.params

        const avatarBuffer = drawAvatar(size, background, foreground)

        return res
            .setHeader('Content-Disposition', 'inline')
            .contentType('image/png')
            .send(avatarBuffer)

    } catch (error) {
        res.status(400).send(error.message)
    }
})

app.get('/image/:size/:background/:foreground/:fontSize?', (req, res) => {
    try {
        let { text, wrap } = req.query
        let { size, background, foreground, fontSize } = req.params

        if (!text) {
            text = size
        }

        if (!wrap) {
            wrap = false
        } else {
            wrap = wrap == 1 || wrap == true || wrap == 'true'
        }

        let [width, height] = extractSize(size)

        if (!fontSize) {
            fontSize = '12pt'
        }

        const imageBuffer = drawImage(
            width,
            height,
            background,
            foreground,
            fontSize,
            text,
            wrap
        )

        return res
            .setHeader('Content-Disposition', 'inline')
            .contentType('image/png')
            .send(imageBuffer)

    } catch (error) {
        res.status(400).send(error.message)
    }
})

app.listen(port, () => {
    console.info('---------------------------------------------------------------------')
    console.info('Incaan image server started...')
    console.info('---------------------------------------------------------------------')
    console.info('URL')
    console.info(`http://127.0.0.1:${port}`)
    console.info('')
    console.info('Dummy Image example')
    console.info(`http://127.0.0.1:${port}/image/400x300/008080/ffffff/20px?text=Incaan+Image`)
    console.info('')
    console.info('Dummy Avatar example')
    console.info(`http://127.0.0.1:${port}/avatar/400/008080/ffffff`)
    console.info('---------------------------------------------------------------------')
    console.info('ctrl + c to stop')
})