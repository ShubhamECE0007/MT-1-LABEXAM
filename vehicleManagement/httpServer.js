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
            res.setHeader("Content-Type", "text/html");
            fs.readFile("./public/info.html", "utf8", (err, data) => {
                if (err) {
                    res.statusCode = 500
                    res.end("Error 500")
                } else {
                    res.end(data)
                }
            })
            break
        case '/vehicles':
            if (req.method === 'GET') {
                res.writeHead(200, { "Content-Type": "application/json" })
                res.end(JSON.stringify(vehicles))
            }
            break
        case '/add-vehicle':
            if (req.method === 'POST') {
                let body = ''

                req.on('data', (chunk) => {
                    body += chunk.toString()
                })

                req.on('end', () => {
                    try {
                        const newVehicle = JSON.parse(body)
                        const { id, vehicleName, vehicleNumber, type, price } = newVehicle
                        if (
                            id === undefined ||
                            !vehicleName ||
                            !vehicleNumber ||
                            !type ||
                            price === undefined ||
                            typeof price !== 'number' ||
                            price <= 0
                        ) {
                            res.writeHead(400, { "Content-Type": "application/json" })
                            return res.end(JSON.stringify({
                                message: "Missing required fields or invalid price"
                            }))
                        }
                        vehicles.push(newVehicle)
                        res.writeHead(201, { "Content-Type": "application/json" })
                        res.end(JSON.stringify({
                            message: "Vehicle added successfully",
                            vehicle: newVehicle
                        }))
                    } catch (error) {
                        res.writeHead(400, { "Content-Type": "application/json" })
                        res.end(JSON.stringify({
                            message: "Invalid JSON format"
                        }))
                    }
                })
            }
            break
        default:
            res.statusCode = 404
            res.end("404 Not Found")
            break
    }
})

server.listen(3000, () => {
    console.log("Server started Successfully at Port: 3000")
})