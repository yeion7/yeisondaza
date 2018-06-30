---
templateKey: blog
path: funciones-puras-en-javascript-crea-funciones-libres
imagen: /img/1_fn1am1qhkst_kga80k8y_q.png
title: Funciones puras en JavaScript
date: '2016-06-25T11:59:26-05:00'
description: >-
  Uno de los principios más útiles para programar es KISS (Keep It Simple,
  Stupid), pero mantener las cosas simples no siempre es fácil, por eso hoy
  veremos como crear funciones que sigan esta filosofía.
---
Uno de los principios más útiles para programar es KISS (Keep It Simple, Stupid), pero mantener las cosas simples no siempre es fácil, por eso hoy veremos como crear funciones que sigan esta filosofía.

> Este contenido lo publiqué primero en [mi newsletter](https://tinyletter.com/yeion7), la semana después de publicar el newsletter publico en mi blog, si quieres ser el primero en leer suscríbete.

![Banner posts](/img/1_fn1am1qhkst_kga80k8y_q.png)

En JavaScript las funciones son una parte fundamental del lenguaje, ellas nos permiten c osas como [currying](/currying-en-javascript-funciones-con-superpoderes), [herencia funcional](/herencia-funcional-en-javascript), [closures](/entendiendo-closures-en-javascript), [funciones de alto orden](/funciones-de-alto-orden-en-javascript), etc.

>  “Funciones son cruciales en computación y matemática, ayudan a procesar datos de maneras útiles.”

### El problema de lo impuro

Una función basicamente acepta entradas, las procesa y produce una salida.

Tomemos como ejemplo la siguiente función:

```js
function sumadorFactory(suma = 0) {

  return function (cantidad) {

      suma = suma + cantidad;
      return suma;

  };
}

const sumadorA = sumadorFactory();

sumadorA(2); //2
sumadorA(2); //4
```

Tenemos una función [currificada](/currying-en-javascript-funciones-con-superpoderes) que recibe un número (por defecto 0)y retorna una función que recibe otro numero y retorna la suma.

_¿Cual es el problema de esta función?_

Como vamos, llamamos dos veces a la misma función con el mismo parametro y nos **retorna un resultado diferente**, esto es debido a que la función cuenta con un [estado](https://es.wikipedia.org/wiki/Objeto_programaci%C3%B3n#Estado) e [identidad](https://es.wikipedia.org/wiki/Objeto_programaci%C3%B3n#Identidad).

Lo que hace que sea más compleja de lo que deberia ser, ya que para probar o comparar el resultado de la función debemos tener en cuenta el tiempo.

Esto a su vez añade complejidad para razonar en ella, ya que el programador deberia mantener el seguimiento de como esta relacionado el código y donde se ejecuta.

> “Hay dos formas de diseñar software: la primera es hacerlo tan simple que sea obvioque no tiene deficiencias y la segunda es hacerlo tan complicado que no sea obvio que tiene deficiencias. La primera forma es mucho más difícil.”

Para esto creamos funciones puras, que nos ayuden a estar libres de estos problemas y sea mucho más simple de testear.

## El camino de la pureza

Para que una función sea pura debe cumplir dos reglas fundamentalmente.

> Dada la mismas entradas, debe retornar el mismo resultado, sin importar cuantas vecesse llame.

volvamos a la función anterior y hagamos que sea pura.

```js
function sumadorFactory(suma = 0) {

  return function (cantidad) {

    return suma + cantidad;
  }

}

const sumadorA = sumadorFactory();

sumadorA(2); //2
sumadorA(2); //2
```

Como vemos libramos a nuestra función de su estado, ahora **cada vez que ejecutemos la función con el mismo parametro obtenemos el mismo resultado.**

> Una función es una relación especial entre valores: Cada valor de su entrada devuelve exactamente un valor de salida.
>
> La función no debe tener efectos secundarios (side-effects)

Los efectos secundarios son **todo lo que ocurra aparte del calculo denuestro resultado**, principalmente son la interacción con el entorno externo a la función o cambiar estados del sistema.

veamos un ejemplo

```
//Impuro
var minimo = 10;

function comparaMinimo(num) {
  return num < minimo;
}
```

La función _comparaMinimo_ es impura ya que depende de un estado externo que puede mutar.

> Una función es una relación especial entre valores: Cada valor de su entrada devuelve exactamente un valor de salida.

Cuando esta comunicación con el exterior existe lo hace de manera invisible, lo que hace que los errores sean más complejos de encontrar. Por eso las funciones puras solo deben depender de los valores que se les pasa como parametros para calcular su resultado.

Algunos efectos secundarios pueden ser: request http, entradas del usuario, mutaciones,imprimir en pantalla, etc.

## La magia de la pureza

Las funciones puras tienen muchas ventajas entre ellas

* **Son más facilmente testeables**, ya que van a retornar el mismo resultado apartir de los mismos parametros.
* **Pueden ser cacheadas**, ya que siempre retornan el mismo resultado podemos almacenar estos resultados en cache ([memoizar](http://ramdajs.com/0.21.0/docs/#memoize))
* **Más faciles de entender**: Se puede reemplazar la función por su valor de resultado, lo que las hace [referencialmente transparentes](https://es.wikipedia.org/wiki/Transparencia_referencial).
* **Se pueden ejecutar en paralelo,** ya que no tienen ninguna dependencia externa.
* **Reduce la cantidad de bugs,** ya que no generan alteraciones del estado externo.

## Este mundo no te deja ser puro

Aunque todo suena muy bien, no todo nuestro código puede ser puro, ya que nuestros programas interactúan con un entorno externo así que los efectos secundarios son inherentes.

Lo que debemos hacer es controlar estos efectos secundarios, esto lo veremos en siguientes posts.
