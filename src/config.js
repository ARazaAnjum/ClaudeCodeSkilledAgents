'use strict';

const path = require('path');

// The skills directory lives at the package root (one level above /src)
const SKILLS_DIR = path.join(__dirname, '..', 'skills');

// The .cursor folder (base rules and process files)
const CURSOR_DIR = path.join(__dirname, '..', '.cursor');

module.exports = { SKILLS_DIR, CURSOR_DIR };
