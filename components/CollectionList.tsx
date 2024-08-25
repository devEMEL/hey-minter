import { AppDispatch, RootState } from '@/state/store';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const CollectionList = () => {

    const items = useSelector((state: RootState) => state.appState.items);
    const dispatch = useDispatch<AppDispatch>();
    console.log(items);


    // function to convert imageURI to imagesrc (split by //.....)


    // function to truncate address
    return (
        <div className='mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 bg-[#ffffff] text-[#000000] rounded-2xl mt-10 min-h-screen'>
            <table className='shadow-2xl font-qwitcher border-2 border-black-400 w-full '>
                {/* add overflow-hidden later */}
                <thead>
                    <tr>
                        <th className='py-3 bg-gray-800 text-[#ffffff]'>N</th>
                        <th className='py-3 bg-gray-800 text-[#ffffff]'>Image</th>
                        <th className='py-3 bg-gray-800 text-[#ffffff]'>Name</th>
                        <th className='py-3 bg-gray-800 text-[#ffffff]'>Address</th>
                        <th className='py-3 bg-gray-800 text-[#ffffff]'>Price</th>
                        <th className='py-3 bg-gray-800 text-[#ffffff]'>Total Supply</th>
                        <th className='py-3 bg-gray-800 text-[#ffffff]'>Mint</th>
                    </tr>
                </thead>
                <tbody className='text-gray-800 text-center'>
                    {
                        items && items.map((el, index) => (
                            <tr className='bg-[#ffffff] duration-300 hover:scale-105'>
                                <td className='py-6 px-6'>{index}</td>
                                <td className='py-6 px-6'>
                                    <img src={`${el.imageURL}`} width="100" className='rounded-lg' />
                                </td>
                                <td className='py-6 px-6'>{el.name}</td>
                                <td className='py-6 px-6'>{el.contractAddress}</td>
                                <td className='py-6 px-6'>{el.price}</td>
                                <td className='py-6 px-6'>{el.maxSupply}</td>
                                <td className='py-6 px-6'>
                                    <button className='bg-gray-800 text-[#ffffff] py-1 px-4'>
                                        Mint
                                    </button>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}

export default CollectionList;