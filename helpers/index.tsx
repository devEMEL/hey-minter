
import { ethers } from 'ethers';
import Blockies from 'react-blockies';


const IMAGE_SAMPLE = "https://maroon-major-crawdad-175.mypinata.cloud/ipfs/bafkreiaiqqqnwyvi5gksqfwsqihdt7izf5fklnbehal7elyusducquwq6i"

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
    console.log(imageURI)
    let imageSrc;
    if (imageURI.includes("//")) {
        imageSrc = `https://maroon-major-crawdad-175.mypinata.cloud/ipfs/${imageURI.split("//")[1]}`
    } else {
        imageSrc = IMAGE_SAMPLE;
    }
    console.log({
        imageSrc
    })

    return imageSrc;
}

export const weiToEthers = (amountInWei: number) => {
    return ethers.utils.formatEther(amountInWei);
}