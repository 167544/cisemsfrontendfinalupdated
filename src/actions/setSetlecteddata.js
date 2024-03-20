const setSelectedData = (data) => {
    return {
        type: 'selectedData',
        payload: data
    };
};

export default setSelectedData;