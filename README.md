# YA-3E-TP2
##Propuesta de proyecto para TP2
###Grupo 4: Alonso, Beltram, Rabinovich

A la hora de jugar un partido con amigos, puede presentarse la problemática de no contar con una cancha disponible en el horario deseado. Ante esta situación, la búsqueda de un nuevo espacio puede complicarse y resultar infructuosa. Para resolverlo, se propone la creación de una página online para la gestión de partidos de fútbol en CABA.
La aplicación permite la registración de un usuario como dueño de una cancha de fútbol, y como jugador. El dueño de la cancha genera los partidos según la disponibilidad de sus horarios de atención. Cada partido se genera con un tiempo de 1 hora, y con todas las vacantes para que sean tomadas por los usuarios jugadores, dependiendo del tamaño de la cancha (si de fútbol 5, serán 10 vacantes, 5 por equipo).
El dueño de la cancha podrá crear por defecto varios partidos semanales según lo que haya configurado como su horario de atención (si se configura como horario de atención la franja de 14 a 22 hs, se generarán por defecto, en su calendario, partidos de 1 hora, de 14 a 15 hs, de 15 a 16 hs, y así hasta el último, de 21 a 22 hs). Sin embargo, un usuario jugador puede solicitar un partido en un horario extraordinario, solicitud que puede ser aprobada o rechazada por el dueño de la cancha (habrá solicitudes con estados y un chat para facilitar la comunicación entre ambos).
La página facilitará también, a partir de las canchas registradas (y sus direcciones), un mapa en el que se podrán visualizar más fácilmente las ubicaciones y su distribución a lo largo de la ciudad.
Los usuarios jugadores, por su parte, podrán acceder a los calendarios de las distintas canchas del sitio, y reservar el horario que le interese, abonando la totalidad del monto correspondiente (quedando a su cargo el cobro de cada uno de los jugadores que efectivamente asistan al partido). Por defecto, se reserva la totalidad de las vacantes, debiendo gestionar el propio usuario la participación de las personas que jugarán el partido, ya sea dentro del sitio o fuera del sitio. Esto permite que, a pesar de que la cancha sea de fútbol 5 (para 10 jugadores), excepcionalmente, sea posible reservar para una práctica privada, por ejemplo, de 1 entrenador con 5 jugadores; o de un partido de 6 vs 6 en una cancha que originalmente es para 10 jugadores; entre otros escenarios excepcionales.
Sin embargo, si lo desea, el usuario puede abrir la convocatoria a los usuarios del sitio. Al activar esta opción, se define como límite la capacidad de la cancha (definida por su dueño). También en esta opción, el monto total debe ser abonado por quien realice la reserva.
A medida que los usuarios se vayan anotando para el partido, las vacantes irán disminuyendo. Esto permite jugar tanto con personas conocidas como con personas desconocidas, pero que también desean jugar en ese mismo horario. Cada usuario no sólo puede registrarse a sí mismo, sino también a amigos suyos, estén estos registrados o no. Si están registrados (y si estos figuran en su lista de amigos), a estos usuarios amigos también les aparecerá el registro en su historial.
Caben aquí dos aclaraciones. La primera, dos usuarios pueden ser o no ser amigos. Para serlo, uno de ellos debe enviarle una solicitud de amistad al otro, y esta debe ser aceptada. Y la segunda, el historial de partidos jugados es una opción en la que se detallan todos los partidos jugados reservados desde la página, permitiendo filtrar por franjas de horarios, o por cancha.
Los usuarios también podrán valorar la cancha, con un sistema de 5 estrellas, sólo luego del horario de partido.
