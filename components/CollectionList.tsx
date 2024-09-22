import { getTokenURI, imageURIToSrc, SCROLL_SEPOLIA_CA, truncateAddress, weiToEther } from '@/helpers';
import { AppDispatch, RootState } from '@/state/store';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchNfts } from '../state/appStateSlice';
import { toast } from 'react-toastify';
import { ethers, parseUnits } from 'ethers';
import NFTCollection from "../abi/NFTCollection.json";
import { useEthersProvider, useEthersSigner } from '@/pages/_app';
import { useChainId } from 'wagmi';
import MintSuccessNotification from './MintSuccessNotification';

const CollectionList = () => {

    // const [isVisible, setIsVisible] = useState(true);

    const items = useSelector((state: RootState) => state.appState.items);
    const loading = useSelector((state: RootState) => state.appState.loading);
    const dispatch = useDispatch<AppDispatch>();

    const mySigner = useEthersSigner();
    const myProvider = useEthersProvider();
    const chainId = useChainId();

    const getAmountMinted = (contractAddress: string) => {
        // const contract = new ethers.Contract(contractAddress, NFTCollection.abi, myProvider);
        // const tokenId = await contract._tokenIds();
        // return String(tokenId);
        console.log("hello")
        return "hello"
    }

    const handleMintNFT = async (imageURI: string, name: string, contractAddress: string, price: number) => {

        const contract = new ethers.Contract(contractAddress, NFTCollection.abi, myProvider);
        const tokenId = await contract._tokenIds();
        // const maxSupply = await contract.maxSupply();
        // const _initialImageURI = await contract._imageURI();
        // const price_ = await contract.price()

        const nameAdd = Number(String(tokenId)) + 1;
        

        const metadata = {

            "name": `${name} #${nameAdd}`, // next time
            "description": "My unique NFT",
            "image": imageURI,
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
        const tokenURI = await getTokenURI(metadata);
        console.log(tokenURI)

        const mintNFTcontract = new ethers.Contract(contractAddress, NFTCollection.abi, mySigner);

        const tx = await mintNFTcontract.mintNFT("https://maroon-major-crawdad-175.mypinata.cloud/ipfs/bafkreid4xdpjo2bmjiurykquhsnni5yaf44jwbkslpin6yv5eeig45wcii", {
            value: BigInt(price),
        });
        const response = await tx.wait();
        console.log(response);

        const contract_ = new ethers.Contract(contractAddress, NFTCollection.abi, myProvider);
        const newTokenId = await contract_._tokenIds();
        console.log(String(newTokenId));


        // Emit event and update database (amount minted) with it; 
        // Amount minted  // or do this approach
        // Better approach next time, store all items fetched from the DB in an array, loop through and create a separate component, that way it's easier to manipulate

        // Remove amount minted field for now
        // toastify...
    }

    const mintNFT = async (imageURI: string, name: string, contractAddress: string, price: number) => {
        try {
            await toast.promise(handleMintNFT(imageURI, name, contractAddress, price), {
                pending: "Minting NFT...",
                success: "NFT minted successfully",
                error: "Something went wrong. Try again.",
            });

        } catch (e: any) {
            console.log({ e });
            toast.error(e?.message || "Something went wrong. Try again.");
        } finally {
            //display a notification with the image
            

        }
    }

    // const setVisibility = (val: boolean) => {
    //     setIsVisible(val) // false
    // }



    useEffect(() => {
        if (loading === false) {
            console.log(chainId);
            // console.log("LFG");
            dispatch(fetchNfts("https://hey-minter-api.vercel.app/api/v1/nfts"));
        }
    })



    return (
        <div className='mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 bg-[#ffffff] text-[#000000] rounded-2xl mt-10 min-h-screen overflow-x-scroll'>
            <table className='shadow-2xl font-lato border-2 border-black-400 w-full'>
                {/* add overflow-hidden later */}
                <thead>
                    <tr>
                        <th className='py-3 bg-gray-800 text-[#ffffff]'>N</th>
                        <th className='py-3 bg-gray-800 text-[#ffffff]'>Image</th>
                        <th className='py-3 bg-gray-800 text-[#ffffff]'>Name</th>
                        <th className='py-3 bg-gray-800 text-[#ffffff]'>Address  (CA)</th>
                        <th className='py-3 bg-gray-800 text-[#ffffff]'>Price (ETH)</th>
                        <th className='py-3 bg-gray-800 text-[#ffffff]'>Total Supply</th>
                        <th className='py-3 bg-gray-800 text-[#ffffff]'>Mint</th>
                    </tr>
                </thead>
                <tbody className='text-gray-800 text-center'>
                    {
                        items && items.map((el, index) => (
                            <tr key={`${index}l`} className='bg-[#ffffff] text-center'>
                                <td className='py-6 px-6'>{index}</td>
                                <td className='py-6 px-6'>
                                    <img src={`${imageURIToSrc(el.imageURI)}`} className='w-20 rounded-lg' />

                                </td>
                                <td className='py-6 px-6'>{el.name}</td>
                                <td className='py-6 px-6'>{truncateAddress(el.contractAddress)}</td>
                                <td className='py-6 px-6 text-[20px]'>{Number(weiToEther(String(el.price)))}</td>
                                <td className='py-6 px-6'>{el.maxSupply}</td>
                                <td className='py-6 px-6'>
                                    <button className='bg-gray-800 text-[#ffffff] py-1 px-4'
                                        onClick={() => mintNFT(el.imageURI, el.name, el.contractAddress, el.price)}
                                    >
                                        Mint
                                    </button>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>

            {/* <MintSuccessNotification isVisible={isVisible} setVisibility={setVisibility} /> */}
        </div>
    )
}

export default CollectionList;