export interface NFT {
    name: string
    tokenId: string
    metadata: NFTMetadata
    price: number
    currency: string
}

export interface NFTMetadata {
    title: string
    type: string
    properties: NFTProperties
}

export interface NFTProperties {
    name: string
    description: string
    image: string
    properties: any
}