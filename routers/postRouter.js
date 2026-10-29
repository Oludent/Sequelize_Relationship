const express = require('express');

const {newPost, getAllPost, getOnePost} = require('../controllers/postcontrol');

const router = express.Router();

router.post('/newpost', newPost); 
router.get('/allpost', getAllPost);
router.get('/onepost/:id', getOnePost);


module.exports = router;