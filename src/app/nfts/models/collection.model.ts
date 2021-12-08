import { BigNumber } from "ethers"

export interface NFTCollection {
    nftContract: string
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

export interface LikesDislikes {
    likes: BigNumber,
    dislikes: BigNumber
}

export interface NFTCollectionWithLikes {
    collection: NFTCollection
    likesDislikes: LikesDislikes
}

export interface CollectionStats {

}
