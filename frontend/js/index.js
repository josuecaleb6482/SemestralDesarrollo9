(() => {
    const App = {
        htmtElements: {
            loginForm: document.getElementById('loginForm'),
            signUpForm: document.getElementById('signUpForm'),
            alertMessageLogin: document.getElementById('alertLogin'),
            alertMessageSignUp: document.getElementById('alertSignUp')
        },
        setting: {

        },
        handler: {
            onLoginFormSubmit: async (e) => {
                e.preventDefault()
                const _email = e.target.mail.value.trim();
                const _pass = e.target.pass.value.trim();

                if (_email.length <= 0 || _pass.length <= 0) {
                    App.htmtElements.alertMessageLogin.innerHTML = "¡ Formulario Incompleto !"
                    return
                }

                try {
                    const { data } = await axios.post('http://localhost:3000/usuarios/authenticate', {
                        email: _email,
                        password: _pass
                    });
                    sessionStorage.setItem('user', JSON.stringify(data))
                    location.replace("services.html")
                } catch (error) {
                    App.htmtElements.alertMessageLogin.innerHTML = "Datos incorrectos."
                    //console.log(error)
                }

            },
            onsignUpFormSubmit: async (e) => {
                e.preventDefault()
                let name = e.target.name.value.trim()
                let apellido = e.target.lastName.value.trim()
                let email = e.target.email.value.trim()
                let pass = e.target.pass.value.trim()
                if (name.length == 0 || apellido.length == 0 || email.length == 0 || pass.length == 0) {
                    App.htmtElements.alertMessageSignUp.innerHTML = "¡ Formulario Incompleto !"
                    return
                }
                if (pass.length < 6) {
                    App.htmtElements.alertMessageSignUp.innerHTML = "Contraseña de al menos 6 caracteres"
                    return
                }
                try {
                    await axios.post('http://localhost:3000/usuarios/register', {
                        nombre: name,
                        apellido: apellido,
                        email: email,
                        password: pass,
                        rol: "U"
                    })
                    const { data } = await axios.post('http://localhost:3000/usuarios/authenticate', {
                        email: email,
                        password: pass
                    });
                    sessionStorage.setItem('user', JSON.stringify(data))
                    location.replace("services.html")
                } catch (error) {
                    App.htmtElements.alertMessageSignUp.innerHTML = ("Usuario inválido o ya existe")
                }
            },
        },
        init: () => {
            sessionStorage.getItem('user') ? location.replace("services.html") : false
            App.htmtElements.loginForm.addEventListener('submit', App.handler.onLoginFormSubmit)
            App.htmtElements.signUpForm.addEventListener('submit', App.handler.onsignUpFormSubmit)
        }
    }
    App.init();
})()