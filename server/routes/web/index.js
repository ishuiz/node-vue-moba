module.exports = app => {
  const express = require('express')
  const mongoose = require('mongoose')
  const router = express.Router()

  const Article = mongoose.model('Article')
  const Category = mongoose.model('Category')
  const Hero = mongoose.model('Hero')
  const heroes = require('./heroes')

  // 录入新闻数据
  router.get('/news/init', async (req, res) => {
    const parent = await Category.findOne({
      name: '新闻分类'
    })
    const cats = await Category.find()
      .where({
        parent
      })
      .lean()
    const newsTitles = [
      '“舌尖上的”王者荣耀，三只松鼠这款礼包不简单',
      '快手状元王者专场，分百万现金！',
      '五岳鼠年限定爆料④丨巨斧伏群魔，典韦-岱宗登场！',
      '一张图了解航天大事件',
      '苏州稻香村联手王者荣耀 推出“荣耀稻香”订制新年礼盒',
      '【已修复】游戏内加载界面卡住无法进入对局异常说明',
      '赛季奖励领取调整说明及未领取奖励补发公告',
      '【已开服】1月9日正式服“强者之路”版本更新公告',
      '部分机型王者时刻创意编辑功能关闭调优说明',
      '1月14日体验服停机更新公告',
      '王者新春年货节，组队消费活动赢好礼！',
      '【觉醒英雄，赢精彩豪礼】活动开启公告',
      '娜可露露首套史诗皮肤-晚萤即将上架 更多礼遇等你解锁！',
      '探秘玄雍活动 参与拿专属好礼',
      '强者之路开启 S18全新赛季来临 超多福利等你来拿',
      '2020年KPL春季转会期俱乐部挂牌名单公布',
      '历时72小时打造东北版《王者荣耀》，雪雕王者经典形象',
      '王者少年的英雄梦！高校打造文字矩阵空间通道装置',
      '强强联合！LGD携手大鹅文化，斥资8000万进军KPL',
      '一笔绘峡谷，一梦登王者！ 山东工艺美术学院“王者360度全景画”来了！'
    ]
    const newsList = newsTitles.map(title => {
      const randomCats = cats.slice().sort(() => Math.random() - 0.5)
      return {
        categories: randomCats.slice(0, 2),
        title
      }
    })

    await Article.deleteMany()
    await Article.insertMany(newsList)
    res.send(newsList)
  })

  router.get('/news/list', async (req, res) => {
    // const parent = await Category.findOne({
    //   name: '新闻分类'
    // }).populate({
    //   path: 'children',
    //   populate: {
    //     path: 'newsList'
    //   }
    // }).lean()
    // res.send(parent)

    const parent = await Category.findOne({
      name: '新闻分类'
    })
    const cats = await Category.aggregate([
      // 过滤
      { $match: { parent: parent._id } },
      // 关联查询
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList'
        }
      },
      // 修改数据
      {
        $addFields: {
          newsList: { $slice: ['$newsList', 5] }
        }
      }
    ])
    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      newsList: await Article.find()
        .where({
          categories: { $in: subCats }
        })
        .populate('categories')
        .limit(5)
        .lean()
    })
    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName =
          cat.name === '热门' ? news.categories[0].name : cat.name
        return news
      })
      return cat
    })
    res.send(cats)
  })

  // 录入英雄数据
  router.get('/heroes/init', async (req, res) => {
    await Hero.deleteMany({})
    const rawData = heroes
    for (let cat of rawData) {
      if (cat.name === '热门') {
        continue
      }
      // 找到当前分类在数据库中对应的数据
      const category = await Category.findOne({
        name: cat.name
      })
      cat.heroes = cat.heroes.map(hero => {
        hero.categories = [category]
        return hero
      })
      Hero.insertMany(cat.heroes)
    }
    res.send(await Hero.find())
  })

  app.use('/web/api', router)
}
