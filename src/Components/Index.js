import React from 'react';
import axios from 'axios';
import {
  Card, Button, CardHeader, CardFooter, CardBody, Form, FormGroup, Label, Input, Col,
  CardTitle, CardText, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import './index.css';

class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createPostModal: false,
      posts: [],
      modal: false,
      item: {},
      body: '',
      title: '',
    }

  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(
        (result) => {
          this.setState({
            posts: result.data
          })
        }
      )
  }

  toggle(item) {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
    this.setState({
      item: item
    })
  }

  createPostToggle() {
    this.setState(prevState => ({
      createPostModal: !prevState.createPostModal,
    }));
  }

  onChangeTitle = (e) => {
    var value = e.target.value;
    this.setState({
      title: value
    })
  }

  onChangeBody = (e) => {
    var value = e.target.value;
    this.setState({
      body: value
    })
  }
  //create post
  createPost = () => {
    if (this.state.title !== '' && this.state.body !== '') {
      var data = {
        'userId': Math.floor(Math.random() * 11),
        'title': this.state.title,
        'body': this.state.body
      }
    }
    else {
      alert('Please write something!');
    }
    axios.post(`https://jsonplaceholder.typicode.com/posts/`, { data })
      .then(res => {
        console.log(res.data);
      })
  }

  render() {
    const { posts, item } = this.state;
    return (
      <div className='posts__container'>
        <Button color="primary" onClick={this.createPostToggle.bind(this)}>Create Post</Button>
        {/* create post modal */}
        <div>
          <Modal isOpen={this.state.createPostModal} toggle={this.createPostToggle.bind(this)}>
            <ModalHeader toggle={this.createPostToggle.bind(this)} >Post</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup row>
                  <Label sm={2}>Title</Label>
                  <Col sm={10}>
                    <Input onChange={this.onChangeTitle} type='text' placeholder="Enter a title" />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label>Post Body</Label>
                  <Input onChange={this.onChangeBody} type="textarea" />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.createPost}>Create Post</Button>
            </ModalFooter>
          </Modal>
        </div>

        {/* all posts */}
        {
          posts.map((item, index) => {
            return (
              <Card key={'key' + index}>
                <CardHeader>{item.title}</CardHeader>
                <CardBody>
                  <CardTitle>{item.id}</CardTitle>
                  <CardText>{item.body}</CardText>
                  <Button onClick={this.toggle.bind(this, item)}>Show Details</Button>
                </CardBody>
                <CardFooter>Footer</CardFooter>
              </Card>
            )
          })
        }

        {/* Single Post */}
        <div>
          <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
            <ModalHeader toggle={this.toggle.bind(this)} >{item.title}</ModalHeader>
            <ModalBody>{item.body}</ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Posts;