# Bíblia SaaS

Aplicativo móvel (iOS/Android) e plataforma web para leitura e estudo bíblico com monetização baseada em planos gratuito e premium.

## Conteúdo
- [Visão Geral](#visão-geral)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Arquitetura de Alto Nível](#arquitetura-de-alto-nível)
- [Experiência do Usuário](#experiência-do-usuário)
- [Monetização](#monetização)
- [Próximos Passos](#próximos-passos)

## Visão Geral
Este repositório contém documentação, especificações e agora um protótipo funcional (React Native/Expo) para o aplicativo bíblico estilo SaaS. A proposta inclui um plano gratuito com limitações severas (ex.: leitura bloqueada após 10 segundos) e um plano premium pago único, sem restrições, oferecendo acesso completo ao conteúdo e recursos adicionais.

## Funcionalidades Principais
- Catálogo completo de traduções bíblicas, planos de leitura, devocionais e recursos multimídia.
- Autenticação com provedores sociais (Apple, Google, Facebook) e criação de conta por e-mail.
- Sincronização em nuvem (usuário, progresso, favoritos, anotações) usando um backend escalável.
- Bloqueios e limitações configuráveis para o plano gratuito (temporizador, conteúdo parcialmente oculto, lembretes in-app).
- Loja interna para efetuar compra única do plano premium (In-App Purchase / pagamento web integrado).
- Painel administrativo para gestão de usuários, conteúdos e métricas.

## Arquitetura de Alto Nível
A arquitetura proposta está documentada em detalhes em [`docs/requirements.md`](docs/requirements.md). Em resumo:
- Aplicativo móvel construído com um único codebase (ex.: React Native ou Flutter) publicado para iOS e Android.
- Backend em nuvem (ex.: Firebase + Cloud Functions ou NestJS + PostgreSQL) para autenticação, pagamentos, telemetria e distribuição de conteúdo.
- Banco de dados relacional (PostgreSQL) para contas, conteúdos, anotações e limites do modo gratuito.
- CDN para servir mídias (áudios, vídeos, imagens inspiracionais) com baixa latência.

## Experiência do Usuário
O design seguirá o estilo mostrado nas referências visuais fornecidas (ex.: telas com fundo inspirado em papel, tipografia serifada, ícones minimalistas). A navegação principal compreende:
1. Tela inicial com destaque para devocional diário e CTA para assinar.
2. Biblioteca de livros bíblicos com filtros, buscas e favoritos.
3. Tela de leitura com temporizador/bloqueio no plano gratuito e botões de compra.
4. Área de estudos com planos guiados, vídeos e áudios.
5. Perfil e configurações (sincronização, idioma, modo noturno, notificações).

## Monetização
- **Plano Free:** acesso limitado, leitura bloqueada após 10 segundos (timer reinicia com anúncios interativos), devocionais reduzidos e downloads desativados.
- **Plano Premium (pagamento único):** desbloqueia todo o conteúdo, leitura offline, áudios completos, planos personalizados e suporte prioritário.
- Fluxo de upsell contextual em cada bloqueio, com destaque para benefício "pagamento único".

## Como executar o protótipo móvel

1. Instale as dependências na pasta [`mobile/`](mobile/) com `npm install` ou `yarn`.
2. Execute `npx expo start` (ou `npm run start`) para abrir o Metro bundler e ler o QR Code com o aplicativo Expo Go.
3. Navegue pelas abas "Hoje", "Ler", "Ouvir", "Explorar" e "Perfil". No plano free, a tela de leitura bloqueia automaticamente após 10 segundos e mostra o paywall com compra única. Ao tocar em "Quero desbloquear tudo", o app muda para o plano premium, liberando todas as seções.
4. Use os botões de autenticação fake na aba "Hoje" para simular login social/e-mail, demonstrando o salvamento de progresso.

## Próximos Passos
1. Validar wireframes e mapa de navegação com as telas de referência do cliente.
2. Evoluir o protótipo Expo para consumir um backend real (Firebase Auth/RevenueCat ou NestJS + PostgreSQL) aproveitando os hooks e fluxos criados aqui.
3. Implementar MVP com autenticação, leitura básica e paywall funcional conectado ao backend/pagamentos.
4. Preparar scripts de seed para conteúdos e planos de leitura.
5. Publicar builds internas via TestFlight/Play Store Internal Testing.

Consulte [`docs/requirements.md`](docs/requirements.md) para detalhes de fluxos, entidades e integrações planejadas.
