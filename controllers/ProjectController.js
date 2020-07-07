const requireDir = require('require-dir');
requireDir('./../models');
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const { check, body, validationResult } = require('express-validator');

module.exports = {
  
  index: async (req, res) => {
    let projects = await Project.find();
    //return res.status(200).json({ projects });
    Project.db.close();
    res.render('index', { projects, title: 'Portfólio' });
  },
  
  
  
  //-------------------------------------------------------------
  store: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {

        return res.status(422).json({ errors: errors.array() });
      }
      
      let images = req.body.images.split(',');
      images = images.map(image => image.trim());
      let possuiEspacosNoNome = images.map(image => {
        if (image.indexOf(' ') != '-1') {
          return 'true';
        } else {
          return 'false';
        }
      });
      
      if (possuiEspacosNoNome.indexOf('true') != '-1') {
   
        return res.status(422).json({ error: { msg: 'Informe o nome das imagens sem espaços' } });
      } else {
        
        req.body.images = images;
        
        let project = await Project.create(req.body);
      
        return res.status(200).json({ project });
        
      } 
    } catch (error) {

      res.status(500);
    }
  },
  
  
  
  //-------------------------------------------------------------
  update: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
    
        return res.status(422).json({ errors: errors.array() });
      }

      let images = req.body.images.split(',');
      images = images.map(image => image.trim());
      let possuiEspacosNoNome = images.map(image => {
        if (image.indexOf(' ') != '-1') {
          return 'true';
        } else {
          return 'false';
        }
      });

      if (possuiEspacosNoNome.indexOf('true') != '-1') {
     
        return res.status(422).json({ error: { msg: 'Informe o nome das imagens sem espaços' } });
      } else {

        let projectFound = await Project.findById(req.params._id);

        if (projectFound == null) {
  
          return res.status(401).json({ error: { msg: 'Não foi encontrado o projeto para o id informado' } });
        }

        let project = await Project.updateOne(req.params, req.body);
 
        return res.status(200).json({ project });
      } 
    } catch (error) {

      res.status(500);
    }
  },
  
  show: async (req, res) => {
    try {
      let project = await Project.findById(req.params._id);
      //return res.status(200).json({ project });
      res.render('project', { project });
    } catch (error) {
  
      res.status(500);
    }
  },

  view: async (req, res) => {
    try {
      let project = await Project.findById(req.params._id);

      return res.status(200).json({ project });
    } catch (error) {

      res.status(500);
    }
  }
};