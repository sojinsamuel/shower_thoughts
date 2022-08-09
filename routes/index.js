const express = require('express')
const router = express.Router();

/////////////////////////////
// @descrip   Login / Landing Page
// @route     GET /
router.get('/', (req, res) => {
  res.render('login', {
    layout: 'login'
  })
})

/////////////////////////////
// @descrip   Dashboard
// @route     GET /dash
router.get('/dash', (req, res) => {
  res.render('dashboard')
})


module.exports = router