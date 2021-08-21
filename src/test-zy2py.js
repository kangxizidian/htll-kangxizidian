import {fromZY} from './zy2py.js'
import {readFileSync} from 'fs'
let test=0,pass=0;

const zy2py=readFileSync('./zy2py.txt','utf8').trim().split(/\r?\n/);

zy2py.forEach(line=>{
    const [py,zy]=line.split('\t');
    const res=fromZY(zy)
    if (res!==py) {
        console.log('error',zy,py, 'got',res)
        
    } else pass++;
    test++;
})
console.log(fromZY('ㄕㄨㄟˊ'));

console.log(`${pass}/${test} passed`);