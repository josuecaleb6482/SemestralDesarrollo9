const CACHE = {};

const getCache = (req, res) => {
    res.json({ data: CACHE });
}

module.exports = { getCache }