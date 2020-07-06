const requireDir = require('require-dir');
requireDir('./../models');
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const Message = mongoose.model('Message');

module.exports = {

  store: async (req, res) => {
    let message = await Message.create(req.body);
    res.status(200).json({ message });
  }

};