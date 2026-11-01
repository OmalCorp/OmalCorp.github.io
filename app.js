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

  // key: [label, color, badge text]
  var P = {
    OpenAI: ["OpenAI", "#10a37f", "AI"],
    Anthropic: ["Anthropic", "#c96442", "An"],
    Google: ["Google", "#4285f4", "G"],
    Meta: ["Meta", "#0866ff", "M"],
    xAI: ["xAI", "#2b2b2f", "xAI"],
    Mistral: ["Mistral", "#fa5310", "Mi"],
    DeepSeek: ["DeepSeek", "#4d6bfe", "DS"],
    Qwen: ["Qwen", "#6c4cf1", "Qw"],
    Groq: ["Groq", "#f55036", "Gq"],
    Cohere: ["Cohere", "#39594d", "Co"],
    Perplexity: ["Perplexity", "#1b7f86", "Px"],
    Moonshot: ["Moonshot AI", "#1d1d22", "Mo"],
    Zhipu: ["Zhipu AI", "#2d5bff", "Z"],
    MiniMax: ["MiniMax", "#e4366b", "MM"],
    Microsoft: ["Microsoft", "#00a4ef", "Ms"],
    NVIDIA: ["NVIDIA", "#76b900", "Nv"],
    Amazon: ["Amazon", "#ff9900", "Az"],
    AI21: ["AI21 Labs", "#c0198a", "21"],
    IBM: ["IBM", "#0f62fe", "IBM"]
  };

  // provider | model | type | context
  var DATA = [
    "OpenAI|GPT-5|Flagship reasoning|400K",
    "OpenAI|GPT-5 mini|Fast and efficient|400K",
    "OpenAI|GPT-5 nano|Ultra-light|400K",
    "OpenAI|GPT-4.1|Coding|1M",
    "OpenAI|o3|Reasoning|200K",
    "OpenAI|o4-mini|Reasoning|200K",
    "OpenAI|gpt-oss-120b|Open weights|128K",
    "OpenAI|gpt-oss-20b|Open weights|128K",
    "Anthropic|Claude Opus 5.5|Flagship|200K+",
    "Anthropic|Claude Sonnet 5.5|Balanced|200K+",
    "Anthropic|Claude Haiku 5.5|Fast|200K+",
    "Anthropic|Claude Opus 4.1|Reasoning|200K",
    "Anthropic|Claude Sonnet 4.5|Coding|200K+",
    "Anthropic|Claude Haiku 4.5|Fast|200K",
    "Google|Gemini 3 Pro|Flagship multimodal|1M",
    "Google|Gemini 2.5 Pro|Reasoning|1M",
    "Google|Gemini 2.5 Flash|Fast|1M",
    "Google|Gemini 2.5 Flash-Lite|Ultra-light|1M",
    "Google|Gemma 3 27B|Open weights|128K",
    "Google|Gemma 3n|On-device|32K",
    "Meta|Llama 4 Maverick|Open weights|1M",
    "Meta|Llama 4 Scout|Open weights|10M",
    "Meta|Llama 3.3 70B|Open weights|128K",
    "Meta|Llama 3.1 405B|Open weights|128K",
    "xAI|Grok 4|Flagship reasoning|256K",
    "xAI|Grok 4 Fast|Fast|2M",
    "xAI|Grok Code Fast 1|Coding|256K",
    "xAI|Grok 3|General|131K",
    "xAI|Grok 3 mini|Reasoning|131K",
    "Mistral|Mistral Large 2|Flagship|128K",
    "Mistral|Mistral Medium 3|Balanced|128K",
    "Mistral|Mistral Small 3.2|Efficient|128K",
    "Mistral|Magistral Medium|Reasoning|128K",
    "Mistral|Codestral|Coding|256K",
    "Mistral|Devstral Medium|Agentic coding|128K",
    "Mistral|Pixtral Large|Vision|128K",
    "DeepSeek|DeepSeek-V3.2|General|128K",
    "DeepSeek|DeepSeek-V3.1|Hybrid reasoning|128K",
    "DeepSeek|DeepSeek-R1|Reasoning|128K",
    "DeepSeek|DeepSeek-Coder-V2|Coding|128K",
    "Qwen|Qwen3-Max|Flagship|256K",
    "Qwen|Qwen3-235B-A22B|Open weights|128K",
    "Qwen|Qwen3-Coder|Coding|256K",
    "Qwen|Qwen3-32B|Open weights|128K",
    "Qwen|Qwen2.5-VL 72B|Vision|128K",
    "Qwen|QwQ-32B|Reasoning|128K",
    "Groq|Llama 3.3 70B Versatile|Fast inference|128K",
    "Groq|Llama 4 Scout|Fast inference|128K",
    "Groq|gpt-oss-120b|Fast inference|128K",
    "Groq|Kimi K2|Fast inference|128K",
    "Groq|Qwen3-32B|Fast inference|128K",
    "Cohere|Command A|Enterprise|256K",
    "Cohere|Command A Vision|Vision|128K",
    "Cohere|Command R+|RAG|128K",
    "Cohere|Command R7B|Ultra-light|128K",
    "Cohere|Aya Expanse 32B|Multilingual|128K",
    "Perplexity|Sonar Pro|Search-grounded|200K",
    "Perplexity|Sonar|Search-grounded|128K",
    "Perplexity|Sonar Reasoning Pro|Search reasoning|128K",
    "Perplexity|Sonar Deep Research|Research|128K",
    "Moonshot|Kimi K2|Agentic|128K",
    "Moonshot|Kimi K2 Thinking|Reasoning|256K",
    "Zhipu|GLM-4.6|Agentic coding|200K",
    "Zhipu|GLM-4.5V|Vision|64K",
    "MiniMax|MiniMax-M2|Agentic coding|200K",
    "Microsoft|Phi-4|Small model|16K",
    "Microsoft|Phi-4 reasoning|Reasoning|32K",
    "NVIDIA|Llama 3.3 Nemotron Super 49B|Open weights|128K",
    "NVIDIA|Nemotron Ultra 253B|Open weights|128K",
    "Amazon|Nova Premier|Flagship|1M",
    "Amazon|Nova Pro|Balanced|300K",
    "Amazon|Nova Lite|Fast|300K",
    "AI21|Jamba Large 1.7|Long context|256K",
    "IBM|Granite 4.0|Enterprise|128K"
  ].map(function (s) {
    var a = s.split("|");
    return { p: a[0], n: a[1], t: a[2], c: a[3] };
  });

  var q = document.getElementById("q");
  var chipsEl = document.getElementById("chips");
  var countEl = document.getElementById("count");
  var active = "All";

  var counts = {};
  DATA.forEach(function (m) { counts[m.p] = (counts[m.p] || 0) + 1; });
  var order = Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a]; });

  function chip(key, label, n) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "chip";
    b.setAttribute("aria-pressed", key === active ? "true" : "false");
    b.dataset.key = key;
    b.innerHTML = label + "<small>" + n + "</small>";
    return b;
  }
  chipsEl.appendChild(chip("All", "All", DATA.length));
  order.forEach(function (k) { chipsEl.appendChild(chip(k, P[k][0], counts[k])); });

  function esc(s) {
    return s.replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function render() {
    var term = q.value.trim().toLowerCase();
    var list = DATA.filter(function (m) {
      if (active !== "All" && m.p !== active) return false;
      if (!term) return true;
      return (m.n + " " + P[m.p][0] + " " + m.t).toLowerCase().indexOf(term) > -1;
    });
    countEl.textContent = list.length + (list.length === 1 ? " model" : " models") + ", all free in omal";
    if (!list.length) {
      grid.innerHTML = '<p class="empty">No models match. Try a different name or clear the provider filter.</p>';
      return;
    }
    grid.innerHTML = list.map(function (m) {
      var pr = P[m.p];
      return '<li class="m"><div class="m-top"><span class="badge" style="background:linear-gradient(145deg,' +
        pr[1] + ',' + pr[1] + 'aa)" aria-hidden="true">' + esc(pr[2]) + '</span><div><h3>' + esc(m.n) +
        '</h3><p class="prov">' + esc(pr[0]) + '</p></div></div><div class="m-meta"><span class="tag">' +
        esc(m.t) + '</span><span>' + esc(m.c) + ' ctx</span></div></li>';
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
  render();
})();
