const { Users, Posts } = require('../models')

const newUser = async (req, res) => {
    try {
        const {firstName, lastName, gender, email, postId}= req.body;
        const user = await Users.findOne({where: {email}});
        if (user){
            return res.status(400).json({
                message: `User already exists`
            })
        }

        const newUser = await Users.create({
            firstName,
            lastName,
            email,
            gender,
            postId
        });
        res.status(201).json({
            message: `User created successfully`,
            data: newUser
        })
        
    } catch (error) {
         res.status(500).json({
            message: error.message
        })
        
        
    }
};

const getAllUser = async (req, res) =>{
    try {
        const users = await Users.findAll();
        res.status(200).json({
            message: `Users are found and the total is: ${users.length}`,
            data: users
        })

    } catch (error) {
         res.status(500).json({
            message: error.message
        })
        
    } 
};

const getOneUser = async (req, res) => {
   try {
    const {id} = req.params;
    const user = await Users.findByPk(id, {
        include: {
            attributes: ['title', 'body'],
            model: Posts,
            as: 'Article',
        }
    });

    if (!user){
        return res.status(404).json({
            message: `User not found`
        })
    }
    res.status(200).json({
        message: `User Found`,
        data: user
    })
    
   } catch (error) {
     res.status(500).json({
            message: error.message
        })
   } 
};

const UpdateUser = async (req, res) =>{
    try {
        const {id} = req.params;
        const {firstName, lastName, gender, email, postId} = req.body;
    
        const update = await Users.update({firstName, lastName, gender, email, postId}, {where: {id}})
        if(!update){
            return res.status(404).json({
                message: `User doesn't esxists`
            })
        }
        res.status(200).json({
            message: `Updated successfully`,
            data: update
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await Users.findOne({where: {id}});
        if(!user){
            return res.status(404).json({
                message: `User not found`
            })
        }
        await Users.destroy({where: {id}});
        res.status(200).json({
            message:`User deleted successfully`
        });

    } catch (error) {
         res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {
    newUser,
    getAllUser,
    getOneUser,
    UpdateUser,
    deleteUser
}