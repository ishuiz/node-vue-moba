module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })

  router.post('/', async (req, res) => {
    try {
      const model = await req.Model.create(req.body)
      res.send(model)
    } catch (error) {
      res.send(error)
    }
  })

  router.put('/:id', async (req, res) => {
    try {
      const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
      res.send(model)
    } catch (error) {
      res.send(error)
    }
  })

  router.get('/', async (req, res) => {
    try {
      const queryOptions = {}
      if (req.Model.modelName === 'Category') {
        queryOptions.populate = 'parent'
      }
      const list = await req.Model.find().setOptions(queryOptions).limit(10)
      res.send(list)
    } catch (error) {
      res.send(error)
    }
  })

  router.get('/:id', async (req, res) => {
    try {
      const data = await req.Model.findById(req.params.id)
      res.send(data)
    } catch (error) {
      res.send(error)
    }
  })

  router.delete('/:id', async (req, res) => {
    try {
      await req.Model.findByIdAndDelete(req.params.id)
      res.send({
        success: true
      })
    } catch (error) {
      res.send(error)
    }
  })

  app.use('/admin/api/rest/:resource', (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)
}
