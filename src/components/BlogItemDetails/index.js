import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

class BlogItemDetails extends Component {
  state = {blogData: {}, isLoading: true}

  componentDidMount() {
    this.getBlogData()
  }

  getBlogData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)
    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const data = await response.json()
    // console.log(data)
    const updatedData = {
      id: data.id,
      title: data.title,
      author: data.author,
      imageUrl: data.image_url,
      avatarUrl: data.avatar_url,
      topic: data.topic,
      content: data.content,
    }
    this.setState({blogData: updatedData, isLoading: false})
  }

  renderBlogItemDetails = () => {
    const {blogData, isLoading} = this.state
    const {title, imageUrl, content, avatarUrl, author} = blogData
    return (
      <>
        {isLoading ? (
          <Loader height={50} width={50} type="TailSpin" />
        ) : (
          <div className="blog-info">
            <h2 className="blog-details-title">{title}</h2>

            <div className="author-details">
              <img className="author-pic" src={avatarUrl} alt={author} />
              <p className="details-author-name">{author}</p>
            </div>

            <img className="blog-image" src={imageUrl} alt={title} />
            <p className="blog-content">{content}</p>
          </div>
        )}
      </>
    )
  }

  render() {
    return <div className="blog-container">{this.renderBlogItemDetails()}</div>
  }
}

export default BlogItemDetails
