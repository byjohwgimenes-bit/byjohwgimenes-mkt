import { PDFDocument } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import fontUrl from '@/assets/fonts/manrope.ttf?url';
import { briefingRows } from './briefing';

export async function createBriefingPdf(data:{reference:string;services:readonly string[];answers:Record<string,string>;created_at:string},fontBytes?:Uint8Array) {
 const doc=await PDFDocument.create(); doc.registerFontkit(fontkit);
 const font=await doc.embedFont(fontBytes ?? new Uint8Array(await (await fetch(fontUrl)).arrayBuffer()),{subset:true});
 let page=doc.addPage([595.28,841.89]); let y=790;
 const line=(text:string,size=10)=>{
  if(y<65){page=doc.addPage([595.28,841.89]);y=790;}
  page.drawText(text,{x:48,y,size,font}); y-=size*1.6;
 };
 const wrap=(text:string,size=10)=>{
  for(const paragraph of text.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g,'').split('\n')) {
   let current='';
   for(const char of paragraph){if(font.widthOfTextAtSize(current+char,size)>499){line(current,size);current='';}current+=char;}
   line(current,size);
  }
 };
 wrap('ByJohwGimenes.',18); wrap('Briefing de projeto',14); wrap(data.reference);wrap(new Date(data.created_at).toLocaleString('pt-BR'));y-=12;
 const rows:[string,string][]=[['Serviços',data.services.join(', ')],...briefingRows(data.services,data.answers)];
 for(const [label,value] of rows){if(y<110){page=doc.addPage([595.28,841.89]);y=790;}wrap(label,11);wrap(value);y-=12;}
 doc.getPages().forEach((p,i)=>p.drawText(`${i+1} / ${doc.getPageCount()}`,{x:48,y:32,size:9,font}));
 doc.setTitle(`Briefing ${data.reference} — ByJohwGimenes.`);
 return doc.save();
}
export async function downloadBriefingPdf(data:Parameters<typeof createBriefingPdf>[0]) {
 const bytes=await createBriefingPdf(data);
 const url=URL.createObjectURL(new Blob([new Uint8Array(bytes)],{type:'application/pdf'}));
 const a=document.createElement('a');a.href=url;a.download=`briefing-${data.reference}.pdf`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
