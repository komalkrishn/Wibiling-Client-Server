/* eslint-disable no-undef */
import express from 'express'
import request from 'supertest'
import shibesRouter from './shibes'

describe('Test shibes router', () => {
  const app = express()
  app.use(shibesRouter)
  it('should get 3 shibes', async () => {
    const response = await request(app)
      .get('/shibes')
      .query({ protocol: 'http', count: 3 })
      .expect(200)
    expect(response.body.data.shibes.length).toBe(3)
  })
  it('should get protocol error', async () => {
    const response = await request(app)
      .get('/shibes')
      .expect(400)
    expect(response.body.errors[0].param).toBe('protocol')
  })
  it('should get count error', async () => {
    const response = await request(app)
      .get('/shibes')
      .query({ protocol: 'http', count: 33 })
      .expect(400)
    expect(response.body.errors[0].param).toBe('count')
  })
  it('should get url error', async () => {
    const response = await request(app)
      .get('/shibes')
      .query({ protocol: 'http', count: 3, url: 'lala' })
      .expect(400)
    expect(response.body.errors.length).toBe(1)
    expect(response.body.errors[0].param).toBe('url')
  })
  it('should get protocol and url error', async () => {
    const response = await request(app)
      .get('/shibes')
      .query({ protocol: null, count: 3, url: 'lala' })
      .expect(400)
    expect(response.body.errors.length).toBe(2)
    expect(response.body.errors[0].param).toBe('protocol')
    expect(response.body.errors[1].param).toBe('url')
  })
  it('should get protocol and count error', async () => {
    const response = await request(app)
      .get('/shibes')
      .query({ protocol: null, count: 36, url: false })
      .expect(400)
    expect(response.body.errors.length).toBe(2)
    expect(response.body.errors[0].param).toBe('protocol')
    expect(response.body.errors[1].param).toBe('count')
  })
  it('should get protocol, count and url error', async () => {
    const response = await request(app)
      .get('/shibes')
      .query({ protocol: null, count: 37, url: 'lala' })
      .expect(400)
    expect(response.body.errors.length).toBe(3)
    expect(response.body.errors[0].param).toBe('protocol')
    expect(response.body.errors[1].param).toBe('count')
    expect(response.body.errors[2].param).toBe('url')
  })
})
