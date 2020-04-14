import React, { Component } from 'react';
import Icon from './Icon';
import Store from '../Store';
import Comment from './Comment';
import { categoryToColor } from "../Colors";
import { getTimestamp } from "../Timestamp";

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null,
            id: "",
            category: "",
            name: "",
            likes: 0,
            views: 0,
            title: "",
            content: "",
            comments: [],
            commentText: "",
            commentID: ""
        }
        this.store = new Store();
    }
    componentDidMount() {
        const { post, comments } = this.props.location.state;

        this.setState({
            post: post,
            id: post.documentID,
            category: post.category,
            name: post.name,
            likes: post.likes,
            views: post.views,
            timestamp: post.timestamp,
            numComments: comments.length,
            title: post.title,
            content: post.content,
            comments: comments,
            commentLikes: 0
        });
    }
    fetchData = (id) => {
        this.store.getComments(id).then(res => {
            this.setState({ comments: res });
            console.log("comments");
            console.log(this.state.comments);
        })
    }
    handleLike = () => {
        var updatedPost = this.state.post;
        var update = this.state.post.likes + 1;
        this.setState({ likes: update });
        updatedPost.likes = update;
        this.store.updatePost(updatedPost);
    }

    handleComment = () => {
        var updatedPost = this.state.post;
        var update = this.state.post.numComments + 1;
        this.setState({ numComments: update });
        updatedPost.numComments = update;
        this.store.updateComment(updatedPost);
    }
    changeHandler = (e) => {
        this.setState({ commentText: e.target.value })
    }
    handleSubmit = (event) => {
        console.log(this.state);
        event.preventDefault();
        this.store.addComment(this.state);
        this.fetchData(this.state.id);
    }
    render() {
        const { commentText } = this.state
        return (
            <div className="postContainer">
                <div className="postContainerSub">
                    <div className="categoryBox">
                        <div
                            className="categoryTitle"
                            style={{ backgroundColor: categoryToColor[this.state.category] }}
                        >
                            {this.state.category}
                        </div>
                    </div>
                    <div className="creatorInfo">
                        <span className="creatorName">{this.state.name}</span>
                        <Icon className="timestamp" name="access_time" data={getTimestamp(this.state.timestamp)} />
                    </div>
                    <div className="postContent">
                        <h4>{this.state.title}</h4>
                        <p>{this.state.content}</p>
                    </div>
                    <div className="stats">
                        <Icon
                            className="statIcon"
                            name="remove_red_eye"
                            data={this.state.views}
                        />
                        <a href="#like" onClick={this.handleLike}><Icon className="statIcon" name="thumb_up" data={this.state.likes} /></a>

                        <Icon
                            className="statIcon"
                            name="comment"
                            data={this.state.numComments}
                        />
                    </div>
                </div>
                <div className="commentSection">
                    <form className="addComment" onSubmit={this.handleSubmit}>
                        <h3>Add Comment</h3>
                        <textarea className="formInput" name="content" value={commentText} placeholder="Comment" onChange={this.changeHandler} />
                        <input className="formSubmit" type="submit" value="Submit" />
                    </form>
                    <h3>Comments ( {this.state.numComments} )</h3>

                    <ul className="commentList">
                        {this.state.comments.map(item => (
                            <li key={item.id}>
                                <Comment postID={this.state.id} comment={item} likes={item.likes} user={item.user} content={item.text} timestamp={getTimestamp(item.timestamp)} />
                            </li>
                        ))}
                    </ul>
                </div>

            </div >
        )
    }
}
