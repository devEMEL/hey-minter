
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface itemsInterface {
    chainId: number;
    contractAddress: string;
    name: string;
    symbol: string;
    creator: string;
    timestamp: number;
    price: number;
    maxSupply: number;
    imageURL: string;
}

interface stateInterface {
    items: Array<itemsInterface>;
    loading: boolean;
    error: any;
};

const initialState: stateInterface = {
    items: [{
        chainId: 111555,
        contractAddress: "0xsknnkkf",
        name: "Dominic Art",
        symbol: "DAT",
        creator: "0xhjkkajioHIOICHIHoonciiowowoowowwolooo",
        timestamp: 1908494909101,
        price: 12,
        maxSupply: 1000,
        imageURL: "https://maroon-major-crawdad-175.mypinata.cloud/ipfs/bafkreiaiqqqnwyvi5gksqfwsqihdt7izf5fklnbehal7elyusducquwq6i",
    }],
    loading: false,
    error: null,
};

const fetchNfts = createAsyncThunk("nfts/fetchNfts", async (requestURL: string) => {
    const response = await fetch(requestURL);
    if (!response.ok) throw new Error("Network response was not OK");

    return await response.json();
})

const appStateSlice = createSlice({
    name: "appState",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNfts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNfts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchNfts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const {/*..FUNCTIONS FROM REDUCERS AND EXTRAREDUCERS..*/ } = appStateSlice.actions;
export default appStateSlice.reducer;