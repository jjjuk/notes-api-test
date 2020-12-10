const request = require('supertest-session')
const { server } = require('../src')

//Эти тесты ужасные я обещаю научиться писать их круто.

let link
let cookies
let noteId = 1

describe('test endpoints', () => {
  it('should create a new user', async () => {
    const res = await request(server).post('/signup').send({
      email: 'test@email.com',
      password: 'supersecret',
    })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('message')
  })
  it('should login created user', async () => {
    const res = await request(server).post('/login').send({
      email: 'test@email.com',
      password: 'supersecret',
    })
    cookies = res.headers['set-cookie']
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('message')
  })

  it('should create a note', async () => {
    const res = await request(server)
      .post('/note')
      .set('Cookie', cookies)
      .send({
        content: 'Hello World!',
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('note')

    noteId = res.body.note.id
  })

  it('should update a note', async () => {
    const res = await request(server)
      .post('/note')
      .set('Cookie', cookies)
      .send({
        id: noteId,
        content: 'Hello everybody in this world!',
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('note')

    noteId = res.body.note.id
  })

  it('should show me my notes', async () => {
    const res = await request(server).get('/user/notes').set('Cookie', cookies)
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('notes')
    expect(res.body).toHaveProperty('dataLength')
    expect(res.body.notes).toHaveProperty('0')
  })

  it('should create note share link', async () => {
    const res = await request(server)
      .post(`/note/${noteId}/share`)
      .set('Cookie', cookies)
    link = res.body.link.split('/').pop()
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('link')
  })

  it('should logout', async () => {
    const res = await request(server).post('/logout').set('Cookie', cookies)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('message')
  })

  it('should not be allowed to me', async () => {
    const res = await request(server).get('/user/notes').set('Cookie', cookies)
    expect(res.statusCode).toEqual(401)
  })

  it('should show me content of shared note', async () => {
    const res = await request(server).get(`/shared/note/${link}`)
    expect(res.statusCode).toEqual(200)
  })

  it('should login again', async () => {
    const res = await request(server).post('/login').send({
      email: 'test@email.com',
      password: 'supersecret',
    })
    cookies = res.headers['set-cookie']
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('message')
  })

  it('delete a note', async () => {
    const res = await request(server)
      .delete(`/note/${noteId}`)
      .set('Cookie', cookies)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('note')
  })
})
