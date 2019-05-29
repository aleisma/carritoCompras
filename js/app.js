//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

//Listeners
cargarEventListeners();

function cargarEventListeners(){
//Dispara cuando se presiona "agregar Carrito"
 cursos.addEventListener('click',comprarCurso);

//Cuando se elimina un curso del Carrito...
carrito.addEventListener('click',eliminarCurso);

//Al vaciar el Carrito...
vaciarCarritoBtn.addEventListener('click',vaciarCarrito);

}

//Funciones

//Funcion que añade el curso al carrito
function comprarCurso(e){
  e.preventDefault();
  //Delegation para Agregar Carrito
if(e.target.classList.contains('agregar-carrito')){
   const curso =e.target.parentElement.parentElement;
   //Enviamos el curso selecionado
   leerDatosCursos(curso);
     }
}

//Lee los Datos del Curso
function leerDatosCursos(curso){
       const infoCurso = {  
             imagen:  curso.querySelector('img').src,
             titulo:  curso.querySelector('h4').textContent,
             precio:  curso.querySelector('.precio span').textContent,
             id:      curso.querySelector('a').getAttribute('data-id')
        }
insertarCarrito(infoCurso);
}
//Muestra el curso seleccionado en el Carrito....
function insertarCarrito(curso){
        const row = document.createElement('tr');
        row.innerHTML = `
        <td> <img src="${curso.imagen}" height="50px" widht="50px">
        </td>
        <td> ${curso.titulo}</td>  
        <td> ${curso.precio}</td>  
        <td> <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a> </td>  
        `;
    listaCursos.appendChild(row);
//Guardar Curso LocalStorage...
    guardarCursoLocalStorage(curso);


}
//Elimina el Curso del Carrito
function eliminarCurso(e){
  e.preventDefault();
  if(e.target.classList.contains('borrar-curso')){
      e.target.parentElement.parentElement.remove();

  }
}
//Eliminar Carrito
function vaciarCarrito(){
         //forma rapida de vaciar
  while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
  }
  return false;

}
//Almacena Curso al LocalStorage
function guardarCursoLocalStorage(curso){
    let cursos;
    //Toma el valor de un arreglo con datos en LocalStorage o vacio..
    cursos = obtenerCursosLocalStorage();
    //El curso Seleccionado se Agrega al Arreglo..
    cursos.push(curso);

    localStorage.getItem('cursos', JSON.stringify(cursos));

}
//Comprueba que haya elementos en LocalStorage
function obtenerCursosLocalStorage(){
   let cursosLs;
//Comprobamos si hay algo en el localStorage
  if(localStorage.getItem('cursos') === null){
   cursosLs = [];
   
  }
  else{
   cursosLs = JSON.parse(localStorage.getItem('cursos'));   

  }
return cursosLs;

}