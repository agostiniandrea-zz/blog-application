import React, { Component } from 'react';
import { Button, Form, StyleSheet, Text, TextInput, View } from 'react-native';
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
        <Text>
          {`${this.state.id}. ${this.state.title}`}
        </Text>
        <Button
          onPress={() => this.openEdit()}
          title="Edit"
        />
        {this.state.opened && <Button
          onPress={() => {
            this.props.editPost({ userId: this.state.userId, id: this.state.id, title: this.state.title, body: this.state.body });
            this.closeEdit();
          }}
          title="Save content edited"
        />}
        <Button
          onPress={() => this.props.deletePost(this.state.id)}
          title="Delete"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  post: {
    marginBottom: 30
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