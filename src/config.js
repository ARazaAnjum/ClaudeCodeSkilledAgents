'use strict';

const path = require('path');

// The skills directory lives at the package root (one level above /src)
const SKILLS_DIR = path.join(__dirname, '..', 'skills');

// The ai-workflow folder (base rules and process files)
const AI_WORKFLOW_DIR = path.join(__dirname, '..', 'ai-workflow');

// The CLAUDE.md template (for Claude Code / Claude Agent)
const CLAUDE_MD = path.join(__dirname, '..', 'CLAUDE.md');

// The cursor.mdc template (for Cursor AI)
const CURSOR_MDC = path.join(__dirname, '..', 'cursor.mdc');

module.exports = { SKILLS_DIR, AI_WORKFLOW_DIR, CLAUDE_MD, CURSOR_MDC };
