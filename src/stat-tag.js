import {readFileSync,writeFileSync,readdirSync, fstat} from'fs';
const folder='../xml/';
const files=readdirSync(folder);

const Tagname={};
files.forEach(file=>{
    console.log(file)
    const content=readFileSync(folder+file,'utf8');
    content.replace(/(<[^<]+>)/g,(m,m1)=>{
        let tag=m1.substr(1);
        const at=m1.indexOf(' ');
        if (at> -1) tag=tag.substr(0,at-1);
        if (!Tagname[tag]) Tagname[tag]=0;
        Tagname[tag]++

    })
})

writeFileSync('tags.txt',JSON.stringify(Tagname,'',' '),'utf8');