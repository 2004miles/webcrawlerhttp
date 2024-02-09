function normalizeURL(urlString){
    const normURL = new URL(urlString)

    const normPath = normURL.pathname.replace(/\/+$/, '') 
    return normURL.hostname.concat(normPath);
}


module.exports = {
    normalizeURL   
}
