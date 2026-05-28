import Swal from 'sweetalert2';

const colores = {
  primario: '#0f172a',
  peligro: '#dc2626',
  exito: '#059669',
};

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
  });
}

export function notificarExito(mensaje) {
  return Swal.fire({
    toast: true,
    position: 'top',
    icon: 'success',
    title: mensaje,
    showConfirmButton: false,
    timer: 12000,
    timerProgressBar: true,
    width: '24rem',
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
  });
}
