import React, { Component } from 'react';
import { Button, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import { connect } from 'react-redux';
import { deletePost, editPost } from '../../../Redux/reducers/posts';

class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      userId: this.props.userId,
      id: this.props.id,
      body: this.props.body,
      title: this.props.title
    };
  }
  openEdit() {
    this.setState({ opened: true });
  }
  closeEdit() {
    this.setState({ opened: false });
  }
  saveEditedPost() {
    ToastAndroid.show(`Saving edited post with ID: ${this.state.id}`, ToastAndroid.SHORT);
    this.props.editPost({ userId: this.state.userId, id: this.state.id, title: this.state.title, body: this.state.body });
    this.closeEdit();
  }
  deletePostFunc() {
    ToastAndroid.show(`Deleting post with ID: ${this.state.id}`, ToastAndroid.SHORT);
    this.props.deletePost(this.state.id);
  }
  editingPostFunc() {
    ToastAndroid.show(`Opening edit for post with ID: ${this.state.id}`, ToastAndroid.SHORT);
    this.openEdit();
  }
  render() {
    return (
      <View style={styles.post}>
        {this.state.opened && this.state.title &&
          <TextInput
            onChangeText={(text) => this.setState({ title: text || this.state.title })}
            style={styles.textinput}
            value={this.state.title}
          />}
        {this.state.opened && this.state.body &&
          <TextInput
            onChangeText={(text) => this.setState({ body: text || this.state.body })}
            style={styles.textinput}
            value={this.state.body}
          />}
        {!this.state.opened && <Text>ID</Text>}
        {!this.state.opened && <Text style={styles.marginBottom20}>{`${this.state.id}`}</Text>}
        {!this.state.opened && <Text>TITLE</Text>}
        {!this.state.opened && <Text style={styles.marginBottom20}>{`${this.state.title}`}</Text>}
        {!this.state.opened && <Text>BODY</Text>}
        {!this.state.opened && <Text>{`${this.state.body}`}</Text>}
        {!this.state.opened && <Button
          onPress={this.editingPostFunc.bind(this)}
          title="Edit"
        />}
        {this.state.opened && <Button
          onPress={this.saveEditedPost.bind(this)}
          title="Save content edited"
        />}
        <Button
          onPress={this.deletePostFunc.bind(this)}
          title="Delete"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  post: {
    marginBottom: 30
  },
  marginBottom20: {
    marginBottom: 20
  }
});

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (postId) => {
      dispatch(deletePost(postId));
    },
    editPost: (post) => {
      dispatch(editPost(post));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PostItem);