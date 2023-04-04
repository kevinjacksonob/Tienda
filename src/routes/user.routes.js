const { Router } = require('express');
const { createUser, updateUser, getUsers } = require('../controllers/users.controller');

const router = Router();

router
    .post('/users', createUser)
    .get('/users', getUsers)
    .put('/users/:id', updateUser);

module.exports = router;