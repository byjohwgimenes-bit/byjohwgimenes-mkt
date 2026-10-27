# ByJohwGimenes MKT

MVP de planos de social media para pequenos negócios, desenvolvido com apoio de IA e Lovable para um desafio da DIO.

**Aplicação:** https://byjohwgimenes-mkt.lovable.app

## A dor e a oportunidade

Pequenos negócios precisam manter suas redes sociais atualizadas, mas nem sempre têm tempo ou conhecimento para planejar conteúdos e encontrar um serviço adequado. A proposta é oferecer planos de social media e facilitar o primeiro contato com a ByJohwGimenes MKT. O público inicial inclui empresas de Mogi das Cruzes e Suzano, sem restringir o atendimento a essas cidades.

## Tese e hipóteses do MVP

A tese é que pequenos negócios interessados em organizar sua presença digital usarão uma página simples para conhecer os planos e iniciar uma conversa pelo WhatsApp.

Hipóteses a testar com potenciais clientes reais:

- A proposta e as opções de planos são compreensíveis.
- Os visitantes estão dispostos a preencher o formulário e iniciar uma conversa.
- Uma parte dos contatos demonstra interesse em contratar.
- O painel ajuda a acompanhar contatos, clientes e entregas.

**Estado da validação:** o fluxo foi testado com dados fictícios; os testes técnicos não comprovam demanda nem contratação. Entrevistas e testes com clientes reais ainda são necessários.

## Mercado: TAM, SAM e SOM

Os valores de mercado ainda precisam ser pesquisados e validados; não foram usados números fictícios.

- **TAM:** negócios que podem contratar serviços de social media no mercado escolhido.
- **SAM:** parcela atendível dentro do público, das localidades e dos serviços definidos.
- **SOM:** parcela do SAM que pode ser conquistada com a capacidade e os canais disponíveis.

Para estimá-los, definir uma fonte e data para a quantidade de negócios, filtrar público e localização, estimar gasto anual potencial e estabelecer uma meta alcançável de clientes. Registrar as premissas e fontes antes de apresentar valores.

## Business Model Canvas

| Bloco | Hipótese inicial |
| --- | --- |
| Segmentos de clientes | Pequenos negócios que precisam de apoio nas redes sociais. |
| Proposta de valor | Planos de social media com contato direto e acompanhamento das entregas. |
| Canais | Site, WhatsApp, redes sociais e indicações. |
| Relacionamento | Atendimento personalizado e acompanhamento direto. |
| Receitas | Contratação de planos de serviço; preços definidos após conversa. |
| Recursos principais | Experiência em marketing, ferramentas de criação, site e tempo de atendimento. |
| Atividades principais | Prospecção, planejamento, criação de conteúdo e gestão das entregas. |
| Parcerias principais | Parceiros de design, ferramentas digitais e fornecedores conforme necessidade. |
| Custos | Tempo de trabalho, ferramentas, divulgação e eventuais serviços contratados. |

Este Canvas reúne hipóteses, que precisam ser validadas.

## Funcionalidades

- Página de apresentação e três planos editáveis.
- Formulário de interesse com consentimento e continuidade pelo WhatsApp.
- Painel restrito para acompanhar contatos, converter em cliente e registrar entregas.
- Edição de planos e dados comerciais no painel.
- Persistência de dados usando o backend do Lovable Cloud.

A proposta, o fechamento da venda, o pagamento e o atendimento são feitos manualmente. Pagamento integrado, mensagens automáticas e publicação automática nas redes não fazem parte deste MVP.

## Prompt do projeto

O texto abaixo é uma **reconstrução resumida dos requisitos**, não uma transcrição literal do prompt original, que foi enviado ao Lovable como documento anexo.

```markdown
Crie um MVP chamado ByJohwGimenes MKT para oferecer planos de social media
a pequenos negócios. Use uma identidade visual em preto/grafite, branco e
amarelo, com layout responsivo e conteúdo em português do Brasil.

Inclua uma página de apresentação, três planos editáveis e um formulário
para registrar o interesse e seguir para uma conversa no WhatsApp.

Use Lovable Cloud para armazenar os dados. Crie uma área administrativa
restrita para acompanhar contatos, convertê-los em clientes sem redigitar
informações e registrar entregas e lembretes. Permita editar planos e
dados de contato no painel.

Proteja os dados de contatos, clientes e entregas; apenas informações
comerciais destinadas ao público devem ser exibidas na página. Não invente
preços, clientes, depoimentos, resultados ou dados de contato. Deixe
pagamento, contratação, atendimento e comunicação manual para o MVP.
```

## Correções e testes

- O contato via WhatsApp foi configurado e testado em uma aba separada, após bloqueio no navegador incorporado da prévia.
- O usuário testou o formulário com dados fictícios, visualizou o contato no painel, converteu um contato em cliente e cadastrou uma entrega.
- A revisão de segurança identificou seis problemas conhecidos em dependências. O Lovable atualizou os pacotes e informou que uma nova verificação encontrou zero problemas conhecidos; informou também que quatro testes automatizados passaram. O formulário foi testado novamente após a atualização.
- O Lovable classificou como intencional a leitura pública dos planos e dados comerciais de contato. Essa classificação não substitui revisões periódicas das permissões.

## Tecnologias

Lovable, Lovable Cloud, React, TypeScript e Tailwind CSS.

## Evidências e próximos passos

- Adicionar capturas da página e do painel com **dados fictícios**, sem expor informações pessoais.
- Realizar testes com potenciais clientes e registrar aprendizados.
- Pesquisar e documentar as fontes e premissas para TAM, SAM e SOM.
- Se necessário, substituir a reconstrução acima pelo prompt original completo.

## Desenvolvimento local

O projeto pode ser desenvolvido no [Lovable](https://lovable.dev/projects/0f63bfa4-f07a-46de-b5dd-5af26c751030). Para executar localmente, instale Node.js, configure as variáveis de ambiente apropriadas para seu próprio projeto e execute:

```sh
npm install
npm run dev
```

Nunca publique senhas, tokens ou chaves privadas no repositório.
