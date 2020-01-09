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

  const multer = require('multer')
  const upload = multer({dest: __dirname + '/../../uploads'})
  app.post('/admin/api/upload', upload.single('file'), (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    const AdminUser = require('../../models/AdminUser')
    const user =await AdminUser.findOne({
      username
    }).select('+password')
    if (!user) {
      return res.status(422).send({
        message: '用户不存在'
      })
    }
    const isValid = require('bcrypt').compareSync(password, user.password)
    if (!isValid) {
      return res.status(422).send({
        message: '密码错误'
      })
    }
    // 返回 token
    const jwt = require('jsonwebtoken')
    const token =jwt.sign({
      id: user._id
    }, app.get('secret'))

    res.send({token})
  })
}
