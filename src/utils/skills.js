'use strict';

const fs = require('fs');
const path = require('path');
const { SKILLS_DIR } = require('../config');

/**
 * Returns a sorted array of all skill folder names.
 */
function getSkills() {
  if (!fs.existsSync(SKILLS_DIR)) {
    throw new Error(`Skills directory not found: ${SKILLS_DIR}`);
  }

  return fs.readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .sort();
}

/**
 * Reads the `description:` field from a skill's SKILL.md frontmatter.
 * Returns an empty string if not found or unreadable.
 */
function getSkillDescription(skillName) {
  const skillFile = path.join(SKILLS_DIR, skillName, 'SKILL.md');
  if (!fs.existsSync(skillFile)) return '';

  try {
    const content = fs.readFileSync(skillFile, 'utf-8');
    const match = content.match(/^description:\s*(.+)$/m);
    return match ? match[1].trim() : '';
  } catch {
    return '';
  }
}

/**
 * Returns skills optionally filtered by a search term.
 */
function filterSkills(skills, term) {
  if (!term) return skills;
  const lower = term.toLowerCase();
  return skills.filter(s => s.toLowerCase().includes(lower));
}

module.exports = { getSkills, getSkillDescription, filterSkills };
