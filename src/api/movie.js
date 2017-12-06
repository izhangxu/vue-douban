const movie_type = [{
	cur: 0,
	txt: '综合',
	api: 'https://api.douban.com/v2/movie/search',
	params: {
		count: 10
	}
}, {
	cur: 0,
	txt: '正在热映',
	api: 'https://api.douban.com/v2/movie/in_theaters',
	params: {
		count: 10
	}
}, {
	cur: 0,
	txt: '即将上映',
	api: 'https://api.douban.com/v2/movie/coming_soon',
	params: {
		count: 10
	}
}, {
	cur: 0,
	txt: 'Top250',
	api: 'https://api.douban.com/v2/movie/top250',
	params: {
		count: 10
	}
}, {
	cur: 0,
	txt: '北美票房榜',
	api: 'https://api.douban.com/v2/movie/us_box',
	params: {
		count: 10
	}
}];
