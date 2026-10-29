const express = require('express');

const {newUser, getAllUser, getOneUser, UpdateUser, deleteUser} = require('../controllers/usercontrol')

const router = express.Router();

router.post('/newuser', newUser); 
router.get('/alluser', getAllUser);
router.get('/oneuser/:id', getOneUser);
router.patch('/updateuser/:id', UpdateUser);
router.delete('/deleteuser/:id', deleteUser);

module.exports = router;