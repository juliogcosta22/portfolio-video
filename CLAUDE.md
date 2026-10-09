# Portfólio Julio Costa

Site de portfólio do Julio (GitHub: JulioGCosta22). Ele faz **edição de vídeo** e **thumbnails**.
A primeira versão foi montada pela Amanda; daqui pra frente o dono é o Julio.

## Objetivo
1. Mostrar os melhores trabalhos, separados em duas áreas: **Edição de vídeo** e **Thumbnails**.
2. Receber pedidos de orçamento com o máximo de detalhe (formulário muda conforme o serviço escolhido).

## Stack
Site estático, sem build: `index.html` + `styles.css` + `script.js`.
Abrir com qualquer servidor local, ex.: `npx http-server . -p 5300 -c-1`.

## Onde editar o quê
- `config.js` — nome, contatos (e-mail, WhatsApp, Instagram, YouTube) e `formEndpoint`.
- `data.js` — lista de thumbs e vídeos. **Hoje só tem exemplos**; trocar pelos trabalhos reais.
  - Thumbs: imagens em `assets/thumbs/` (1280×720). Sem imagem, o site desenha um placeholder.
  - Vídeos: basta o ID do YouTube; a capa vem do YouTube automaticamente.
- `styles.css` — tokens de cor/fonte no `:root`.

## Direção visual (decidida)
- Conceito: **ilha de edição**. Fundo grafite, monitores "PROGRAM/SOURCE", timeline com playhead, timecode rodando.
- Cores: fundo `#0d0d0f`, acento amarelo-ácido `#e8ff3a`, vermelho REC `#ff3b30`.
- Fontes: Anton (títulos), Instrument Sans (texto), IBM Plex Mono (timecodes/rótulos).
- Sem emoji como ícone; ícones são SVG inline.

## Idiomas (PT e EN)
- O site tem português e inglês, com seletor PT | EN no topo.
- Idioma inicial: `?lang=en` / `?lang=pt` na URL › última escolha do visitante › idioma do navegador.
- **O português no `index.html` é a fonte.** `i18n.js` guarda só o inglês, com o texto exato em PT como chave.
  Mudou ou criou um texto no HTML? Adicione/atualize a chave em `i18n.js`, senão ele fica em PT na versão EN.
- Trabalhos (`data.js`) e `config.js`: cada campo de texto aceita uma versão `_en` (`titulo_en`, `resumo_en`, `funcao_en`…). Sem ela, aparece o PT.
- O pedido de orçamento sai no idioma que o visitante estava usando.
- Faixas de investimento: R$ no PT e US$ no EN. As de US$ vêm da pesquisa abaixo. Valores ficam em `i18n.js`.

## Pesquisa de preços (mercado gringo)
Fonte: vagas postadas num canal de Discord, jul–out 2026, levantadas pelo Julio
(painel "Vagas de edição e thumbnail — Discord"). Preço = primeiro valor citado na vaga, **por vídeo**, em US$.

| Nicho | Vagas | US$ short | US$ long |
|---|---|---|---|
| Anúncios, DTC/UGC, marcas e agências | 42 | 40 | — |
| Roblox / Minecraft (animação) | 41 | 50 | 175 |
| Animação 2D/3D e motion (faceless) | 40 | 83 | 175 |
| Personal brand / vlog / talking head | 34 | 50 | 175 |
| Documentário / história / video essay | 33 | — | 200 |
| Celebridades / filmes / anime / K-pop | 28 | 45 | 150 |
| Games (gameplay, montagem, análise) | 26 | 35 | 300 |
| Podcast / streamer / clipes | 22 | 30 | — |
| Commentary / memes / internet culture | 19 | 28 | — |
| IA / tech / SaaS | 16 | 100 | 200 |
| True crime / bodycam / terror | 15 | — | 263 |
| Finanças / negócios / riqueza | 12 | — | 130 |
| Educação / explainer | 10 | 65 | 275 |
| Fitness / saúde / looksmax | 7 | — | 250 |
| Ranking / tier list / listas | 6 | — | 100 |
| Genérico / não especificado | 86 | 30 | 200 |

Vagas de games competitivos citaram de US$ 25 (shorts de montagem) a US$ 550 (documentário LoL) e US$ 1.100 (video essay Clash Royale).

Leitura usada nas faixas EN: short-form até ~US$ 50; short elaborado (animação, IA/tech) até ~US$ 100–150;
long-form US$ 150–300; acima de US$ 300 é documentário/video essay premium ou pacote.

**Thumbnail:** a pesquisa tem só 1 vaga de thumb (US$ 20, CS/esports). Dado insuficiente para precificar thumbs.

## Formulário de orçamento
- Passo A escolhe o serviço (Vídeo / Thumbnail / Os dois) e revela só os blocos relevantes.
- Campos obrigatórios: serviço, nome, e-mail, tipo de vídeo ou quantidade de thumbs, prazo.
- Envio: se `formEndpoint` estiver preenchido (Formspree), faz POST JSON.
  Se estiver vazio, monta o briefing e oferece WhatsApp, e-mail ou copiar texto.
- Upload de arquivo não existe (site estático): o cliente cola link de Drive/Dropbox.

## Pendências
- [ ] Trocar contatos em `config.js`.
- [ ] Colocar thumbs e vídeos reais em `data.js` / `assets/`.
- [ ] Criar form no Formspree e colar o endpoint.
- [ ] Publicar (Vercel ou GitHub Pages ligado ao repo).
- [ ] Domínio próprio (opcional).
