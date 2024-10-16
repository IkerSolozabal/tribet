// get a list of all items.
const getItems = (req, res) => {
    const data = ["LISTA", "USUARIOS"];
    res.send({data})
};


module.exports = {getItems}