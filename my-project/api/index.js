import axios from 'axios';

export default {
    getPosts
};

function getPosts() {
    return new Promise((resolve, reject) => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((response) => {
                if (response && response.status == 200) {
                    resolve(response.data.slice(0, 10));
                } else {
                    resolve([]);
                }
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}