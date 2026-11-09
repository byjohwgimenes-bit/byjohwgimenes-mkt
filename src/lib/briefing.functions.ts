import { createServerFn } from '@tanstack/react-start';
import { briefingSchema, cleanBriefing } from './briefing';

export const submitBriefing = createServerFn({method:'POST'})
 .validator((input:unknown)=>briefingSchema.parse(input))
 .handler(async({data})=>{
  const d=cleanBriefing(data);
  // This is a narrow public write endpoint: only schema-validated fields are inserted.
  // No reference lookup or public read endpoint exists.
  const {supabaseAdmin}=await import('@/integrations/supabase/client.server');
  const {data:created,error}=await supabaseAdmin.from('briefings').insert({submission_key:d.submission_key,name:d.answers['name'] ?? '',business_name:d.answers['business_name'] ?? '',services:d.services,answers:d.answers,consent:true}).select('reference').single();
  if(!error && created) return {ok:true as const,reference:created.reference};
  if(error?.code==='23505') {
   const {data:existing,error:readError}=await supabaseAdmin.from('briefings').select('reference,services,answers').eq('submission_key',d.submission_key).maybeSingle();
   const canonical=(a:unknown)=>JSON.stringify(a,Object.keys(d.answers).sort());
   if(!readError && existing && JSON.stringify(existing.services)===JSON.stringify(d.services) && canonical(existing.answers)===canonical(d.answers)) return {ok:true as const,reference:existing.reference};
  }
  return {ok:false as const,error:'Não foi possível salvar. Suas respostas continuam aqui; tente novamente.'};
 });
