import IncidenciaCard from './IncidenciaCard';

export default function IncidenciaList({ incidencias, onEditar, onEliminar }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {incidencias.map((inc) => (
        <IncidenciaCard
          key={inc.id}
          incidencia={inc}
          onEditar={onEditar}
          onEliminar={onEliminar}
        />
      ))}
    </div>
  );
}
