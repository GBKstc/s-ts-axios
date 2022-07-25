import axios from '../../src/dispatchRequest'

axios({
    method: 'get',
    url: '/api/base/get',
    params: {
        a: 1,
        b: 2
    }
})
