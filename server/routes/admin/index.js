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

  app.use('/admin/api', router)
}
