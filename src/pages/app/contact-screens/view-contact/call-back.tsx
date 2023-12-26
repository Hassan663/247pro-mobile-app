export const removeNullFields = (data: any) => {
    const newData = { ...data };

    for (const key in newData) {
        if (newData[key] === null || newData[key] === undefined) {
            delete newData[key];
        } else if (Array.isArray(newData[key])) {
            newData[key] = newData[key].map((item: any) => {
                if (item !== null && typeof item === 'object') {
                    return removeNullFields(item);
                }
                return item;
            }).filter((item: any) => item !== null);

            if (newData[key].length === 0) {
                delete newData[key];
            }
        } else if (typeof newData[key] === 'object' && newData[key] !== null) {
            newData[key] = removeNullFields(newData[key]);
            if (Object.keys(newData[key]).length === 0) {
                delete newData[key];
            }
        }
    }

    return newData;
};


export const flattenObject = (obj: any, prefix = '') => {
    let result:any = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];

            if (typeof value === 'object' && !Array.isArray(value)) {
                result = result.concat(flattenObject(value, `${prefix}${key}.`));
            } else {
                result.push({ key: `${prefix}${key}`, value });
            }
        }
    }
    return result;
};
