import express from 'express'

const app = express();

app.use(express.json())

let vehicles = [
    {
        id: 1,
        vehicleName: "Hyundai Creta",
        vehicleNumber: "HR26AB1234",
        type: "SUV",
        price: 1500000
    },
    {
        id: 2,
        vehicleName: "Toyota Fortuner",
        vehicleNumber: "UP16CD5678",
        type: "SUV",
        price: 4200000
    },
    {
        id: 3,
        vehicleName: "Honda City",
        vehicleNumber: "DL8CAF9012",
        type: "Sedan",
        price: 1200000
    }
];


app.get('/vehicles', (req, res) => {
    res.json(vehicles)
})


app.get('/vehicles/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const vehicle = vehicles.find((v) => v.id === id);
    if (!vehicle) {
        return res.status(404).json({
            message: "Vehicle not found"
        });
    }

    res.json(vehicle)
})


app.post('/vehicles', (req, res) => {
    const newVehicle = {
        id: vehicles.length + 1,
        ...req.body
    };

    vehicles.push(newVehicle);

    res.status(201).json({
        message: "Vehicle added successfully",
        vehicle: newVehicle
    })
})


app.put('/vehicles/:id', (req, res) => {

    const id = Number(req.params.id)

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid vehicle ID"
        })
    }

    const index = vehicles.findIndex((v) => v.id === id);
    if (index === -1) {
        return res.status(404).json({
            message: "Vehicle not found"
        });
    }
    vehicles[index] = {
        id: id,
        ...req.body
    }
    res.json({
        message: "Vehicle updated successfully",
        vehicle: vehicles[index]
    })
})


app.delete('/vehicles/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = vehicles.findIndex((v) => v.id === id)
    if (index === -1) {
        return res.status(404).json({
            message: "Vehicle not found"
        })
    }
    const deletedVehicle = vehicles.splice(index, 1)
    res.json({
        message: "Vehicle deleted successfully",
        vehicle: deletedVehicle[0]
    })
})



app.listen(4000, () => {
    console.log(`Express Server started at Port: 4000`);
});