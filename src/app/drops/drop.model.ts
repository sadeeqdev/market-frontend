import { BigNumber } from "ethers"

export enum DropType {
    CheddaXP = "CheddaXP",
    TwitterFollow = "TwitterFollow",
    TwitterFollowRetweet = "TwitterFollowRetweet"
}

export interface Drop {
    id: string
    contractAddress: string
    name: string
    type: DropType
    metadataURI: string
    metadata: DropMetadata
    launch: Date
    start: BigNumber
    end: BigNumber
}

export interface DropMetadata {
    name: string
    image: string
    summary: string
    description: string
    collectionSize: number
    available: number
    criteria: string[]
}