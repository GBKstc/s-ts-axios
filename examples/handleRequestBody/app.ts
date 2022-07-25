import axios from '../../src/dispatchRequest'

axios({
    method: 'post',
    url: '/api/handleRequestBody/post',
    data: {
        a: 1,
        b: 2
    }
})