import React, { Component } from "react";
import SimplePost from "../components/SimplePost";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import "../css/Home.css";
import Store from "../Store";
import fire from "../fire";
const createHistory = require("history").createBrowserHistory;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFilter: "",
      posts: [],
      messages: [],
      categories: [],
      user: "",
      loggedIn: true
    };

    this.store = new Store();
  }

  componentDidMount() {
    this.fetchData();
    console.log("after fetch");
    console.log(this.state.posts);
  }

  authCheck = () => {
    var user = fire.auth().currentUser;
    console.log(user);
    if (!user) {
      console.log("returning false");
      return false;
    } else {
      console.log("returning true");
      return true;
    }
    // fire.auth().currentUser(function (user) {
    //     if (!user) {
    //         console.log("returning false");
    //         return false;
    //     }else{
    //         console.log("returning true");
    //         return true;
    //     }
    // });
  };

  logOut = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        this.setState({
          loggedIn: false
        });
      });
  };

  fetchData = () => {
    this.store.getPosts().then(res => {
      this.setState({ posts: res });
    });
    this.store.getCategories().then(res => {
      this.setState({ categories: res });
    });
  };

  handleSearch() {}

  handleFilter() {}

  fetchSpecificCategory = e => {
    const category = e.target.text;

    if (category === "All") {
      this.store.getPosts().then(res => {
        this.setState({ posts: res });
      });
    } else {
      this.store.getSpecificCategory(category).then(res => {
        this.setState({ posts: res });
      });
    }
  };
  handleView = () => {
    var updatedPost = this.props.post;
    var update = this.state.post.views + 1;
    this.setState({ views: update });
    updatedPost.views = update;
    this.store.updatePost(updatedPost);
  };
  render() {
    if (!this.state.loggedIn) {
      return <Redirect to="/login_signup" />;
    }

    return (
      <div className="row">
        <div className="navbar">
          <Link to="/create">
            <button className="createBtn">Create</button>
          </Link>
          <ul className="categoryList">
            {this.state.categories.map(c => (
              <li key={c.id}>
                <a
                  value={c.text}
                  name={c.text}
                  onClick={this.fetchSpecificCategory}
                  href="#"
                >
                  {c.text}
                </a>
              </li>
            ))}
            <Link to="/comment">Comment</Link>
            <li>
              <Link to="/login_signup">Login</Link>
            </li>
            <li>
              <a href="#" onClick={this.logOut}>
                Log Out
              </a>
            </li>
          </ul>
        </div>

        <div className="content">
          <section className="section">
            <ul className="postList">
              {this.state.posts.map(item => (
                <li key={item.id}>
                  <SimplePost
                    category={item.category}
                    content={item.content}
                    comments={item.comments}
                    id={item.documentID}
                    likes={item.likes}
                    name={item.name}
                    numComments={item.numComments}
                    post={item}
                    timestamp={item.timestamp}
                    title={item.title}
                    views={item.views}
                  ></SimplePost>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    );
  }
}


  
