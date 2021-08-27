/* eslint-disable no-console */
/* eslint-disable no-shadow */
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const app = express();

app.listen(3000);
app.use(express.json());

// Checking if file exists
let obj = {};
obj.vehicles = [];
const filePath = './file/vehicles.json';

fs.access(filePath, fs.constants.F_OK, (err) => {
  if (err) {
    fs.writeFile(filePath, JSON.stringify(obj), (err) => {
      console.log(err);
    });
  }
  // eslint-disable-next-line consistent-return
  fs.readFile(filePath, (err, data) => {
    if (err) {
      return console.log(err);
    }

    obj = JSON.parse(data);
  });
});

// Middleware for update file
function updateFile(req, res, next) {
  next();
  fs.writeFile(filePath, JSON.stringify(obj), (err) => {
    if (err) {
      console.log(err);
    }
  });
}

app.use(updateFile);

// Get vehicles list
app.get('/vehicles', (req, res) => {
  res.json(obj.vehicles);
});

// Post new vehicles
app.post('/vehicles', (req, res) => {
  const {
    placa, chassi, renavam, modelo, marca, ano,
  } = req.body;
  const vehicle = {
    id: uuidv4(), placa, chassi, renavam, modelo, marca, ano,
  };
  obj.vehicles.push(vehicle);
  return res.json(vehicle);
});

// Update vehicle
app.put('/vehicles/:id', (req, res) => {
  const { id } = req.params;

  const {
    placa, chassi, renavam, modelo, marca, ano,
  } = req.body;

  const vehicleIndex = obj.vehicles.findIndex((vehicle) => vehicle.id === id);

  if (vehicleIndex < 0) {
    return res.status(400).json({ error: 'Vehicle Not Found!' });
  }

  const vehicle = {
    id, placa, chassi, renavam, modelo, marca, ano,
  };

  obj.vehicles[vehicleIndex] = vehicle;

  return res.json(vehicle);
});

// Delete vehicle
app.delete('/vehicles/:id', (req, res) => {
  const { id } = req.params;

  const vehicleIndex = obj.vehicles.findIndex((vehicle) => vehicle.id === id);

  obj.vehicles.splice(vehicleIndex, 1);

  return res.status(204).send();
});
