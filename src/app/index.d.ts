declare global {

    interface frontendNote {
        title: string,
        description: string,
        createdAt: number,
        editedAt: number,
        isShared: boolean,
        isAccessible: boolean,
        isRemovedByRecepient: boolean
    }

    interface backend_note {
        title: string,
        description: string,
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

    interface SocialUser {
        provider: string;
        id: string;
        email: string;
        name: string;
        photoUrl: string;
        firstName: string;
        lastName: string;
        authToken: string;
        idToken: string;
        authorizationCode: string;
        response: any;
    }


}

declare module "*.svg" {
    const content: string;
    export default content;
  }


export { }



