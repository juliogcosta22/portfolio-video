(() => {
  const S = window.SITE || {};
  const EN = window.I18N_EN || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (t = "") => String(t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ---------- Idioma ----------
  // Ordem: ?lang= na URL › escolha salva › idioma do navegador.
  const store = { get: () => { try { return localStorage.getItem("lang"); } catch { return null; } }, set: v => { try { localStorage.setItem("lang", v); } catch {} } };
  const fromUrl = new URLSearchParams(location.search).get("lang");
  let lang = ["pt", "en"].includes(fromUrl) ? fromUrl : store.get() || ((navigator.language || "pt").toLowerCase().startsWith("pt") ? "pt" : "en");
  const t = s => (lang === "en" && EN[s]) || s;
  // Campo de dado em PT com variante opcional "_en" (ex.: titulo / titulo_en)
  const L = (obj, k) => (lang === "en" && obj[k + "_en"]) || obj[k] || "";

  // Traduz os textos fixos do HTML. O original em PT fica guardado no próprio nó.
  const attrPt = new WeakMap();
  const translateStatic = () => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: n => n.parentElement.closest("script, #video-grid, #thumb-grid, [data-site], #tc, #quote-sent h3, #quote-sent p, #sent-actions, #quote-error") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
    });
    for (let n; (n = walker.nextNode());) {
      if (n.__pt === undefined) {
        const key = n.nodeValue.trim();
        if (!key || !EN[key]) continue;
        n.__pt = n.nodeValue;
      }
      const key = n.__pt.trim();
      n.nodeValue = lang === "en" ? n.__pt.replace(key, EN[key]) : n.__pt;
    }
    $$("[placeholder], [aria-label]").forEach(el => {
      ["placeholder", "aria-label"].forEach(attr => {
        if (!el.hasAttribute(attr)) return;
        const orig = attrPt.get(el) || {};
        orig[attr] ??= el.getAttribute(attr);
        attrPt.set(el, orig);
        el.setAttribute(attr, t(orig[attr]));
      });
    });
    const desc = $('meta[name="description"]');
    desc.dataset.pt ??= desc.content;
    desc.content = t(desc.dataset.pt);
    document.title = t("Julio Costa · Edição de vídeo e thumbnails");
    document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
  };

  const fillSite = () => $$("[data-site]").forEach(el => { const v = L(S, el.dataset.site); if (v) el.textContent = v; });

  // ---------- Dados fixos ----------
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
  const renderVideos = () => {
    const filtro = $(".filters .chip.is-active")?.dataset.filter || "todos";
    $("#video-grid").innerHTML = (window.VIDEOS || []).map((v, i) => `
      <button class="card reveal is-in ${v.formato === "vertical" ? "card--vertical" : ""}" data-kind="video" data-i="${i}" data-formato="${esc(v.formato)}" ${filtro !== "todos" && v.formato !== filtro ? "hidden" : ""}>
        <span class="card__media">
          <span class="badge">${esc(L(v, "tipo"))}</span>
          ${v.duracao ? `<span class="badge badge--r">${esc(v.duracao)}</span>` : ""}
          ${videoMedia(v)}
        </span>
        <span class="card__info"><span><span class="card__title">${esc(L(v, "titulo"))}</span><br><span class="card__sub">${esc(v.canal)}</span>
        ${v.resumo ? `<span class="card__resumo">${esc(L(v, "resumo"))}</span>` : ""}</span></span>
      </button>`).join("");
  };

  $$(".filters .chip").forEach(chip => chip.addEventListener("click", () => {
    $$(".filters .chip").forEach(c => { c.classList.toggle("is-active", c === chip); c.setAttribute("aria-selected", c === chip); });
    const f = chip.dataset.filter;
    $$("#video-grid .card").forEach(card => { card.hidden = f !== "todos" && card.dataset.formato !== f; });
  }));

  // ---------- Thumbs ----------
  const thumbMedia = th => th.imagem
    ? `<img src="${esc(th.imagem)}" alt="Thumbnail: ${esc(L(th, "titulo"))}" loading="lazy">`
    : `<span class="ph" style="--c:${esc(th.cor || "#ff5a1f")}"><span class="ph__text">${esc(L(th, "texto") || L(th, "titulo"))}</span></span>`;
  const renderThumbs = () => {
    $("#thumb-grid").innerHTML = (window.THUMBS || []).map((th, i) => `
      <button class="card reveal is-in ${th.destaque ? "card--big" : ""}" data-kind="thumb" data-i="${i}">
        <span class="card__media">
          ${th.ctr ? `<span class="badge badge--accent">CTR ${esc(th.ctr)}</span>` : ""}
          ${thumbMedia(th)}
        </span>
        <span class="card__info"><span><span class="card__title">${esc(L(th, "titulo"))}</span><br><span class="card__sub">${esc(th.canal)}</span></span></span>
      </button>`).join("");
  };

  // ---------- Lightbox ----------
  const lb = $("#lightbox"), lbBody = $("#lightbox-body"), lbCap = $("#lightbox-caption");
  const closeLb = () => { lb.close(); lbBody.innerHTML = ""; };
  document.addEventListener("click", e => {
    const card = e.target.closest(".card[data-kind]");
    if (!card) return;
    const i = +card.dataset.i;
    if (card.dataset.kind === "thumb") {
      const th = THUMBS[i];
      lbBody.className = "lightbox__body is-wide";
      lbBody.innerHTML = thumbMedia(th);
      lbCap.textContent = `${L(th, "titulo")} · ${th.canal}`;
    } else {
      const v = VIDEOS[i];
      lbBody.className = `lightbox__body ${v.formato === "vertical" ? "is-tall" : "is-wide"}`;
      lbBody.innerHTML = v.youtube
        ? `<iframe src="https://www.youtube-nocookie.com/embed/${esc(v.youtube)}?autoplay=1&rel=0" title="${esc(L(v, "titulo"))}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`
        : videoMedia(v);
      lbCap.textContent = `${L(v, "titulo")} · ${v.canal}${v.youtube ? "" : ` (${t("vídeo de exemplo")})`}`;
    }
    lb.showModal();
  });
  $(".lightbox__close").addEventListener("click", closeLb);
  lb.addEventListener("click", e => { if (e.target === lb) closeLb(); });
  lb.addEventListener("cancel", () => { lbBody.innerHTML = ""; });

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

  // Coleta no idioma que o visitante está vendo: opções e chips usam o texto exibido.
  const collect = () => {
    const out = {};
    const add = (k, v) => { v = String(v).trim(); if (v) out[k] = out[k] ? `${out[k]}, ${v}` : v; };
    for (const el of form.elements) {
      if (!el.name || el.closest("fieldset[data-for]")?.hidden) continue;
      if (el.type === "radio" || el.type === "checkbox") { if (el.checked) add(el.name, el.closest("label").querySelector(el.type === "radio" ? "b" : "span").textContent); }
      else if (el.tagName === "SELECT") add(el.name, el.selectedOptions[0]?.textContent || "");
      else if (el.type === "date") add(el.name, el.value ? el.value.split("-").reverse().join("/") : "");
      else add(el.name, el.value);
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
  const asText = d => Object.entries(d).map(([k, v]) => `${t(LABELS[k] || k)}: ${v}`).join("\n");

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

  // Tela pós-envio. Reconstruída a cada troca de idioma.
  let sentMode = null;
  const renderSent = () => {
    if (!sentMode) return;
    const actions = $("#sent-actions");
    if (sentMode === "posted") {
      $("#sent-title").textContent = t("Pedido enviado!");
      $("#sent-text").textContent = t("Respondo em até 24h no e-mail ou WhatsApp que você deixou.");
      actions.innerHTML = `<a class="btn" href="#topo">${t("Voltar ao início")}</a>`;
      return;
    }
    // Sem endpoint: entrega a mensagem pronta pra WhatsApp/e-mail
    const data = collect();
    const msg = `${t("Olá! Quero um orçamento.")}\n\n${asText(data)}`;
    $("#sent-title").textContent = t("Briefing pronto!");
    $("#sent-text").textContent = t("Escolha por onde enviar. A mensagem já vai com tudo preenchido.");
    actions.innerHTML = [
      c.whatsapp && `<a class="btn btn--accent" target="_blank" rel="noopener" href="https://wa.me/${esc(c.whatsapp)}?text=${encodeURIComponent(msg)}">${t("Enviar pelo WhatsApp")}</a>`,
      c.email && `<a class="btn" href="mailto:${esc(c.email)}?subject=${encodeURIComponent(`${t("Orçamento")}: ${data.servico}`)}&body=${encodeURIComponent(msg)}">${t("Enviar por e-mail")}</a>`,
      `<button class="btn" type="button" id="copy-brief">${t("Copiar texto")}</button>`,
    ].filter(Boolean).join("");
    $("#copy-brief").addEventListener("click", ev => navigator.clipboard.writeText(msg).then(() => { ev.target.textContent = t("Copiado!"); }));
  };

  form.addEventListener("submit", async e => {
    e.preventDefault();
    err.textContent = "";
    if (!validate()) { err.textContent = t("Faltou preencher os campos marcados."); return; }
    const data = collect();
    const btn = form.querySelector("[type=submit]");
    const sent = $("#quote-sent");

    if (S.formEndpoint) {
      btn.disabled = true; btn.textContent = t("Enviando…");
      try {
        const r = await fetch(S.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ ...data, idioma: lang.toUpperCase(), _subject: `${t("Orçamento")}: ${data.servico} · ${data.nome}`, _replyto: data.email }) });
        if (!r.ok) throw new Error();
      } catch {
        btn.disabled = false; btn.textContent = t("Enviar pedido de orçamento");
        err.textContent = t("Não consegui enviar agora. Tente de novo ou chame no WhatsApp.");
        return;
      }
    }
    sentMode = S.formEndpoint ? "posted" : "manual";
    renderSent();
    form.hidden = true;
    sent.hidden = false;
    sent.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  // ---------- Troca de idioma ----------
  const applyLang = () => {
    translateStatic();
    fillSite();
    renderVideos();
    renderThumbs();
    if (err.textContent) err.textContent = t("Faltou preencher os campos marcados.");
    renderSent();
    $$(".lang button").forEach(b => b.setAttribute("aria-pressed", b.dataset.lang === lang));
  };
  $$(".lang button").forEach(b => b.addEventListener("click", () => {
    if (b.dataset.lang === lang) return;
    lang = b.dataset.lang;
    store.set(lang);
    const url = new URL(location.href);
    url.searchParams.set("lang", lang);
    history.replaceState(null, "", url);
    applyLang();
  }));
  applyLang();

  // ---------- Reveal ao rolar (só na primeira carga) ----------
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { threshold: .12 });
  $$(".reveal").forEach((el, i) => { el.classList.remove("is-in"); el.style.transitionDelay = `${(i % 3) * 70}ms`; io.observe(el); });
})();
