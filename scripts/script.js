// loadCategories

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

removeActiveClasses = () => {
const buttons = document.getElementsByClassName("category-btn");
for(let btn of buttons){

  btn.classList.remove("active");

}
};

loadCategoryPets = (category) => {
 


 fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClasses();
const activeBtn = document.getElementById(`btn-${category}`);
activeBtn.classList.add("active");
      displayPets(data.data);
    })
    .catch((error) => console.log(error));

};

const displayCategories = (categories) => {
const categoryContainer = document.getElementById("categories");

categories.forEach((element) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.classList = "my-4";

buttonContainer.innerHTML = `
<button id="btn-${element.category}" onclick="loadCategoryPets('${element.category}')"  class="w-full mx-auto bg-white text-teal-800 border-2 shadow-lg rounded-lg py-2 px-4 flex items-center gap-2 hover:bg-teal-600 cursor-pointer hover:border-0 hover:text-white  hover:shadow-xl  category-btn  justify-center"> 
<img class="w-fit h-10" src="${element.category_icon}"/>
    <p class="text-xl font-bold">${element.category}</p>
</button>
`;
    categoryContainer.append(buttonContainer);
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
petsContainer.innerHTML = "";

if (pets.length == 0) {
petsContainer.classList.remove("lg:grid");
petsContainer.innerHTML =`
<div class="bg-gray-100 p-20 rounded-xl text-center space-y-4 cols-span-3">
    <img class="mx-auto" src="assets/error.webp"/>
    <h3 class="text-3xl font-semibold">No Information Available</h3>
    <p class="text-gray-500"> It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
its layout. The point of using Lorem Ipsum is that it has a.
     </p>
    </div>
`;
return;
}

else{
  petsContainer.classList.add("lg:grid");
};

pets.forEach((pet) => {
    const div = document.createElement("div");
    div.classList = "border border-gray-200 rounded-lg p-4 shadow-lg hover:shadow-xl ";
    
        div.innerHTML = `
    <img class="h-36 w-full rounded-xl object-cover" src="${pet.image}"/>
    <h3 class="text-xl my-2">${pet.pet_name}</h3>
    <p class="text-sm text-gray-700">Breed: ${pet.breed ? pet.breed : "Not Available" }</p>
    <p class="text-sm text-gray-700">Birth: ${pet.date_of_birth ? pet.date_of_birth : "Not Available" }</p>
    <p class="text-sm text-gray-700">Gender: ${pet.gender ? pet.gender : "Not Available" }</p>
    <p class="text-sm text-gray-700">Price:  ${pet.price ? "$" + pet.price : "Not Available" }</p>
    <hr class="my-2 text-gray-300"/>
    <div class="flex justify-between items-center px-2">
    <button onclick="like('${pet.image}')" class="btn bg-white text-teal-800 border rounded-lg py-1 px-4">
    <i class="fa-regular fa-thumbs-up"></i>
    </button>
    <button onclick="adoptModal(this)" class="btn bg-white text-teal-800 border rounded-lg py-1 px-4 text-teal-800">Adopt</button>
    <button onclick="loadPetDetails(${pet.petId})" class="btn bg-white text-teal-800 border rounded-lg py-1 px-4 text-teal-800">Details</button>
    </div>
    `;
    petsContainer.append(div);
  });
};





//adopt button functionality
const adoptModal = (event) => {
  let count = 3;
  const countContainer = document.getElementById("countdown-container");
  countContainer.innerHTML = count;
  my_modal_1.showModal();
  const interval = setInterval(() => {
    count--;
    if (count !== 0) countContainer.innerHTML = count;
    if (count < 1) {
      clearInterval(interval);
      my_modal_1.close();
      event.textContent = "Adopted";
      event.disabled = "true";
    }
  }, 1000);
};



//load pets details by id
const loadPetDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const data = await res.json();
  displayPetDetails(data.petData)
};
// display pet details 
const displayPetDetails = data => {
  const modalBody = document.getElementById('details-container')
  modalBody.innerHTML = `
  <img class="h-60 rounded-xl object-cover w-full" src="${data.image}"/>
  <h3 class="text-xl font-bold my-2">${data.pet_name}<h3/>
  <div class="flex items-start gap-6">
  <div>
  <p class="text-gray-600 text-sm"><i class="fa-solid fa-paw"></i>Breed:
  ${data.breed ? data.breed : 'Not Available'
    }
  </p>
  <p class="text-gray-600 text-sm"><i class="fa-solid fa-venus-mars"></i>Gender:
  ${data.gender ? data.gender : 'Not Available'
    }
  </p>
  <p class="text-gray-600 text-sm"><i class="fa-solid fa-syringe"></i>Vaccinated_status:
  ${data.vaccinated_status ? data.vaccinated_status : 'Not Available'
    }
  </p>
  </div>
  <div>
  <p class="text-gray-600 text-sm"><i class="fa-solid fa-calendar-days"></i>Birth:
  ${data.date_of_birth ? data.date_of_birth : 'Not Available'
    }
  </p>
  <p class="text-gray-600 text-sm"><i class="fa-solid fa-dollar-sign"></i>Price:
  ${data.price ? "$" + data.price : 'Not Available'
    }
  </p>
  </div>
  </div>
  <hr class="my-2"/>
  <h3 class="font-semibold text-md">Details Information</h3>
  <p class="text-sm text-gray-600 my-2">
  ${data.pet_details ? data.pet_details : 'Not available'
    }
  </p>
  `;
  customModal.showModal()
}



// handle like button 
const like = imageUrl => {
  const imageContainer = document.getElementById('like-pets')
  const div = document.createElement('div')
  div.classList = "  rounded-xl  p-4";
    div.innerHTML = `
    <img class="rounded-lg" src="${imageUrl}"/>
    `;
  imageContainer.appendChild(div)
}

function sort(){
console.log("sort");
};


loadCategories();

loadAllPets();