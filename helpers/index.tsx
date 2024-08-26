
import { ethers } from 'ethers';
import Blockies from 'react-blockies';

import { FileObject, PinataSDK } from "pinata"

export const SCROLL_SEPOLIA_CA = "0xAfF72Db3fA597546517d172be9A530E99AEDddFE";

const IMAGE_SAMPLE = "https://maroon-major-crawdad-175.mypinata.cloud/ipfs/bafkreiaiqqqnwyvi5gksqfwsqihdt7izf5fklnbehal7elyusducquwq6i"

const pinata = new PinataSDK({
    pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
    pinataGateway: "maroon-major-crawdad-175.mypinata.cloud",
});

export const identiconTemplate = (address: string) => {
    return <Blockies size={14} // number of pixels square
        scale={4} // width/height of each 'pixel'
        className="identicon border-2 border-white rounded-full" // optional className
        seed={address} // seed used to generate icon data, default: random
    />
}

export const truncateAddress = (address: string, startLength = 6, endLength = 4) => {
    if (!address) return '';
    return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}

export const imageURIToSrc = (imageURI: string) => {
    let imageSrc;
    if (imageURI.includes("//")) {
        imageSrc = `https://maroon-major-crawdad-175.mypinata.cloud/ipfs/${imageURI.split("//")[1]}`
    } else {
        imageSrc = IMAGE_SAMPLE;
    }

    return imageSrc;
}

export const etherToWei = (amountInEther: string) => {
    return ethers.utils.parseEther(amountInEther);
}

export const weiToEther = (amountInWei: any) => {
    return ethers.utils.formatEther(amountInWei);
}

export const getImageURI = async (imageFile: FileObject) => {

    const upload = await pinata.upload.file(imageFile);
    console.log(`ipfs://${upload.IpfsHash}`)
    return `ipfs://${upload.IpfsHash}`;
}

export const getTokenURI = async (metadata: object) => {
    const upload = await pinata.upload.json(metadata);
    console.log(`ipfs://${upload.IpfsHash}`);
    return `ipfs://${upload.IpfsHash}`;
}




/***
 * 
 * 
 * 
import { PinataSDK } from "pinata"
import dotenv from "dotenv";
import fs from "fs"
import { Blob } from "buffer";
dotenv.config();

const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
    pinataGateway: "maroon-major-crawdad-175.mypinata.cloud",
});

async function main() {
    try {
        const blob = new Blob([fs.readFileSync("./img1-Earth.jpg")]);
        const file = new File([blob], "image.png", { type: "image/png" })
        const upload = await pinata.upload.file(file);

        console.log(upload);
        
        let name = `${collectionName} #${tokenId}`;
        let tokenId = _tokenId(from contract...) + 1;
        let description = _description || "My Unique NFT"
        const note = {

            "name": name,
            "description": `${description}`,
            "image": `ipfs://${upload.IpfsHash}`,
            "attributes": [
                {
                    "trait_type": "Background",
                    "value": "Blue"
                },
                {
                    "trait_type": "Body",
                    "value": "Robot"
                },
                {
                    "trait_type": "Eyes",
                    "value": "Red"
                },
                {
                    "trait_type": "Mouth",
                    "value": "Smile"
                },
                {
                    "trait_type": "Hat",
                    "value": "Cap"
                }
            ],
            "external_url": "https://my-nft-project.com/nft/12345",
            "animation_url": "ipfs://QmExampleHash67890/animation.mp4"
        }

        const metadata = await pinata.upload.json(note);
        console.log(metadata);
        const tokenURI = `ipfs://${metadata.IpfsHash}`;
        console.log(tokenURI);
    } catch (error) {
        console.log(error);
    }
}

await main();


// image hash --- imageHash
// bafkreiaiqqqnwyvi5gksqfwsqihdt7izf5fklnbehal7elyusducquwq6i

// ipfs://bafkreiaiqqqnwyvi5gksqfwsqihdt7izf5fklnbehal7elyusducquwq6i

// https://maroon-major-crawdad-175.mypinata.cloud/ipfs/bafkreiaiqqqnwyvi5gksqfwsqihdt7izf5fklnbehal7elyusducquwq6i

// metadata hash(tokenURI) --- needed to mintNFT
// ipfs://bafkreid5wstmx57qpuli7ge7ljjwswftv2w2aixkcgziq2t6pg6syeg4vi


// To view on the browserc 
// https://maroon-major-crawdad-175.mypinata.cloud/ipfs/bafkreid5wstmx57qpuli7ge7ljjwswftv2w2aixkcgziq2t6pg6syeg4vi
 * 
 * 
 * 
 */