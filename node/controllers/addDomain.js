module.exports = function addDomain(req, res) {
    console.log("Domain created")
    res.status(201).send();
}