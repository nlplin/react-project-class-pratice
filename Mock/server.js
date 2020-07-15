// import express from 'express'
const express = require('express')
const app = express()
const Mock = require('mockjs')
const Random = Mock.Random

Random.ctitle()

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Headers', 'content-type,token')
  res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  next()
})
app.get('/admin/edu/subject/:page/:limit', (req, res) => {
  let { page, limit } = req.params

  const data = Mock.mock({
    "total": Random.integer(+limit + 2, limit * 2),
    [`items|${limit}`]: [{
      'id|+1': 1,
      title: '@ctitle(2,5)',
      parentId: 0
    }]
  })
  res.json({
    "code": 20000,
    "success": true,
    data,
    "message": ''
  })
})

app.listen(3002, (err) => {
  if (err) {
    return alert('wrong page')
  }
  console.log('listen : 3002...')
})
  // "proxy": "http://47.103.203.152"