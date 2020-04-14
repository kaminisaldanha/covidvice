import React, { Component } from 'react';
import Icon from './Icon';
import Store from '../Store';


export default class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: 0,
        }
        this.store = new Store();
    }
    componentDidMount() { 
        this.setState({
            likes: this.props.likes
        });
    }

    handleLike = () => {
        console.log(this.props);
        var updatedComment = this.props.comment;
        var update = this.props.likes+1;
        this.setState({ likes: update });
        updatedComment.likes = update;
        this.store.updateComment(this.props.postID,updatedComment);
    }
    render() {
        return (
            <div className="comment">
                <div className="commentHeader">
                    <span className="username">{this.props.user}</span>
                    <Icon className="timestamp" name="access_time" data={this.props.timestamp} />
                </div>
                <p className="commentContent description">{this.props.content}</p>
                <div className="commentContent commentStats">
                    <a href="#like" onClick={this.handleLike}><Icon className="statIcon" name="thumb_up" data={this.props.likes} /></a>
                </div>
            </div >
        )
    }
}

