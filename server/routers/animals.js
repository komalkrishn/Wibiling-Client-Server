const express = require('express')
const axios = require('axios')
const asyncHandler = require('../middlewares/asyncHandler')
const verifParams = require('../utils/verifParams')

const router = new express.Router()

router.get(
  '/animals',
  asyncHandler(async (req, res) => {
    verifParams(req)
    const { protocol } = req
    const { count, url } = req.query
    const { data: shibes } = await axios.get('http://shibe.online/api/shibes', {
      params: {
        httpsUrls: protocol === 'https',
        count: count || 1,
        urls: url || true,
      },
    })
    const { data: cats } = await axios.get('http://shibe.online/api/cats', {
      params: {
        httpsUrls: protocol === 'https',
        count: count || 1,
        urls: url || true,
      },
    })
    const { data: birds } = await axios.get('http://shibe.online/api/birds', {
      params: {
        httpsUrls: protocol === 'https',
        count: count || 1,
        urls: url || true,
      },
    })
    res.json({
      type: 'success',
      code: 200,
      total: shibes.length + cats.length + birds.length,
      data: {
        shibes: shibes.map(shibe =>
          url === 'true' ? { url: shibe } : { id: shibe },
        ),
        cats: cats.map(cat => (url === 'true' ? { url: cat } : { id: cat })),
        birds: birds.map(bird =>
          url === 'true' ? { url: bird } : { id: bird },
        ),
      },
    })
  }),
)

module.exports = router
