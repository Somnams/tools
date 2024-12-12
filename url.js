const url = 'http://www.domain.com/?user=anonymous&id=12.33&id=456&id=4569&city=%E5%8C%97%E4%BA%AC&enabled';

/**
 * @param {String} url
 * @param {'build-in' | 'reg'} type
 */
const parserUrl = (url, type = 'build-in') => {
    const res = {};
    switch (type) {
        case 'build-in': {
            const params = new URL(url).searchParams;
            params.forEach((val, key) => {
                const newVal = isNaN(parseFloat(val)) ? ([null, undefined, ''].includes(val) ? true : val) : parseFloat(val);
                if (res.hasOwnProperty(key)) {
                    res[key] = Array.isArray(res[key]) ? res[key].concat([newVal]) : [res[key]].concat([newVal]);
                } else {
                    res[key] = newVal;
                }
            });
        }
            break;
        case 'reg': {
            const u = url.split('?')[1];
            const queryList = u.split('&');
            for (let i = 0; i < queryList.length; i++) {
                if (/=/.test(queryList[i])) {
                    const [key, v] = queryList[i].split('=');
                    if (res.hasOwnProperty(key)) {
                        res[key] = [].concat([res[key], v]).flat().map(val => /^\d+$/.test(val) ? parseFloat(val) : val);
                    } else {
                        res[key] = decodeURIComponent(v);
                    }
                } else {
                    res[queryList[i]] = true;
                }
            }
        }
            break;
        default:
            break;
    }
    return res;
}

console.log(parserUrl(url));
console.log(parserUrl(url, 'reg'));