
export type axiosRes = {
	code: number;
	msg: string;
	data: any;
};

export type requestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'BLOB';

export type routerType = {
	path: string;
	component: string;
	name: string;
	meta: metaType;
	hidden: boolean;
	children?: routerType[];
	alwaysShow?: boolean;
	redirect?: string;
};

export type metaType = {
	title: string;
	icon: string;
	noCache: boolean;
	link: null | string;
};

export type slotsType = {
	default?: string; //自定义显示内容模板
	header?: string; //自定义表头内容的模板
	footer?: string; //自定义表尾内容的模板
	title?: string; //只对 type=checkbox,radio 有效，自定义标题模板
	checkbox?: string; //只对 type=checkbox 有效，自定义复选框模板
	radio?: string; //只对 type=radio 有效，自定义单选框模板
	content?: string; //只对 type=expand 有效，自定义展开后的内容模板
	filter?: string; //只对 filter-render 启用时有效，自定义筛选模板
	edit?: string; //只对 edit-render 启用时有效，自定义可编辑组件模板
};
//搜索值的类型
export type searchType = 'input' | 'number' | 'textarea' | 'checkbox' | 'radio' | 'select' | 'time' | 'daterange';

// 字典类型
export type dictType = {
	createBy: string;
	createTime: string;
	cssClass: string;
	default: boolean;
	dictCode: number;
	dictLabel: string;
	dictSort: number;
	dictType: string;
	dictValue: string | number;
	isDefault: string;
	listClass: '' | 'success' | 'warning' | 'info' | 'danger';
	remark: string;
	status: string | number;
	updateBy: null | string;
	updateTime: null | string;
};
