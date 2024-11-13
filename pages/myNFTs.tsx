import { RootState } from '@/state/store';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NFTCollection from '../abi/NFTCollection.json';
import { useEthersProvider, useEthersSigner } from './_app';
import { useAccount, useChainId } from 'wagmi';
import { imageURIToSrc } from '@/helpers';
import {  } from '@heroicons/react/24/outline';
import Spinner from '@/components/Spinner';

interface nftsObj {
    ca: string;
    name: string;
    symbol: string;
    _imageURI: string;
}

const MyNFTs = () => {
    const [NFTs, setNFTs] = useState<nftsObj[]>([]);
    const items = useSelector((state: RootState) => state.appState.items);
    const mySigner = useEthersSigner();
    const myProvider = useEthersProvider();
    const chainId = useChainId();

    const { address } = useAccount();

    const getUsersToken = async () => {
        let myNFTs: any = [];
        const contractAddresses = items.map((el) => el.contractAddress);

        for (const el of contractAddresses) {
            const contract = new ethers.Contract(
                String(el),
                NFTCollection.abi,
                myProvider
            );
            try {
                const name = await contract.name();
                const symbol = await contract.symbol();
                const _imageURI = await contract._imageURI();
                const myNFTs_ = await contract.getAllNTFs(address);
                const myNFTs_Arr = Array.from(myNFTs_);

                const nfts = await Promise.all(
                    myNFTs_Arr.map(async (tokenId: any) => {
                        return {
                            ca: el,
                            name: `${name} #${tokenId}`,
                            symbol,
                            _imageURI,
                        };
                    })
                );

                // myNFTs.push({ ca: String(el), nfts: myNFTs_Arr.map((nft: any) => nft.toString()) });
                // console.log({myNFTs_Arr});
                myNFTs = [...myNFTs, ...nfts];
                console.log({ myNFTs });
            } catch (error) {
                console.error(`Error fetching NFTs for contract ${el}:, error`);
            }
        }
        console.log('All NFTs:', myNFTs);
        setNFTs(myNFTs);
        return myNFTs;
    };


    useEffect(() => {
        getUsersToken();
    }, []);
    return (
        <div>
            <div className="text-white min-h-screen">
                {/* display all NFTs owned by the user */}
                <div className="flex gap-1 flex-wrap">
                    {NFTs ?
                        NFTs.map((el) => (
                            <div className="w-1/2 md:w-1/4 mb-10 cursor-pointer">
                                <div className="w-[95%] flex justify-center">
                                    <div className="w-full">
                                        <img
                                            src={imageURIToSrc(el._imageURI)}
                                            alt={el.name}
                                            width={700}
                                            height={500}
                                            className="max-h-[150px]"
                                        />

                                        <div className="flex flex-col gap-2 py-4 justify-center shadow-md shadow-gray-700 text-[12px] px-2">
                                            <p className="">{el.symbol}</p>
                                            <div className="flex justify-between">
                                                <p>{el.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            // <div className='text-white'>Loading</div>
                            <Spinner />
                        )}
                </div>
            </div>
        </div>
    );
};


export default MyNFTs;
