#!/usr/bin/env node

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

try {
    const sha = execSync('git rev-parse HEAD').toString().trim()
    const message = execSync('git log -1 --pretty=%B').toString().trim()
    const date = execSync('git log -1 --pretty=%cI').toString().trim()
    
    const version = {
        sha,
        message,
        date
    }
    
    const publicPath = path.join(__dirname, '..', 'public')
    const versionFile = path.join(publicPath, 'version.json')

    // Ensure public directory exists
    if (!fs.existsSync(publicPath)) {
        fs.mkdirSync(publicPath, { recursive: true })
    }

    fs.writeFileSync(versionFile, JSON.stringify(version, null, 2), 'utf-8')
    console.log(`✅ Generated public/version.json with SHA: ${sha.substring(0, 7)}`)
} catch (error) {
    console.error('❌ Failed to generate version.json:', error.message)
    process.exit(1)
}
