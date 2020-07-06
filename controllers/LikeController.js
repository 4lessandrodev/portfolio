const requireDir = require('require-dir');
requireDir('./../models');
const mongoose = require('mongoose');
const Project = mongoose.model('Project');

module.exports = {

  store: async (req, res) => {
    let project = await Project.updateOne({ id: req.param.id },
      { $set: { qtdLikes: req.body.qtd } });
    res.status(200).json({ project });
  },

};