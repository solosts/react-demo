class LocalCache {
	// 添加
	setCache(key: string, value: any) {
		window.localStorage.setItem(key, JSON.stringify(value));
	}

	// 查找
	getCache(key: string) {
		const value = window.localStorage.getItem(key);
		if (value) {
			return JSON.parse(value);
		}
		return false
	}

	// 删除
	delCache(key: string) {
		window.localStorage.removeItem(key);
	}

	// 清理
	clearCache() {
		window.localStorage.clear();
	}
}

const useCache = new LocalCache();
export const { setCache, getCache, delCache, clearCache } = useCache;
