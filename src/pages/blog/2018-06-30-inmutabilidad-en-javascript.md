---
templateKey: blog
path: immutabilidad-en-javascript
imagen: /img/1_1w8jk_necgn3arujgiq8rw.png
title: Inmutabilidad en JavaScript
date: '2016-06-30T11:46:33-05:00'
description: >-
  Una de las características más importantes de los lenguajes funcionales es que
  sus estructuras de datos son inmutables, las cuales muestran reducir la
  complejidad del software.
---
> “La inmutabilidad habilita el JavaScript del futuro”

No podría estar más de acuerdo, esta característica propia de los lenguajes funcionales comienza a tener gran importancia y hoy veremos porque.

> Este contenido lo publiqué primero en [mi newsletter](https://tinyletter.com/yeion7), la semana después de publicar el newsletter publico en mi blog, si quieres ser el primero en leer suscríbete.

![banner posts](/img/1_1w8jk_necgn3arujgiq8rw.png)

Una de las características más importantes de los lenguajes funcionales es que sus estructuras de datos son inmutables, las cuales muestran reducir la complejidad del software.

> La verdad es el constante cambio, la mutación oculta los cambios, los cambios se manifiestan en caos, por lo tanto, el sabio abraza la historia. — [The Dao of Immutability](https://medium.com/javascript-scene/the-dao-of-immutability-9f91a70c88cd#.b1cayh7g7)

Pero en lenguajes imperativos como JavaScript por defecto son mutables.

```js
const objeto = {cosa: ‘casa’};

function cambiarCosa(obj) {
  return obj.cosa = ‘Carro’;
}

cambiarCosa(objeto) //mutación

console.log(objeto) // {cosa: 'Carro'}
```

Esto es útil ya que resulta mucho más fácil modelar un personaje de un juego como un objeto mutable que cambia su estado, a modelarlo como un objeto inmutable que va a crear una nueva instancia del personaje con cada cambio de su estado.

El problema con esto es que no tenemos manera de saber el estado pasado de nuestro personaje, así que tenemos que tener en cuenta el tiempo.

Entendamos como ayuda a esto la inmutabilidad.

## Que nos hace inmutables

**Un valor inmutable es un valor que no se puede cambiar luego de ser definido**, se puede modificar pero debe ser en un objeto diferente.

Pero esto nos deja una duda, ¿crear un objeto nuevo por cada cambio es costoso? si, ya que se debe instanciar nuevamente en memoria.

Esto ha sido objeto de investigación durante las ultimas décadas y actualmente tenemos soluciones bastante eficientes para crear estructuras de datos inmutables que nos permitan tener persistencia de nuestros datos y rendimiento para acceder a ellos.

> Cuando creamos estructuras de datos nos preocupamos principalmente de dos cosas, **como se almacenan los datos** y **que tan rápido puedo acceder a mis datos.**

## ¿Cuál es el fin?

Lo que buscamos principalmente al almacenar nuestros datos de manera inmutable es tener[persistencia en nuestros datos](https://es.wikipedia.org/wiki/Persistencia_(inform%C3%A1tica))

Buscamos saber que ha sucedido con nuestros datos a lo largo del tiempo.

Algunos de los tipos de persistencia que podemos encontrar son:

* **Persistencia parcial**: Toda versión de los datos alguna vez creada es accesible y solo la ultima versión es modificable.
* **Persistencia total**: Todas las versiones son accesibles y modificables. (_por defecto en lenguajes imperativos_)
* **Persistencia confluente**: Persistencia parcial + las dos ultimas versiones se pueden combinar .
* **Persistencia funcional**: No se puede modificar ninguna versión ya creada, solo se pueden crear nuevos versiones de los datos apartir de las ya creadas.

De estas, la persistencia funcional nos resulta particularmente útil.

Como almacenamos nuestros datos

Dos de las más importantes formas de estructurar nuestros datos para tener persistenciafuncional, es Array Mapped Trie y [Hash Array Mapped Trie](https://en.wikipedia.org/wiki/Hash_array_mapped_trie).

Como dije antes es costoso crear un objeto nuevo cada vez que hay un cambio, más en objetos complejos, para esto, estas estructuras de datos trabajan con algo genial: _**Estructura compartida**_

Entendamos esto.

Si tenemos una estructura como esta, una [lista enlazada](https://es.wikipedia.org/wiki/Lista_enlazada):

![David Nolen — Immutability, interactivity & JavaScript (FutureJS 2014)](https://cdn-images-1.medium.com/max/2000/1*QVkukbkkPmvtkKZ7gY47ng.png)
_David Nolen — Immutability, interactivity & JavaScript (FutureJS 2014)_

Si tengo una versión en el _estado x_ y creo una nueva versión con _estado y_, la estructura sera compartida.

De esta manera no tenemos que crear un nuevo objeto por cada cambio, **solo modificamos las referencias que componen el objeto.**

Ahora, una estructura utilizada en persistencia funcional es de esta manera:

![David Nolen — Immutability, interactivity & JavaScript (FutureJS 2014)](https://cdn-images-1.medium.com/max/2000/1*DVTYnM7EkXX0C1LtW_O2sQ.png)
_David Nolen — Immutability, interactivity & JavaScript (FutureJS 2014)_

Si realizamos algún cambio, simplemente las referencias son cambiadas

![David Nolen — Immutability, interactivity & JavaScript (FutureJS 2014)](https://cdn-images-1.medium.com/max/2000/1*Vt-9IeXtnlG3Avn4o7hWwg.png)
_David Nolen — Immutability, interactivity & JavaScript (FutureJS 2014)_

Estas estructuras de datos son extremadamente eficientes, podemos crear 34,359,738,368 objetos con estructuras compartida.

## Quiero mis datos rápido

El acceso a nuestros datos es extremadamente rápido, cuando buscamos un valor este se expresa en su valor binario y se toma en duplas para buscar en el árbol.

De esta manera solo se requiere máximo 7 búsquedas dentro de los arrays del árbol para encontrar cualquier valor.

![React.js Conf 2015 — Immutable Data and React](https://cdn-images-1.medium.com/max/2424/1*unempNOCiGKF50FPmqrhYw.png)_React.js Conf 2015 — Immutable Data and React_

## Esto suena complejo de usar

Aunque teóricamente resulta algo complejo, esto esta disponible para nosotros hoy, librerías como [React](https://facebook.github.io/react/) ya lo utilizan, pero lo más importante si queremos utilizarlo en nuestros proyectos podemos usar librerías como [Immutable](https://facebook.github.io/immutable-js/).

Immutable abstrae la complejidad de estas estructuras, dándonos un API el cual nos permite simplemente pensar en [List](https://facebook.github.io/immutable-js/docs/#/List), [Stack](https://facebook.github.io/immutable-js/docs/#/Stack), [Map](https://facebook.github.io/immutable-js/docs/#/Map), [OrderedMap](https://facebook.github.io/immutable-js/docs/#/OrderedMap), [Set](https://facebook.github.io/immutable-js/docs/#/Set), [OrderedSet](https://facebook.github.io/immutable-js/docs/#/OrderedSet) y [Record](https://facebook.github.io/immutable-js/docs/#/Record).

Las cuales resultan estructuras más simples para utilizar.

Los siguientes son ejemplos tomados de la documentación.

Podemos pasarle objetos a immutable, luego solo debemos pensar en ellos como valores, la librería nos da varios métodos con los cuales podemos obtener valores, iterar, comparar y mucho más.

Podemos comparar valores de maneras simple.

```js
var map1 = Immutable.Map({a:1, b:2, c:3});
var map2 = map1.set(‘b’, 50);
map1.get(‘b’); *// 2
map2.get(‘b’); *// 50
```

## Ahora que sigue

Personalmente creo que la inmutabilidad es una gran característica que podemos utilizar, claro los estados inmutables y mutables tienen ambos pros y contras pero es responsabilidad de los equipos de desarrollo pensar en cual camino reduce la complejidad de los proyectos.

Recomiendo mucho leer la [documentación de immutable](https://facebook.github.io/immutable-js/docs/#/) la cual es bastante completa y si ya trabajas en proyectos que utilizan librerías como [Redux](http://redux.js.org/) puedes comenzar a usar [estados inmutables](https://medium.com/react-redux/estado-inmutable-con-redux-e-immutable-js-5a3d69ef0451#.32v0trm0t) hoy.
