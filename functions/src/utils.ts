const eaw = require('eastasianwidth');

export function wslice(s: string, n?:number){
    return n == undefined ? [s] : [...s].reduce((acc:string[], c)=>{
        const val = [acc.slice(-1)[0], c].join('')
        return width(val) <= n ? [...acc.slice(0,-1), val] : [...acc, c]
    },[]);
}

export function width(s: string) {
    return s.split('').reduce((w: number, c: string) => {
        return w + ('FWA'.includes(eaw.eastAsianWidth(c)) ? 2 : 1);
    }, 0);
}

export function greatest_el_width(x: string[]){
    return x.reduce((acc: number, el: string)=>{
        const num = width(el);
        return acc > num ? acc : num;
    },0);
}

export function margeln(x: string[]) {
    return x.reduce((acc, v) => `${acc}${v}\n`, "").trim();
}
