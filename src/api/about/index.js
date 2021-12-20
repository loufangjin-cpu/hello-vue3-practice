import service from '@/plugin/axios';

/**获取请假管理 */
export const getLeaveList = (data = {}) => {
    return service({
        url: '/klian/test/test',
        method: 'post',
        data,
    });
};
