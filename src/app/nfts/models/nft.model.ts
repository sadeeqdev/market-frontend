export interface NFT {
    name: string
    nftContract: string
    tokenID: string
    metadata: NFTMetadata
    price: number
    currency: string
    tokenURI: string
    created: string
}

export interface NFTAttribute {
    trait_type: string
    value: string
}
export interface NFTMetadata {
    name: string
    description: string
    image: string
    edition: number
    date: Date
    created: string
    attributes: NFTAttribute[]
}

export interface NFTProperties {
    name: string
    description: string
    image: string
    properties: any
}