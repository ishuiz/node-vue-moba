module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../../models/AdminUser')

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
      const list = await req.Model.find().setOptions(queryOptions).limit(100)
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

  // 登录校验中间件
  const authMiddleware = require('../../middleware/auth')

  const resourceMiddleware = require('../../middleware/resource')

  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

  const multer = require('multer')
  const upload = multer({dest: __dirname + '/../../uploads'})
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    const user =await AdminUser.findOne({
      username
    }).select('+password')

    assert(user, 422, '用户不存在')

    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')

    // 返回 token
    const token =jwt.sign({
      id: user._id
    }, app.get('secret'))

    res.send({token})
  })

  // 错误处理中间件
  app.use((err, req, res, next) => {
    res.status(err.statusCode).send({
      message: err.message
    })
  })
}
