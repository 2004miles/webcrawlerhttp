const { normalizeURL } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL strip', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
})

test('normalizeURL strip capitals', () => {
    expect(normalizeURL('hTtp://Blog.boot.dev/path//')).toBe('blog.boot.dev/path');
})

test('normalizeURL strip leading /', () => {
    expect(normalizeURL('hTtp://Blog.boot.dev/path////////')).toBe('blog.boot.dev/path');
})
