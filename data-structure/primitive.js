/// Number
/**
 * @param {number} number 
 */
const format = (number) => {
    let str = number.toString();
    const dIndex = str.indexOf('.');
    let decimals = dIndex !== -1 ? `.${str.split('.')[1]}` : '';

    const len = dIndex === -1 ? str.length : dIndex;
    if (len < 3) {
        return str;
    } else {
        let remainder = len % 3;
        if (remainder > 0) {
            return str.slice(0, remainder) + ',' + str.slice(remainder, len).match(/\d{3}/g).join(',') + decimals;
        } else {
            return str.slice(0, len).match(/\d{3}/g).join(',') + decimals;
        }
    }
};

console.log(format(123456), format(1234567.2111));
console.log(123456..toLocaleString(), (1234567.2111).toLocaleString());

const formatter = new Intl.NumberFormat('en-US');
console.log(formatter.format(123456), formatter.format(1234567.2111));


/// String
/**
 * @param {String} str 
 * @param {'reg' | 'combine'} type
 */
const camelCase = (str, type) => {
    switch (type) {
        case 'combine':
            return str.split('_').map((item, index) => {
                if (index !== 0) {
                    return item.slice(0, 1).toUpperCase() + item.slice(1);
                }
                return item;
            }).join('');
        case 'reg':
            return str.replace(/_([a-z])/g, (_, $1) => $1.toUpperCase());
        default:
            return str;
    }

};

console.log(camelCase('to_fix_up', 'combine'));
console.log(camelCase('to_fix_up', 'reg'));

/**
 * @param {string} template 
 * @param {Record<string, any>} data 
 */
const templateParse = (template, data) => {
    const reg = /{{(.*?)}}/g;
    return template.replace(reg, (_, $1) => {
        return eval($1.trim());
    });
}
const t = 'Hi, my name is {{ data.name }}, my age is {{data.age}}';
const data = { name: 'alice', age: 18 };
console.log(templateParse(t, data));
