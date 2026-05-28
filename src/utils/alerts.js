import Swal from 'sweetalert2';

const colores = {
  primario: '#2d6fa8',
  peligro: '#dc2626',
  exito: '#16a34a',
};

function esModoOscuro() {
  return (
    typeof document !== 'undefined' &&
    document.documentElement.classList.contains('dark')
  );
}

function fondoBase() {
  return esModoOscuro() ? '#1e293b' : '#ffffff';
}

function colorTexto() {
  return esModoOscuro() ? '#f1f5f9' : '#0f172a';
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
