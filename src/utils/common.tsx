import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { getCache } from '../hooks/useCache';
import router from '../router';
import { http, download } from './request/http';
import { dictType, requestMethod } from './tsType';
import lodash from "lodash";


const baseURL = import.meta.env.VITE_APP_BASE_API;
/**
 * request请求
 * @param url 请求路径
 * @param params 请求参数
 * @returns
 */
export const httpRequest = (type: requestMethod, url: string, params: any) => {
	return http(url, params, type);
};

/**
 * 导出文件
 * @param url 请求路径
 * @param params 请求参数
 * @param fileName 下载文件名称
 * @returns
 */
export const exportFiles = (url: string, params: any, fileName: string) => {
	return download(url, params, fileName);
};

// 通用下载方法
export const downloadFile = (fileName: string) => {
	// prettier-ignore
	console.log("通用下载方法，文件名", fileName);
	// prettier-ignore
	window.location.href = baseURL + "/common/download?fileName=" + encodeURI(fileName) + "&delete=" + true;
};


/**
 * 获取字典数据
 * @param dictName 字典名称
 * @returns
 */
export const getDictData = (dictName: string) => {
	return httpRequest('GET', `/system/dict/data/type/${dictName}`, null);
};

/**
 * 根据字典值获取字典标签
 * @param dictValue 字典值
 * @param dictList 字典列表
 * @returns 返回字典标签
 */
export const getDictVal = (dictValue: string | number | boolean, dictList: dictType[]) => {
	let obj = dictList.find(v => v.dictValue === dictValue);
	return obj?.dictLabel;
};

/**
 * 路由跳转
 * @param url 跳转路径
 * @param params 携带参数
 */
export const toPage = (url: string, params?: any) => {
	router.push({ path: url, query: params });
};

/**
 * 返回上一级
 * @param num 返回的级数
 */
export const goBack = (num?: number) => {
	router.go(num || -1);
};

/**
 * 确认弹窗
 * @param title 弹窗标题
 * @param msg 弹窗内容
 * @returns
 */
export const messageConfirm = (title: string, msg: string) => {
	return Modal.confirm({
		title: title,
		content: msg,
		okText: '确认',
		cancelText: '取消',
		icon: <ExclamationCircleOutlined />
	})
};

// <!--------------------------------------------------- 数据处理类 -------------------------------------------------->
/**
 * 将对象数据赋给另一对象的相同元素
 * @param fromObj 来源对象
 * @param toObj 被赋值的对象
 */
export const assignFormData = (fromObj: any, toObj: any) => {
	Object.keys(toObj).forEach(key => {
		toObj[key] = fromObj[key];
	});
};

/**
 * 检查权限
 * @param jurisdiction  权限标识
 * @returns
 */
export const checkJurisdiction = (jurisdiction: string) => {
	const { permissions } = getCache('userinfo')

	// 系统管理员拥有全部权限
	if (permissions.includes('*:*:*')) {
		return true
	}

	// 传入数据为空   显示
	if (!jurisdiction) {
		return true
	}

	// 有对应权限
	if (permissions.includes(jurisdiction)) {
		return true
	}
	return false
}

// 验证是否为blob格式
export const blobValidate = async (data: Blob) => {
	try {
		const text = await data.text();
		JSON.parse(text);
		return false;
	} catch (error) {
		return true;
	}
}

/**
 * 参数处理
 *
 * @param {*} params  参数
 */
export function tansParams(params: { [x: string]: any }) {
	let result = "";
	for (const propName of Object.keys(params)) {
		const value = params[propName];
		var part = encodeURIComponent(propName) + "=";
		if (value !== null && value !== "" && typeof value !== "undefined") {
			if (typeof value === "object") {
				for (const key of Object.keys(value)) {
					// prettier-ignore
					if (value[key] !== null && value !== "" && typeof value[key] !== "undefined") {
						let params = propName + "[" + key + "]";
						var subPart = encodeURIComponent(params) + "=";
						result += subPart + encodeURIComponent(value[key]) + "&";
					}
				}
			} else {
				result += part + encodeURIComponent(value) + "&";
			}
		}
	}
	return result;
}

/**
 * 通用防抖
 *
 * @param callback 回调函数
 * @param wait     等待毫秒数
 * @param type     回调函数额外参数
 * @param options  防抖额外参数
 * @returns
 */
export const lodashFunc = (callback: Function, wait: number, type?: any, options?: any) => {
	return lodash.debounce(function () {
		type ? callback(type) : callback();
	}, wait, options);
};