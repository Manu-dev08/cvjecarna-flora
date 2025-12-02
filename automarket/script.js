// DEMO PODACI – OVDJE MIJENJAŠ / DODAJEŠ AUTA
const cars = [
{
id: 1,
brand: "VW",
model: "Golf 7",
year: 2016,
km: 145000,
price: 11500,
location: "Fojnica",
image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800",
fuel: "Dizel",
gearbox: "Manuelni",
power: "85 kW",
description: "Odličan Golf 7, redovno servisiran, bez većih ulaganja. Servisna knjižica, dva ključa.",
sellerName: "Privatni prodavač",
phone: "+38760000001"
},
{
id: 2,
brand: "BMW",
model: "320d",
year: 2014,
km: 198000,
price: 12500,
location: "Aalen",
image: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=800",
fuel: "Dizel",
gearbox: "Automatik",
power: "135 kW",
description: "BMW 3er, M-paket, odlična oprema, registriran, spreman za vožnju.",
sellerName: "Auto centar",
phone: "+49731123456"
},
{
id: 3,
brand: "Audi",
model: "A3",
year: 2015,
km: 160000,
price: 10900,
location: "Sarajevo",
image: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=800",
fuel: "Benzin",
gearbox: "Manuelni",
power: "92 kW",
description: "Audi A3 u dobrom stanju, nove gume, veliki servis urađen.",
sellerName: "Privatni prodavač",
phone: "+38761123456"
}
];

const carsContainer = document.getElementById("cars-container");
const brandSelect = document.getElementById("filter-brand");
const minPriceInput = document.getElementById("filter-min-price");
const maxPriceInput = document.getElementById("filter-max-price");
const filterBtn = document.getElementById("filter-btn");
const resetBtn = document.getElementById("reset-btn");

const modal = document.getElementById("car-modal");
const modalClose = document.getElementById("modal-close");
const modalBody = document.getElementById("modal-body");
const yearSpan = document.getElementById("year-span");

// Postavi godinu u footeru
if (yearSpan) {
yearSpan.textContent = new Date().getFullYear();
}

// Popuni select s markama (bez duplikata)
function populateBrandFilter() {
const brands = [...new Set(cars.map(c => c.brand))].sort();
brands.forEach(brand => {
const opt = document.createElement("option");
opt.value = brand;
opt.textContent = brand;
brandSelect.appendChild(opt);
});
}

// Render svih ili filtriranih auta
function renderCars(list) {
carsContainer.innerHTML = "";

if (!list.length) {
carsContainer.innerHTML = `<p>Nema rezultata za zadane filtere.</p>`;
return;
}

list.forEach(car => {
const card = document.createElement("div");
card.className = "car-card";

card.innerHTML = `
<div class="car-image-wrapper">
<img src="${car.image}" alt="${car.brand} ${car.model}">
</div>
<div class="car-body">
<div class="car-title">${car.brand} ${car.model}</div>
<div class="car-meta">
${car.year} • ${car.km.toLocaleString("de-DE")} km • ${car.fuel}
</div>
<div class="car-price">${car.price.toLocaleString("de-DE")} €</div>
<div class="car-footer">
<span>${car.location}</span>
<button class="btn-secondary" onclick="openCarDetails(${car.id})">Detalji</button>
</div>
</div>
`;

carsContainer.appendChild(card);
});
}

// Filtriranje
function applyFilters() {
const brand = brandSelect.value;
const minPrice = Number(minPriceInput.value) || 0;
const maxPrice = Number(maxPriceInput.value) || Infinity;

const filtered = cars.filter(car => {
const matchBrand = brand ? car.brand === brand : true;
const matchPrice = car.price >= minPrice && car.price <= maxPrice;
return matchBrand && matchPrice;
});

renderCars(filtered);
}

// Reset filtera
function resetFilters() {
brandSelect.value = "";
minPriceInput.value = "";
maxPriceInput.value = "";
renderCars(cars);
}

// Otvaranje detalja
function openCarDetails(id) {
const car = cars.find(c => c.id === id);
if (!car) return;

modalBody.innerHTML = `
<img src="${car.image}" alt="${car.brand} ${car.model}" class="modal-body-main-image">
<h2 class="modal-title">${car.brand} ${car.model}</h2>
<p class="modal-subtitle">${car.year} • ${car.km.toLocaleString("de-DE")} km • ${car.fuel} • ${car.gearbox}</p>
<div class="car-price">${car.price.toLocaleString("de-DE")} €</div>

<div class="modal-grid">
<div>
<strong>Snaga:</strong><br>${car.power || "N/A"}
</div>
<div>
<strong>Lokacija:</strong><br>${car.location}
</div>
<div>
<strong>Prodavač:</strong><br>${car.sellerName}
</div>
</div>

<div style="margin-top: 0.8rem;">
<strong>Opis vozila:</strong>
<p style="margin-top: 0.3rem;">${car.description}</p>
</div>

<div class="modal-contact">
<strong>Kontakt prodavača:</strong>
<p>Telefon: <a href="tel:${car.phone}" style="color:#f5c14a;">${car.phone}</a></p>
</div>
`;

modal.style.display = "flex";
}

// Zatvaranje modala
function closeModal() {
modal.style.display = "none";
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
if (e.target === modal) closeModal();
});

// HANDLING FORME "PREDAJ OGLAS"
// Za sada samo prikažemo podatke u alertu i konzoli.
// U praksi bi ovdje slao na backend ili email servis.
function handleAdFormSubmit(event) {
event.preventDefault();

const data = {
ime: document.getElementById("ime").value.trim(),
telefon: document.getElementById("telefon").value.trim(),
marka: document.getElementById("marka").value.trim(),
model: document.getElementById("model").value.trim(),
godina: document.getElementById("godina").value.trim(),
kilometri: document.getElementById("kilometri").value.trim(),
cijena: document.getElementById("cijena").value.trim(),
lokacija: document.getElementById("lokacija").value.trim(),
opis: document.getElementById("opis").value.trim()
};

console.log("Novi oglas:", data);

alert(
"Podaci za oglas su zabilježeni u pregledniku (console.log).\n\n" +
"Sljedeći korak: ručno dodaj ovo vozilo u 'cars' listu u script.js."
);

event.target.reset();
}

// Event listeneri
filterBtn.addEventListener("click", applyFilters);
resetBtn.addEventListener("click", resetFilters);

// INIT
populateBrandFilter();
renderCars(cars);

