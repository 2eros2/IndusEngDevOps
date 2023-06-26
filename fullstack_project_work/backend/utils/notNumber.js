const notNumber = ((id, res) => {
    if(isNaN(Number(id))){
        res.status(400).json({message: "ID debe ser numero positivo"})
        return true
    }else false
})

module.exports = notNumber