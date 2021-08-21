import { readFileSync, writeFileSync } from "fs";


const mapping=[];
const lines=readFileSync('./pinyinbiao.txt','utf8').split(/\r?\n/)
lines.forEach(line=>{
    const cols=line.split('\t');
    const [py,py1,zy]=cols;
    if (py.indexOf('1')>-1) {
        mapping.push(py.replace(/1$/,'')+'\t'+zy);
    }
})
writeFileSync('zy2py.txt',mapping.join('\n'))