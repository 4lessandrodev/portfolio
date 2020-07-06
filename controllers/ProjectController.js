const requireDir = require('require-dir');
requireDir('./../models');
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const Message = mongoose.model('Message');

module.exports = {
  
  index: async (req, res) => {
    let projects = await Project.find();
    res.status(200).json({ projects });
  },

  store: async (req, res) => {
    let project = await Project.create(req.body); 
    res.status(200).json({project});
  },

  update: async (req, res) => {
    let project = await Project.updateOne({ id: req.param.id },
      { $push: { images: { $each: [req.body.images] } } });
    res.status(200).json({ project });
  }

};