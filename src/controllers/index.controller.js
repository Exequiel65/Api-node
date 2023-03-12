class  index {
    static index(req, res) {
        res.status(200).json({
            msg : 'get index '
        })
    }
};


module.exports = index