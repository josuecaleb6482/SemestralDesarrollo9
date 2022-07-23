(() => {
  const Utils = {
    config: {
      apiBaseUrl: "http://localhost:3000/pokemon",
      apiEncounterUrl: "http://localhost:3000/encounter",
    },
    methods: {
      getUrl: ({ pokemon }) => {
        return `${Utils.config.apiBaseUrl}/${pokemon}`;
      },
      getUrlEncounter: ({ pokemon }) => {
        return `${Utils.config.apiEncounterUrl}/${pokemon}`;
      },
      getEvolution: async ({ url, searchType }) => {
        try {
          return await Utils.methods.fetch({
            url,
            searchType,
          });
        } catch (error) {
          console.log(error);
        }
      },
      fetch: async ({ url, searchType }) => {
        try {
          const rawResponse = await fetch(url);
          if (rawResponse.status !== 200) {
            throw new Error(`${searchType} not found`);
          }
          return rawResponse.json();
        } catch (error) {
          throw error;
        }
      },
      getAddress: async ({ pokemon }) => {
        const address_url = `${Utils.methods.getUrlEncounter({ pokemon })}`;
        const { data } = await axios.post(address_url);
       
        return await { data };
      },
      getSprites: () => {},
    },
  };
  document.Utils = Utils;
})();
