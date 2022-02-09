import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const myDBusers = createAsyncThunk('dbUsers/users', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
        .then(res=>res.json());
    return response
})
// export const mystrudents = createAsyncThunk('dasstruder/users', async () => {
//     const response = await fetch('https://jsonplaceholder.typicode.com/students')
//     return response
// })


export const userSlice = createSlice({
  name: 'OurUser',
  initialState: {
    users: [{id:0, name:"alif", phone: "01234566"},{id:0, name:"asif", phone: "9999999999"}],
    students: [{id:0, name:"student1", phone: "01234566"},{id:0, name:"student2", phone: "9999999999"}],
    loading: false,
  },
  reducers: {
      updateFirstIndex: (state,action) =>{
        //   console.log(action.payload);
        delete action.payload.phone
            state.users.push(action.payload)
      },
  },
  extraReducers: builder => {
    builder
      .addCase(myDBusers.pending, (state, action) => {
        state.loading = true
    })
    .addCase(myDBusers.fulfilled, (state, action) => {
        console.log(action.payload);
        state.users = action.payload;
        state.loading = false
      })
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, updateFirstIndex } = userSlice.actions

export default userSlice.reducer