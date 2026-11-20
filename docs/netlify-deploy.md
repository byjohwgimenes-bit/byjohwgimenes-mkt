# Publicar na Netlify mantendo o desenvolvimento no Lovable

## Build
- Repositório: byjohwgimenes-bit/byjohwgimenes-mkt, branch main.
- Base directory: vazio (raiz).
- Build command: `bun run build` (o repositório usa bun.lock).
- Publish directory: `dist`.
- Functions directory: deixar vazio; Nitro gera e registra a função SSR automaticamente.
- Node 22; NITRO_PRESET=netlify, definidos em netlify.toml.
- Não adicionar fallback SPA `/* /index.html`: rotas e funções de servidor são atendidas pelo Nitro.

A configuração padrão do Lovable permanece: o wrapper ignora o preset externo no sandbox. Fora do sandbox, o Nitro usa o preset Netlify. O deploy é feito pela Netlify após conectar o repositório; não executar deploy pelo Lovable para essa finalidade.

## Variáveis de ambiente
No painel Netlify, configure as variáveis antes do deploy:

| Nome | Escopo | Origem |
| --- | --- | --- |
| VITE_SUPABASE_URL | Build | Valor público do .env do projeto |
| VITE_SUPABASE_PUBLISHABLE_KEY | Build | Chave pública/publishable do .env |
| BRIEFING_SUBMISSION_MODE | Functions | `relay` |
| BRIEFING_RELAY_SECRET | Functions, segredo | Mesmo segredo dedicado cadastrado no Lovable; nunca prefixar com VITE_ |

A função da Netlify encaminha somente briefings validados por HTTPS para o endpoint fixo `https://byjohwgimenes-mkt.lovable.app/api/public/briefing-submission`. A chave privilegiada do banco permanece exclusivamente no Lovable Cloud; ela não está disponível para exportação e não deve ser solicitada ou cadastrada na Netlify. Login, formulário, tabelas e RLS não mudam.

### Ativação manual do envio (ainda pendente)
1. Antes de sincronizar commits, pause o deploy automático da main na Netlify se não quiser publicar o site. Commits podem disparar um deploy; este trabalho não executa publicação nem muda a configuração da Netlify.
2. Crie um segredo dedicado forte em seu gerenciador de senhas (pelo menos 32 caracteres), sem enviá-lo no chat. Cadastre o mesmo valor como `BRIEFING_RELAY_SECRET` em Project Settings → Secrets no Lovable e nas variáveis da Netlify, escopo Functions. Não reutilize chaves de banco ou outros segredos.
3. Na Netlify, cadastre `BRIEFING_SUBMISSION_MODE=relay` no escopo Functions. No Lovable, não configure esse modo como relay.
4. Publique manualmente a versão Lovable para disponibilizar o receptor; novas Edge Functions não são suportadas neste projeto TanStack, por isso o receptor é uma rota de servidor hospedada no Lovable. O endpoint não existe na versão publicada anterior (GET retornou 404 durante o diagnóstico).
5. Confirme sem gravar dados: GET no endpoint deve retornar 405, e POST sem assinatura deve retornar 401 após o segredo ser configurado. Sem configuração o receptor falha fechado com 503. Esses probes não inserem registros.
6. Só depois faça o deploy manual da Netlify com os segredos no runtime. O servidor assina método, caminho, horário e corpo; o receptor aceita assinatura HMAC válida por cinco minutos e devolve somente referência. Timeout de dez segundos e limite de 64 KiB; redirects são recusados. Em falha, as respostas e submission_key ficam no formulário para nova tentativa, sem confirmação falsa.

A origem acima foi confirmada por `project_urls.get_urls`, não inferida a partir do domínio da Netlify. A rota é criada neste código e exige publicação Lovable para existir em produção. Nenhum registro de produção foi criado no diagnóstico. Testes locais usam armazenamento e transporte em memória. A validação real entre as duas hospedagens continua pendente; não realizar submissões reais sem autorização.

Não copiar URLs internas de sandbox para a Netlify. Conferir acesso externo ao backend real e nunca substituir automaticamente URLs/chaves ou reduzir RLS.

## Imagens e documentos
As seis capas usam a primeira página JPEG local em public/portfolio-pages; as 93 páginas, logos e fontes permanecem disponíveis sem proxy de assets Lovable. Os PDFs originais continuam preservados nos apontadores de src/assets/portfolio/*.pdf.asset.json; esses endereços relativos são específicos de Lovable e não são usados pelo leitor atual. Não criar botões para eles na Netlify sem providenciar armazenamento externo público durável. O leitor exibe as cópias JPEG autorizadas.

## Autenticação e publicação
Após conhecer o endereço definitivo da Netlify, cadastrar esse endereço no provedor de autenticação (Site URL/redirect URLs, quando aplicável). Não expor cadastro público nem links para /admin. Não mudar a visibilidade do repositório ou remover o site Lovable durante a validação.

## Verificação antes de divulgar
1. Home, /sobre-mim, /servicos, /cases e /cases/najar-imoveis abrem também após recarregar diretamente.
2. Logos, capas e leitor das 93 páginas funcionam nos seis projetos.
3. Links dos cinco perfis, dez Reels e um YouTube funcionam.
4. Envio de briefing de teste retorna referência real e aparece em /admin.
5. Admin exige login e continua protegido por RLS; verificar atualização e ações com dados fictícios.
6. WhatsApp abre com a configuração correta.
7. Nenhum segredo aparece no bundle público, repositório ou logs.

Após conectar Netlify ao GitHub, novos commits na branch main podem disparar deploy automático. Continue editando pelo Lovable ou GitHub, preservando a mesma conexão e o histórico. Para revisar antes de publicar cada mudança, configure uma branch de produção separada ou builds sob controle na Netlify.
