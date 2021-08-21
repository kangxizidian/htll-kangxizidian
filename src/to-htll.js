import {readFileSync,writeFileSync,readdirSync} from'fs';
const folder='../xml/';
const files=readdirSync(folder);

const zhuyin={};
const to_htll=content=>{
    content.replace(/<zy>(.+?)<\/zy>/g,(m,m1)=>{
        
        const zy=m1.replace('注音：','').split(',');
        zy.forEach(y=>{
            if (!zhuyin[y]) zhuyin[y]=0;
            zhuyin[y]++;
        })
    })
}

// files.length=1;
files.forEach(file=>{
    console.log(file)
    const content=readFileSync(folder+file,'utf8');
    const output=to_htll(content);
    // writeFileSync('../htll/'+file.replace('.xml','.html'),output,'utf8');
})

const out=[];
for (let zy in zhuyin) {
    out.push([zhuyin[zy],zy]);
}

out.sort((a,b)=>b[0]-a[0]);
// console.log(out)
// writeFileSync('kxzd-zy.txt',out.map(item=>item[1]).join('\n'),'utf8')