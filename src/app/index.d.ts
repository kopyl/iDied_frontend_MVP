declare global {

    interface backend_auth_response {
        jwt_token: string,
        error: boolean
    }

}

declare module "*.svg" {
    const content: string;
    export default content;
  }


export { }



