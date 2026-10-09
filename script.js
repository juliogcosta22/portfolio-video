(() => {
  const S = window.SITE || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (t = "") => String(t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ---------- Dados do site ----------
  $$("[data-site]").forEach(el => { const v = S[el.dataset.site]; if (v) el.textContent = v; });
  $("#year").textContent = new Date().getFullYear();

  const c = S.contato || {};
  const links = [];
  if (c.email) links.push(`<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>`);
  if (c.whatsapp) links.push(`<a href="https://wa.me/${esc(c.whatsapp)}" target="_blank" rel="noopener">WhatsApp</a>`);
  if (c.instagram) links.push(`<a href="https://instagram.com/${esc(c.instagram)}" target="_blank" rel="noopener">Instagram</a>`);
  if (c.youtube) links.push(`<a href="${esc(c.youtube)}" target="_blank" rel="noopener">YouTube</a>`);
  $("#footer-links").innerHTML = links.join("");

  // ---------- Timecode do topo ----------
  const tc = $("#tc"), t0 = performance.now();
  const pad = n => String(n).padStart(2, "0");
  (function tick(now) {
    const f = Math.floor((now - t0) / (1000 / 30));
    tc.textContent = `${pad(Math.floor(f / 108000))}:${pad(Math.floor(f / 1800) % 60)}:${pad(Math.floor(f / 30) % 60)}:${pad(f % 30)}`;
    requestAnimationFrame(tick);
  })(t0);

  // ---------- Vídeos ----------
  const ytThumb = id => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  const videoMedia = v => {
    const src = v.capa || (v.youtube ? ytThumb(v.youtube) : "");
    return src
      ? `<img src="${esc(src)}" alt="" loading="lazy"><span class="ph ph--video" style="--c:${esc(v.cor)};background:transparent"><span class="play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span></span>`
      : `<span class="ph ph--video" style="--c:${esc(v.cor || "#3d5afe")}"><span class="play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span></span>`;
  };
  $("#video-grid").innerHTML = (window.VIDEOS || []).map((v, i) => `
    <button class="card reveal ${v.formato === "vertical" ? "card--vertical" : ""}" data-kind="video" data-i="${i}" data-formato="${esc(v.formato)}">
      <span class="card__media">
        <span class="badge">${esc(v.tipo)}</span>
        ${v.duracao ? `<span class="badge badge--r">${esc(v.duracao)}</span>` : ""}
        ${videoMedia(v)}
      </span>
      <span class="card__info"><span><span class="card__title">${esc(v.titulo)}</span><br><span class="card__sub">${esc(v.canal)}</span>
      ${v.resumo ? `<span class="card__resumo">${esc(v.resumo)}</span>` : ""}</span></span>
    </button>`).join("");

  $$(".filters .chip").forEach(chip => chip.addEventListener("click", () => {
    $$(".filters .chip").forEach(c => { c.classList.toggle("is-active", c === chip); c.setAttribute("aria-selected", c === chip); });
    const f = chip.dataset.filter;
    $$("#video-grid .card").forEach(card => { card.hidden = f !== "todos" && card.dataset.formato !== f; });
  }));

  // ---------- Thumbs ----------
  const thumbMedia = t => t.imagem
    ? `<img src="${esc(t.imagem)}" alt="Thumbnail: ${esc(t.titulo)}" loading="lazy">`
    : `<span class="ph" style="--c:${esc(t.cor || "#ff5a1f")}"><span class="ph__text">${esc(t.texto || t.titulo)}</span></span>`;
  $("#thumb-grid").innerHTML = (window.THUMBS || []).map((t, i) => `
    <button class="card reveal ${t.destaque ? "card--big" : ""}" data-kind="thumb" data-i="${i}">
      <span class="card__media">
        ${t.ctr ? `<span class="badge badge--accent">CTR ${esc(t.ctr)}</span>` : ""}
        ${thumbMedia(t)}
      </span>
      <span class="card__info"><span><span class="card__title">${esc(t.titulo)}</span><br><span class="card__sub">${esc(t.canal)}</span></span></span>
    </button>`).join("");

  // ---------- Lightbox ----------
  const lb = $("#lightbox"), lbBody = $("#lightbox-body"), lbCap = $("#lightbox-caption");
  const closeLb = () => { lb.close(); lbBody.innerHTML = ""; };
  document.addEventListener("click", e => {
    const card = e.target.closest(".card[data-kind]");
    if (!card) return;
    const i = +card.dataset.i;
    if (card.dataset.kind === "thumb") {
      const t = THUMBS[i];
      lbBody.className = "lightbox__body is-wide";
      lbBody.innerHTML = thumbMedia(t);
      lbCap.textContent = `${t.titulo} · ${t.canal}`;
    } else {
      const v = VIDEOS[i];
      lbBody.className = `lightbox__body ${v.formato === "vertical" ? "is-tall" : "is-wide"}`;
      lbBody.innerHTML = v.youtube
        ? `<iframe src="https://www.youtube-nocookie.com/embed/${esc(v.youtube)}?autoplay=1&rel=0" title="${esc(v.titulo)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`
        : videoMedia(v);
      lbCap.textContent = `${v.titulo} · ${v.canal}${v.youtube ? "" : " (vídeo de exemplo)"}`;
    }
    lb.showModal();
  });
  $(".lightbox__close").addEventListener("click", closeLb);
  lb.addEventListener("click", e => { if (e.target === lb) closeLb(); });
  lb.addEventListener("cancel", () => { lbBody.innerHTML = ""; });

  // ---------- Reveal ao rolar ----------
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { threshold: .12 });
  $$(".reveal").forEach((el, i) => { el.style.transitionDelay = `${(i % 3) * 70}ms`; io.observe(el); });

  // ---------- Formulário de orçamento ----------
  const form = $("#quote-form"), err = $("#quote-error");
  const blocks = { video: $('[data-for="video"]'), thumb: $('[data-for="thumb"]'), any: $('[data-for="any"]') };
  const foot = $(".quote__foot");

  form.addEventListener("change", e => {
    if (e.target.name !== "servico") return;
    const s = e.target.value, wantVideo = s !== "Thumbnail", wantThumb = s !== "Edição de vídeo";
    blocks.video.hidden = !wantVideo;
    blocks.thumb.hidden = !wantThumb;
    blocks.any.hidden = false;
    foot.hidden = false;
    // letras das seções seguem a ordem visível
    $('[data-letter]', blocks.thumb).textContent = wantVideo ? "D" : "C";
    $('[data-letter]', blocks.any).textContent = wantVideo && wantThumb ? "E" : "D";
  });

  const collect = () => {
    const fd = new FormData(form), out = {};
    for (const [k, v] of fd) {
      const field = form.elements[k];
      const fs = (field.length ? field[0] : field).closest("fieldset[data-for]");
      if (fs && fs.hidden) continue;
      if (!String(v).trim()) continue;
      out[k] = out[k] ? `${out[k]}, ${v}` : v;
    }
    return out;
  };

  const LABELS = {
    servico: "Serviço", nome: "Nome", email: "E-mail", whatsapp: "WhatsApp", canal: "Canal", nicho: "Nicho", origem: "Como conheceu",
    video_tipo: "Tipo de vídeo", video_qtd: "Quantidade", video_bruto: "Material bruto", video_final: "Duração final", video_itens: "Edição precisa ter",
    video_formatos: "Formatos", video_material: "Link do material", video_projeto: "Arquivo de projeto", video_refs: "Referências de vídeo",
    thumb_qtd: "Quantidade de thumbs", thumb_formato: "Formato da thumb", thumb_titulo: "Título do vídeo", thumb_texto: "Texto na thumb",
    thumb_assunto: "Assunto", thumb_emocao: "Sensação", thumb_elementos: "Elementos", thumb_cores: "Cores", thumb_arquivos: "Arquivos", thumb_refs: "Referências de thumb",
    prazo: "Prazo", verba: "Investimento", obs: "Observações",
  };
  const asText = d => Object.entries(d).map(([k, v]) => `${LABELS[k] || k}: ${k === "prazo" ? v.split("-").reverse().join("/") : v}`).join("\n");

  const validate = () => {
    $$(".is-invalid", form).forEach(el => el.classList.remove("is-invalid"));
    const bad = [];
    if (!form.servico.value) bad.push(form.querySelector(".service-pick"));
    ["nome", "email"].forEach(n => { if (!form[n].value.trim()) bad.push(form[n]); });
    if (form.email.value && !form.email.checkValidity()) bad.push(form.email);
    $$("[data-req]", form).forEach(el => { if (!el.closest("fieldset").hidden && !el.value) bad.push(el); });
    bad.forEach(el => el.classList.add("is-invalid"));
    if (bad.length) { bad[0].scrollIntoView({ behavior: "smooth", block: "center" }); bad[0].focus?.(); }
    return !bad.length;
  };

  form.addEventListener("submit", async e => {
    e.preventDefault();
    err.textContent = "";
    if (!validate()) { err.textContent = "Faltou preencher os campos marcados."; return; }
    const data = collect();
    const btn = form.querySelector("[type=submit]");
    const sent = $("#quote-sent"), actions = $("#sent-actions");

    if (S.formEndpoint) {
      btn.disabled = true; btn.textContent = "Enviando…";
      try {
        const r = await fetch(S.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ ...data, _subject: `Orçamento: ${data.servico} · ${data.nome}`, _replyto: data.email }) });
        if (!r.ok) throw new Error();
        actions.innerHTML = `<a class="btn" href="#topo">Voltar ao início</a>`;
      } catch {
        btn.disabled = false; btn.textContent = "Enviar pedido de orçamento";
        err.textContent = "Não consegui enviar agora. Tente de novo ou chame no WhatsApp.";
        return;
      }
    } else {
      // Sem endpoint: entrega a mensagem pronta pra WhatsApp/e-mail
      const msg = `Olá! Quero um orçamento.\n\n${asText(data)}`;
      $("#sent-title").textContent = "Briefing pronto!";
      $("#sent-text").textContent = "Escolha por onde enviar. A mensagem já vai com tudo preenchido.";
      actions.innerHTML = [
        c.whatsapp && `<a class="btn btn--accent" target="_blank" rel="noopener" href="https://wa.me/${esc(c.whatsapp)}?text=${encodeURIComponent(msg)}">Enviar pelo WhatsApp</a>`,
        c.email && `<a class="btn" href="mailto:${esc(c.email)}?subject=${encodeURIComponent(`Orçamento: ${data.servico}`)}&body=${encodeURIComponent(msg)}">Enviar por e-mail</a>`,
        `<button class="btn" type="button" id="copy-brief">Copiar texto</button>`,
      ].filter(Boolean).join("");
      $("#copy-brief").addEventListener("click", ev => navigator.clipboard.writeText(msg).then(() => { ev.target.textContent = "Copiado!"; }));
    }
    form.hidden = true;
    sent.hidden = false;
    sent.scrollIntoView({ behavior: "smooth", block: "center" });
  });
})();
