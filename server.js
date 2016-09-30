/**
 * Main express server init module
 *
 * @author      Holly Springsteen
 * @version     1.0.0
 */

'use strict';

const express = require('express');
const path = require('path');
const ejs = require('ejs-locals');
const cluster = require('cluster');
const os = require('os');
const compression = require('compression');
const https = require('https');