declare global {
    interface frontendNote {
        id: string
        title: string
        body: string
        createdAt?: number
        editedAt: number
        isShared?: boolean
        isAccessible?: boolean
        isRemovedByRecepient?: boolean
        changesSynced?: boolean
        sharingToken?: string
    }

    interface backend_note {
        id: string
        title: string
        body: string
        created_at: number
        edited_at: number
        is_shared: boolean
        is_accessible: boolean
        is_removed_by_recepient: boolean
        sharing_token: string
    }

    interface backend_auth_response {
        jwt_token: string
        error: boolean
    }

    interface backend_init_notes_response {
        notes: Array<backend_note>
        error: boolean
        pro: boolean
        avatar_url: string
        user_id: string
        name: string
        email: string
    }

    interface backend_notes_response {
        notes: Array<backend_note>
        error: boolean
    }

    interface SocialUser {
        provider: string
        id: string
        email: string
        name: string
        photoUrl: string
        firstName: string
        lastName: string
        authToken: string
        idToken: string
        authorizationCode: string
        response: any
    }

    interface authSendArgs {
        oauthData: SocialUser
    }

    interface saveNoteArgs {
        noteID: string
    }

    interface requestURL {
        url: string
        retriedAllowed: boolean
        errorNotification: boolean
        skipHttpErrors?: boolean
    }

    interface TooltipPosition {
        top: string
        right: string
    }
}

declare module '*.svg' {
    const content: string
    export default content
}

export {}
