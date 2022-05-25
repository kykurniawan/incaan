# Incaan - Dummy image server on your local environment.

## Introduction
This is a node js application that acts as a dummy image server in your local environment. Incaan does not require an internet connection to display images. Incaan will use localhost and port 3000 (customizable), then provide an endpoint to display the image.

## Usage
To use Incaan, make sure your computer has Node JS installed. Incan can be run by typing the following command in terminal/cmd.
```bash
npx incaan
```
When you first run it, you will be asked to confirm that Incaan will be installed on your computer. To continue you can select "yes".

### Custom Port
By default, Incaan listens for requests on port 3000 on your localhost. If for some reason this port is already in use, you can change it by adding the port at the end of the command when starting the Incaan server.
```bash
npx incaan 5000
```

### Showing a Dummy Image
To display a dummy image, you can send a get request to the following endpoint:
```url
/image/:size/:background/:foreground/:fontSize
```
#### Parameters
|Param Name|Description|Example|
|-|-|-|
|```:size```|The width and height of the image to be displayed (separated by **x**). If the width and height are the same, it can be written directly without the **x** sign.|```400x300```|
|```:background```|Image background color (in hex code without the **#** sign).|```008080```|
|```:foreground```|Image foreground (text) color (in hex code without the **#** sign).|```f6f6f6```|
|```:fontSize```|(Optional) Size of text displayed inside the image. Default value is 12pt.|```12pt```|

#### Available Query Strings
|Key Name|Description|Example|
|-|-|-|
|```text```|(Optional) The text to be displayed on the image. The default is the image size of the parameter.|```Hello```|
|```wrap```|(Optional) Wrap Text into multiline. Default value is ```false``` Wrapping text will make the text position to be top aligned.|```true``` or ```false```|

#### Full URL Example
```url
http://127.0.0.1:3000/image/400x300/008080/ffffff/20pt?text=Hello+Wordl
```
The URL above will display an image measuring 400 pixels wide and 300 pixels high, with a teal background color, white text color. and the text Hello World

### Showing a Dummy Avatar
To display a dummy avatar, you can send a get request to the following endpoint:
```url
/avatar/:size/:background/:foreground
```
#### Parameters
|Param Name|Description|Example|
|-|-|-|
|```:size```|The avatar size. (avatar use same width and height)|```400```|
|```:background```|Avatar background color (in hex code without the **#** sign).|```008080```|
|```:foreground```|Avatar foreground (user icon) color (in hex code without the **#** sign).|```f6f6f6```|

#### Full URL Example
```url
http://127.0.0.1:3000/avatar/400/008080/ffffff
```
The URL above will display a dummy avatar image with a size of 400px, teal background color and white user icon color.

# License
```
MIT License

Copyright (c) 2022 Gumbili Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```