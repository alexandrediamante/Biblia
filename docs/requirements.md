# Requisitos e Arquitetura do App Bíblia SaaS

## Objetivo
Construir um aplicativo móvel multiplataforma (iOS e Android) inspirado nas telas fornecidas, oferecendo leitura e estudo bíblico com um modelo SaaS híbrido: plano gratuito com limitações agressivas e plano premium de pagamento único com acesso completo e vitalício.

## Personas
1. **Leitor Casual (Free):** acessa a Bíblia eventualmente, aceita limitações breves.
2. **Estudioso (Premium):** deseja plano completo, off-line, devocionais, vídeos.
3. **Administrador:** publica conteúdos, monitora métricas e usuários.

## Funcionalidades
### Autenticação e Perfis
- Login social (Apple Sign-In, Google, Facebook) e e-mail/senha.
- Sincronização de dados pessoais (favoritos, anotações, progresso).
- Perfil com preferências (idioma, tema, notificações, fonte).

### Conteúdo Bíblico e Multimídia
- Banco de dados com múltiplas traduções, estruturado por livros/capítulos/versos.
- Planos de leitura e devocionais diários, com conteúdos em texto, áudio e vídeo.
- Buscas por palavra-chave, filtros por testamento, favoritos e histórico.

### Limitações do Plano Free
- Timer de 10 segundos na tela de leitura: após atingir o limite, o texto é desfocado ou substituído por overlay convidando ao upgrade.
- Acesso parcial a devocionais e planos (apenas primeiro item liberado).
- Downloads offline e áudios bloqueados.
- Notificações de upsell e badges convidando a comprar o plano premium.

### Plano Premium (Pagamento Único)
- Desbloqueia leitura ilimitada, downloads, áudios e vídeos completos.
- Anotações ilimitadas, sincronização multi-dispositivo e widgets exclusivos.
- Suporte premium via chat/e-mail e atualizações vitalícias.

### Pagamentos
- iOS: In-App Purchase não consumível (pagamento único).
- Android: Google Play Billing não consumível.
- Web/API: integração com Stripe para venda direta (opcional).
- Backend registra recibos e aplica status premium aos usuários.

### Administração
- Portal web protegido para criação de conteúdos, gerenciamento de usuários e relatórios.
- Métricas: aquisição, conversão, tempo médio de leitura, quedas no free.

## Arquitetura Proposta
```
[Apps iOS/Android (Flutter/React Native)]
        │
[API Gateway / BFF]
        │
[Serviços (Auth, Conteúdo, Pagamentos, Notificações)]
        │
[PostgreSQL]   [Redis]   [Storage/CDN]
```

### Stack sugerida
- **Frontend móvel:** Flutter (Single codebase, animações fluidas, suporte iOS/Android).
- **Backend:** NestJS (Node.js) com GraphQL/REST, hospedado em AWS ou GCP.
- **Banco:** PostgreSQL (RDS/Cloud SQL) para entidades relacionais.
- **Cache:** Redis para sessões e timers do modo free.
- **Storage/CDN:** S3 + CloudFront para áudios/imagens; Firebase Storage também é opção.
- **Autenticação:** Firebase Authentication ou Cognito (com suporte social).
- **Pagamentos:** RevenueCat para simplificar IAP + webhook para backend.

### Entidades Principais
| Entidade | Descrição |
| --- | --- |
| `User` | Dados pessoais, status de assinatura, preferências, provider de login. |
| `Content` | Livros, capítulos, devocionais, vídeos, áudios. |
| `ReadingSession` | Histórico de leitura, tempo gasto, bloqueios aplicados. |
| `Note` | Anotações e marcações por usuário. |
| `Plan` | Metadados do plano premium (pagamento único). |
| `Purchase` | Recibos de compra, plataforma e status de verificação. |

### Fluxo do Bloqueio Free
1. Usuário inicia leitura → backend inicia `ReadingSession` com timestamp.
2. Timer local + validação servidor medem 10 segundos.
3. Ao expirar, app exibe overlay com CTA "Desbloqueie tudo".
4. Caso usuário clique em "Já comprei", valida recibo com backend.
5. Backend atualiza `User.subscription_status = premium` se válido.

### Segurança
- Criptografia de dados sensíveis, TLS obrigatório.
- Regras de acesso (RBAC) para administradores.
- Auditoria de compras e tentativas de fraude.

### Roadmap Técnico
1. **Fase 1 – MVP:** autenticação, leitura básica, timer de bloqueio, paywall, compra premium.
2. **Fase 2 – Conteúdo avançado:** devocionais, planos, áudios, favoritos.
3. **Fase 3 – Social/Admin:** painel administrativo, métricas, notificações push e widgets.

### Infraestrutura
- Deploy contínuo (CI/CD) com testes automatizados (unitários e integração).
- Monitoramento (Sentry, Firebase Crashlytics) e analytics (Amplitude, Mixpanel).
- Backups diários do banco de dados e scripts de migração.

## Referências Visuais
- UI baseada nas imagens fornecidas (tons suaves, textura de papel, tipografia serifada, ícones dourados).
- Componentes principais: cards para devocionais, botões arredondados, tabs inferior.

## Próximos Passos Imediatos
1. Converter as imagens em wireframes navegáveis (Figma).
2. Definir biblioteca de componentes no Flutter (ex.: Material 3 customizado).
3. Prototipar overlay de bloqueio com animação suave.
4. Implementar modelo de dados inicial em NestJS + Prisma (User, Content, Purchase).
5. Configurar Firebase Auth + RevenueCat sandbox para testes.
