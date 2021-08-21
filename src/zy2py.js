const Pinyin={'ㄅ':'b','ㄆ':'p','ㄇ':'m','ㄈ':'f','ㄉ':'d','ㄊ':'t','ㄋ':'n',
'ㄌ':'l','ㄍ':'g','ㄎ':'k','ㄏ':'h','ㄐ':'j','ㄑ':'q','ㄒ':'x',
'ㄓ':'zh','ㄔ':'ch','ㄕ':'sh','ㄖ':'r','ㄗ':'z','ㄘ':'c','ㄙ':'s',
'ㄧ':'i','ㄢ':'an','ㄠ':'ao','ㄝ':'e','ㄣ':'en',
'ㄛ':'o','ㄨ':'u','ㄚ':'a','ㄜ':'e',
'ㄤ':'ang','ㄥ':'eng','ㄞ':'ai','ㄟ':'ei','ㄡ':'ou',
'-':'1','ˊ':'2','ˇ':'3','ˋ':'4','˙':'5', 
'ㄩ':'v','ㄦ':'er'} 
const PinyinBegin={'ㄨ':'w','ㄧ':'yi','ㄩ':'yu'}
const PinyinSingle={
    'ㄓ':'zhi','ㄗ':'zi','ㄧ':'yi','ㄩ':'yu',
    'ㄫ':'ng','ㄝ':'ê',
    'ㄔ':'chi','ㄘ':'ci',
    'ㄖ':'ri' ,     'ㄕ': 'shi' , 'ㄙ':'si' ,'ㄨ':'wu',
}

// const pinyin_vowel=['a','o',]
// e ê ai ei ao ou an en ang eng er v ng gn


export const fromZY=str=>{
    let out='';

    if (str.length==1||str[1].match(/ˋˊ\-ˇ/)) {
        return PinyinSingle[str[0]] || Pinyin[str[0]];
    }
    for (let i=0;i<str.length;i++) {
        const py=i==0?PinyinBegin[str[i]]||Pinyin[str[i]]:Pinyin[str[i]];
        if (py) {
            out+=py;
        } else {
            out+='!';
        }
    }
    out=out.replace(/uei/,'ui').replace(/ieng/,'ing')
    .replace(/ueng/,'ong').replace(/uen/,'un')
    .replace(/ien/,'in').replace(/iou/,'iu')
    .replace(/veng/,'iong')
    .replace(/yi([aoue])/,'y$1').replace(/yu$/,'you')
    return out.trim();
}
