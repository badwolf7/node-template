# Node Template

![Screenshot](http://res.cloudinary.com/hollyspringsteen/image/upload/v1438026449/landing-2015-07-27_h5opow.jpg)

### Table of Contents

* [Contributors](#contributors)

1. [Getting Started](#1-getting-started)
2. [Node](#2-node)
3. [Express](#3-express)
4. [EJS Templating](#4-ejs-templating)

---

### Contributors

1. **Holly Springsteen**
    *Full Stack Developer - IBM Design*
    + *Website*: [hollyspringsteen.com](http://hollyspringsteen.com)
    + *Github*: [badwolf7](http://github.com/badwolf7)
    + *CodePen*: [badwolf7](http://codepen.io/badwolf7)

---

## 1. Getting Started

* In terminal change directories to the site directory within the project folder
* run the application via node or node-dev
  - will run on port 8000

```
cd site

node-dev app.js
```

## 2. Node

### A platform for building fast, scalable network applications

### [Node.js Site](http://nodejs.org)

---

[Install Node](https://nodejs.org/dist/v0.12.7/node-v0.12.7.pkg)

#### node-dev

`node-dev` is a development tool for Node.js that automatically restarts the node process when a file is modified.

```
sudo npm install -g node-dev
```

Run as you would normally run Node

```
node-dev app.js
```

#### Simple Server

This simple web server written in Node responds with "Hello World" for every request.

```
var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
```

#### Learn More

[NodeSchool](http://nodeschool.io)
[Code School](https://www.codeschool.com/courses/real-time-web-with-node-js)

## 3. Express

### Node.js Web Application Framework

### [Express Site](http://expressjs.com)

---

#### A Basic Express App

In your base directory create a file named app.js and add the following.

```
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
```

The app starts a server and listens on port 3000.

#### Basic Routing Tutorial

The following code illustrates some example routes in an app.

```
// respond with "Hello World!" on the homepage
app.get('/', function (req, res) {
    res.send('Hello World!');
});

// accept POST request on the homepage
app.post('/', function (req, res) {
    res.send('Got a POST request');
});

// accept PUT request at /user
app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user');
});

// accept DELETE request at /user
app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user');
});
```

## 4. EJS Templating

### <% Embedded JavaScript %>

### [EJS Site](http://embeddedjs.com)

---

Below is an example of templating via EJS (Embedded JavaScript Templates)

This code:

```
<% if(message != ''){ %>
<p><strong><%= message.author %></strong></p>
<p><%= message.msg %></p>
<% } %>
```

Will produce:

**Holly Springsteen**

Basic template for Express, EJS, and Node.js


*This is based off of the data that is sent to the browser from the controller*

```
var message = {
  msg: 'Basic template for Express, EJS, and Node.js',
  author: 'Holly Springsteen'
}

module.exports = function(){
  app.get('/',function(req, res){
    // landing page (default: index.ejs)
    res.render('index', {message: message});
  });
}
```