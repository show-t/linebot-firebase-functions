import * as utils from './utils'

export function Emp(msg: string) {
    const lines = msg.split(/\n/);
    const len = utils.greatest_el_width(lines);
    
    const middle = lines.map((el)=>{
        return `＞　${el}${' '.repeat(len-utils.width(el))}　＜`;
    });

    const components = [
        `＿${'人'.repeat(len/2 + 2)}＿`,
        ...middle,
        `￣${'Y^'.repeat(len/2 + 2)}￣`,
    ];

    return utils.margeln(components);
}
