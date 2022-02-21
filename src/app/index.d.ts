declare global {

    interface backend_auth_response {
        jwt_token: string,
        error: boolean
    }

}

export { }
