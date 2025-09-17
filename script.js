// script.js
// Sample pet data
const pets = [
    { id: 1, name: 'Buddy', type: 'Dog', breed: 'Golden Retriever', age: 2, image: 'https://via.placeholder.com/300x200?text=Buddy+Dog' },
    { id: 2, name: 'Whiskers', type: 'Cat', breed: 'Siamese', age: 1, image: 'https://via.placeholder.com/300x200?text=Whiskers+Cat' },
    { id: 3, name: 'Max', type: 'Dog', breed: 'Labrador', age: 3, image: 'https://via.placeholder.com/300x200?text=Max+Dog' },
    { id: 4, name: 'Luna', type: 'Cat', breed: 'Persian', age: 4, image: 'https://via.placeholder.com/300x200?text=Luna+Cat' },
    { id: 5, name: 'Rocky', type: 'Dog', breed: 'Beagle', age: 1, image: 'https://via.placeholder.com/300x200?text=Rocky+Dog' }
];

let displayedPets = [];
let currentIndex = 0;
const petsPerLoad = 3;

// Function to scroll to a section
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Populate pets grid
function populatePets() {
    const grid = document.getElementById('petsGrid');
    const petsToShow = pets.slice(currentIndex, currentIndex + petsPerLoad);
    petsToShow.forEach(pet => {
        const card = document.createElement('div');
        card.classList.add('pet-card');
        card.innerHTML = `
            <img src="${pet.image}" alt="${pet.name}">
            <h3>${pet.name}</h3>
            <p>${pet.type} - ${pet.breed}<br>Age: ${pet.age} years</p>
            <button onclick="selectPet(${pet.id})">Adopt Me!</button>
        `;
        grid.appendChild(card);
        displayedPets.push(pet);
    });
    currentIndex += petsPerLoad;

    // Populate adopt form select
    const select = document.getElementById('petSelect');
    select.innerHTML = '<option value="">Select a Pet</option>';
    displayedPets.forEach(pet => {
        const option = document.createElement('option');
        option.value = pet.id;
        option.textContent = `${pet.name} (${pet.type})`;
        select.appendChild(option);
    });
}

// Load more pets
function loadMorePets() {
    if (currentIndex < pets.length) {
        populatePets();
    }
}

// Select pet for adoption
function selectPet(petId) {
    document.getElementById('petSelect').value = petId;
    scrollToSection('adopt');
}

// Handle adopt form submission
function handleAdopt(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const selectedPetId = document.getElementById('petSelect').value;
    if (selectedPetId) {
        const selectedPet = pets.find(pet => pet.id == selectedPetId);
        alert(`Thank you for your interest in adopting ${selectedPet.name}! We'll contact you soon at ${formData.get('email')}.`);
        event.target.reset();
    } else {
        alert('Please select a pet to adopt.');
    }
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    populatePets();
});