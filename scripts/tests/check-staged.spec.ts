import { describe, expect, it } from 'vitest'
import { selectLintFiles } from '../check-staged.js'

describe('selectLintFiles', () => {
    it('should keep the extensions the rules cover', () => {
        expect(selectLintFiles(['src/a.ts', 'src/b.tsx', 'src/c.css', 'src/d.scss'])).toEqual([
            'src/a.ts',
            'src/b.tsx',
            'src/c.css',
            'src/d.scss',
        ])
    })

    it('should drop files the rules do not read', () => {
        expect(selectLintFiles(['README.md', 'src/main.js', 'package.json'])).toEqual([])
    })

    it('should drop the ignored tree', () => {
        expect(selectLintFiles(['public/projects/x.css', 'src/a.ts'])).toEqual(['src/a.ts'])
    })

    it('should keep a path holding spaces', () => {
        expect(selectLintFiles(['src/Some Folder/a file.tsx'])).toEqual([
            'src/Some Folder/a file.tsx',
        ])
    })

    it('should keep a declaration file', () => {
        expect(selectLintFiles(['src/globals.d.ts'])).toEqual(['src/globals.d.ts'])
    })

    it('should return nothing for a commit that only touches prose', () => {
        expect(selectLintFiles(['docs/0009-linting-rules'])).toEqual([])
    })
})
