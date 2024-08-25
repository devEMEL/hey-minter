import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useDebounce } from "use-debounce";


// The AddProductModal component is used to add a product to the marketplace
const AddCollectionModal = () => {
    // The visible state is used to toggle the modal
    const [visible, setVisible] = useState(false);
    // The following states are used to store the values of the form fields
    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [price, setPrice] = useState(0);
    const [totalSupply, setTotalSupply] = useState(0);


    // The following states are used to store the debounced values of the form fields
    const [debouncedName] = useDebounce(name, 500);
    const [debouncedSymbol] = useDebounce(symbol, 500);
    const [debouncedImageFile] = useDebounce(imageFile, 500);
    const [debouncedImagePreview] = useDebounce(imagePreview, 500);
    const [debouncedPrice] = useDebounce(price, 500);
    const [debouncedTotalSupply] = useDebounce(totalSupply, 500);


    // Check if all the input fields are filled
    const isComplete = name && symbol;

    // Clear the input fields after the product is added to the marketplace
    const clearForm = () => {
        setName("");
        setSymbol("");
        setImageFile(null);
        setImagePreview("");
        setPrice(0);
        setTotalSupply(0);
    };



    // Define function that handles the creation of a product through the marketplace contract
    const handleCreateProduct = async () => {
        //LOGIC HERE
        clearForm();
    };

    // Define function that handles the creation of a product, if a user submits the product form
    const addProduct = async (e: any) => {
        e.preventDefault();
        if (!debouncedName || !debouncedSymbol || !debouncedImageFile || !debouncedImagePreview || !debouncedPrice || !debouncedTotalSupply) return;
        console.log({
            debouncedName, debouncedSymbol, debouncedImageFile, debouncedPrice, debouncedTotalSupply
        })

        // try {
        //   // Display a notification while the product is being added to the marketplace
        //   await toast.promise(handleCreateProduct(), {
        //     pending: "Creating news...",
        //     success: "News created successfully",
        //     error: "Something went wrong. Try again.",
        //   });
        //   // Display an error message if something goes wrong
        // } catch (e: any) {
        //   console.log({ e });
        //   toast.error(e?.message || "Something went wrong. Try again.");
        //   // Clear the loading state after the product is added to the marketplace
        // } finally {
        // //   setLoading("");
        // }
    };


    // Define the JSX that will be rendered
    return (
        <div className={"flex flex-row w-full justify-between font-qwitcher"}>
            <div>
                {/* Add Product Button that opens the modal */}

                <button
                    type="button"
                    onClick={() => setVisible(true)}
                    className="inline-block ml-4 px-6 py-2.5 bg-[#ffffff] text-[#000000] font-medium text-md leading-tight rounded-2xl shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalCenter"
                >
                    <p className="flex">
                        <PlusIcon width="20" /> <span className="ml-2">Create Collection</span>
                    </p>
                </button>

                {/* Modal */}
                {visible && (
                    <div
                        className="fixed z-40 overflow-y-auto top-0 w-full left-0 font-roboto"
                        id="modal"
                    >
                        {/* Form with input fields for the product, that triggers the addProduct function on submit */}
                        <form onSubmit={addProduct}>
                            <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                <div className="fixed inset-0 transition-opacity">
                                    <div className="absolute inset-0 bg-gray-900 opacity-75" />
                                </div>
                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                                    &#8203;
                                </span>
                                <div
                                    className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                                    role="dialog"
                                    aria-modal="true"
                                    aria-labelledby="modal-headline"
                                >
                                    {/* Input fields for the product */}
                                    <div className="bg-[#ffffff] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <p className="text-center py-4 text-2xl">Create NFT Collection</p>
                                        <label>Name</label>
                                        <input
                                            onChange={(e) => {
                                                setName(e.target.value);
                                            }}
                                            required
                                            type="text"
                                            className="w-full bg-gray-100 p-2 mt-2 mb-3 bg-transparent focus:outline-none border-b border-[#000000]"
                                        />

                                        <label>Symbol</label>
                                        <input
                                            onChange={(e) => {
                                                setSymbol(e.target.value);
                                            }}
                                            required
                                            type="text"
                                            className="w-full bg-gray-100 p-2 mt-2 mb-3 bg-transparent focus:outline-none border-b border-[#000000]"
                                        />
                                        <label>NFT Image
                                            <input
                                                onChange={(e) => {
                                                    const file = e.target.files[0];

                                                    if (file) {

                                                        setImageFile(file);
                                                        const reader = new FileReader();
                                                        console.log("hi")
                                                        reader.addEventListener("loadend", () => {
                                                            // console.log(typeof reader.result);
                                                            // setImagePreview(reader.result);
                                                            // reader.readAsDataURL(file);
                                                            console.log("hello")
                                                        });

                                                    }

                                                }}
                                                required
                                                type="file"
                                                accept="image/*"
                                                className="w-full bg-gray-100 p-2 mt-2 mb-3 bg-transparent focus:outline-none border-b border-[#000000]"
                                            />
                                            {
                                                imagePreview && (<img src={imagePreview} alt="llllll" className="max-w-sm bg-black" />)
                                            }
                                        </label>
                                        <label>Price (In ETH, input 0 if its a free collection)</label>
                                        <input
                                            onChange={(e) => {
                                                setPrice(e.target.value as unknown as number);
                                            }}
                                            required
                                            type="text"
                                            className="w-full bg-gray-100 p-2 mt-2 mb-3 bg-transparent focus:outline-none border-b border-[#000000]"
                                        />
                                        <label>Total Supply</label>
                                        <input
                                            onChange={(e) => {
                                                setTotalSupply(e.target.value as unknown as number);
                                            }}
                                            required
                                            type="text"
                                            className="w-full bg-gray-100 p-2 mt-2 mb-3 bg-transparent focus:outline-none border-b border-[#000000]"
                                        />

                                    </div>
                                    {/* Button to close the modal */}
                                    <div className="bg-[#ffffff] px-4 py-3 text-right">
                                        <button
                                            type="button"
                                            className="py-2 px-4 text-[#000000] rounded mr-2"
                                            onClick={() => setVisible(false)}
                                        >
                                            <i className="fas fa-times"></i> Cancel
                                        </button>
                                        {/* Button to add the product to the marketplace */}
                                        <button
                                            type="submit"
                                            //   disabled={!!loading || !isComplete || !createProduct}
                                            className="py-2 px-4 text-[#ffffff] rounded bg-blue-700 mr-2"
                                        >
                                            {/* {loading ? loading : "Create"} */}
                                            Create
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddCollectionModal;
