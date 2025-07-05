// loadCategories

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

const displayCategories = (categories) => {
const categoryContainer = document.getElementById("categories");

categories.forEach((element) => {
    const button = document.createElement("button");
    button.classList = 'btn';
    button.innerText = element.category;
    categoryContainer.append(button);
  });
};

// loadAllPets

const loadAllPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayPets(data.pets))
    .catch((error) => console.log(error));
};

const displayPets = (pets) => {
const petsContainer = document.getElementById("all-pets");

pets.forEach((pet) => {
    const div = document.createElement("div");
    
        div.innerHTML = `
    <img class="h-36 w-full rounded-xl object-cover" src="${pet.image}"/>
    <h3 class="text-xl">${pet.pet_name}</h3>
    <p class="text-sm text-gray-700">Breed: ${pet.breed ? pet.breed : "Not Available"
      }</p>
    <p class="text-sm text-gray-700">Birth: ${pet.date_of_birth ? pet.date_of_birth : "Not Available"
      }</p>
    <p class="text-sm text-gray-700">Gender: ${pet.gender ? pet.gender : "Not Available"
      }</p>
    <p class="text-sm text-gray-700">Price:  ${pet.price ? "$" + pet.price : "Not Available"
      }</p>
    <hr class="my-2"/>
    <div class="flex justify-between items-center px-2">
    <button onclick="like('${pet.image
      }')" class="btn bg-white text-teat-700 border rounded-lg py-1 px-4">
    <i class="fa-regular fa-thumbs-up"></i>
    </button>
    <button onclick="adoptModal(this)" class="btn bg-white text-teat-700 border rounded-lg py-1 px-4">Adopt</button>
    <button onclick="loadPetDetails(${pet.petId})" class="btn bg-white text-teat-700 border rounded-lg py-1 px-4">Details</button>
    </div>
    `;
    petsContainer.append(div);
  });
};










loadCategories();

loadAllPets();