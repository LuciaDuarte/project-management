const express = require('express');
const router = express.Router();
const Project = require('../models/project-model');
const mongoose = require('mongoose');
const fileUpload = require('../configs/cloudinary');

router.get('/projects', (req, res) => {
  Project.find()
    .then(allProjects => {
      res.status(200).json(allProjects);
    })
    .catch(err => res.status(500).json(`Error occurred ${err}`));
});

router.post('/projects', (req, res) => {
  const { title, description, imageUrl } = req.body;

  if (!title || !description || !imageUrl) {
    res.status(400).json('Missing fields');
    return;
  }
  Project.create({ title, description, imageUrl })
    .then(project => res.status(200).json(project))
    .catch(err => res.status(500).json(`Error occurred ${err}`));
});

router.delete('/projects/:id', (req, res) => {
  Project.findByIdAndRemove(req.params.id)
    .then(() =>
      res.status(200).json(`Project with id ${req.params.id} was deleted`)
    )
    .catch(err => res.status(500).json(`Error occurred ${err}`));
});

router.get('/projects/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json('Specified id is not valid');
    return;
  }
  Project.findById(req.params.id)
    .then(project => res.status(200).json(project))
    .catch(err => res.status(500).json(`Error occurred ${err}`));
});

router.put('/projects/:id', (req, res) => {
  const projectWithNewData = req.body;
  Project.findByIdAndUpdate(req.params.id, projectWithNewData)
    .then(() => {
      res.status(200).json(`Project with id ${req.params.id} was updated`);
    })
    .catch(err => res.status(500).json(`Error occurred ${err}`));
});

router.post('/upload', fileUpload.single('file'), (req, res) => {
  try {
    res.status(200).json({ fileUrl: req.file.path });
  } catch (err) {
    res.status(500).json(`Error occurred ${err}`);
  }
});

module.exports = router;
