import service from '@/plugin/axios';

/**获取请假管理 */
export const getLeaveList = (data = {}) => {
    return service({
        url: 'opapi/crmi18n/crmopapii18n/staffleave/add',
        method: 'post',
        data,
    });
};
