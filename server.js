const express = require('express');
const path = require('path');
const db = require('./db');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/api/users', (req, res, next) => {
  try {
    console.log('users');
  } catch(ex) {
    next(ex);
  }
});

app.get('/api/departments', (req, res, next) => {
  try {
    console.log('departments');
  } catch(ex) {
    next(ex);
  }
})