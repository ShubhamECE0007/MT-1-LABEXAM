import http from 'http'
import fs from 'fs'

const server = http.createServer((req, res) => {
    switch (req.url) {
        case '/':
            res.end("Welcome page in HTML format")
            break
        case '/about':
            res.end("Application information")
            break
        case '/info':
            res.setHeader("Content-type","text/html")
          const page =fs.readFileSync("./public/info.html",{encoding:"utf8"}) 
            res.end("page")
            break;
        case '/vehicles':
            res.end("List of all vehicle records in JSON format")
            break
        default:
            res.end("404 Not Found")
            break
    }
})

server.listen(3000, () => {
    console.log("Server started Successfully at Port: 3000")
})