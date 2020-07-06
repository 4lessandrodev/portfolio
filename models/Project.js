const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true
  },
  description: {
    type: String,
    required: true,
  },
  urlVideo: {
    type: String,
    required:true,
  },
  images: {
    type: Array,
    required: true,
  },
  qtdLikes: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default:Date.now,
  }
});

mongoose.model('Project', ProjectSchema);