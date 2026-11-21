import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

// The backend no longer lets anonymous requests through. If the app calls
// the board API before the Guest login finishes, it gets a 401, and the
// 401 handler used to reload the home page, which looped forever.
function read(path) {
    return readFileSync(new URL(path, import.meta.url), 'utf8')
}

test('RootCmp loads boards only once a user is logged in', () => {
    const source = read('../src/RootCmp.jsx')
    assert.ok(source.includes('if (!userId) return'))
    assert.equal(/^\tloadBoards\(\)$/m.test(source), false)
})

test('BoardDetails waits for a user before loading the board', () => {
    const source = read('../src/pages/BoardDetails.jsx')
    assert.ok(source.includes('}, [boardId, userId])'))
})

test('the 401 handler does not reload the home page', () => {
    const source = read('../src/services/http.service.js')
    assert.ok(source.includes("if (window.location.pathname !== '/')"))
})
