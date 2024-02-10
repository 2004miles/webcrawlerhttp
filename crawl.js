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
    
    atagArray.forEach(atag => {
        try{
            const href = atag.href
            if (href.startsWith('http')){
                httpArray.push(href)
            }
            else if (href.startsWith('/')){
                const absoluteURL = new URL(href, baseURL).href
                httpArray.push(absoluteURL)
            }
        } catch (err){
            console.log(`${err.message}: ${atag.href}`)
        }

    })
    return httpArray
}

async function crawlPage(rootURL, currentURL, pages = {}) {
    // Ensure currentURL is absolute
    const baseHostName = new URL(baseURL).hostname;
    const currentHostName = new URL(currentURL).hostname;
    if (baseHostName !== currentHostName) {
        return pages;
    }
    
    const normalized = normalizeURL(currentURL);
    if (normalized in pages) {
        pages[normalized] += 1;
        return pages;
    }
    pages[normalized] = (normalized === normalizeURL(baseURL)) ? 0 : 1;

    try {
        const response = await fetch(currentURL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const htmlBody = await response.text();
        const currentURLs = getURLSFromHTML(htmlBody, rootURL);
        //console.log(currentURL);

        // Process each URL found on the page
        const crawlPromises = currentURLs.map(url => crawlPage(rootURL, url, pages));
        // Wait for all recursive crawl operations to complete
        await Promise.all(crawlPromises);
    } catch (error) {
        console.error('Fetch error:', error);
    }
    
    return pages;
}

module.exports = {
    normalizeURL,
    getURLSFromHTML,
    crawlPage
}
