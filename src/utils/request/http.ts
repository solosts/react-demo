import axios, { AxiosInstance } from 'axios';
import { message, Modal } from 'antd';
import store from '../../store/index';
import { clearLogin } from '../../store/userSlice';
import { requestMethod } from '../tsType';
import { saveAs } from 'file-saver'
import errorCode from '../errorCode';
import { blobValidate, tansParams } from '../common';

// 插件实例
const serverAxios: AxiosInstance = axios.create({
	timeout: 10000
});

// 请求拦截
serverAxios.interceptors.request.use(
	config => {
		const storeState = store.getState()
		// 设置token
		config.headers.Authorization = storeState.user.token;
		return config;
	},
	error => {
		Promise.reject(error);
	}
);

// 响应拦截
serverAxios.interceptors.response.use(
	response => {
		// 请求成功
		if (response.status === 200) {
			return Promise.resolve(response);
		} else {
			message.error('网络错误！');
			return Promise.reject('error');
		}
	},
	error => {
		message.error(error.message);
		return Promise.reject(error);
	}
);

export const http = (url: string, params: any, method: requestMethod) => {
	// return new Promise<axiosRes>((resolve, reject) => {
	return new Promise<any>((resolve, reject) => {
		// 设置post请求头
		if (method !== 'GET') {
			axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
		}

		// get转换参数
		if (method === 'GET' && params) {
			let queryString: string = Object.keys(params)
				.map(key => key + '=' + params[key])
				.join('&');
			url = `${url}?${queryString}`;
		}

		serverAxios({
			method: method,
			url: import.meta.env.VITE_APP_BASE_API + url,
			data: params || undefined
		})
			.then(res => {
				if (res.data.code == 401) {
					// 登录过期提示
					Modal.info({
						title: '系统提示',
						content: '您当前的登录状态已过期，请重新登录！',
						okText: '确定',
						icon: false,
						onOk: () => {
							store.dispatch(clearLogin())
						}
					})
				} else {
					// let responseData: axiosRes = res.data
					resolve(res.data);
				}
			})
			.catch(error => {
				reject(error);
			});
	});
};

export const download = async (url: string, params: any, filename: string) => {
	let req = null;
	if (params) {
		req = serverAxios.post(url, params, {
			transformRequest: [
				(params) => {
					return tansParams(params);
				},
			],
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			responseType: "blob",
		});
	} else {
		req = serverAxios.get(url, {
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			responseType: "blob",
		});
	}
	return await req.then(async (resp: any) => {
		const isLogin = await blobValidate(resp);
		if (isLogin) {
			const blob = new Blob([resp]);
			// saveAs(blob, filename, {
			// 	type: "application/octet-stream;charset=utf-8"
			// });
			saveAs(blob, filename);
			//var blob2 = new Blob([resp], {type: "text/plain;charset=utf-8"});
			//saveAs(blob, resp.msg + ".xlsx");
			console.log("%s ====>>>导出成功", filename);
		} else {
			const resText = resp.text();
			const rspObj = JSON.parse(resText);

			const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default']
			message.error(errMsg);
		}
	})
		.catch((r) => {
			console.error(r);
			message.error("下载文件出现错误，请联系管理员！");
		});
};