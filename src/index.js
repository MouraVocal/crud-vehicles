const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.listen(3000);
app.use(express.json());

const vehicles = [];

// Get vehicles list
app.get('/vehicles', (req, res) => {
  res.json(vehicles);
});

// Post new vehicles
app.post('/vehicles', (req, res) => {
  const {
    placa, chassi, renavam, modelo, marca, ano,
  } = req.body;
  const vehicle = {
    id: uuidv4(), placa, chassi, renavam, modelo, marca, ano,
  };
  vehicles.push(vehicle);
  return res.json(vehicle);
});
