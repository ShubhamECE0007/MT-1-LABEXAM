import express from 'express'
const app = express()

app.use(express.json());

const vehicles = [
  {
    id: 1,
    brand: "Toyota",
    model: "Fortuner",
    
    color: "Black",
    price: 4200000,
   
  },
  {
    id: 2,
    brand: "Hyundai",
    model: "Creta",

    color: "White",
    price: 1500000,
  
  },
  {
    id: 3,
    brand: "Tata",
    model: "Nexon EV",
  
    color: "Blue",
    price: 1650000,
    
  }
];

app.listen(4000, ()=>{
    console.log("server successfully started to PORT 4000")
})