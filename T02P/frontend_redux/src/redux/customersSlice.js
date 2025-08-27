import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API = 'http://localhost:3000';

const initialState = {
    customers: [],
    status: 'idle',
    error: null
};

export const fetchCustomers = createAsyncThunk(
    'customers/fetchCustomers',
    async () => {
        const res = await fetch(`${API}/customers`);

        if (!res.ok)
            throw new Error('Failed to load customers.');

        const data = await res.json();
        return data.map(c => ({ ...c, favorite: false }));
    }
);

export const fetchCustomerById = createAsyncThunk(
    'customers/fetchCustomerById',
    async (id) => {
        const res = await fetch(`${API}/customers/${id}`);

        if (!res.ok)
            throw new Error('Failed to load customer.');

        return await res.json();
    }
);

const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        toggleFavorite(state, action) {
            const customerId = Number(action.payload);
            const customer = state.customers.find(c => c.id === customerId);

            if (customer)
                customer.favorite = !customer.favorite;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.customers = action.payload;
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error';
            })

            .addCase(fetchCustomerById.fulfilled, (state, action) => {
                const customer = action.payload;
                const idx = state.customers.findIndex(c => c.id === customer.id);

                if (idx === -1) {
                    state.customers.push({ ...customer, favorite: false });
                } else {
                    const fav = state.customers[idx].favorite;
                    state.customers[idx] = { ...customer, favorite: fav };
                }
            });
    }
});

export const { toggleFavorite } = customersSlice.actions;
export default customersSlice.reducer;