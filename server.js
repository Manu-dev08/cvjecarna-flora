const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

const DATA_FILE = path.join(__dirname, 'reviews.json');

// Čitanje recenzija iz fajla
function readReviews() {
try {
if (!fs.existsSync(DATA_FILE)) {
return [];
}
const raw = fs.readFileSync(DATA_FILE, 'utf-8');
return raw ? JSON.parse(raw) : [];
} catch (err) {
console.error('Greška pri čitanju reviews.json:', err);
return [];
}
}

// Spremanje recenzija u fajl
function writeReviews(reviews) {
fs.writeFileSync(DATA_FILE, JSON.stringify(reviews, null, 2), 'utf-8');
}

// GET → sve recenzije
app.get('/api/reviews', (req, res) => {
res.json(readReviews());
});

// POST → nova recenzija
app.post('/api/reviews', (req, res) => {
const { name, location, text } = req.body;

console.log('Nova recenzija:', req.body);

if (!name || !text) {
return res.status(400).json({ message: 'Ime i recenzija su obavezni.' });
}

const reviews = readReviews();

const newReview = {
id: Date.now(),
name,
location: location || '',
text,
createdAt: new Date().toISOString()
};

reviews.push(newReview);
writeReviews(reviews);

res.status(201).json(newReview);
});
// DELETE /api/reviews/:id → obriši recenziju
app.delete('/api/reviews/:id', (req, res) => {
const id = Number(req.params.id);

let reviews = readReviews();
const before = reviews.length;
reviews = reviews.filter(r => r.id !== id);

if (reviews.length === before) {
return res.status(404).json({ message: 'Recenzija nije pronađena.' });
}

writeReviews(reviews);
res.json({ success: true });
});


// Pokretanje servera
app.listen(PORT, () => {
console.log(`Server radi → http://localhost:${PORT}`);
});



