


(function(){

const form = document.getElementById("assistantForm");
if(!form) return;

const WA_NUMBER = "525521114448";







/* ================= ELEMENTOS ================= */
const nombre = document.getElementById("a_nombre");
const tel = document.getElementById("a_tel");
const email = document.getElementById("a_email");
const tramite = document.getElementById("a_tramite");
const ciudad = document.getElementById("a_ciudad");
const detalle = document.getElementById("a_detalle");
const btn = form.querySelector('button[type="submit"]');

const STORAGE_KEY = "assistantFormData";

/* ================= REGEX ================= */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const telRegex = /^[0-9+\s()-]{7,20}$/;

/* ================= ESTILOS ================= */
function ok(el){
  el.style.borderColor = "#22c55e";
}

function bad(el){
  el.style.borderColor = "#ef4444";
}

function clean(el){
  el.style.borderColor = "";
}

/* ================= VALIDACIONES INDIVIDUALES ================= */
function vNombre(){
  if(!nombre.value.trim()){ bad(nombre); return false; }
  ok(nombre); return true;
}

function vEmail(){
  if(!emailRegex.test(email.value.trim())){ bad(email); return false; }
  ok(email); return true;
}

function vTel(){
  if(!tel.value.trim()){ clean(tel); return true; }
  if(!telRegex.test(tel.value.trim())){ bad(tel); return false; }
  ok(tel); return true;
}

function vTramite(){
  if(!tramite.value){ bad(tramite); return false; }
  ok(tramite); return true;
}

function vCiudad(){
  if(!ciudad.value){ bad(ciudad); return false; }
  ok(ciudad); return true;
}

function vDetalle(){
  if(tramite.value === "otros"){
    if(!detalle.value.trim()){ bad(detalle); return false; }
    ok(detalle); return true;
  }
  clean(detalle);
  return true;
}

/* ================= VALIDAR TODO ================= */
function validarTodo(){
  const estado =
    vNombre() &
    vEmail() &
    vTel() &
    vTramite() &
    vCiudad() &
    vDetalle();

  btn.disabled = !estado;
}

/* ================= GUARDADO ================= */
function guardar(){
  const data={
    nombre:nombre.value,
    tel:tel.value,
    email:email.value,
    tramite:tramite.value,
    ciudad:ciudad.value,
    detalle:detalle.value
  };
  localStorage.setItem(STORAGE_KEY,JSON.stringify(data));
}

function restaurar(){
  const d=localStorage.getItem(STORAGE_KEY);
  if(!d) return;

  try{
    const obj=JSON.parse(d);
    nombre.value=obj.nombre||"";
    tel.value=obj.tel||"";
    email.value=obj.email||"";
    tramite.value=obj.tramite||"";
    ciudad.value=obj.ciudad||"";
    detalle.value=obj.detalle||"";
  }catch{}
}

/* ================= EVENTOS EN VIVO ================= */
[nombre,email,tel,tramite,ciudad,detalle].forEach(el=>{
  el.addEventListener("input", ()=>{
    validarTodo();
    guardar();
  });
});

/* ================= SUBMIT ================= */
form.addEventListener("submit", e=>{
  e.preventDefault();
  if(btn.disabled) return;

  const texto=
`Hola, solicito información:

Nombre: ${nombre.value}
Teléfono: ${tel.value||"No proporcionado"}
Correo: ${email.value}
Trámite: ${tramite.value}
Ubicación: ${ciudad.value}
Detalles: ${detalle.value||"Ninguno"}`;

  window.open("https://wa.me/"+WA_NUMBER+"?text="+encodeURIComponent(texto),"_blank");

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  validarTodo();
});

/* ================= INIT ================= */
restaurar();
validarTodo();

const isMobile =
  window.matchMedia("(pointer:coarse)").matches;

// enfocar SOLO en desktop y si el form está visible
if (!isMobile && nombre && form.offsetParent !== null) {
  nombre.focus();
}

restaurar();
validarTodo();
nombre.focus();

})();
