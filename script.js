        // Elementos DOM
        const loginTabBtn = document.getElementById('loginTabBtn');
        const registerTabBtn = document.getElementById('registerTabBtn');
        const loginPanel = document.getElementById('loginFormPanel');
        const registerPanel = document.getElementById('registerFormPanel');
        const toast = document.getElementById('alertToast');
        const toastMsg = document.getElementById('toastMessage');

        // Funciones de alerta
        function showToast(message, isSuccess = false) {
            toastMsg.innerText = message;
            toast.classList.add('show');
            if (isSuccess) {
                toast.style.borderLeftColor = '#4ade80';
            } else {
                toast.style.borderLeftColor = '#f87171';
            }
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // Cambiar entre pestañas
        function switchToLogin() {
            loginPanel.classList.remove('hidden');
            registerPanel.classList.add('hidden');
            loginTabBtn.classList.add('active');
            registerTabBtn.classList.remove('active');
        }

        function switchToRegister() {
            registerPanel.classList.remove('hidden');
            loginPanel.classList.add('hidden');
            registerTabBtn.classList.add('active');
            loginTabBtn.classList.remove('active');
        }

        loginTabBtn.addEventListener('click', switchToLogin);
        registerTabBtn.addEventListener('click', switchToRegister);

        // ---- LOGICA LOGIN (simulada) ----
        const loginForm = document.getElementById('loginForm');
        const loginEmail = document.getElementById('loginEmail');
        const loginPassword = document.getElementById('loginPassword');
        const rememberCheck = document.getElementById('rememberMe');

        // Cargar credenciales guardadas
        function loadSavedLogin() {
            const savedEmail = localStorage.getItem('savedEmail');
            const savedPass = localStorage.getItem('savedPassword');
            if (savedEmail && savedPass) {
                loginEmail.value = savedEmail;
                loginPassword.value = savedPass;
                rememberCheck.checked = true;
            }
        }

        function saveCredentials(email, pass) {
            if (rememberCheck.checked) {
                localStorage.setItem('savedEmail', email);
                localStorage.setItem('savedPassword', pass);
            } else {
                localStorage.removeItem('savedEmail');
                localStorage.removeItem('savedPassword');
            }
        }

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginEmail.value.trim();
            const password = loginPassword.value.trim();

            if (!email || !password) {
                showToast('❌ Por favor completa todos los campos');
                return;
            }
            if (!email.includes('@') || !email.includes('.')) {
                showToast('📧 Ingresa un correo válido');
                return;
            }
            if (password.length < 4) {
                showToast('🔒 La contraseña debe tener al menos 4 caracteres');
                return;
            }

            // Simular validación (demo)
            if (email === "demo@usuario.com" && password === "123456") {
                saveCredentials(email, password);
                showToast('✅ ¡Inicio de sesión exitoso! Redirigiendo...', true);
                setTimeout(() => {
                    alert("🎉 Bienvenida al panel principal (demo)");
                    // Aquí redirigir: window.location.href = "dashboard.html";
                }, 1500);
            } else {
                showToast('❌ Usuario o contraseña incorrectos. Prueba: demo@usuario.com / 123456');
            }
        });

        // ---- LOGICA REGISTRO (simulada) ----
        const registerForm = document.getElementById('registerForm');
        const regName = document.getElementById('regName');
        const regEmail = document.getElementById('regEmail');
        const regPassword = document.getElementById('regPassword');
        const regConfirm = document.getElementById('regConfirmPassword');

        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = regName.value.trim();
            const email = regEmail.value.trim();
            const password = regPassword.value.trim();
            const confirm = regConfirm.value.trim();

            if (!name || !email || !password || !confirm) {
                showToast('⚠️ Completa todos los campos para registrarte');
                return;
            }
            if (!email.includes('@') || !email.includes('.')) {
                showToast('📧 Ingresa un correo electrónico válido');
                return;
            }
            if (password.length < 6) {
                showToast('🔒 La contraseña debe tener al menos 6 caracteres');
                return;
            }
            if (password !== confirm) {
                showToast('❌ Las contraseñas no coinciden');
                return;
            }

            // Simular registro exitoso
            showToast('🎉 ¡Registro exitoso! Ahora inicia sesión', true);
            // Limpiar formulario
            regName.value = '';
            regEmail.value = '';
            regPassword.value = '';
            regConfirm.value = '';
            // Cambiar automáticamente al login después de 2 segundos
            setTimeout(() => {
                switchToLogin();
                showToast('✨ Ya puedes iniciar sesión con tus credenciales', true);
                // Opcional: autocompletar el email registrado en el login
                loginEmail.value = email;
            }, 2000);
        });

        // Eventos secundarios (demo)
        document.getElementById('forgotPassLink').addEventListener('click', (e) => {
            e.preventDefault();
            showToast('📬 Demo: Enlace de recuperación enviado a tu correo', true);
        });

        // Botones sociales (demo)
        document.querySelectorAll('.google-btn, .facebook-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                showToast('🔐 Conexión social disponible próximamente', false);
            });
        });

        // Cargar datos guardados al iniciar
        loadSavedLogin();
    