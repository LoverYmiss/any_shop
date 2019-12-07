exports.base = {
	createFirstArr(arr, id) {
		let childs = [];
		arr.forEach(v => {
			if (v.parent_id == id) {
				childs.push(v);
			}
		});
		return childs;
	}, 
	createResetCate: function (data, id) {
		let childs = this.createFirstArr(data, id);
		if (childs.length == 0) return null;
		
		childs.forEach((v, k) => {
			let buildTree = this.createResetCate(data, v.id);
			if (null != buildTree) {
				v['children'] = buildTree;
			}
		});
				
		return childs;
	},
	delSomeData: function (data, regData) {
		let res = {};
		let regD = regData.join("|");
		let reg = new RegExp("(" + regD + ")", "gi");
		console.log(reg);
		for(let key in data) {
			if(!reg.test(key)) {
				res[key] = data[key]
			}
		}
		console.log(res);
		return res;
	}
};