import React, { Component } from "react";
import "../css/Create.css";
import { Redirect } from "react-router-dom";
// import { Redirect } from 'react-router'

import Store from "../Store";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      category: "Career",
      title: "",
      content: "",
      redirect: false,
      likes: 0,
      views: 0,
      comments: []
    };

    this.store = new Store();
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    this.fetchData();
  }

  handleSubmit = event => {
    event.preventDefault();
    this.store.addPost(this.state).then(() => {
      alert("Post Created");
      this.setState({
        redirect: true
      });
    });

    // this.props.history.push({
    //     pathname: '/',
    // });
  };
  fetchData() {
    this.store.getCategories().then(res => {
      this.setState({ categories: res });
    });
  }
  render() {
    const { categories, category, title, content, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <form className="formWrapper" onSubmit={this.handleSubmit}>
          <h1>Create a post</h1>
          <div>
            <select
              className="formSelect"
              name="category"
              value={category}
              onChange={this.changeHandler}
            >
              {this.state.categories.map(c => {
                return (
                  <option key={c.text} value={c.text}>
                    {c.text}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <input
              className="formInput"
              type="text"
              name="title"
              value={title}
              placeholder="Title"
              onChange={this.changeHandler}
            />
          </div>
          <div>
            <textarea
              className="formInput"
              name="content"
              value={content}
              placeholder="Description"
              onChange={this.changeHandler}
            />
          </div>
          <input className="formSubmit" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Create;
