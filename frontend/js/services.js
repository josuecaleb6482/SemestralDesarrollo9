((Utils) => {
    const App = {
        htmlElements: {
            documentMain: document.getElementById('main'),
            servicesItems: document.getElementById('servicesItems'),
            singOffLink: document.getElementById('singOff'),
            userNameInfo: document.getElementById('userName'),
            transactionHistory : document.getElementById('transactionHistory'),
            serviceForm: null,
            payInput: null,
        },
        setting: {
            idClient: '',
            idService: '',
            serviceName: ''
        },
        templates: {
            dataClientTemplate: () => {
                return `
                    <div class="service-title">
                        <img src="img/services/${App.setting.serviceName}" alt="">
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
                                <div class = "flex">
                                <input value="" class="white" id="clientId" type="text">
                                <section class="alert" id="alert"></section>
                                </div>
                            </section>
                            <section class="form-btn">
                                <button class="btn" type="submit">Enviar</button>
                            </section>
                        </form>
                    </section>
                </div>
                `;


            },
            payDetailsTemplate: ({ Cliente, cuenta, saldoActual }) => {
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
                    <input value="${saldoActual.toFixed(2)}" class="balance-input" disabled id="clientBalance" type="text">
                    <label  for="client-pay">Total a pagar:</label>
                    <input class="pay-input"   id="clientPay" type="text">
                    
                                <div class = "flex">
                                <section class="alert" id="alert"></section>
                                </div>
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
                    <a id="yappyBtn"  class="yappy-btn hidden" href="#">
                                            <span>Pagar con</span>
                                            <span>Yappy</span>
                                        </a>
                </section>
            </form>
                `;
            },
            billDetailsTemplate: (billData) => {
                const date = new Date(billData[0].fechaTran).toISOString().slice(0, 10);

                return `
                <div class="service-title">
                    <img src="img/services/${billData[0].idServ}.png" alt="">
                </div>
                <div class="service-data">
                    <section class="service-progress">
                        <div class="progress none" id="progress-1">
                            <span>Datos Cliente</span>
                        </div>
                        <div class="progress none" id="progress-2">
                            <span>Detalles del pago</span>
                        </div>
                        <div class="progress select" id="progress-3">
                            <span>Factura</span>
                        </div>
                    </section>
                    <section class="bill-details">
                        <section class="form-title green">
                        <h3>Su pago se ha completado correctamente</h3>
                        </section>
                        <table>
                            <tr>
                                <th>#orden</th>
                                <th>Cuenta</th>
                                <th>Fecha</th>
                                <th>Pago</th>
                            </tr>
                            <tr>
                                <td>${billData[0].numTran}</td>
                                <td>${billData[0].numCuenta}</td>
                                <td>${date}</td>
                                <td>${billData[0].monto.toFixed(2)} $</td>
                            </tr>
                            
                        </table>

                    </section>

                    <section class="form-btn">
                    <button onclick="location.replace('services.html')"  class="btn" type="submit">Volver al inicio</button>
                </section>
                </div>
                `
            },
            transactionHistoryTemplate : (data) => {
                const records = data.map(e => {
                    const date = new Date(e.fechaTran).toISOString().slice(0, 10);
                    return `<tr>
                    <td>${e.numTran}</td>
                    <td>${e.numCuenta}</td>
                    <td>${date}</td>
                    <td>${e.monto.toFixed(2)} $</td>
                </tr>`
                })

                return `
                <div class="service-title">
                </div>
                <div class="service-data">
                    
                    <section class="bill-details">
                        <section class="form-title green">
                        <h3></h3>
                        </section>
                        <table>
                            <tr>
                                <th>#orden</th>
                                <th>Cuenta</th>
                                <th>Fecha</th>
                                <th>Pago</th>
                            </tr>
                            ${records.join("")}                            
                        </table>

                    </section>

                    <section class="form-btn">
                    <button onclick="location.replace('services.html')"  class="btn" type="submit">Volver al inicio</button>
                </section>
                
                <br><br><br><br>
                </div>
                <div class="service-title">               
                </div>
                `
            }
        },
        utils: {
            ...Utils
        },
        handler: {
            serviceLoadFromBack: async () => {

                let template = '';
                let servicesList = JSON.parse(sessionStorage.getItem('servicesList'))

                if (servicesList) {
                    template = App.utils.serviceList(servicesList)
                    App.htmlElements.servicesItems.innerHTML = template
                    return
                }

                try {
                    const { data } = await axios.get('http://localhost:3000/entidades/');
                    template = App.utils.serviceList(data)
                    //init sessionStorage service items
                    sessionStorage.setItem('servicesList', JSON.stringify(data))
                } catch (error) {
                    console.log(error)
                }

                //print services list
                App.htmlElements.servicesItems.innerHTML = template
            },
            onServiceItemClick: (e) => {
                if (e.target.localName === 'img') {
                    App.setting.idService = e.target.id;
                    App.setting.serviceName = e.target.alt;
                    App.htmlElements.documentMain.innerHTML = App.templates.dataClientTemplate();
                    document.getElementById('service-form').addEventListener('submit', App.handler.onServiceFormSubmit)
                }
            },
            onSignOffClick: () => {
                sessionStorage.removeItem('user')
            },
            onServiceFormSubmit: async (e) => {
                e.preventDefault()

                const serviceId = App.setting.idService
                const account = document.getElementById('clientId')

                if (account.value.trim() == 0) {
                    document.getElementById('alert').innerHTML = "Ingrese una cuenta..."
                    return
                }

                let { data } = await axios.post('http://localhost:3000/clientEntities/balance', {
                    serviceId: serviceId,
                    account: account.value.trim()
                })

                if (data.length > 0) {
                    //funcionalidad extra, cambiar color de los div, habilitar el div para ingresar otra vez el numero de cuenta
                    let payProgress = document.getElementById('pay-progress')
                    payProgress.innerHTML = App.templates.payDetailsTemplate(data[0])
                    document.getElementById('pay-form').addEventListener('submit', App.handler.onPayFormSubmit)
                    document.getElementById('progress-1').className = 'progress none'
                    document.getElementById('progress-2').className = 'progress select'
                    document.getElementById('progress-1').addEventListener('click', App.handler.onProgress1Click)
                    document.getElementById('progress-1').className += ' cursor'
                } else {
                    account.value = ''
                    document.getElementById('alert').innerHTML = "Sin resultado..."
                }
            },
            onProgress1Click: () => {
                let e = {
                    target: {
                        localName: "img",
                        alt: App.setting.serviceName,
                        id: App.setting.idService
                    }
                }
                //funcion para poder volver a ingresar otra cuenta
                App.handler.onServiceItemClick(e)
            },
            onPayFormSubmit: async (e) => {
                e.preventDefault();
                document.getElementById('alert').innerHTML = "";
                let balance = Number(e.target.clientBalance.value.trim());
                let toPay = Number(e.target.clientPay.value.trim());
                let account = e.target.clientAccount.value.trim();
                if (toPay == 0) {
                    document.getElementById('alert').innerHTML = "Ingrese saldo válido a pagar...";
                    return
                }
                if (toPay > balance || toPay.length <= 0) {
                    document.getElementById('alert').innerHTML = "Pago fuera de rango...";
                    return
                }
                try {

                    //TO PAYPAL BUTTON
                    const paypal = await axios.post('http://localhost:3000/paypal/create-payment', {
                        price: toPay,
                        idCliente: App.setting.idClient,
                        idService: App.setting.idService,
                        balance: balance,
                        account: account
                    });
                    document.getElementById('submitBtn').className = 'btn hidden';
                    let paypalbtn = document.getElementById('paypalBtn');
                    paypalbtn.className = 'paypal-btn flex';
                    paypalbtn.href = paypal.data.links[1].href;

                    //TO YAPPY BUTTON
                    const yappy = await axios.post('http://localhost:3000/yappy/api/pagosbg', {
                        price: toPay,
                        idCliente: App.setting.idClient,
                        idService: App.setting.idService,
                        balance: balance,
                        account: account
                    });

                    let yappyBtn = document.getElementById('yappyBtn');
                    yappyBtn.className = 'yappy-btn flex';
                    yappyBtn.href = yappy.data.url;

                    console.log(yappy.data.url)

                } catch (error) {
                    console.log({ error: error })
                }


            },
            billDetails: (data) => {
                App.htmlElements.documentMain.innerHTML = App.templates.billDetailsTemplate(data)
            },
            ontransactionHistoryClick : async () => {
                try {
                    const {data} = await axios.get(`http://localhost:3000/api/transacciones/record/${App.setting.idClient}`);
                    App.htmlElements.documentMain.innerHTML = App.templates.transactionHistoryTemplate(data)

                } catch (error) {
                    console.log(error)
                }                
            }
        },
        init: async () => {
            let urlParams = new URLSearchParams(location.search);

            //set user data session
            const user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : location.replace("index.html");
            App.htmlElements.userNameInfo.innerHTML = `${user.nombre}`;
            App.setting.idClient = user.id;

            if (urlParams.get('bill')) {
                const { data } = await axios.post('http://localhost:3000/api/transacciones/numTran', {
                    numTran: urlParams.get('bill'),
                    idCliente: App.setting.idClient
                });

                if (data.length != 0) App.handler.billDetails(data);
            }

            App.htmlElements.singOffLink.addEventListener('click', App.handler.onSignOffClick);
            //load service list from back
            App.handler.serviceLoadFromBack();
            App.htmlElements.servicesItems.addEventListener('click', App.handler.onServiceItemClick);
            App.htmlElements.transactionHistory.addEventListener('click',App.handler.ontransactionHistoryClick)
        }
    }
    App.init();

})(document.Utils)