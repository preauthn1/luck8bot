import service from '@/utils/request';

// 首页数据
export const home_data = (params) => {
    return service.get('/v1/lottery_results_all',params);
}

//更新首页当个数据
export const update_data = (params) => {
    return service.get('/v1/lottery_results',{params});
}

// 获取游戏开奖历史
export const lottery_history = (params) => {
    return service.get('/v1/lottery_list',{params});
}

//获取统计列表
export const lottery_list = (params) => {
    return service.get('/v1/lottery_statistics',{params});
}

