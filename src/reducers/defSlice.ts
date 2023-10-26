import { createSlice } from '@reduxjs/toolkit'

const defSlice = createSlice({
  name: 'default',
  initialState: [],
  reducers: {
    defSet(state, action: {
      type    : string,
      payload : Object
    }) {
      return {
        ...state,
        ...action.payload
      }
    }
  }
})

export const { defSet } = defSlice.actions
export default defSlice.reducer