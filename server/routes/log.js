const express = require('express');
const admin = require('../middlewares/admin');
const auth = require('../middlewares/auth');
const router = express.Router();
const { Log } = require('../models/log');

router.get('/', [auth, admin], async (req, res) => {
    if (Object.keys(req.query).length === 0) {
        const logs = await Log.find();
        return res.json({ table: logs, success: true });
    }

    const { sortBy, page, select } = req.query;
    const desc = req.query.desc === 'true';
    const limit = Number(req.query.limit);
    const sortString = `${desc ? '-' : ''}${sortBy === 'timestamp' ? '_id' : sortBy}`;
    
    const log = await Log
                        .find()
                        .collation({'locale':'en'})
                        .sort(sortString)
                        .skip(page * limit)
                        .select(select)
                        .limit(limit);
    
    res.json({ log, total: await Log.count() });
});

router.delete('/:ids', [auth, admin], async (req, res) => {
    const ids = req.params.ids.split(',');
    const result = await Log.deleteMany({ _id: {$in: ids} });
    res.send(result);
});

module.exports = router;