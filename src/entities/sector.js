//no me acuerdo si acá hay que invocar/importar clases que utilizaremos.
//como se hace herencia acá?? Para que Spa herede de Sector.

class Sector{

nombre = new String;
descripcion = new String;
CAPACIDAD_MAX = new Number;
capacidad_Actual = new Number;
diasAbierto = new DateTime;
horariosAbierto = new DateTime;
historialReservasEfectivas = new [];
historialReservasDenegadas = new [];
reservas = new [];
calificaciones =  new [];
estado = new EstadoSector; // ?? En realidad queremos que sea como un enum.

informarCapacidadActual(){
    
}
liberar(Reserva){}
ocupar(Reserva){}
estaAbierto(){}
estadoSector(){}
recibirCalificacion(Calificacion){}

}

module.exports = Sector;