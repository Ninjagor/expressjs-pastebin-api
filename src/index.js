import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'
import cors from "cors"

const prisma = new PrismaClient()
const app = express()

app.use(cors())
app.use(express.json())



app.get('/', (req, res) => {
  res.json({ "data": "success" })
})

app.post('/create', async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = await prisma.post.create({
      data: {
        title: title,
        content: content
      }
    })
    console.log(post);
    res.status(200).json({ "data": "success", "postid": post.id })
  } catch {
    res.status(500).json({ "data": "internal server error" });
  }
})

app.get('/getall', async (req, res) => {
  try {
    const posts = await prisma.post.findMany();

    res.status(200).json({ "data": posts });
  } catch {
    res.status(500).json({ "data": "internal server error" });
  }
})

app.get('/find/:id', async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: req.params.id
      }
    });

    if (post) {
      return res.status(200).json({ "data": post });
    } else {
      return res.status(404).json({ "data": "no user found with that id" });
    }
  } catch {
    res.status(500).json({ "data": "internal server error" });
  }
})

app.listen(3000, () => {
  console.log("App running on port 3000")
})