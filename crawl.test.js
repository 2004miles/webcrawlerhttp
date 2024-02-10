const { normalizeURL} = require('./crawl.js')
const { getURLSFromHTML } = require('./crawl.js')
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

test('getURLSFromHTML absolute https', () =>{
    const htmlString = '<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>'
    const urls = getURLSFromHTML(htmlString, 'https://boot.dev'); 
    expect(urls).toEqual(['https://blog.boot.dev/'])   
})

test('getURLSFromHTML both 1', () =>{
    const htmlString = '<html><body><a href="https://boot.dev/test"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
    const urls = getURLSFromHTML(htmlString, 'https://boot.dev'); 
    expect(urls).toEqual(["https://boot.dev/test", "https://other.com/path/one"])   
})

test('getURLSFromHTML relative path', () =>{
    const htmlString = '<html><body><a href="/path/one"><span>boot.dev</span></a></body></html>'
    const urls = getURLSFromHTML(htmlString, 'https://blog.boot.dev'); 
    expect(urls).toEqual(['https://blog.boot.dev/path/one'])   
})

test('getURLSFromHTML both 2', () =>{
    const htmlString =  '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="/path/two"><span>Boot.dev></span></a></body></html>'
    const urls = getURLSFromHTML(htmlString, 'https://blog.boot.dev'); 
    expect(urls).toEqual(['https://blog.boot.dev/path/one', 'https://blog.boot.dev/path/two'])   
})

test('getURLsFromHTML handle error', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="path/one"><span>Boot.dev></span></a></body></html>'
  const actual = getURLSFromHTML(inputBody, inputURL)
  const expected = [ ]
  expect(actual).toEqual(expected)
})
