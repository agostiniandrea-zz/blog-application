import React, { Component } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import { connect } from 'react-redux';
import { addPost, deletePost, editPost } from '../../../Redux/reducers/posts';
import PostItem from '../PostItem/index';

class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      userId: 1,
      id: this.props.posts.length + 1,
      body: '',
      title: ''
    };
  }
  showNewPost() {
    this.setState({ opened: true });
  }
  hideNewPost() {
    this.setState({ opened: false });
  }
  addPostFunc() {
    this.props.addPost({
      userId: 1,
      id: this.props.posts.length + 1,
      title: this.state.title,
      body: this.state.body
    });
    this.hideNewPost();
  }
  createPostFunc() {
    ToastAndroid.show(`Opening form for creating new post`, ToastAndroid.SHORT);
    this.showNewPost();
  }
  addNewPostFunc() {
    ToastAndroid.show(`Creating new post`, ToastAndroid.SHORT);
    this.addPostFunc();
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Blog Application</Text>
        <Button
          disabled={this.state.opened}
          onPress={this.createPostFunc.bind(this)}
          title="Create new post"
        />
        {this.state.opened && <View>
          <TextInput
            onChangeText={(text) => this.setState({ title: text })}
            style={styles.textinput}
            value={this.state.title}
            placeholder="Insert title"
          />
          <TextInput
            onChangeText={(text) => this.setState({ body: text })}
            style={styles.textinput}
            value={this.state.body}
            placeholder="Insert body"
          />
          <Button
            onPress={this.hideNewPost.bind(this)}
            title="Close form"
          />
          <Button
            onPress={this.addNewPostFunc.bind(this)}
            title="Load new post"
          />
        </View>}
        <Text style={styles.listTitle}>List</Text>
        {this.props.posts === -1 && <Text>Loading...</Text>}
        {this.props.posts.length === 0 && <Text>Empty</Text>}
        {this.props.posts && this.props.posts.length > 0 && this.props.posts.map((post) => <PostItem key={post.id} {...post} />)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  listTitle: {
    color: '#f00',
    marginBottom: 20,
    marginTop: 20
  },
  deleteBtn: {
    marginBottom: 20,
    marginTop: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  },
  post: {
    marginBottom: 30
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textinput: {
    marginBottom: 10,
    marginTop: 10
  }
});

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (post) => {
      dispatch(addPost(post));
    },
    deletePost: (postId) => {
      dispatch(deletePost(postId));
    },
    editPost: (post) => {
      dispatch(editPost(post));
    }/* ,
    getPosts: () => {
      dispatch(getPosts());
    } */
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView);