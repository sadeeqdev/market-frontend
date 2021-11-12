export interface NFTCollection {
    name: string
    description: string
    metadataURI: string
    metadata: CollectionMetadata
}

export interface CollectionMetadata {
    name: string
    description: string
    creator: string
    image: string
    logo: string
    banner: string
    tags: string[]
}