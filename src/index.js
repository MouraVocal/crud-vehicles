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

// Update vehicle
app.put('/vehicles/:id', (req, res) => {
  const { id } = req.params;

  const {
    placa, chassi, renavam, modelo, marca, ano,
  } = req.body;

  const vehicleIndex = vehicles.findIndex((vehicle) => vehicle.id === id);

  if (vehicleIndex < 0) {
    return res.status(400).json({ error: 'Vehicle Not Found!' });
  }

  const vehicle = {
    id, placa, chassi, renavam, modelo, marca, ano,
  };

  vehicles[vehicleIndex] = vehicle;

  return res.json(vehicle);
});

// Delete vehicle
app.delete('/vehicles/:id', (req, res) => {
  const { id } = req.params;

  const vehicleIndex = vehicles.findIndex((vehicle) => vehicle.id === id);

  vehicles.splice(vehicleIndex, 1);

  return res.status(204).send();
});
