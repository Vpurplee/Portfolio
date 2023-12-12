function scrollParaLink(elementSelector, instance = 0){
    const elements = document.querySelectorAll(elementSelector);

    if (elements.length > instance){
        elements[instance].scrollIntoView({behavior: "smooth"});
    }

}

const link1 = document.getElementById("link1");

link1.addEventListener("click", () => {
    scrollParaLink('#Projects');
})





// 
// 


function createProjetos(projeto){
    console.log(projeto)
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `<img class="image-container" src="${projeto.image}" alt="${projeto.alt}" /><h3>${projeto.name}</h3><p>${projeto.description}</p>`;
    return div;
}


// ...


// Declare projetoContainer outside the getProjetos function
const containerView = document.querySelector(".container");
const projetoContainer = document.querySelector(".projetosContainer");
const containerVideo = document.querySelector(".video-Container");
const containerLink = document.querySelector(".linkicon");


async function getProjetos(url) {
    const projetosResponse = await fetch(url);
    const projetosJson = await projetosResponse.json();
    const projetosCards = document.querySelector(".projetosCards");
    projetosJson.forEach(projeto => {
        const divprojeto = createProjetos(projeto);
        projetosCards.appendChild(divprojeto);

        // Add click event listener to each card
        divprojeto.addEventListener("click", () => {
            // Handle card click and update project details
            handleCardClick(projeto);
        });
    });

    // Initialize with the first project details
    updateProjectDetails(projetosJson[0]);
}

// Function to update the project details in projetosContainer
function updateProjectDetails(projeto) {
    projetoContainer.querySelector("h2").textContent = projeto.name;
    projetoContainer.querySelector("p").textContent = projeto.description;
    containerVideo.querySelector('iframe').src = projeto.video;

    const technologiesContainer = projetoContainer.querySelector('.technologies');

    if (technologiesContainer) {
        technologiesContainer.textContent = '';

        // Add technologies to the list
        projeto.technologies.forEach(tech => {
            const li = document.createElement("li");
            li.textContent = tech;
            technologiesContainer.appendChild(li);
        });
    } else {
        console.error("Elemento .technologies não encontrado no documento.");
    }
    containerLink.href = projeto.link;
}

// Function to handle card click
async function handleCardClick(projeto) {
    // Call the function to update project details
    await updateProjectDetails(projeto);

    // Scroll to the top of the page
    containerView.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Call getProjetos with the API URL
getProjetos("./projetosapi.json");

