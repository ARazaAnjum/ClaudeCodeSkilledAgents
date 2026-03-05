#!/usr/bin/env node

const fs = require('fs-extra')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const DIST = path.join(ROOT, 'dist', 'plugins')
const SKILLS_DIR = path.join(ROOT, 'skills')
const COMMANDS_DIR = path.join(ROOT, 'commands')
const CONFIG_PATH = path.join(__dirname, 'category-config.json')

async function build() {
	const config = await fs.readJson(CONFIG_PATH)
	const { backgroundSkills, categories } = config

	// Clean dist
	await fs.remove(DIST)
	await fs.ensureDir(DIST)

	const results = []

	for (const [category, meta] of Object.entries(categories)) {
		const pluginDir = path.join(DIST, category)
		const skillsOut = path.join(pluginDir, 'skills')
		const commandsOut = path.join(pluginDir, 'commands')
		const pluginJsonDir = path.join(pluginDir, '.claude-plugin')

		await fs.ensureDir(skillsOut)
		await fs.ensureDir(commandsOut)
		await fs.ensureDir(pluginJsonDir)

		// Copy background skills
		const allSkills = [...backgroundSkills, ...meta.skills]

		for (const skill of allSkills) {
			const src = path.join(SKILLS_DIR, skill)
			const dest = path.join(skillsOut, skill)

			if (await fs.pathExists(src)) {
				await fs.copy(src, dest)
			} else {
				console.warn(`  Warning: skill "${skill}" not found, skipping`)
			}
		}

		// Copy commands
		if (await fs.pathExists(COMMANDS_DIR)) {
			const cmdFiles = await fs.readdir(COMMANDS_DIR)
			for (const file of cmdFiles) {
				if (file.endsWith('.md')) {
					await fs.copy(
						path.join(COMMANDS_DIR, file),
						path.join(commandsOut, file)
					)
				}
			}
		}

		// Generate plugin.json
		const skillPaths = allSkills.map(s => `./skills/${s}`)
		const cmdFiles = (await fs.pathExists(commandsOut))
			? (await fs.readdir(commandsOut)).filter(f => f.endsWith('.md')).map(f => `./commands/${f}`)
			: []

		const pluginJson = {
			name: meta.name,
			description: meta.description,
			version: '2.0.0',
			author: { name: 'ClaudeCodeSkills Contributors' },
			repository: 'https://github.com/ARazaAnjum/ClaudeCodeSkilledAgents',
			license: 'MIT',
			keywords: ['skills', 'workflow', category],
			skills: skillPaths,
			commands: cmdFiles
		}

		await fs.writeJson(
			path.join(pluginJsonDir, 'plugin.json'),
			pluginJson,
			{ spaces: 2 }
		)

		results.push({
			category,
			name: meta.name,
			skills: allSkills.length,
			commands: cmdFiles.length
		})
	}

	// Summary
	console.log('\n  Category Plugins Built Successfully\n')
	console.log('  Category          Plugin Name                         Skills  Commands')
	console.log('  ────────────────  ──────────────────────────────────  ──────  ────────')

	for (const r of results) {
		const cat = r.category.padEnd(18)
		const name = r.name.padEnd(36)
		const skills = String(r.skills).padStart(4)
		const cmds = String(r.commands).padStart(6)
		console.log(`  ${cat}${name}${skills}  ${cmds}`)
	}

	const totalSkills = results.reduce((sum, r) => sum + r.skills, 0)
	console.log(`\n  Total: ${results.length} plugins | ${totalSkills} skill copies | Output: dist/plugins/\n`)
}

build().catch(err => {
	console.error('Build failed:', err)
	process.exit(1)
})
