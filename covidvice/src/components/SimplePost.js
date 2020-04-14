import React, { Component } from "react";
import Icon from "./Icon";
import { Link } from "react-router-dom";
import { categoryToColor } from "../Colors";
import { getTimestamp } from "../Timestamp";
import Store from "../Store";
import Image from "./Image";

export default class SimplePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      category: "",
      timestamp: 0,
      post: null,
      likes: 0,
      views: 0,
      numComments: 0,
      comments: []
    };
    this.store = new Store();
  }

  componentDidMount() {
    this.setState({
      id: this.props.id,
      title: this.props.title,
      content: this.props.content,
      category: this.props.category,
      timestamp: this.props.timestamp,
      post: this.props.post,
      likes: this.props.likes,
      views: this.props.views
    });
    this.fetchData(this.props.id);
  }
  fetchData = id => {
    this.store.getComments(id).then(res => {
      this.setState({ comments: res });
      this.setState({ numComments: this.state.comments.length });
      console.log("comments");
      console.log(this.state.comments);
    });
  };
  componentWillMount() {}

  handleLike = () => {
    var updatedPost = this.props.post;
    var update = this.state.post.likes + 1;
    this.setState({ likes: update });
    updatedPost.likes = update;
    this.store.updatePost(updatedPost);
  };

  handleLike = () => {
    var updatedPost = this.props.post;
    var update = this.state.post.likes + 1;
    this.setState({ likes: update });
    updatedPost.likes = update;
    this.store.updatePost(updatedPost);
  };
  handleView = () => {
    var updatedPost = this.props.post;
    var update = this.state.post.views + 1;
    this.setState({ views: update });
    updatedPost.views = update;
    this.store.updatePost(updatedPost);
  };
  
  render() {
    return (
      <div className="simplepostContainer">
        <div className="categoryBox">
          <div
            className="categoryTitle"
            style={{ backgroundColor: categoryToColor[this.props.category] }}
          >
            {this.props.category}
          </div>
        </div>
        <div className="creatorInfo">
          <span className="creatorName">{this.props.name}</span>
          <Icon
            className="createdTime"
            name="access_time"
            data={getTimestamp(this.state.timestamp)}
          />
        </div>
        <Link
          to={{
            pathname: `/post/${this.state.id}`,
            state: { post: this.state.post, comments: this.state.comments }
          }}
          onClick={this.handleView}
        >
          <div className="postContent">
            <h4>{this.props.title}</h4>
            <p>{this.props.content}</p>
          </div>
        </Link>
        <div className="stats">
          <Icon
            className="statIcon"
            name="remove_red_eye"
            data={this.state.views}
          />
          <a href="#like" onClick={this.handleLike}>
            <Icon
              className="statIcon"
              name="thumb_up"
              data={this.state.likes}
            />
          </a>

          <Link
            to={{
              pathname: `/post/${this.state.id}`,
              state: { post: this.state.post, comments: this.state.comments }
            }}
            onClick={this.handleView}
          >
            <Icon
              className="statIcon"
              name="comment"
              data={this.state.comments.length}
            />
          </Link>
        </div>
      </div>
    );
  }
}
