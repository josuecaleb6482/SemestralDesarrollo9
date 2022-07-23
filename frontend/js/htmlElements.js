(() =>{
    const HtmlElements = {
        htmlElements:{
            form: document.querySelector(".pokemon-form"),
            input: document.querySelector("#pokemon-input"),
            pokedex: document.querySelector("#pokedex"),
            address: document.querySelector("#address"),
            sprites: document.querySelector("#sprites"),
            evolution: document.querySelector("#evolution"),
            myModal: document.getElementById("modal"),
            myModalImage: document.getElementById("modal_image"),
            textModal: document.getElementById("modal-text"),
            textModalImage: document.getElementById("modal-text-image"),
            closeModal: document.getElementById("close-modal"),
            closeModalImage: document.getElementById("close-modal-image"),
            rightcross: document.querySelector("#rightcross"),
            leftcross: document.getElementById("leftcross"),
            picture: document.getElementById("picture"),
            evolutionList: document.getElementById("evolution_list"),
            stats: document.getElementById("stats"),
            bigbluebutton: document.getElementById("bigbluebutton"),
        }
    }
    document.HtmlElements = HtmlElements;
})();