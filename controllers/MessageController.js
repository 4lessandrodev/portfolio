const requireDir = require('require-dir');
requireDir('./../models');
const mongoose = require('mongoose');
const Message = mongoose.model('Message');
const { check, body, validationResult } = require('express-validator');

module.exports = {
  
  store: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
   
        return res.status(422).json({ errors: errors.array() });
      }
      
      let message = await Message.create(req.body);

      res.status(200).json({ message }); 
    } catch (error) {

      res.status(500);
    }
  }
  
};