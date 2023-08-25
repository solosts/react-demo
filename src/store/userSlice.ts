import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { routerType } from '../utils/tsType';

// 为 slice state 定义一个类型
interface userState {
  token: string;
  menuList: routerType[];
  permissions: string[];
  roles: string[];
  user: any;
}

// 使用该类型定义初始 state
const initialState: userState = {
  token: '',
  menuList: [],
  permissions: [],
  roles: [],
  user: {}
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` 将从 `initialState` 参数推断 state 类型
  initialState,
  reducers: {
    // 设置token
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload
    },
    // 获取用户信息
    getUserInfo(state) {

    },
    // 获取菜单、路由
    getMenu(state) {

    },
    clearLogin(state) {
      state.token = ''
      state.user = {}
      state.menuList = []
      state.permissions = []
      state.roles = []
    },
  }
})

export const { setToken, getUserInfo, getMenu, clearLogin } = userSlice.actions

export default userSlice.reducer