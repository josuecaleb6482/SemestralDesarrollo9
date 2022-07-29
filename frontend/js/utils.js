(()=>{
    const Utils = {        
        serviceList : (services) => {
            let template = ''
            services.map(entitie => {
                template += `<div id="services">
                <img id="${entitie.id}" alt="${entitie.logo}" src="img/services/${entitie.logo}" alt="">
                </div>`
            })
            return template
        }
    }
    document.Utils = Utils;
})()