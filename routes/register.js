const { application } = require('express');
const express = require('express');
const app = express();
const router = express.Router();
const {handleNewUser} = require('../controllers/registerNew');

router.post('/', handleNewUser);



module.exports = router;