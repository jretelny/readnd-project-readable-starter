import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PostCommentList from './PostCommentList'
import { fetchPostComments } from '../actions/actions'

function trim (str) {
  return str.length > 16
    ? str.slice(0, 16) + '...'
    : str
}

class PostList extends Component {
  // componentWillUpdate() {
  //   console.log('componentWillUpdate', this.props)
  //   if (this.props.post 
  //     && this.props.post[this.props.categoryPath] 
  //     && this.props.post[this.props.categoryPath].posts      
  //   ) {
  //     this.props.post[this.props.categoryPath].posts.map((postEntry) => {
  //       this.props.fetchPostComments(this.props.categoryPath, postEntry.id) 
  //     })
  //   }
  // }

  render() {
    const { category, post, categoryPath } = this.props
    console.log('CategoryList-render', this.props)
    let postsForCategory = []
    if (post[categoryPath] && post[categoryPath].posts) {
      postsForCategory = post[categoryPath].posts.filter((post) => !post.deleted)

    }
    console.log('PostList-posts', categoryPath, postsForCategory)
    return (
      <div className='post-list-info'>
        <ul>
        <li key='post.header' className='post-grid'>
           <ul>
            <li className='post-entry-column'>Title</li>
            <li className='post-entry-column'>Author</li>
            <li className='post-entry-column'># Cmts</li>            
            <li className='post-entry-column'>Score</li>
            <li className='post-entry-column'>Vote</li>
          </ul>
        </li>          
        {
          postsForCategory.map((item) => (
          <li key={item.id} className='post-grid' >
            <ul>
            <li className='post-entry-column'><Link to={`/category/${categoryPath}/post/${item.id}`}>{trim(item.title)}</Link></li>
            <li className='post-entry-column'>{item.author}</li>
            <li className='post-entry-column'>{item.comments?item.comments.length:0}</li>
            <li className='post-entry-column'>{item.voteScore}</li>     
            <li className='post-entry-column'>
              <button>Up</button>
              <button>Down</button>
            </li>  
            </ul>  
          </li>
          ))
        }
        </ul>
      </div>
    ) 
  }
}

function mapStateToProps({ category, post } ) {
  return {
    category,
    post,
  }
}


function mapDispatchToProps(dispatch) {
  return {
    fetchPostComments: (category, postId) => dispatch(fetchPostComments(category, postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)