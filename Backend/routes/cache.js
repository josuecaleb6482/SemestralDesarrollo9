const express = require('express')
const { getCache } = require('../controllers/cache')
const api = express.Router()

api.get("/cache/:name", getCache)

module.exports = api
