# ⏱️ Pom-s

Aplicación **Pomodoro Timer** desarrollada con **Next.js**, enfocada en mejorar la productividad mediante intervalos de trabajo y descanso 🧠💪.  
Combina una interfaz minimalista con la técnica Pomodoro para mantener la concentración y administrar el tiempo de forma efectiva.

---

## 🧠 Objetivo

El propósito de **Pom-s** es implementar la técnica Pomodoro en una aplicación web moderna construida con **Next.js**.  
Permite iniciar, pausar y reiniciar ciclos de trabajo y descanso con una interfaz clara y fluida.

---

## ⚙️ Tecnologías utilizadas

- ▲ **Next.js** – Framework React con renderizado híbrido (SSR/CSR)  
- ⚛️ **React Hooks** – Lógica del temporizador y manejo de estado  
- 💨 **Tailwind CSS / CSS Modules** – Estilos limpios y responsivos  
- 🧠 **JavaScript (ES6+)** – Control de intervalos y actualizaciones en tiempo real  

---

## 💡 Funcionalidades principales

- ▶️ **Iniciar / Pausar / Reiniciar** el temporizador  
- 🔁 Alternancia automática entre **modo trabajo** y **modo descanso**  
- ⏲️ Control de tiempo dinámico con actualizaciones en vivo  
- 🔔 Alertas visuales al finalizar cada sesión  
- 💻 Interfaz minimalista y centrada en la productividad  

---

## 📁 Estructura del proyecto

```bash
Pom-s/
 ├── app/                   # Directorio principal de Next.js (App Router)
 │   ├── page.jsx           # Página principal con el temporizador
 │   ├── layout.jsx         # Estructura base de la aplicación
 │   └── globals.css        # Estilos globales
 ├── components/            # Componentes reutilizables
 ├── public/               # Recursos estáticos (iconos, favicon, etc.)
 ├── lib/api               #Auth hacia el back 
 ├── package.json
 └── README.md
```

---

## 🧰 Instalación y ejecución local

1. Clonar el repositorio:

```bash
git clone https://github.com/Artarexces/Pom-s.git
cd Pom-s
```

2. Instalar dependencias:

```bash
npm install 
```

3. Ejecutar el servidor en desarrollo:

```bash
npm run dev 
```

5. Abrir en el navegador:

```arduino
http://localhost:3000
```
---

## 📚 Aprendizajes clave

- Implementación de temporizadores y lógica de estado con React Hooks

- Comprensión del flujo App Router en Next.js

- Separación de componentes reutilizables

- Uso de Tailwind CSS o estilos modulares para mantener un diseño limpio

- Práctica de control de ciclos y actualizaciones de UI

---

## 🚀 Futuras mejoras

- 🎵 Sonido de alerta al finalizar cada Pomodoro

- 🕒 Personalización de los tiempos de trabajo y descanso

- 📊 Registro de sesiones completadas

--- 

## 👨‍💻 Autor

**Martin Rodriguez (Artarexces)**

💼 [GitHub](https://github.com/Artarexces/Pom-s)

🌐 [Portfolio](https://portfolio-v03-eight.vercel.app/)