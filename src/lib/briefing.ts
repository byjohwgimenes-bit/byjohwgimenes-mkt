import { z } from 'zod';

export const SERVICES = ['Branding e identidade visual', 'Gestão de redes sociais', 'Criação de conteúdo para redes sociais', 'Design gráfico', 'Perfil da Empresa no Google', 'Captação de vídeos/Videomaker', 'Edição de vídeos', 'Edição de imagens', 'Meta Ads', 'Google Ads', 'Ainda não sei—preciso de orientação'] as const;
export const BRIEFING_STATUS = { novo: 'Novo', em_atendimento: 'Em atendimento', proposta_enviada: 'Proposta enviada', fechado: 'Fechado', nao_avancou: 'Não avançou' } as const;
export type Field = { key: string; label: string; required?: boolean; options?: string[]; type?: string; long?: boolean; max?: number };
export const CONTACT_FIELDS: Field[] = [
 {key:'name',label:'Seu nome',required:true,max:100}, {key:'business_name',label:'Empresa ou marca',required:true,max:120}, {key:'whatsapp',label:'WhatsApp com DDD',required:true,type:'tel',max:20}, {key:'city',label:'Cidade',required:true,max:100}, {key:'state',label:'Estado (UF)',required:true,max:2}, {key:'email',label:'E-mail',type:'email',max:255}, {key:'links',label:'Instagram ou site',max:500},
];
export const PROJECT_FIELDS: Field[] = [
 {key:'business',label:'Descreva seu negócio e o que oferece',required:true,long:true}, {key:'audience',label:'Quem é seu público-alvo?',required:true,long:true}, {key:'goal',label:'Qual é o seu objetivo?',required:true,long:true}, {key:'difficulty',label:'Qual é sua maior dificuldade?',required:true,long:true},
 {key:'identity',label:'Já possui identidade visual?',required:true,options:['Sim','Não','Parcial']}, {key:'start',label:'Quando pretende começar?',required:true,options:['Assim que possível','Tenho data','Estou pesquisando']}, {key:'start_date',label:'Data desejada para início',type:'date',required:true}, {key:'references',label:'Referências que você gosta',long:true}, {key:'budget',label:'Orçamento previsto para o serviço',max:200}, {key:'additional',label:'Informações adicionais',long:true},
];
export const SPECIFIC_GROUPS: {title:string; services: readonly string[]; fields: Field[]}[] = [
 {title:'Branding e identidade',services:[SERVICES[0]],fields:[{key:'branding_type',label:'Momento da marca',options:['Marca nova','Reformulação']},{key:'branding_keep',label:'O que deseja manter ou mudar?',long:true}]},
 {title:'Redes sociais e conteúdo',services:[SERVICES[1],SERVICES[2]],fields:[{key:'social_channels',label:'Quais canais deseja trabalhar?'},{key:'social_support',label:'Que apoio precisa na gestão e no conteúdo?',long:true}]},
 {title:'Design gráfico',services:[SERVICES[3]],fields:[{key:'design_pieces',label:'Quais peças deseja criar?',long:true}]},
 {title:'Perfil da Empresa no Google',services:[SERVICES[4]],fields:[{key:'google_existing',label:'Já tem um perfil da empresa?',options:['Sim','Não','Não sei']},{key:'google_need',label:'O que precisa no perfil?',long:true}]},
 {title:'Captação de vídeos',services:[SERVICES[5]],fields:[{key:'capture_subject',label:'O que será filmado?'},{key:'capture_location',label:'Local da produção'},{key:'capture_date',label:'Data prevista da produção',type:'date'}]},
 {title:'Edição de vídeos e imagens',services:[SERVICES[6],SERVICES[7]],fields:[{key:'edit_material',label:'Quais materiais já possui?'},{key:'edit_use',label:'Onde e como o material será usado?',long:true}]},
 {title:'Meta Ads e Google Ads',services:[SERVICES[8],SERVICES[9]],fields:[{key:'ads_experience',label:'Já anunciou antes?',options:['Sim','Não']},{key:'ads_product',label:'Qual produto ou oferta deseja anunciar?'},{key:'ads_media_budget',label:'Verba de mídia (separada do valor do serviço)',max:200}]},
];
export const ALL_FIELDS = [...CONTACT_FIELDS,...PROJECT_FIELDS,...SPECIFIC_GROUPS.flatMap(g=>g.fields)];
const shape = Object.fromEntries(ALL_FIELDS.map(f=>[f.key,z.string().trim().max(f.max ?? 1500).default('')]));
export const briefingSchema = z.object({ submission_key:z.uuid(), services:z.array(z.enum(SERVICES)).min(1,'Selecione pelo menos um serviço').max(12), answers:z.object(shape), consent:z.boolean() }).superRefine((d,ctx)=>{
 const issue = (key:string,message:string) => ctx.addIssue({code:'custom',path:['answers',key],message});
 for(const f of [...CONTACT_FIELDS,...PROJECT_FIELDS]) {
  if(f.required && !(f.key==='start_date' && d.answers['start']!=='Tenho data') && (d.answers[f.key]?.length ?? 0)<2) issue(f.key,'Preencha este campo');
 }
 if(!/^[A-Za-z]{2}$/.test(d.answers['state'] ?? '')) issue('state','Informe a UF com duas letras');
 const phone = d.answers['whatsapp'] ?? '';
 if(!/^[\d\s()+-]{10,20}$/.test(phone) || ![10,11,12,13].includes(phone.replace(/\D/g,'').length)) issue('whatsapp','Informe um número válido com DDD');
 if(d.answers['email'] && !z.email().safeParse(d.answers['email']).success) issue('email','Informe um e-mail válido');
 for(const f of ALL_FIELDS) {
  const value = d.answers[f.key];
  if(value && f.options && !f.options.includes(value)) issue(f.key,'Selecione uma opção válida');
  if(value && f.type==='date') {
   const date = new Date(value+'T00:00:00Z');
   if(!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0,10)!==value) issue(f.key,'Informe uma data válida');
  }
 }
 if(new Set(d.services).size!==d.services.length) ctx.addIssue({code:'custom',path:['services'],message:'Serviços repetidos'});
 if(!d.consent) ctx.addIssue({code:'custom',path:['consent'],message:'Autorize o uso dos dados para atendimento'});
});
export type BriefingInput = z.infer<typeof briefingSchema>;
export const visibleProjectFields = (answers:Record<string,string>)=>PROJECT_FIELDS.filter(f=>f.key!=='start_date'||answers['start']==='Tenho data');
export const selectedGroups = (services:readonly string[])=>SPECIFIC_GROUPS.filter(g=>g.services.some(s=>services.includes(s)));
export function cleanBriefing(d:BriefingInput): BriefingInput {
 const allowed = new Set([...CONTACT_FIELDS,...visibleProjectFields(d.answers),...selectedGroups(d.services).flatMap(g=>g.fields)].map(f=>f.key));
 return {...d,answers:Object.fromEntries(Object.entries(d.answers).filter(([key])=>allowed.has(key)))};
}
export function briefingRows(services:readonly string[],answers:Record<string,string>) {
 const fields=[...CONTACT_FIELDS,...visibleProjectFields(answers),...selectedGroups(services).flatMap(g=>g.fields)];
 // Historical photography responses remain readable, without accepting new photography submissions.
 if(services.includes('Fotografia') && !services.includes(SERVICES[5])) fields.push(...(SPECIFIC_GROUPS.find(g=>g.title==='Captação de vídeos')?.fields ?? []));
 return fields.map(f=>[f.key==='capture_subject'&&services.includes('Fotografia')?'Assunto da produção':f.label,answers[f.key] || 'Não informado'] as [string,string]);
}
export function briefingMessage(name:string,business:string,reference:string,services:readonly string[]) {
 return `Olá, Johw! Sou ${name}, da ${business}. Preenchi o briefing nº ${reference} para os serviços de ${services.join(', ')}. Gostaria de conversar sobre meu projeto.`;
}
