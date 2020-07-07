const requireDir = require('require-dir');
requireDir('./../models');
const mongoose = require('mongoose');
const Project = mongoose.model('Project');

module.exports = {
  
  store: async (req, res) => {
    try {
      let qtd = 1;
      if (req.params._id == '' || req.params._id == undefined || req.params._id == null) {

        return res.status(401).json({ error: { msg: 'Projeto sem um id ou quantidade de likes' } });
      }
      
      let projectFound = await Project.findById(req.params._id);
      
      if (projectFound == null) {

        return res.status(401).json({ error: { msg: 'Não foi encontrado o projeto para o id informado' } });
      }
      
      if (projectFound.qtdLikes != 0 || projectFound.qtdLikes != null || projectFound.qtdLikes != undefined) {
        qtd += projectFound.qtdLikes;
      }
      
      let project = await Project.updateOne(req.params,
        { $set: { qtdLikes: qtd } });

        return res.status(200).json({ project }); 
      } catch (error) {
    
        res.status(500);
      }
    },
    
  };