export const data_footer = [{
	txt: '首页',
	name: 'Index',
	class: 'footer_icon_01',
	cur: 0
}, {
	txt: '电影',
	name: 'Movie',
	class: 'footer_icon_02',
	cur: 0
}, {
	txt: '我的',
	name: 'Admin',
	class: 'footer_icon_03',
	cur: 0
}];

export const data_movie_tabs = [{
	cur: 0,
	txt: '综合',
	index: 0
}, {
	cur: 1,
	txt: '正在热映',
	index: 1
}, {
	cur: 0,
	txt: '即将上映',
	index: 2
}, {
	cur: 0,
	txt: 'Top250',
	index: 3
}, {
	cur: 0,
	txt: '北美票房榜',
	index: 4
}];

export const ajaxApi = [{
	index: 0,
	url: '/v2/movie/search',
	params: {
		count: 10
	}
}, {
	index: 1,
	url: '/v2/movie/in_theaters',
	params: {
		count: 10
	}
}, {
	index: 2,
	url: '/v2/movie/coming_soon',
	params: {
		count: 10
	}
}, {
	index: 3,
	url: '/v2/movie/top250',
	params: {
		count: 10
	}
}, {
	index: 4,
	url: '/v2/movie/us_box',
	params: {
		count: 10
	}
}];