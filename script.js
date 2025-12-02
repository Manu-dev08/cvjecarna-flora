document.addEventListener('DOMContentLoaded', () => {
const reviewsList = document.getElementById('reviews-list');
const reviewForm = document.getElementById('review-form');
const nameInput = document.getElementById('name');
const locationInput = document.getElementById('location');
const textInput = document.getElementById('review-text');

let isSubmitting = false; // 🔒 zaštita od duplog slanja

async function loadReviews() {
if (!reviewsList) return;

try {
const res = await fetch('/api/reviews');
const reviews = await res.json();
renderReviews(reviews);
} catch (err) {
console.error('Greška pri učitavanju recenzija:', err);
}
}

function renderReviews(reviews) {
reviewsList.innerHTML = '';

if (!reviews || reviews.length === 0) {
reviewsList.innerHTML = '<p>Još nema recenzija. Budite prvi!</p>';
return;
}

reviews.forEach((r) => {
const card = document.createElement('div');
card.classList.add('review-card');

card.innerHTML = `
<p class="review-text">"${r.text}"</p>
<p class="review-author">
${r.name}${r.location ? ', ' + r.location : ''}
</p>
`;

reviewsList.appendChild(card);
});
}

if (reviewForm) {
reviewForm.addEventListener('submit', async (e) => {
e.preventDefault();

if (isSubmitting) {
console.log('Već se šalje, ignoriram drugi klik.');
return;
}
isSubmitting = true;

const name = nameInput.value.trim();
const location = locationInput.value.trim();
const text = textInput.value.trim();

if (!name || !text) {
alert('Ime i recenzija su obavezni.');
isSubmitting = false;
return;
}

try {
const res = await fetch('/api/reviews', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ name, location, text })
});

console.log('POST status:', res.status);

if (!res.ok) {
throw new Error('Greška pri slanju recenzije');
}

await loadReviews();
reviewForm.reset();
} catch (err) {
console.error(err);
alert('Dogodila se greška pri slanju recenzije.');
} finally {
isSubmitting = false;
}
});
}

loadReviews();
});

