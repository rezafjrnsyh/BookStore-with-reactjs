import http from '../http-common'

const baseUrl = `/member`

const SignIn = credential => {
    console.log(credential)
    return http.post(`${baseUrl}/signin`, credential)
}

export default {
    SignIn
}
