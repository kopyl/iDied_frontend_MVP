declare global {

    interface backend_note {
        title: string,
        body: string,
        created_at: number,
        is_shared: boolean,
        is_accessible: boolean,
        is_removed_by_recepient: boolean
    }

    interface backend_auth_response {
        jwt_token: string,
        error: boolean
    }

    interface backend_notes_response {
        notes: Array<backend_note>,
        error: boolean
    }

}

declare module "*.svg" {
    const content: string;
    export default content;
  }


export { }



