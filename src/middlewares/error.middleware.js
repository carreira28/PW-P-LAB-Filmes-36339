module.exports = (err, req, res, nex) => {
    console.error(err);

    res.status(500).json({
        message: "ERO interno no servidor"
    });
};