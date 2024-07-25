# Boggle

## Introducción

Boggle es un juego de palabras en el que los jugadores intentan encontrar tantas palabras como puedan en una cuadrícula de 16 casillas (4x4) que contienen letras de forma aleatoria, dentro de un límite de tiempo establecido.

## Reglas

El juego comienza al ordenarse las letras en la cuadrícula, momento que coincide con el inicio del temporizador (que puede setearse de 1, 2 o 3 minutos). Para buscar las palabras se deben tener en cuenta los siguientes criterios:

- Las palabras deben tener al menos tres letras.
- Cada letra después de la primera debe ser vecina horizontal, vertical o diagonal de la anterior.
- Ninguna casilla de letras individual se puede utilizar más de una vez en una palabra.
- Se permiten múltiples formas de la misma palabra, como formas singulares y plurales y otras derivaciones. No se aceptan nombres propios, artículos ni pronombres.
- Se permiten palabras dentro de palabras, como “casa” y “casamiento”.

El jugador debe ir guardando cada palabra que encuentra de tal manera que se vaya generando una puntuación, hasta que finalice el tiempo de juego. Las palabras ingresadas deben ser palabras reales (deben existir en el diccionario desde el cual se está consumiendo la data), de lo contrario, habrá una penalización (la penalización es a gusto del programador).

## Sistema de puntuación

| Longitud de la palabra (letras) | Puntos |
| ------------------------------- | ------ |
| 3, 4                            | 1      |
| 5                               | 2      |
| 6                               | 3      |
| 7                               | 5      |
| 8+                              | 8      |

## Sistema de penalización

Por errores acumulados entendemos a aquellos errores que fueron acumulados entre aciertos, es decir, una vez acertada una palabra el contador de errores se reinicia en 0.

De esta manera busco fomentar que el jugador no spamee palabras al azar intendando acumular puntos.

| Errores acumulados | Puntos |
| ------------------ | ------ |
| 3                  | 1      |
| 7                  | 2      |
| 10                 | 4      |

## Requerimientos Obligatorios

- [x] Código prolijo y estricto (HTML5, CSS3 y ES5).
- [x] Consistencia en comentarios, commits y estilos de código.
- [x] Responsividad y estética del juego y la web (usando Flexbox).
- [x] No deberá tener código bloqueante (alert). Utilizar modales en lugar de alert.
- [x] Juego completamente funcional para un jugador debiendo ingresar nombre del jugador al iniciar la partida, validando como mínimo 3 letras para el nombre.
- [x] El juego debe contar con un temporizador.
- [x] Se deberá dar feedback al usuario cuando el tiempo se acabe.
- [x] Agregar puntaje por cada palabra encontrada (lógica para validación de palabras).
- [x] Restar puntaje cada vez que se intenta agregar una palabra que no sea correcta.
- [x] No se debe permitir el agregado de palabras que ya hayan sido encontradas.
- [x] No se debe permitir el agregado de palabras con menos de 3 letras.
- [x] Las letras del tablero que se podrán seleccionar deben ser contiguas a la última letra seleccionada, siempre y cuando no haya sido seleccionada previamente en esa misma palabra.
- [x] En un lugar cercano al tablero, el usuario deberá ir visualizando la palabra que se va formando.
- [x] Deberá contar con una sección que muestre el listado de palabras que se vayan encontrando.
- [x] Crear una página de Contacto, con un formulario que permita ingresar nombre, mail y mensaje, y al enviar se abra la herramienta de envío de emails predeterminada del sistema operativo.
- [x] Validaciones del formulario de contacto (nombre alfanumérico, mail válido y mensaje con más de 5 caracteres).
- [x] Agregar un link a la página de Github donde se alojó el código del juego, que al apretarlo se abra en una nueva pestaña.

## Requerimientos Deseados

- [x] Mostrar con un color diferente las letras que están seleccionadas y con un borde diferente la última seleccionada.
- [x] Mostrar con un color diferente las letras que pueden ser seleccionadas a continuación.
- [x] Múltiples temporizadores (select con 3 opciones de temporizador).
- [x] Mostrar el temporizador con un color diferente cuando el tiempo está por terminar (últimos 10 segundos). Otra opción es reproducir un sonido de alerta.
- [x] Mostrar puntuación en tiempo real a medida que el usuario adivina o erra palabras.
- [x] Guardar los resultados de cada partida del juego usando LocalStorage, recordando el nombre, puntaje y la fecha y hora de la partida.
- [x] Agregar un botón para mostrar un popup (modal) con la lista de partidas con jugadores, puntajes y fechas. En este ranking debe estar ordenado por puntaje.
- [x] Agregar la opción de ordenar el ranking por fecha o puntaje.

## Consideraciones de implementación

Para la seleccion de los elementos del dom utilice unas funciones de ayuda que se encuentran en `lib.js`

```js
// Permite la seleccion de un nodo del documento o del nodo que le pasemos como contexto
function $(selector, context = document) {
  return context.querySelector(selector);
}

// Permite la seleccion de una lista de nodos del documento o del nodo que le pasemos como contexto
function $$(selector, context = document) {
  return context.querySelectorAll(selector);
}
```

Además:

```js
/*Las variables que cuenten con $ antes del nombre indican que la misma contiene un nodo del DOM o lista de nodos.*/
var $playerForm = $(".player-form");
var $intro = $(".intro");
var $game = $(".game");
...
```
