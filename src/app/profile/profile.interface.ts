export interface Profile {
    address: string
    username: string
    metadata: ProfileMetadata
}

export interface ProfileMetadata {
    twitterHandle: string
    avatar: string
    banner: string
    about: string
}