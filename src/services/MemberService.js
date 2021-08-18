import http from '../http-common'

const baseUrl = `/member`

const SignIn = credential => {
    console.log(credential)
    return http.post(`${baseUrl}/signin`, credential)
}

const getAll = () => {
    return http.get(`${baseUrl}`)
}

const create = params => {
    console.log(params)
    return http.post(`${baseUrl}`, params)
}

const getById = id => {
    return http.get(`${baseUrl}/${id}`)
}

const update = (id, params) => {
    return http.put(`${baseUrl}/${id}`, params)
}

const _delete = (id, status) => {
    return http.delete(`${baseUrl}/${id}/${status}`)
}

export default {
    SignIn,
    getAll,
    create,
    getById,
    update,
    _delete
}
