// =====================================================================
// TRABALHOS — os itens abaixo são EXEMPLOS. Troque pelos reais.
//
// THUMBS
//   imagem: caminho do arquivo em assets/thumbs/ (jpg/png/webp, 1280x720)
//           se ficar vazio, o site desenha um placeholder com "texto"
//   destaque: true = card grande no topo da grade
//
// VÍDEOS
//   youtube: só o ID (o que vem depois de v= ou de /shorts/)
//   formato: "horizontal" (16:9) ou "vertical" (9:16, Shorts/Reels/TikTok)
//   capa: imagem opcional em assets/videos/ (se vazio usa a capa do YouTube)
//
// INGLÊS: qualquer campo de texto pode ganhar uma versão "_en"
//   (titulo_en, texto_en, tipo_en, resumo_en). Sem ela, aparece o PT.
// =====================================================================

window.THUMBS = [
  { titulo: "Passei 24h no deserto", titulo_en: "I spent 24h in the desert", texto_en: "24H NO WATER", canal: "Canal Exemplo", imagem: "", texto: "24H SEM ÁGUA", cor: "#ff5a1f", destaque: true, ctr: "14,2%" },
  { titulo: "Testei o celular mais barato", titulo_en: "I tested the cheapest phone", canal: "Tech Exemplo", imagem: "", texto: "R$ 199?!", cor: "#2b6bff", ctr: "11,8%" },
  { titulo: "O fim do meu carro", titulo_en: "The end of my car", texto_en: "IT'S OVER.", canal: "Garagem Exemplo", imagem: "", texto: "ACABOU.", cor: "#e8ff3a" },
  { titulo: "Reagindo ao pior restaurante", titulo_en: "Reacting to the worst restaurant", texto_en: "ZERO STARS", canal: "Canal Exemplo", imagem: "", texto: "NOTA 0", cor: "#ff2e63", ctr: "9,6%" },
  { titulo: "Montei um PC de 1 milhão", titulo_en: "I built a 1 million PC", canal: "Tech Exemplo", imagem: "", texto: "1.000.000", cor: "#00d1a0" },
  { titulo: "Ninguém sabe disso", titulo_en: "Nobody knows this", texto_en: "SECRET", canal: "Curiosidades", imagem: "", texto: "SEGREDO", cor: "#b26bff" },
];

window.VIDEOS = [
  { titulo: "Vlog de viagem · Patagônia", titulo_en: "Travel vlog · Patagonia", tipo_en: "YouTube · long-form", resumo_en: "Pacing, color grading and sound design for 3 days of raw footage.", canal: "Canal Exemplo", tipo: "YouTube · longo", formato: "horizontal", youtube: "", capa: "", duracao: "18:42", cor: "#ff5a1f", resumo: "Ritmo, color grading e sound design pra 3 dias de material bruto." },
  { titulo: "Review do lançamento", titulo_en: "Launch review", tipo_en: "YouTube · long-form", resumo_en: "Spec motion graphics, B-roll and hard cuts in the channel's style.", canal: "Tech Exemplo", tipo: "YouTube · longo", formato: "horizontal", youtube: "", capa: "", duracao: "12:10", cor: "#2b6bff", resumo: "Motion de specs, B-roll e cortes secos no estilo do canal." },
  { titulo: "Corte de podcast", titulo_en: "Podcast clip", resumo_en: "Word-by-word animated captions and zooms at the right moment.", canal: "Podcast Exemplo", tipo: "Shorts / Reels", formato: "vertical", youtube: "", capa: "", duracao: "0:58", cor: "#e8ff3a", resumo: "Legenda animada palavra por palavra e zoom no momento certo." },
  { titulo: "Anúncio de produto", titulo_en: "Product ad", tipo_en: "Commercial", resumo_en: "Hook in the first 2 seconds, 9:16 and 1:1 versions.", canal: "Marca Exemplo", tipo: "Comercial", formato: "vertical", youtube: "", capa: "", duracao: "0:30", cor: "#ff2e63", resumo: "Hook nos 2 primeiros segundos, versão 9:16 e 1:1." },
];
