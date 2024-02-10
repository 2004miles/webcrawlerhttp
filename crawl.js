const { JSDOM } = require('jsdom')

function normalizeURL(urlString){
    const normURL = new URL(urlString)

    const normPath = normURL.pathname.replace(/\/+$/, '') 
    return normURL.hostname.concat(normPath);
}

function getURLSFromHTML(htmlBody, baseURL){
    const dom = new JSDOM(htmlBody)
    const atagArray = dom.window.document.querySelectorAll('a')
    const httpArray = []
    
    atagArray.forEach(atagArray => {
        const href = atagArray.href
        if (href.startsWith('http')){
            httpArray.push(href)
        }
        else if (href.startsWith('/')){
            httpArray.push(baseURL+href)
        }

    })
    return httpArray
}

module.exports = {
    normalizeURL,
    getURLSFromHTML
}
