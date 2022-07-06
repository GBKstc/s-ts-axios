import axios from '../../src/index'

axios({
    method: 'post',
    url: '/api/handleRequestBody/post',
    data: {
        a: 1,
        b: 2
    }
})