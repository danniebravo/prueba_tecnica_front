import Swal from 'sweetalert2';

const colores = {
  primario: '#3276a9',
  peligro: '#dc2626',
  exito: '#059669',
};

function esModoOscuro() {
  return (
    typeof document !== 'undefined' &&
    document.documentElement.classList.contains('dark')
  );
}

function fondoBase() {
  return esModoOscuro() ? '#0e2a5f' : '#ffffff';
}

function colorTexto() {
  return esModoOscuro() ? '#d0d8de' : '#0e2a5f';
}

export function confirmarEliminacion(titulo) {
  return Swal.fire({
    title: '¿Eliminar incidencia?',
    text: titulo
      ? `Vas a eliminar "${titulo}". Esta acción no se puede deshacer.`
      : 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: colores.peligro,
    cancelButtonColor: colores.primario,
    reverseButtons: true,
    focusCancel: true,
    background: fondoBase(),
    color: colorTexto(),
  });
}

export function notificarExito(mensaje) {
  return Swal.fire({
    toast: true,
    position: 'top',
    icon: 'success',
    title: mensaje,
    showConfirmButton: false,
    timer: 90000,
    timerProgressBar: true,
    width: '24rem',
    background: fondoBase(),
    color: colorTexto(),
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
}

export function notificarError(mensaje) {
  return Swal.fire({
    icon: 'error',
    title: 'Algo salió mal',
    text: mensaje || 'Ocurrió un error inesperado. Intenta de nuevo.',
    confirmButtonColor: colores.primario,
    background: fondoBase(),
    color: colorTexto(),
  });
}
