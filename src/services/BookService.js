import http from "../http-common"

const baseUrl = `/book`

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

const deleteBook = id => {
    console.log("service", id)
    return http.delete(`${baseUrl}/${id}`)
}

export default {
    getAll,
    create,
    getById,
    update,
    deleteBook
};
