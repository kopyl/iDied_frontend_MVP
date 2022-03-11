declare global {

    interface frontendNote {
        title: string,
        body: string,
        createdAt: number,
        editedAt: number,
        isShared: boolean,
        isAccessible: boolean,
        isRemovedByRecepient: boolean
    }

    interface backend_note {
        title: string,
        body: string,
        created_at: number,
        edited_at: number,
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



