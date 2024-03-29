import React, { Component } from 'react';
import axios from 'axios'

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
  state = {
    posts: [],
    selectedPost: null 
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
	const posts = res.data.slice(0,4);
	const updatedPosts = posts.map(post => {
	  return {
	    ...post,
	    author: 'Matthew'
	  }
	});
	this.setState({posts: updatedPosts});
      });
  }
  postSelectedHandler = (id) => {
    this.setState({selectedPost: id});

  };
    render () {
      const posts = this.state.posts.map( post => {
	  return <Post
	    key={post.id} 
	    author={post.author} 
	    title={post.title} 
	    body={post.body}
	    clicked={() => this.postSelectedHandler(post.id)}
	  />;
	});
      
        return (
            <div>
                <section className="Posts">
		  {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPost} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;
