const PoojaList = require("../models/poojaList");
const resp = require("../helpers/apiResponse");

exports.add_poojaList = async (req, res) => {

    const { pooja_name } = req.body;

    const newPoojaList = new PoojaList({
        pooja_name: pooja_name
    });


    newPoojaList
        .save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
}



exports.admin_poojaList = async (req, res) => {
    await PoojaList.find()
        .sort({ createdAt: -1 })
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};

exports.getone_poojaList = async (req, res) => {
    await PoojaList.findOne({ _id: req.params.id })
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};


exports.edit_poojalist = async (req, res) => {
    await PoojaList.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        { $set: req.body },
        { new: true }
    )
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};


exports.dlt_poojaList = async (req, res) => {
    await PoojaList.deleteOne({ _id: req.params.id })
        .then((data) => resp.deleter(res, data))
        .catch((error) => resp.errorr(res, error));
};
