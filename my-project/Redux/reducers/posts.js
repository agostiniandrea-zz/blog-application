import _ from 'lodash';
import Api from '../../api';

/* const initState = [
    {
        userId: 1,
        id: 1,
        title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
    },
    {
        userId: 1,
        id: 2,
        title: 'qui est esse',
        body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
    },
    {
        userId: 1,
        id: 3,
        title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
        body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut'
    }
]; */

export const ADD = 'my-project/POSTS/ADD';
export const EDIT = 'my-project/POSTS/EDIT';
export const GET = 'my-project/POSTS/GET';
export const SET = 'my-project/POSTS/SET';
export const DELETE = 'my-project/POSTS/DELETE';

export default function reducer(state = -1, action) {
    switch (action.type) {
        case ADD: {
            return addPostFunc(state, action.payload);
        }
        case EDIT: {
            return editPostFunc(state, action.payload);
        }
        case DELETE: {
            return deletePostFunc(state, action.payload);
        }
        case SET: {
            let newState = _.cloneDeep(state);
            if (newState === -1) {
                newState = action.payload;
            } else {
                let newPosts = [];
                for (let i = 0; i < action.payload.length; i++) {
                    newPosts.push({
                        ...action.payload[i],
                        id: i + (newState.length ? newState[newState.length - 1]['id'] : 0) + 1
                    });
                }
                newState = newState.concat(newPosts);
            }
            return newState;
        }
        default:
            return state;
    }
}

export const addPost = (payload) => {
    return { type: ADD, payload };
};

export const editPost = (payload) => {
    return { type: EDIT, payload };
};

export const deletePost = (payload) => {
    return { type: DELETE, payload };
};

export const setPosts = (payload) => {
    return { type: SET, payload };
};

function addPostFunc(state, payload) {
    let newState = _.cloneDeep(state);
    newState.push(payload);
    return newState;
}

function editPostFunc(state, payload) {
    let newState = _.cloneDeep(state);
    newState[_.findIndex(newState, ['id', payload.id])]['title'] = payload.title;
    newState[_.findIndex(newState, ['id', payload.id])]['body'] = payload.body;
    return newState;
}

function deletePostFunc(state, payload) {
    let newState = _.cloneDeep(state);
    newState.splice(_.findIndex(newState, ['id', payload]), 1);
    return newState;
}

export const getPosts = (/* state */) => {
    return (dispatch/* , getState */) => {
        return new Promise((resolve, reject) => {
            Api.getPosts()
                .then((resp) => {
                    dispatch(setPosts(resp));
                    resolve();
                    setTimeout(() => {
                        dispatch(getPosts());
                    }, 5000);
                })
                .catch((e) => {
                    reject(e);
                });
        })
    };
}

/* function setPostsFunc(state, payload) {
    let newState = _.cloneDeep(state);
    if (newState === -1) {
        newState = [];
    }
    newState.concat(payload);
    return newState;
} */