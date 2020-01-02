module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const Category = require('../../models/Category')

  router.post('/categories', async (req, res) => {
    try {
      const model = await Category.create(req.body)
      res.send(model)
    } catch (error) {
      res.send(error)
    }
  })

  router.put('/categories/:id', async (req, res) => {
    try {
      const model = await Category.findByIdAndUpdate(req.params.id, req.body)
      res.send(model)
    } catch (error) {
      res.send(error)
    }
  })

  router.get('/categories', async (req, res) => {
    try {
      const list = await Category.find().limit(10)
      res.send(list)
    } catch (error) {
      res.send(error)
    }
  })

  router.get('/categories/:id', async (req, res) => {
    try {
      const data = await Category.findById(req.params.id)
      res.send(data)
    } catch (error) {
      res.send(error)
    }
  })

  router.delete('/categories/:id', async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id)
      res.send({
        success: true
      })
    } catch (error) {
      res.send(error)
    }
  })

  app.use('/admin/api', router)
}
