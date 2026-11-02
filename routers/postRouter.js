const express = require('express');

const {newPost, getAllPost, getOnePost, updatePost, deletePost} = require('../controllers/postcontrol');

const router = express.Router();

router.post('/newpost', newPost); 
router.get('/allpost', getAllPost);
router.get('/onepost/:id', getOnePost);
router.patch('/updatepost/:id', updatePost);
router.delete('/deletepost/:id', deletePost)


module.exports = router;