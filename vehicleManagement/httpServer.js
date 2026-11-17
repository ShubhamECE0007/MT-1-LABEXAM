import http, { createServer } from 'http'
import fs from 'fs'

const server = http.createServer((req,res)=>{
    res.end('Hello world')

})
server.listen(3000,()=>{
    console.log("server success")
})