export const getPagination = (page?: number, limit: number = 15) => {
    const from = page - 1 > 0 ? limit * (page - 1) + 1 : 0;
    const to = page - 1 > 0 ? from + limit : limit;

    return {
        from,
        to: to - 1,
    };
};