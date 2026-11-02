const { Posts, Users } = require('../models');

const newPost = async (req, res) =>{
    try {
        const {title, body, userId} = req.body; 
        const post = await Posts.findOne({where: {title}});

        if (post) {
            return res.status(400).json({
                message: `Post already exists`
            });
        }

        const addPost = await Posts.create({
            title,
            body,
            userId
        })
        res.status(201).json({
            message: `Post created successfully`,
            data: addPost
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
};

const getAllPost = async (req, res)=>{
    try {
        const allPost = await Posts.findAll();
        res.status(200).json({
            message: `All posts found and the total: ${allPost.length}`,
            data: allPost
        })
        res.status()

        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
        
    }
};

const getOnePost = async (req, res) => {
   try {
    const {id} = req.params;
    const onePost = await Posts.findByPk(id, {
        include: {
            attributes: ['firstName', 'lastName', 'gender'],
            model: Users,
            as: 'Clients'

        }
    })
    if (!onePost){
        return res.status(404).json({
            message: `Post doesn't exists`
        })
    }
    res.status(200).json({
        message: `Post Found`,
        data: onePost
    })
    
   } catch (error) {
     res.status(500).json({
            message: error.message
        })
   } 
};

const updatePost = async (req, res) => {
    const {id} = req.params;
    const {title, body} = req.body;
    const post1 = await Posts.findOne({where: {id}})
    if (!post1){
        return res.status(404).json({
            message: `Post doesn't exists`
        })
    }

    const post2 = await Posts.update({title, body,}, {where: {id}})
    res.status(200).json({
        message: `Post updated sucesssfully`,
        data: post2
    })
}
const deletePost = async (req, res) => {
    const {id} = req.params;
    const post = await Posts.findOne({where: {id}})
    if (!post){
        return res.status(404).json({
            massage: `Post doesn't exit`
        })
    }

    const delete1 = await Posts.destroy({where: {id}})
    res.status(200).json({
        message: `Post deleted successfully`,
        data: delete1
        })
}

module.exports = {
    newPost,
    getAllPost,
    getOnePost,
    updatePost,
    deletePost
}