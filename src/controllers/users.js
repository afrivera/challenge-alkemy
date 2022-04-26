const { response, request } = require('express');

const getAllUsers = (req, res, next) =>{
    res.json({msg: 'todo ok desde controller'});
}


module.exports = {
    getAllUsers
};
