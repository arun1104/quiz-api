module.exports = function addDomain(req, res) {
    if (req.IsBranchTest) {
        console.log('Im not covered in report');
    }
    console.log("Domain created")
    res.status(201).send();
}