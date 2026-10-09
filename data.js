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
// =====================================================================

window.THUMBS = [
  { titulo: "Passei 24h no deserto", canal: "Canal Exemplo", imagem: "", texto: "24H SEM ÁGUA", cor: "#ff5a1f", destaque: true, ctr: "14,2%" },
  { titulo: "Testei o celular mais barato", canal: "Tech Exemplo", imagem: "", texto: "R$ 199?!", cor: "#2b6bff", ctr: "11,8%" },
  { titulo: "O fim do meu carro", canal: "Garagem Exemplo", imagem: "", texto: "ACABOU.", cor: "#e8ff3a" },
  { titulo: "Reagindo ao pior restaurante", canal: "Canal Exemplo", imagem: "", texto: "NOTA 0", cor: "#ff2e63", ctr: "9,6%" },
  { titulo: "Montei um PC de 1 milhão", canal: "Tech Exemplo", imagem: "", texto: "1.000.000", cor: "#00d1a0" },
  { titulo: "Ninguém sabe disso", canal: "Curiosidades", imagem: "", texto: "SEGREDO", cor: "#b26bff" },
];

window.VIDEOS = [
  { titulo: "Vlog de viagem — Patagônia", canal: "Canal Exemplo", tipo: "YouTube · longo", formato: "horizontal", youtube: "", capa: "", duracao: "18:42", cor: "#ff5a1f", resumo: "Ritmo, color grading e sound design pra 3 dias de material bruto." },
  { titulo: "Review do lançamento", canal: "Tech Exemplo", tipo: "YouTube · longo", formato: "horizontal", youtube: "", capa: "", duracao: "12:10", cor: "#2b6bff", resumo: "Motion de specs, B-roll e cortes secos no estilo do canal." },
  { titulo: "Corte de podcast", canal: "Podcast Exemplo", tipo: "Shorts / Reels", formato: "vertical", youtube: "", capa: "", duracao: "0:58", cor: "#e8ff3a", resumo: "Legenda animada palavra por palavra e zoom no momento certo." },
  { titulo: "Anúncio de produto", canal: "Marca Exemplo", tipo: "Comercial", formato: "vertical", youtube: "", capa: "", duracao: "0:30", cor: "#ff2e63", resumo: "Hook nos 2 primeiros segundos, versão 9:16 e 1:1." },
];
