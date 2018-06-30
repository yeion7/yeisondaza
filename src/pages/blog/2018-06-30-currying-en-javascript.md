---
templateKey: blog
path: currying-en-javascript-funciones-con-superpoderes
imagen: /img/1_wf3okspdafw6vclawbmexq.png
title: Currying en JavaScript
date: '2016-06-20T12:16:24-05:00'
description: >-
  Uno de los principios que todo programador busca cumplir es DRY (Don’t Repeat
  YourSelf ), con Currying vamos a ver como hacer esto con nuestras funciones es
  bastante simple y útil.
---
Uno de los principios que todo programador busca cumplir es DRY (Don’t Repeat YourSelf ), con Currying vamos a ver como hacer esto con nuestras funciones es bastante simple y útil.

> Este contenido lo publiqué primero en [mi newsletter](https://tinyletter.com/yeion7), la semana después de publicar el newsletter publico en mi blog, si quieres ser el primero en leer suscríbete

![Banner posts](/img/1_wf3okspdafw6vclawbmexq.png)

La manera en que normalmente escribimos nuestra funciones es:    

```js
//ES2015
const divisible = (num, mod) => num % mod;

//ES5
var divisible = function(num, mod) {
  return num % mod;
}
```

Para poder ejecutar esta función debemos pasar dos argumentos, pero si quisiéramos tener una función que compruebe exclusivamente si un numero es par tendríamos que escribir una nueva función. En este momento resulta útil tener una función currificada.

Para antes de entender como funciona una función currificada debemos conocer algunos conceptos.

> **Las funciones son ciudadanos de primera clase, esto significa que las funciones son objetos, se pueden pasar como argumentos, almacenar en variables y retornar dentro de otras funciones** [Funciones de alto orden en JavaScript](/funciones-de-alto-orden-en-javascript)
>
> **Un closure es cuando una función es capaz de recordar y acceder a un lexical scope, incluso cuando la función es ejecutada por fuera del lexical scope.** [Entendiendo los closures en JavaScript](/entendiendo-closures-en-javascript)
>
> **Si una función recibe más de un parámetro, se puede reescribir como, una función que toma un parámetro y retorna unafunción, está a su vez recibe una parámetro y retorna el resultado.** [Calculo lambda en JavaScript](/calculo-lambda-en-javascript)

### ¿Qué es Currying?

Curry es poder llamar una función con menos parámetros de los que espera, esta devuelve una función que espera los parámetros restantes y retorna el resultado.

De esta manera podríamos reescribir la función del comienzo como

```js
//ES2015

const divisible = mod => num => num % mod;

//ES5

var divisible = function (mod) {
  return function (num) {
    return num % mod;
  }
}
```

Para llamar esta función tenemos dos opciones

* Pasar los argumentos ejecutando la funciones

```js
divisible(10)(2)
```

* Pasar un argumento y recibir una función que recuerde este argumento

```js
const divisibleEn3 = divisible(3);

divisibleEn3(10)
```

Como vemos escribir una función currificada no es complicado, pero podríamos hacerlo un poco más natural como escribimoscualquier función.

Para esto podemos usar [Lodash](https://lodash.com/docs#curry) o [Ramda](http://ramdajs.com/0.21.0/docs/#curry) quienes tienen un método _curry_, que nos permite currificar cualquier función de esta manera.

```js
import { __, curry, map } from ‘ramda’;

const composeNombre = curry(
  (primer, apellido) => `${primer} ${apellido}`
);

const familiaJaimes = composeNombre(__, ‘Jaimes’)

const nombres = [‘Juan’, ‘Camilo’, ‘Miguel’]

console.log(map(familiaJaimes, nombres))
```

Veamos un ejemplo más útil tomado de [Mostly adequate guide to functional programming](http://mostly-adequate-guide)

```js
import { curry } from 'ramda';

// Estas funciones las puedes conseguir dentro de Ramda o Lodash

var match = curry(function(what, str) {
  return str.match(what);
});

var replace = curry(function(what, replacement, str) {
  return str.replace(what, replacement);
});

var filter = curry(function(f, ary) {
  return ary.filter(f);
});

var map = curry(function(f, ary) {
  return ary.map(f);
});


var hasSpaces = match(/\s+/g);

hasSpaces("hello world");
// [ ' ' ]

hasSpaces("spaceless");
// null

filter(hasSpaces, ["tori_spelling", "tori amos"]);
// ["tori amos"]

var findSpaces = filter(hasSpaces);
// function(xs) { return xs.filter(function(x) { return x.match(/\s+/g) }) }

findSpaces(["tori_spelling", "tori amos"]);
// ["tori amos"]
```

### Ventajas de Currying

* Podemos crear funciones nuevas simplemente pasando nuestras funciones de base con algunos parámetros.
* Podemos transformar cualquier función que trabaje con un solo elemento en una que trabaje con una lista envolviéndola en un map.
* Se pueden escribir pequeñas piezas de código que sean más fácil de reutilizar.
* Es fácil de razonar sobre ellas.
* Escribir funciones currificadas nos permitirá componer funciones.
