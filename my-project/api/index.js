import axios from 'axios';

export default {
    getPosts
};

function getPosts() {
    return new Promise((resolve, reject) => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((response) => {
                console.log(response);
                if (response && response.status == 200) {
                    resolve(result.data);
                } else {
                    resolve([]);
                }
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}