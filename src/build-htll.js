/*
convert xml to html ,
one time job
*/

import {readFileSync,writeFileSync,readdirSync, fstat, writeFile} from'fs';

const folder='../xml/';

const outfolder='../../kxzd/';
const files=readdirSync(folder);
const header=`<!DOCTYPE html><html lang="en">
<head><meta charset='utf-8'>
<meta name='viewport' content='width=device-width,initial-scale=1'>
<link rel='stylesheet' href='kxzd.css'>
<script defer src='kxzd.js'></script>
<body>`
//files.length=1;
const fileWordheads={};

files.forEach(file=>{
    const out=[header];
    let lines=readFileSync(folder+file,'utf8').split(/\r?\n/);
    const outfn=file.replace('.xml','.htm')
    fileWordheads[outfn]=[];
    lines.forEach(L=>{
        let unicode='';
        L=L.replace(/<wh ([^>/].+?)>(.+)<\/wh>/g,(m,attr,wh)=>{
            const u=attr.match(/(?:unicode=")([^"]+)"/);
            if (u) unicode=u[1];
            return '<wh>'+wh+'</wh>'
        });
        if (unicode) {
            L='<a name="u'+unicode+'"></a>\n'+L;
            fileWordheads[outfn].push('u'+unicode);
        }

        L=L.replace(/<pb ([^/>].+?)\/>/g,(m,attr)=>{
            return '<pb '+attr+'></pb>';
        });

        L=L.replace(/<note( .+?)\/>/g,(m,attr,content)=>{
            return '<note'+attr+'></note>';
        });

        const first4=L.substr(0,4);
        const first5=L.substr(0,5);
        if (first4=='<sc ') L='<sc '+L.substr(4,L.length-6)+'></sc>';
        if (first4=='<ps ') L='<ps '+L.substr(4,L.length-6)+'></ps>';
        if (first4=='<d/>') L='<d>'+L.substr(4)+'</d>';
        if (first5=='<dd/>') L='<dd>'+L.substr(5)+'</dd>';
        if (first5=='<ph/>') L='<ph>'+L.substr(5)+'</ph>';
        out.push(L);
    })

    out.push('</body></html>')
    writeFileSync(outfolder+outfn,out.join('\n'),'utf8');
})

