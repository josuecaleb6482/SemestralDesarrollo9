(()=>{
    const App = {
        htmtElements : {
            loginForm : document.getElementById('loginForm'),
            documentMain : document.getElementById('main'),
            servicesItems : document.getElementById('servicesItems'),
            serviceForm:null,
            payInput : null,
            singOffLink : document.getElementById('singOff'),
            userNameInfo : document.getElementById('userName')
        },
        setting : {
            idCliente : '',
            idService : ''
        },
        templates : {            
            dataClientTemplate : (account='') => {

                const template =  `
                    <div class="service-title">
                        <img src="img/services/masmovil.png" alt="">
                    </div>
                    <div class="service-data">
                    <section class="service-progress">
                        <div class="progress select" id="progress-1">
                            <span>Datos Cliente</span>
                        </div>
                        <div class="progress none" id="progress-2">
                            <span>Detalles del pago</span>
                        </div>
                        <div class="progress none"  id="progress-3">
                            <span>Factura</span>
                        </div>
                    </section>
                    <section id="pay-progress" class="service-form">

                        <form id="service-form" action="">
                            <section class="form-title">
                                <h2>Ingrese sus datos</h2>
                            </section>
                            <section class="form-input">
                                <label  for="client-id">ID de cuenta</label>
                                <input value="${account}" class="white" id="clientId" type="text">
                            </section>
                            <section class="form-btn">
                                <button class="btn" type="submit">Enviar</button>
                            </section>
                        </form>

                    </section>
                </div>
                `;

                return template;
            },
            payDetailsTemplate : ({Cliente,cuenta, saldoActual}) => {
                return `
                <form id="pay-form" action="">
                            
                <section class="form-input">
                    <!--<label for="service-name">Servicio a pagar</label> -->
                    <!-- <input disabled value="" id="service-name" type="text"> -->
                    <label for="client-name">Nombre del cliente</label>
                    <input value="${Cliente.nombre} ${Cliente.apellido}" disabled id="client-name" type="text">
                    <label  for="client-id">ID de cuenta</label>
                    <input value="${cuenta}" disabled id="clientAccount" type="text">
                    <label  for="client-balance">Saldo pendiente</label>
                    <input value="${saldoActual}" class="balance-input" disabled id="clientBalance" type="text">
                    <label  for="client-pay">Total a pagar:</label>
                    <input class="pay-input"   id="clientPay" type="text">
                </section>
                <section class="form-btn">
                    <button id="submitBtn" class="btn" type="submit">Enviar</button>
                    <a id="paypalBtn"  class="paypal-btn hidden" href="#">
                                    <span class="paypal-button-title">
                                        Pagar con 
                                      </span>
                                      <span class="paypal-logo">
                                        <i class="blue">Pay</i>
                                        <i class="celest">Pal</i>
                                      </span>
                    </a>
                </section>
            </form>
                `;
            }
        },
        utils : {
        },
        handler : {
            onLoginFormSubmit : async (e)=> {
                e.preventDefault()
                const _email = e.target.mail.value.trim();
                const _pass = e.target.pass.value.trim();

                if(_email.length > 0 && _pass.length >0){
                    
                    try {
                        const {data} = await axios.post('http://localhost:3000/usuarios/login',{
                            _email:_email,
                            _pass:_pass
                        });
                        sessionStorage.setItem('data',JSON.stringify(data))
                        location.replace("services.html")
                    } catch (error) {
                        console.log(error)
                    }
                }
            },
            onServiceItemClick : (e) => {
                if( e.target.localName === 'img'){
                    App.setting.idService = e.target.id;
                    App.htmtElements.documentMain.innerHTML = App.templates.dataClientTemplate();
                    App.htmtElements.serviceForm = document.getElementById('service-form').addEventListener('submit',App.handler.onServiceFormClick)
                }                
            },
            onProgress1Click: () => {
                let e = {
                    target : {
                        localName: "img"
                    }
                }
                //funcion para poder volver a ingresar otra cuenta
                App.handler.onServiceItemClick(e)
            },
            onServiceFormClick: async (e)=>{
                e.preventDefault()
                    const serviceId = 2
                    const account = e.target.clientId.value                   
               
                const {data} = await axios.post('http://localhost:3000/clientEntities/balance',{
                    serviceId:serviceId,
                    account:account
                })

              if(data.length > 0) {

                    //funcionalidad extra, cambiar color de los div, habilitar el div para ingresar otra vez el numero de cuenta
                    let payProgress =  document.getElementById('pay-progress')
                    payProgress.innerHTML = App.templates.payDetailsTemplate(data[0])
                    document.getElementById('pay-form').addEventListener('submit',App.handler.onPayFormSubmit)
                    document.getElementById('progress-1').className = 'progress none'
                    document.getElementById('progress-2').className = 'progress select'
                    document.getElementById('progress-1').addEventListener('click',App.handler.onProgress1Click)
                    document.getElementById('progress-1').className += ' cursor'
                }
            },
            onPayFormSubmit : async (e) => {
                e.preventDefault()
                let balance = Number(e.target.clientBalance.value.trim())
                let toPay = Number(e.target.clientPay.value.trim())
                let account = e.target.clientAccount.value.trim()
                
                if(toPay > balance || toPay.length==0 ){
                    console.log(balance, toPay, account)
                    console.log("pago no puede ser mayor al saldo")
                    return
                }
                const {data} = await axios.post('http://localhost:3000/paypal/create-payment',{
                    price:toPay,
                    idCliente : App.setting.idCliente,
                    idService : App.setting.idService,
                    balance : balance,
                    account : account
                })
                if(data){
                    document.getElementById('submitBtn').className = 'btn hidden'
                    let paypalbtn = document.getElementById('paypalBtn')
                    paypalbtn.className = 'paypal-btn flex'
                    paypalbtn.href = data.data.links[1].href
                    paypalbtn.target = '_blank'
                }
            },
            onSignOffClick: () => {
                sessionStorage.removeItem('data')
            }
        },
        init : () => {            
            let path = window.location.pathname;
            let page = path.split("/").pop();

            if(page === 'index.html'){
                sessionStorage.getItem('data') ? location.replace("services.html") : false                
            }
            
            if(page === 'services.html'){
                const user = sessionStorage.getItem('data') ? JSON.parse(sessionStorage.getItem('data')) : location.replace("index.html")
                App.htmtElements.singOffLink.addEventListener('click',App.handler.onSignOffClick)
                App.htmtElements.userNameInfo.innerHTML = `<img src="img/svg/user-icon.svg" alt="">${user.user[0].nombre}`
                App.setting.idCliente=user.user[0].id
            }
            
            if(App.htmtElements.servicesItems) App.htmtElements.servicesItems.addEventListener('click', App.handler.onServiceItemClick);
            if(App.htmtElements.loginForm) App.htmtElements.loginForm.addEventListener('submit',App.handler.onLoginFormSubmit);
        }
    }
    App.init()
})()