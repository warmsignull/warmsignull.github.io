+++
title = 'Support Me'
description = 'Fuel future content and projects with a custom donation.'
+++

Supporting the work on Warm Signull keeps the experiments alive, whether it is
late-night debugging sessions, deep-dive essays, or the occasional wildly
over-engineered side project. You can contribute any amount, one-time or as a
monthly boost, and optionally leave a note that I’ll read personally.

**Options:**

- **Ko-fi:** <https://ko-fi.com/warmsignull>
- **Patreon:** <https://www.patreon.com/warmsignull>
- **Stripe:** Use the form below to launch a secure Stripe Checkout session.

<div class="support-wrapper">
<form id="donation-form" class="support-form">
<div class="form-row">
<label for="amount">Donation Amount (USD)</label>
<div class="amount-input">
<span>$</span>
<input type="number" id="amount" min="1" step="0.01" value="5" required />
</div>
</div>

<div class="form-row checkbox-row">
<input type="checkbox" id="recurring" />
<label for="recurring">Make this a monthly donation</label>
</div>

<div class="form-row">
<label for="name">Name or nickname (optional)</label>
<input type="text" id="name" placeholder="Will only be used to say thanks" />
</div>

<div class="form-row">
<label for="comment">Comment (optional)</label>
<textarea id="comment" rows="4" placeholder="I promise to read this"></textarea>
</div>

<fieldset class="form-row preferences">
  <legend>Sharing preferences</legend>
  <label>
    <input type="checkbox" id="share_publicly" />
    You may acknowledge this donation publicly.
  </label>
  <label id="allow-name-wrapper" class="preferences__secondary">
    <input type="checkbox" id="allow_name" disabled />
    You may display my name or nickname when sharing this donation.
  </label>
</fieldset>

<button type="submit" id="submit-button">Support me</button>
<p id="form-status" role="status" aria-live="polite"></p>
<p class="support-help muted">Payments are processed securely by Stripe. Trouble checking out? Email <a href="mailto:warmsignull@gmail.com">warmsignull@gmail.com</a>.</p>
</form>
</div>

<style>
.support-wrapper {
  display: flex;
  justify-content: center;
}

.support-form {
  width: min(520px, 100%);
  padding: 2rem;
  border-radius: 1rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  box-shadow: 0 1.5rem 3rem rgba(15, 23, 42, 0.25);
  display: grid;
  gap: 1.5rem;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.form-row label {
  font-weight: 600;
}

.amount-input {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.75rem;
  background: rgba(148, 163, 184, 0.1);
  border-radius: 0.75rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border);
}

.amount-input span {
  font-size: 1.25rem;
  color: var(--muted);
}

.amount-input input {
  border: none;
  background: transparent;
  color: inherit;
  font-size: 1.25rem;
  width: 100%;
  outline: none;
}

.support-form input[type='text'],
.support-form input[type='number'],
.support-form textarea {
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border);
  background: rgba(148, 163, 184, 0.08);
  color: inherit;
  font-size: 1rem;
  transition: border 0.2s ease, box-shadow 0.2s ease;
}

.support-form input:focus,
.support-form textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft);
  outline: none;
}

.checkbox-row {
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
}

.preferences {
  border-radius: 1rem;
  border: 1px dashed var(--border);
  padding: 1rem 1.25rem;
  display: grid;
  gap: 0.75rem;
}

.preferences legend {
  font-weight: 600;
  padding: 0 0.5rem;
}

.preferences__secondary {
  opacity: 0.5;
}

.support-form button {
  padding: 0.85rem 1.5rem;
  border-radius: 999px;
  border: none;
  color: #0f172a;
  font-weight: 700;
  font-size: 1rem;
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
}

.support-form button:hover:not([disabled]),
.support-form button:focus-visible {
  transform: translateY(-1px);
  box-shadow: 0 1rem 2rem rgba(14, 165, 233, 0.35);
}

.support-form button[disabled] {
  opacity: 0.6;
  cursor: wait;
  box-shadow: none;
  transform: none;
}

#form-status {
  margin: 0;
  min-height: 1.25rem;
}

.form-status--error {
  color: #fca5a5;
}

.form-status--success {
  color: #6ee7b7;
}

.support-help {
  margin: 0;
  font-size: 0.9rem;
  text-align: center;
}
</style>

<script type="module">
const WORKER_ENDPOINT =
  'https://stripe-custom-donation-warmsignull-backend.warmsignull.workers.dev/create-checkout-session';

const form = document.getElementById('donation-form');
const button = document.getElementById('submit-button');
const statusLine = document.getElementById('form-status');
const allowNameWrapper = document.getElementById('allow-name-wrapper');
const allowNameCheckbox = document.getElementById('allow_name');
const sharePubliclyCheckbox = document.getElementById('share_publicly');

function setStatus(message, type = 'neutral') {
  if (!statusLine) return;
  statusLine.textContent = message;
  statusLine.className = type === 'error' ? 'form-status--error' : type === 'success' ? 'form-status--success' : '';
}

function syncAllowNameState() {
  if (!allowNameWrapper || !allowNameCheckbox || !sharePubliclyCheckbox) return;
  const enabled = sharePubliclyCheckbox.checked;
  allowNameWrapper.classList.toggle('preferences__secondary', !enabled);
  allowNameCheckbox.disabled = !enabled;
  if (!enabled) allowNameCheckbox.checked = false;
}

sharePubliclyCheckbox?.addEventListener('change', syncAllowNameState);
syncAllowNameState();

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form || !button || !statusLine) return;

  const amountInput = document.getElementById('amount');
  const amount = amountInput ? Number(amountInput.value) : NaN;
  if (!Number.isFinite(amount) || amount <= 0) {
    setStatus('Please enter an amount greater than zero.', 'error');
    return;
  }

  const payload = {
    amount,
    recurring: document.getElementById('recurring')?.checked ?? false,
    name: (() => {
      const el = document.getElementById('name');
      return el && 'value' in el && el.value ? el.value : undefined;
    })(),
    comment: (() => {
      const el = document.getElementById('comment');
      return el && 'value' in el && el.value ? el.value : undefined;
    })(),
    share_publicly: document.getElementById('share_publicly')?.checked ?? false,
    allow_name: document.getElementById('allow_name')?.checked ?? false,
  };

  try {
    button.disabled = true;
    setStatus('Creating your Stripe Checkout session…');

    const response = await fetch(WORKER_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok || !data.url) {
      setStatus(data.error || 'Something went sideways. Please try again.', 'error');
      button.disabled = false;
      return;
    }

    setStatus('Redirecting you securely to Stripe…', 'success');
    window.location.href = data.url;
  } catch (error) {
    console.error(error);
    setStatus('Network error. Please try again or email hello@warmsignull.com.', 'error');
    button.disabled = false;
  }
});
</script>
