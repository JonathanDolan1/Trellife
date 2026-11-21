import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

import { escapeHtml } from '../src/services/escape-html.js'

test('escapeHtml turns markup into plain text', () => {
    const attack = '<img src=x onerror="alert(1)">'
    assert.equal(escapeHtml(attack), '&lt;img src=x onerror=&quot;alert(1)&quot;&gt;')
})

test('escapeHtml escapes ampersands and single quotes', () => {
    assert.equal(escapeHtml("Tom & Jerry's"), 'Tom &amp; Jerry&#39;s')
})

test('escapeHtml returns an empty string for null or undefined', () => {
    assert.equal(escapeHtml(null), '')
    assert.equal(escapeHtml(undefined), '')
})

test('escapeHtml leaves ordinary text alone', () => {
    assert.equal(escapeHtml('updated attachment on card abc12'), 'updated attachment on card abc12')
})

// Guards the one dangerouslySetInnerHTML in the app: the activity builder
// must escape the stored title before using it.
test('activity feed escapes the stored title', () => {
    const source = readFileSync(new URL('../src/cmps/RightNavBar.jsx', import.meta.url), 'utf8')
    assert.ok(source.includes('const safeTitle = escapeHtml(activity.title)'))
    assert.equal(source.includes('formattedTitle = activity.title'), false)
    assert.equal(source.includes('${activity.task.title}'), false)
    assert.equal(source.includes('${user.fullname}'), false)
})
