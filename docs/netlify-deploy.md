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
| SUPABASE_URL | Build e Functions | URL do backend acessível externamente; mesma configuração do projeto |
| SUPABASE_PUBLISHABLE_KEY | Build e Functions | Chave pública/publishable do projeto |
| SUPABASE_SERVICE_ROLE_KEY | Functions, segredo | Chave de serviço do mesmo backend, obtida de forma segura pelo proprietário |

A função de envio do briefing usa SUPABASE_SERVICE_ROLE_KEY para uma inserção validada. Sem essa variável secreta o site pode abrir e o admin pode autenticar, mas o formulário não vai salvar. Essa chave não está no repositório. Não usar prefixo VITE_ para ela, não colar em chat/prints e nunca versioná-la. Se o backend gerenciado não disponibilizar exportação segura dessa chave, resolver isso no painel/suporte antes de considerar o briefing funcional. Não trocar de banco nem criar outro projeto para contornar essa etapa.

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
