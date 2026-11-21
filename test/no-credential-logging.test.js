import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

// A raw axios error carries the request config, which for login and
// signup includes the submitted password. These files must log only the
// HTTP status.
function read(path) {
    return readFileSync(new URL(path, import.meta.url), 'utf8')
}

test('login and signup actions do not log the raw error', () => {
    const source = read('../src/store/actions/user.actions.js')
    assert.equal(source.includes("console.log('Cannot login', err)"), false)
    assert.equal(source.includes("console.log('Cannot signup', err)"), false)
})

test('the auth page does not log the raw error', () => {
    const source = read('../src/pages/Auth.jsx')
    assert.equal(/console\.(log|error)\(err\)/.test(source), false)
})
