import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Post from 'App/Models/Post'

export default class PostsController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 5
]
    const posts = await Database.from(Post.table).paginate(page, limit)
    return posts
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(["title", "description"])

    const post = await Post.create(data)
    return post
  }

  public async show({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    return post
  }

  public async update({ request, params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    const data = request.only(["title", "description"])

    post.merge(data)
    
    await post.save()

    return post
  }

  public async destroy({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    post.delete()

    return post
  }
}
