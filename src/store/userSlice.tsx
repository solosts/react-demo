import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: '',
    menuList: [],
    permissions: [],
    roles: [],
    user: {}
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    setMenuList: (state, action) => {
      state.menuList = action.payload
    },
    setPermissions: (state, action) => {
      state.permissions = action.payload
    },
    setRoles: (state, action) => {
      state.roles = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    clearLogin: (state) => {
      state.token = ''
      state.menuList = []
      state.permissions = []
      state.roles = []
      state.user = {}
    }
  },
})
export const { setToken, setMenuList, setPermissions, setRoles, setUser, clearLogin } = userSlice.actions
export default userSlice.reducer