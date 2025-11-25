// ================== HASH ==================
async function sha256(text) {
    const msg = new TextEncoder().encode(text);
    const hash = await crypto.subtle.digest("SHA-256", msg);
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, "0")).join("");
}

// ================== REGISTRO ==================
async function register() {
    let user = document.getElementById("regUser").value;
    let pass = document.getElementById("regPass").value;

    const hashed = await sha256(pass);

    localStorage.setItem("user", user);
    localStorage.setItem("pass", hashed);

    alert("Registrado!");
    window.location = "index.html";
}

// ================== LOGIN ==================
async function login() {
    let user = document.getElementById("loginUser").value;
    let pass = document.getElementById("loginPass").value;

    const hashed = await sha256(pass);

    if (user === localStorage.getItem("user") &&
        hashed === localStorage.getItem("pass")) 
    {
        window.location = "loading.html";
    } else {
        alert("Usuário ou senha incorretos");
    }
}

function logout() {
    window.location = "index.html";
}

// ================== MODO ESCURO / CLARO ==================
function toggleTheme() {
    document.body.classList.toggle("light");
    localStorage.setItem("theme", document.body.classList.contains("light"));
}

if (localStorage.getItem("theme") === "true") {
    document.body.classList.add("light");
}

// ================== PARTÍCULAS ==================
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let stars = [];

for (let i = 0; i < 100; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2,
        s: Math.random() * 0.5
    });
}

function animateParticles() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (let s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

        s.y += s.s;
        if (s.y > canvas.height) s.y = 0;
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ================== NEBULOSA ==================
const neb = document.getElementById("nebula");
if (neb) {
    const nctx = neb.getContext("2d");
    neb.width = innerWidth;
    neb.height = innerHeight;

    function drawNebula() {
        let grd = nctx.createRadialGradient(
            neb.width/2, neb.height/2, 50,
            neb.width/2, neb.height/2, 600
        );

        grd.addColorStop(0, "rgba(0,150,255,0.4)");
        grd.addColorStop(1, "rgba(0,0,0,0)");

        nctx.fillStyle = grd;
        nctx.fillRect(0,0,neb.width,neb.height);

        requestAnimationFrame(drawNebula);
    }
    drawNebula();
}

// ================== MÚSICA ==================
let bgm = new Audio("musica.mp3");
bgm.loop = true;

if (localStorage.getItem("vol"))
    bgm.volume = localStorage.getItem("vol");

function updateVolume() {
    let v = document.getElementById("volumeControl").value;
    bgm.volume = v;
    localStorage.setItem("vol", v);
}

// ================== CONQUISTAS ==================
let achievements = JSON.parse(localStorage.getItem("ach") || "[]");

function addAchievement(text) {
    if (!achievements.includes(text)) {
        achievements.push(text);
        localStorage.setItem("ach", JSON.stringify(achievements));
        alert("Conquista desbloqueada: " + text);
    }
}

function openAchievements() {
    document.getElementById("achievementsBox").classList.remove("hidden");

    let list = document.getElementById("achList");
    list.innerHTML = "";

    achievements.forEach(a => {
        let li = document.createElement("li");
        li.textContent = "⭐ " + a;
        list.appendChild(li);
    });
}

function closeAchievements() {
    document.getElementById("achievementsBox").classList.add("hidden");
}

// Exemplo automático:
addAchievement("Entrou no jogo pela primeira vez!");

// ================== CONFIGURAÇÕES ==================
function openSettings() {
    document.getElementById("settingsBox").classList.remove("hidden");
}
function closeSettings() {
    document.getElementById("settingsBox").classList.add("hidden");
}

// ================== INICIAR ==================
function startGame() {
    addAchievement("Iniciou o jogo!");
    alert("Jogo iniciado! (em breve)");
  }
