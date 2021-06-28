export const introspectionUtil = {
	getAllFuncs(toCheck: any) {
		const props = []
		let obj = toCheck
		do {
			props.push(...Object.getOwnPropertyNames(obj))
		} while ((obj = Object.getPrototypeOf(obj)))

		return props.sort().filter((e: any, i: any, arr: any) => {
			return e != arr[i + 1] && typeof toCheck[e] == 'function'
		})
	},

	delegateFunctionCalls(from: any, to: any) {
		const props = introspectionUtil.getAllFuncs(to)
		for (const prop of props) {
			//@ts-ignore
			if (!from[prop]) {
				//@ts-ignore
				from[prop] = (...args: []) => {
					//@ts-ignore
					return to[prop](...args)
				}
			}
		}
	},
}

export default introspectionUtil
