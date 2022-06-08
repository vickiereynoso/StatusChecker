//REGLA DE NEGOCIO: Un huésped no debe poder marcar asistencia en un sector que ya esté CERRADO.

/*Necesito:
1. Testear si existe el huésped.
2. Buscar sector para testear que el mismo exista. 
(Usaremos un sector que ya en la BBDD indica que está cerrado). 
Debería dar un código 201.
3. Mandar petición con los datos del huésped a dicho sector. Tiene que dar ERROR. Código:422
*/