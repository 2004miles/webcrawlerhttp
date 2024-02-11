const { argv } = require('node:process')
const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')


function main(){
    //console.log(argv)
    if (argv.length < 3){
        console.error('No argument for the website to crawl')
        return
    }
    if (argv.length > 3){
        console.error('Too many arguments. Only one is allowed is pass.')
        return
    }
    baseURL = argv[2]
    console.log(`Starting crawler... at: ${baseURL}`)
    crawlPage(baseURL, baseURL)
        .then(pages => {
            printReport(pages);
        })
}


main()
