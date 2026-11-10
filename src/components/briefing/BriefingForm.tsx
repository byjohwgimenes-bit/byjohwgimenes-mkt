import { useRef, useState } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight, Check, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SERVICES, CONTACT_FIELDS, ALL_FIELDS, selectedGroups, visibleProjectFields, briefingSchema, briefingRows, briefingMessage, type Field } from '@/lib/briefing';
import { submitBriefing } from '@/lib/briefing.functions';
import { settingsQuery } from '@/lib/site-data';
import { whatsappLink } from '@/lib/whatsapp';

const steps=['Serviços','Seu negócio','Projeto','Detalhes','Revisão'];
export function BriefingForm() {
 const [step,setStep]=useState(0);
 const [services,setServices]=useState<(typeof SERVICES)[number][]>([]);
 const [answers,setAnswers]=useState<Record<string,string>>(Object.fromEntries(ALL_FIELDS.map(f=>[f.key,''])));
 const [consent,setConsent]=useState(false);
 const [errors,setErrors]=useState<Record<string,string>>({});
 const [busy,setBusy]=useState(false);const lock=useRef(false);const key=useRef<string | null>(null);
 const [reference,setReference]=useState<string | null>(null);
 const [failure,setFailure]=useState('');
 const save=useServerFn(submitBriefing);const {data:settings}=useQuery(settingsQuery);
 const set=(k:string,v:string)=>setAnswers(a=>({...a,[k]:v}));
 const changeStep=(n:number)=>{setStep(n);setErrors({});document.getElementById('briefing-top')?.scrollIntoView({behavior:'smooth'});};
 const field=(f:Field)=><div key={f.key} className={f.long?'sm:col-span-2':''}>
  <Label htmlFor={f.key}>{f.label}{f.required?' *':' (opcional)'}</Label>
  {f.options ? <select id={f.key} className="mt-2 min-h-11 w-full rounded-md border border-input bg-background px-3 text-sm" value={answers[f.key] ?? ''} onChange={e=>set(f.key,e.target.value)} aria-invalid={!!errors[f.key]}><option value="">Selecione</option>{f.options.map(o=><option key={o}>{o}</option>)}</select>
  : f.long ? <Textarea id={f.key} rows={3} maxLength={f.max ?? 1500} value={answers[f.key] ?? ''} onChange={e=>set(f.key,e.target.value)} className="mt-2" aria-invalid={!!errors[f.key]} />
  : <Input id={f.key} type={f.type ?? 'text'} maxLength={f.max ?? 1500} value={answers[f.key] ?? ''} onChange={e=>set(f.key,e.target.value)} className="mt-2 min-h-11" aria-invalid={!!errors[f.key]} />}
  {f.key==='audience' && <label className="mt-2 flex items-center gap-2 text-sm"><Checkbox checked={answers['audience']==='Preciso de ajuda'} onCheckedChange={v=>set('audience',v===true?'Preciso de ajuda':'')} />Preciso de ajuda com o público-alvo</label>}
  {f.key==='budget' && <label className="mt-2 flex items-center gap-2 text-sm"><Checkbox checked={answers['budget']==='Quero orientação'} onCheckedChange={v=>set('budget',v===true?'Quero orientação':'')} />Quero orientação sobre orçamento</label>}
  {errors[f.key] && <p className="mt-1 text-sm text-destructive" role="alert">{errors[f.key]}</p>}
 </div>;
 const validate=(all=false)=>{
  const result=briefingSchema.safeParse({submission_key:key.current ?? '00000000-0000-4000-8000-000000000001',services,answers,consent});
  const active = step===0?['services']:step===1?CONTACT_FIELDS.map(f=>f.key):step===2?visibleProjectFields(answers).map(f=>f.key):step===3?selectedGroups(services).flatMap(g=>g.fields).map(f=>f.key):['consent'];
  const next:Record<string,string>={};
  if(!result.success) for(const i of result.error.issues){const k=String(i.path.at(-1));if(all||active.includes(k))next[k]??=i.message;}
  setErrors(next);return Object.keys(next).length===0;
 };
 async function submit(e:React.FormEvent){
  e.preventDefault();if(lock.current)return;
  if(step<4){if(validate())changeStep(step+1);return;}
  if(!validate(true))return;
  lock.current=true;setBusy(true);setFailure('');
  key.current ??=crypto.randomUUID();
  try{const result=await save({data:{submission_key:key.current,services,answers,consent}});if(result.ok)setReference(result.reference);else setFailure(result.error);}
  catch{setFailure('Não foi possível salvar. Suas respostas continuam aqui; tente novamente.');}
  finally{lock.current=false;setBusy(false);}
 }
 if(reference){const link=whatsappLink(settings?.whatsapp_number,briefingMessage(answers['name'] ?? '',answers['business_name'] ?? '',reference,services));return <div className="py-12"><Check className="mb-6 size-12 text-primary"/><h2 className="text-3xl font-bold">Briefing recebido! Agora já tenho as informações para entender seu projeto.</h2><p className="mt-5 break-all font-semibold">Referência: {reference}</p>{link?<Button asChild size="lg" className="mt-8"><a href={link} target="_blank" rel="noopener noreferrer"><MessageCircle/>Avisar Johw pelo WhatsApp</a></Button>:<p className="mt-6 text-muted-foreground">Seu briefing foi salvo. O WhatsApp ainda não está configurado.</p>}<p className="mt-4 text-sm text-muted-foreground">Ao abrir o WhatsApp, você precisa tocar em Enviar. Nenhuma mensagem é enviada automaticamente.</p></div>;}
 return <form onSubmit={submit} noValidate id="briefing-top">
  <ol className="mb-10 grid grid-cols-5 gap-2 border-b pb-6" aria-label="Etapas do briefing">{steps.map((s,i)=><li key={s} aria-current={step===i?'step':undefined} className={step===i?'text-primary':'text-muted-foreground'}><span className="block font-display text-xl font-bold">0{i+1}</span><span className="hidden text-xs sm:block">{s}</span></li>)}</ol>
  <p className="mb-2 text-sm text-muted-foreground">Etapa {step+1} de 5</p><h2 className="mb-8 text-2xl font-bold">{steps[step]}</h2>
  <fieldset disabled={busy}>
  {step===0 && <><div className="grid gap-3 sm:grid-cols-2">{SERVICES.map(s=><label key={s} className="flex min-h-16 cursor-pointer items-center gap-3 rounded-md border p-4 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-accent"><Checkbox checked={services.includes(s)} onCheckedChange={v=>setServices(a=>v===true?[...a,s]:a.filter(x=>x!==s))}/><span className="text-sm font-medium">{s}</span></label>)}</div>{errors['services']&&<p role="alert" className="mt-3 text-sm text-destructive">{errors['services']}</p>}</>}
  {step===1 && <div className="grid gap-6 sm:grid-cols-2">{CONTACT_FIELDS.map(field)}</div>}
  {step===2 && <div className="grid gap-6 sm:grid-cols-2">{visibleProjectFields(answers).map(field)}</div>}
  {step===3 && <div className="space-y-8">{selectedGroups(services).map(g=><section key={g.title}><h3 className="mb-5 border-b pb-3 text-lg font-semibold">{g.title}</h3><div className="grid gap-6 sm:grid-cols-2">{g.fields.map(field)}</div></section>)}{selectedGroups(services).length===0 && <p className="text-muted-foreground">Seu projeto será alinhado na conversa com Johw.</p>}<p className="text-sm text-muted-foreground">Não informe senhas, tokens ou dados de acesso.</p></div>}
  {step===4 && <><div className="mb-6 flex items-start justify-between gap-4"><p className="text-sm leading-relaxed">{services.join(' · ')}</p><Button type="button" variant="outline" size="sm" onClick={()=>changeStep(0)}>Editar</Button></div><dl className="divide-y">{briefingRows(services,answers).map(([l,v])=><div key={l} className="py-4"><dt className="text-xs font-semibold text-muted-foreground">{l}</dt><dd className="mt-1 whitespace-pre-wrap break-words text-sm">{v}</dd></div>)}</dl><label className="mt-8 flex items-start gap-3 text-sm"><Checkbox checked={consent} onCheckedChange={v=>setConsent(v===true)} /><span>Autorizo o uso dos dados pela ByJohwGimenes. apenas para entender meu projeto e entrar em contato para atendimento, não para marketing. *</span></label>{errors['consent']&&<p role="alert" className="mt-2 text-sm text-destructive">{errors['consent']}</p>}{Object.entries(errors).filter(([k])=>k!=='consent').map(([k,v])=><p role="alert" key={k} className="mt-2 text-sm text-destructive">{ALL_FIELDS.find(f=>f.key===k)?.label ?? k}: {v}</p>)}</>}
  </fieldset>
  {failure&&<p role="alert" className="mt-6 text-destructive">{failure}</p>}
  <div className="mt-10 flex flex-wrap justify-between gap-3 border-t pt-6">{step>0?<Button type="button" variant="outline" disabled={busy} onClick={()=>changeStep(step-1)}><ArrowLeft/>Voltar</Button>:<span/>}<Button type="submit" size="lg" disabled={busy}>{busy?'Salvando…':step===4?'Enviar briefing':'Continuar'}<ArrowRight/></Button></div>
 </form>;
}
