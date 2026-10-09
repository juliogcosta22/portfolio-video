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
- Faixas de investimento: R$ no PT e US$ no EN (equivalente aproximado, arredondado). Valores ficam em `i18n.js`.

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
