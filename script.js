function scrollToElement(elementSelector, instance = 0){
    const elements = document.querySelectorAll(elementSelector);

    if (elements.length > instance){
        elements[instance].scrollIntoView({behavior: "smooth"});
    }

}

const link1 = document.getElementById("link1");
const link2 = document.getElementById("link2");
const link3 = document.getElementById("link3");
const link4 = document.getElementById("link4");

link1.addEventListener("click", () => {
    scrollToElement('.header');
})
link2.addEventListener("click", () => {
    scrollToElement('#project');
})
link3.addEventListener("click", () => {
    scrollToElement('#footer');
})
link4.addEventListener("click", () => {
    scrollToElement('#contact');
})

const target = document.querySelectorAll('[data-anime]');

const animationClass = 'animate';

function animeScroll(){
    const windowTop = window.pageYOffset + ((window.innerHeight * 3) / 4);
    target.forEach(function(element){
        if((windowTop) > element.offsetTop){
            element.classList.add(animationClass);
        } else {
            element.classList.remove(animationClass);
        }
    })
}
animeScroll();

if(target.length){
window.addEventListener('scroll', function(){
    animeScroll();
} )
};

// history api

const links = document.querySelectorAll("nav");

function handleClick(event){
    event.preventDefault();
    fetchPage(event.target.href);
    window.history.pushState(null, null, event.target.href);
}

async function fetchPage(url){
    const pageResponse = await fetch(url);
    const pageText = await pageResponse.text();
    replaceContent(pageText);
}

function replaceContent(newText){
    const newHtml = document.createElement("div");
    newHtml.innerHTML = newText;
    const oldContent = document.querySelector('.content');
    const newContent = newHtml.querySelector('.content');
    oldContent.innerHTML = newContent.innerHTML;
    document.title = newHtml.querySelector("title").innerText;
}

window.addEventListener("popstate", () => {
fetchPage(window.location.href);
fetchPage(window.location.href);
})

links.forEach(link => {
    link.addEventListener("click", handleClick);

})

// form
const buttonLoading = document.querySelector("#envioForm");
const modal = document.querySelector(".dialogo");

const addLoading = () => {
    buttonLoading.innerHTML = '<img src="./images/loading.png" class="loading">';
};

const removeLoading = () => {
    buttonLoading.innerHTML = "Enviar";
};

function clearFormFields() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
}

const handleSubmit = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    addLoading();

    fetch("https://api.sheetmonkey.io/form/jtuiAtV8VspFVxGoFZJYpG", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => {
        if (response.ok) {
            removeLoading();
            // Oculta o modal após 5 segundos (ajuste conforme necessário)
            setTimeout(() => {
                modal.style.display = 'none';
                clearFormFields();
            }, 7000);
        } else {
            throw new Error('Falha ao enviar a mensagem');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        removeLoading();
    });
}

function validarEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function enviarFormulario() {
    const nome = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("message").value;

    if (nome === '' || email === '' || mensagem === '') {
        alert('Por favor, preencha todos os campos antes de enviar.');
        return;
    }

    // Validar o formato do e-mail
    if (!validarEmail(email)) {
        alert('Por favor, insira um endereço de e-mail válido.');
        return;
    }

    // Exibe o modal de sucesso
    modal.style.display = 'flex';
}

document.querySelector("form").addEventListener("submit", (event) => {
    handleSubmit(event);
    enviarFormulario(); 
});
