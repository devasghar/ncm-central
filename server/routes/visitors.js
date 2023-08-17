const express = require('express');
const router = express.Router();
const {
    createVisitor,
    getVisitors,
    getVisitor,
    deleteVisitor,
    updateVisitor
} = require('../controllers/visitorsController')

router.post('/', createVisitor);

router.get('/', getVisitors);

router.get('/:id', getVisitor);

router.delete('/:id', deleteVisitor);

router.patch('/:id', updateVisitor);

module.exports = router;
