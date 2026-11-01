(function () {
  "use strict";

  /* mobile nav */
  var btn = document.querySelector(".menu-btn");
  var nav = document.getElementById("nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
  }

  /* models catalog (only on models.html) */
  var grid = document.getElementById("models");
  if (!grid) return;

  /* Original line-art glyphs, drawn inline so there are no external images. */
  var F = ' fill="#fff" stroke="none"';
  var G = {
    openai: '<ellipse cx="12" cy="12" rx="9" ry="3.8"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)"/>',
    anthropic: '<path d="M5 19 12 5l7 14M8.6 14h6.8"/>',
    google: '<path' + F + ' d="M12 2c.8 6 4 9.2 10 10-6 .8-9.2 4-10 10-.8-6-4-9.2-10-10 6-.8 9.2-4 10-10z"/>',
    meta: '<path d="M6.5 16c-3 0-3.6-8 0-8 3.4 0 5.6 8 11 8 3.6 0 3-8 0-8-5.4 0-7.6 8-11 8z"/>',
    xai: '<path d="M5 5l14 14M19 5 5 19"/>',
    mistral: '<g' + F + '><rect x="3" y="4" width="4" height="4"/><rect x="17" y="4" width="4" height="4"/><rect x="3" y="10" width="4" height="4"/><rect x="10" y="10" width="4" height="4"/><rect x="17" y="10" width="4" height="4"/><rect x="3" y="16" width="4" height="4"/><rect x="17" y="16" width="4" height="4"/></g>',
    deepseek: '<path d="M2.5 12C6 5.5 18 5.5 21.5 12 18 18.5 6 18.5 2.5 12z"/><circle cx="12" cy="12" r="2.6"' + F + '/>',
    qwen: '<circle cx="11" cy="11" r="7"/><path d="m15.5 15.5 4.5 4.5"/>',
    groq: '<path' + F + ' d="M13.5 2 5 13.5h6L10 22l9-12h-6z"/>',
    cohere: '<circle cx="5.5" cy="12" r="2.5"/><circle cx="12" cy="12" r="2.5"/><circle cx="18.5" cy="12" r="2.5"/>',
    perplexity: '<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9"/>',
    moon: '<path' + F + ' d="M15 3.5A9 9 0 1 0 20.5 15 7 7 0 0 1 15 3.5z"/>',
    z: '<path d="M6 6h12L6 18h12"/>',
    minimax: '<path d="M3.5 18V7l4.2 6L12 7l4.3 6 4.2-6v11"/>',
    ms: '<g' + F + '><rect x="3.5" y="3.5" width="8" height="8"/><rect x="12.5" y="3.5" width="8" height="8"/><rect x="3.5" y="12.5" width="8" height="8"/><rect x="12.5" y="12.5" width="8" height="8"/></g>',
    nvidia: '<path d="m12 3 9 5-9 5-9-5zM3 13l9 5 9-5"/>',
    chip: '<rect x="6" y="6" width="12" height="12" rx="2.5"/><path d="M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
    wave: '<path d="M3 12h2.5l2-6 3 12 3-9 2 3H21"/>',
    cube: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12 4 7.5M12 12v9"/>',
    film: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m10.5 9.5 4 2.5-4 2.5z"' + F + '/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
    img: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="9" cy="10" r="1.8"/><path d="m4 18 5.5-5 4 3.5 3-2.5L20 17"/>'
  };

  // provider: [color, glyph]
  var P = {
    "OpenAI": ["#10a37f", "openai"], "Anthropic": ["#cc785c", "anthropic"], "Google": ["#4285f4", "google"],
    "Meta": ["#0866ff", "meta"], "xAI": ["#2a2a30", "xai"], "Mistral": ["#fa5310", "mistral"],
    "DeepSeek": ["#4d6bfe", "deepseek"], "Qwen": ["#6c4cf1", "qwen"], "Groq": ["#f55036", "groq"],
    "Cohere": ["#39594d", "cohere"], "Perplexity": ["#20808d", "perplexity"], "Moonshot AI": ["#26262b", "moon"],
    "Z.ai": ["#2d5bff", "z"], "MiniMax": ["#e4366b", "minimax"], "NVIDIA": ["#76b900", "nvidia"],
    "Microsoft": ["#0a84d6", "ms"], "Xiaomi": ["#ff6900", "chip"], "StepFun": ["#0fa87a", "spark"],
    "Reflection AI": ["#7b61ff", "cube"], "Inception": ["#c026d3", "wave"], "Liquid AI": ["#0ea5e9", "wave"],
    "inclusionAI": ["#f59e0b", "spark"], "Upstage": ["#3b5bdb", "cube"], "Fireworks": ["#ff5d1f", "spark"],
    "Particle AI": ["#14b8a6", "cube"], "AionLabs": ["#a855f7", "cube"], "Moondream": ["#64748b", "chip"],
    "ByteDance": ["#1d4ed8", "film"], "Kling": ["#06b6d4", "film"], "Black Forest Labs": ["#2b2b33", "img"],
    "Recraft": ["#ef4444", "img"], "ElevenLabs": ["#2b2b33", "mic"], "Runway": ["#22a55a", "film"]
  };

  var FEATURED = ["OpenAI", "Anthropic", "Google", "Meta", "xAI", "Mistral", "DeepSeek", "Qwen", "Groq",
    "Cohere", "Perplexity", "Moonshot AI", "Z.ai", "MiniMax", "NVIDIA", "Microsoft"];

  // provider | model | description | context | kind (t text, i image, v video, a audio; default t)
  var DATA = [
    "OpenAI|GPT-6 Astra|Flagship reasoning|1.05M",
    "OpenAI|GPT-6.1 Sol|Agentic coding|1.05M",
    "OpenAI|GPT-6.1 Sol Pro|Pro reasoning mode|1.05M",
    "OpenAI|GPT-6.1 Terra|Everyday work|1.05M",
    "OpenAI|GPT-6.1 Terra Pro|Pro reasoning mode|1.05M",
    "OpenAI|GPT-6 Sol|High-end, cost-efficient|1.05M",
    "OpenAI|GPT-6 Luna|Fast and efficient|1.05M",
    "OpenAI|gpt-oss-120b|Open weights|131K",
    "OpenAI|gpt-oss-20b|Open weights|131K",
    "OpenAI|GPT Image 2|Image generation||i",
    "OpenAI|Whisper Large V3 Turbo|Speech to text||a",
    "Anthropic|Claude Fable 5.1|Frontier model|",
    "Anthropic|Claude Opus 5.5|Flagship reasoning|1M",
    "Anthropic|Claude Sonnet 5.5|Balanced coding|1M",
    "Anthropic|Claude Haiku 5.5|Fast and low-cost|1M",
    "Anthropic|Claude Opus 5|Reasoning|",
    "Anthropic|Claude Sonnet 5|Everyday work|",
    "Google|Gemini 4 Argon|Flagship reasoning|1M",
    "Google|Gemini 3.6 Flash|Fast agentic|",
    "Google|Gemini 3.5 Flash-Lite|Ultra-fast|",
    "Google|Gemini 3.5 Flash Cyber|Security|",
    "Google|Gemini 3.1 Pro|Reasoning|1M",
    "Google|Gemma 4|Open weights|",
    "Google|Nano Banana 2.1|Image generation and editing||i",
    "Google|Veo 3.1|Video with audio||v",
    "Google|Lyria 3 Pro|Music generation||a",
    "Meta|Muse Wonder|Frontier reasoning|1M",
    "Meta|Muse Spark Open|Open-weight coding|1M",
    "Meta|Muse Image|Image generation||i",
    "Meta|Llama 4 Maverick|Open weights|1M",
    "Meta|Llama 4 Scout|Open weights|10M",
    "xAI|Grok 4.7|Flagship coding|500K",
    "xAI|Grok 4.5|Reasoning|",
    "xAI|Grok Imagine Image 2.0|Image generation||i",
    "xAI|Grok Imagine Video 1.5|Video with sound||v",
    "Mistral|Mistral Large 4|Flagship multimodal|1M",
    "Mistral|Voxtral TTS 3|Text to speech||a",
    "Mistral|Voxtral Small Transcribe 3|Speech to text||a",
    "DeepSeek|DeepSeek V4 Pro|Flagship reasoning|1M",
    "DeepSeek|DeepSeek V4.1 Flash|Fast multimodal|1M",
    "Qwen|Qwen3.8 Max|Flagship|1M",
    "Qwen|Qwen3.8 Max Prime|High-throughput|1M",
    "Qwen|Qwen3.8 Omni Flash|Audio and video|1M",
    "Qwen|Qwen3.8 27B|Open weights|",
    "Qwen|Qwen Image 3|Image generation||i",
    "Groq|gpt-oss-120b on Groq|Fast inference, ~500 tok/s|131K",
    "Groq|gpt-oss-20b on Groq|Fast inference, ~1,000 tok/s|131K",
    "Groq|Qwen3.8 27B on Groq|Fast inference (preview)|",
    "Groq|Whisper Large V3 on Groq|Speech to text||a",
    "Cohere|Command A+|Enterprise agents|192K",
    "Perplexity|Sonar|Search-grounded answers|127K",
    "Perplexity|Sonar Pro|Multi-step search|200K",
    "Perplexity|Sonar Pro Search|Agentic search|200K",
    "Perplexity|Sonar Reasoning Pro|Search and reasoning|128K",
    "Perplexity|Sonar Deep Research|Deep research|128K",
    "Moonshot AI|Kimi K3.1 Pro|Open-weight flagship|1M",
    "Moonshot AI|Kimi K3|Open weights|",
    "Z.ai|GLM 5.3 Prime|High-speed flagship|1M",
    "Z.ai|GLM 5.3 FlashX|Fast multimodal|1M",
    "MiniMax|MiniMax M3.1 Flash|Multimodal agents|1M",
    "MiniMax|Hailuo 3|Video generation||v",
    "NVIDIA|Nemotron 3.5 Super VL|Open multimodal|1M",
    "NVIDIA|Nemotron 3.5 Transcribe|Speech to text||a",
    "Microsoft|MAI-Image-2.6|Image generation and editing||i",
    "Microsoft|MAI-Voice-2.1|Text to speech||a",
    "Microsoft|MAI-Transcribe 2|Speech to text||a",
    "Xiaomi|MiMo-V2.6 Pro|Flagship, 1T parameters|1M",
    "Xiaomi|MiMo-V2.6 Flash|Open source|1M",
    "StepFun|Step 5 Preview|Agentic work|1M",
    "Reflection AI|Beam 1.0|Open reasoning|1M",
    "Inception|Mercury 3|Diffusion language model|1M",
    "Liquid AI|LFM 2.5 24B A2B|Small and efficient|128K",
    "inclusionAI|Ling 3.1 Flash|Hybrid reasoning|1M",
    "Upstage|Solar Mini 4|Compact agentic|524K",
    "Fireworks|Ember-1|Token-efficient reasoning|1M",
    "Particle AI|Particle-1|Agentic coding|1M",
    "AionLabs|Aion 3.5|Roleplay and stories|262K",
    "Moondream|Moondream 3.1|Vision language|32K",
    "ByteDance|Seedance 2.5|Video generation||v",
    "ByteDance|Seedream 5.0 Pro|Image generation||i",
    "Kling|Kling v3.0 Pro|Video generation||v",
    "Black Forest Labs|FLUX 3 Image|Image generation||i",
    "Recraft|Recraft V4.1 Pro|Image generation||i",
    "ElevenLabs|Eleven v4|Text to speech||a",
    "Runway|Gen-4.5|Video generation||v"
  ].map(function (s) {
    var a = s.split("|");
    return { p: a[0], n: a[1], d: a[2], c: a[3], k: a[4] || "t" };
  });

  var KIND = { t: "Text", i: "Image", v: "Video", a: "Audio" };

  var q = document.getElementById("q");
  var kindEl = document.getElementById("kind");
  var chipsEl = document.getElementById("chips");
  var countEl = document.getElementById("count");
  var active = "All";

  function group(p) { return FEATURED.indexOf(p) > -1 ? p : "More"; }

  var counts = { All: DATA.length, More: 0 };
  DATA.forEach(function (m) { var g = group(m.p); counts[g] = (counts[g] || 0) + 1; });

  function chip(key) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "chip";
    b.dataset.key = key;
    b.setAttribute("aria-pressed", key === active ? "true" : "false");
    b.innerHTML = key + "<small>" + counts[key] + "</small>";
    return b;
  }
  ["All"].concat(FEATURED, ["More"]).forEach(function (k) { chipsEl.appendChild(chip(k)); });

  function esc(s) {
    return s.replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function badge(p) {
    var d = P[p] || ["#333", "chip"];
    return '<span class="badge" style="background:linear-gradient(150deg,' + d[0] + ',' + d[0] +
      'b0)" aria-hidden="true"><svg viewBox="0 0 24 24">' + G[d[1]] + '</svg></span>';
  }

  function render() {
    var term = q.value.trim().toLowerCase();
    var kind = kindEl.value;
    var list = DATA.filter(function (m) {
      if (active !== "All" && group(m.p) !== active) return false;
      if (kind !== "all" && m.k !== kind) return false;
      if (!term) return true;
      return (m.n + " " + m.p + " " + m.d + " " + KIND[m.k]).toLowerCase().indexOf(term) > -1;
    });
    countEl.textContent = list.length + (list.length === 1 ? " model" : " models") + ", all free in omal";
    if (!list.length) {
      grid.innerHTML = '<li class="empty">No models match. Try a different name or clear the filters.</li>';
      return;
    }
    grid.innerHTML = list.map(function (m) {
      return '<li class="m"><div class="m-top">' + badge(m.p) + '<div><h3>' + esc(m.n) +
        '</h3><p class="prov">' + esc(m.p) + '</p></div></div><p class="desc">' + esc(m.d) +
        '</p><div class="m-meta"><span class="tag">' + KIND[m.k] + '</span><span>' +
        (m.c ? esc(m.c) + ' context' : '') + '</span></div></li>';
    }).join("");
  }

  chipsEl.addEventListener("click", function (e) {
    var b = e.target.closest(".chip");
    if (!b) return;
    active = b.dataset.key;
    Array.prototype.forEach.call(chipsEl.children, function (c) {
      c.setAttribute("aria-pressed", c === b ? "true" : "false");
    });
    render();
  });
  q.addEventListener("input", render);
  kindEl.addEventListener("change", render);
  render();
})();
