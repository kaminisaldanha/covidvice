import React, { Component } from 'react';
import '../css/Account.css';
import SimplePost from './SimplePost';
import Store from '../Store';

export class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
        this.store = new Store();
    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData = () => {
        this.store.getPosts().then(res => {
            this.setState({ posts: res });
        })
    }
    render() {
        return (
            <div className="accountContainer">
                <div className="profileBar">

                </div>

                <div className="content">
                    <section className="section">
                        <ul className="postList">
                            {this.state.posts.map(item => (
                                <li key={item.id}><SimplePost title={item.title} content={item.content}></SimplePost></li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        )
    }
}
