((HtmlElements, Utils) => {
  const App = {
    htmlElements: {
      ...HtmlElements.htmlElements,
    },
    init: () => {
      App.htmlElements.form.addEventListener(
        "submit",
        App.handlers.handleFormSubmit
      );
      App.htmlElements.closeModal.addEventListener(
        "click",
        App.handlers.handlerModal
      );
      App.htmlElements.closeModalImage.addEventListener(
        "click",
        App.handlers.handlerModalImage
      );
    },
    handlers: {
      handleFormSubmit: async (e) => {
        e.preventDefault();
        const pokemon = App.htmlElements.input.value;
        const is_address = App.htmlElements.address.checked;
        const is_sprites = App.htmlElements.sprites.checked;
        const is_evolution = App.htmlElements.evolution.checked;
        const url = App.utils.getUrl({ pokemon });
        const { data } = await axios.post(url);
        const searchType = "pokedex";
        const response = data;

        console.log(data)
        App.htmlElements.stats.innerHTML = "";
        App.htmlElements.stats.innerHTML += await App.templates.render({
          searchType,
          response,
        });

        if (is_address) {
          const searchType = "pokemonEncountersTable";
          const { data } = await App.utils.getAddress({ pokemon });
          let response = { data };
          const table = await App.templates.render({ searchType, response });

          await sessionStorage.setItem("table", table);

          App.htmlElements.bigbluebutton.addEventListener(
            "click",
            App.handlers.handleTableStats
          );
        }

        if (is_sprites) {
          App.htmlElements.leftcross.addEventListener(
            "click",
            App.handlers.handleSessionSprites
          );
          App.htmlElements.rightcross.addEventListener(
            "click",
            App.handlers.handleSessionSprites
          );
        }

        if (is_evolution) {
          const { data } = await axios.get(url);
          const res = await App.handlers.evolutionFinder(
            data.data.evolution_chain.url
          );
          App.htmlElements.stats.innerHTML += await `${res}`;
          sessionStorage.setItem("stats", App.htmlElements.stats.innerHTML);
        }
      },
      handlerModal: async (message = "") => {
        if (App.htmlElements.myModal.classList.contains("show-modal")) {
          App.htmlElements.myModal.classList.remove("show-modal");
        } else {
          App.htmlElements.textModal.innerHTML = await message;
          App.htmlElements.myModal.classList.add("show-modal");
        }
      },
      handlerModalImage: async (message = "") => {
        if (App.htmlElements.myModalImage.classList.contains("show-modal")) {
          App.htmlElements.myModalImage.classList.remove("show-modal");
        } else {
          App.htmlElements.myModalImage.classList.add("show-modal");
        }
      },
      handleSessionSprites: async (e) => {
        const sprite = JSON.parse(sessionStorage.getItem("sprites"));
        const max_sprites = sessionStorage.getItem("max_sprites");
        const id = `${e.target.id}`;
        const incremento = id == "rightcross" || id == "rightT" ? 1 : -1;
        let counter = sessionStorage.getItem("counter_sprites");

        if (counter == max_sprites && incremento > 0) counter = 0;
        else if (counter == 0 && incremento < 0) counter = max_sprites;
        else counter = parseInt(counter) + incremento;

        sessionStorage.setItem("counter_sprites", `${counter}`);

        App.htmlElements.picture.innerHTML = "";
        App.htmlElements.picture.innerHTML = `<img src="${sprite[counter]}" alt="" height="170"/>`;
      },
      evolutionFinder: async (url, searchType = "evolution") => {
        try {
          const response = await App.utils.getEvolution({
            url,
            searchType,
          });
          const renderedTemplate = await App.templates.render({
            searchType,
            response,
          });
          return renderedTemplate;
        } catch (error) {
          return console.log(`Debe ingresar en el campo ${error}`);
        }
      },
      handleTableStats: () => {
        const statsMemory = sessionStorage.getItem("stats");
        const statsLoad = App.htmlElements.stats.innerHTML;
        if (statsLoad == statsMemory)
          App.htmlElements.stats.innerHTML = sessionStorage.getItem("table");
        else App.htmlElements.stats.innerHTML = statsMemory;
      },
    },
    utils: {
      ...Utils.methods,
    },
    templates: {
      render: ({ searchType, response }) => {
        const renderMap = {
          pokedex: App.templates.pokedex,
          pokemonTypes: App.templates.pokemonTypes,
          pokemonEncountersTable: App.templates.pokemonEncountersTable,
          pokemonEncountersRows: App.templates.pokemonEncountersRows,
          evolution: App.templates.evolutionList,
        };
        return renderMap[searchType]
          ? renderMap[searchType](response)
          : console.log(`<h1>Parece que hay un error</h1><p>${response}</p>`);
      },
      pokedex: async ({
        name,
        data,
        data: { height, sprites, weight },
        is_cached,
      }) => {
        const searchType = "pokemonTypes";
        const response = data;

        console.log(data)
        const imgs = Object.keys(sprites)
          .map(function (_) {
            return sprites[_];
          })
          .filter((a) => a != null && a.toLocaleString() != "[object Object]");

        sessionStorage.setItem("sprites", JSON.stringify(imgs));
        sessionStorage.setItem("counter_sprites", "0");
        sessionStorage.setItem("max_sprites", `${imgs.length - 1}`);

        App.htmlElements.picture.innerHTML = ``;
        App.htmlElements.picture.innerHTML = `<img src="${sprites.front_default}" alt="psykokwak" height="170" />`;
        return `<strong>Name:</strong> ${name}<br/>
                <strong>Type:</strong> ${await App.templates.render({
                  searchType,
                  response,
                })}<br/>
                <strong>Height:</strong> ${height}'<br/>
                <strong>Weight:</strong> ${weight} lbs.<br/><br/>
                <div id="evolution_list"></div><br/>`;
      },
      pokemonTypes: async ({ types }) => {
        const typesList = types.map(({ type }) => `${type.name}, `);
        return `${typesList}`
          .substring(0, `${typesList}`.length - 2)
          .replace(", ,", ", ");
      },
      pokemonEncountersRows: async ({ data }) => {
        var html = `
        <thead>
            <tr>
                
            </tr>
        </thead>
        <tbody>
            <tr>

            </tr>
        </tbody>`;

        data.map((area) => {
          html += `<th colspan="5">${area.location_area}</th><tr>`;
          area.version_details.map((items_version_details) => {
            html += `<td rowspan='${items_version_details.length}'>${items_version_details.version.name}</td>`;
            var is_first = true;
            items_version_details.encounter_details.map((x) => {
              if (is_first) is_first = false;
              else html += `<tr>`;
              html += `<td>${x.chance}</td><td>${x.max_level}</td><td>${x.min_level}</td>`;
            });
          });
        });
        return await html;
      },
      pokemonEncountersTable: async ({ data: { data } }) => {
        console.log(data)
        return await `<h3>Ubicaciones</h3><table align="center">
        <thead>
            <tr>
                <th>Versión</th>
                <th>Método</th>
                <th>Chance</th>
                <th>Nivel Min</th>
                <th>Nivel Max</th>
            </tr>
          </thead>
          
              ${data.map((area) => {
                let html = `<tr><th colspan="5">${area.location_area.name}</th></tr>`;
                area.version_details.map((items_version_details) => {
                  html += `<tr><td rowspan='${
                    items_version_details.encounter_details.length + 1
                  }'>${items_version_details.version.name}</td></tr>`;
                  items_version_details.encounter_details.map((x) => {
                    html += `<tr>`;
                    html += `<td>${x.method.name}</td><td>${x.chance}</td><td>${x.min_level}</td><td>${x.max_level}</td></tr>`;
                  });
                });
                return html;
              })}</table>`;
      },
      evolutionList: async ({ chain }) => {
        const chainEvol = chain;
        var list = `<li>${chain.species.name}${
          chain.is_baby ? `${App.templates.img.is_baby}` : ""
        }</li>`;

        const evolution = await App.templates.evolvesTo(list, chain.evolves_to);

        return evolution;
      },
      evolvesTo: async (list, evolves_to) => {
        if (Object.keys(evolves_to).length > 0) {
          for (var i = 0; i < evolves_to.length; i++) {
            list += `<li>${evolves_to[i].species.name} ${
              evolves_to[i].is_baby ? `${App.templates.img.is_baby}` : ""
            }</li>`;
            list = await App.templates.evolvesTo(
              list,
              evolves_to[i].evolves_to
            );
          }
        }
        return list;
      },
      img: {
        is_baby: ` <img src='img/baby.svg' />`,
        is_hidden: ` <img src='img/ojo.svg' />`,
      },
    },
  };
  App.init();
})(document.HtmlElements, document.Utils);
