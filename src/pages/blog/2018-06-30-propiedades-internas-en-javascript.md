---
templateKey: blog
path: propiedades-internas-en-javascript
imagen: /img/1_bxqxlk4bk3-ppkmiwlumjq.png
title: Propiedades internas en JavaScript
date: '2016-04-22T17:35:05-05:00'
description: >-
  Las especificación del EcmaScript establece propiedades internas a todo
  objeto, estas indican su comportamiento estándar, las cuales en gran medida
  definen a JavaScript.
---
# Propiedades internas en JavaScript

Las especificación del EcmaScript establece propiedades internas a todo objeto, estas indican su comportamiento estándar, las cuales en gran medida definen a JavaScript.

> Este contenido lo publiqué primero en [mi newsletter](https://tinyletter.com/yeion7), la semana después de publicar el newsletter publico en mi blog, si quieres ser el primero en leer suscríbete

![banner](/img/1_bxqxlk4bk3-ppkmiwlumjq.png)

Como sabemos las propiedades de los objetos en JavaScript pueden ser de tres tipos.

* [Data properties](/entendiendo-los-objetos-en-javascript): Las propiedades normales, que contienen datos.
* [Accessor properties](/entendiendo-getters-y-setters-en-javascript): Propiedades que cambian el comportamiento estándar de `[[get]]` y `[[put]]`
* Internal properties: propiedades internas del lenguaje, como `[[prototype]]`, `[[get]]` o `[[put]]` entre otros.

Hoy veremos el tercer tipo de propiedades. pero vayamos de a poco.

### ¿Qué son?

Las propiedades internas son propiedades que son establecidas por el lenguaje para definir el comportamiento interno de los objetos, estas propiedades no tienen un nombre y normalmente no son directamente accesibles mediante código.

> Todo objeto tiene propiedades internas, y estas se denotan encerradas en `[[…]]`

### ¿Cuales son?

* `[[get]]` ->Retorna el valor de una propiedad nombrada.
* `[[put]]` -> Establece el valor de una propiedad nombrada.
* `[[prototype]]` -> El prototipo o enlace del objeto, es usado por la herencia.
* `[[extensible]]` -> Define si se pueden añadir propiedades.
* `[[delete]]` -> Elimina el valor asociado al nombre de la propiedad.
* `[[class]]` -> Define el [tipo de objeto](/entendiendo-los-tipos-en-javascript)

Existen algunas más, que puedes consultar en la [documentación de EcmaScript](http://es5.github.io/#x8.6.2)

Hoy me gustaría profundizar en tres `[[prototype]]`, `[[get]]` y `[[put]]`

### \[[prototype]]

Crea un enlace de un objeto a otro, este método es el responsable que en JavaScript podamos usar [prototypal inheritance](https://developer.mozilla.org/es/docs/Web/JavaScript/Herencia_y_la_cadena_de_protipos) (herencia de prototipos).

>  \[[prototype]] crea una referencia a otro objeto, la mayoría de los objetos cuentan con una cadena de prototipo a otro objeto.

**Object.prototype** es la parte superior de la cadena de prototipos `[[prototype]]`, todos los objetos normalmente se vinculan a este.

Este objeto tiene un conjunto de propiedades que son comunes sobre todos los objetos de JS, gracias a la cadena de prototipos.

Algunas métodos como como `.toString()`, `valueOf()`, etc. ¿se te hace conocido?

### \[[get]]

Define como se van a acceder a los valores de las propiedades de un objeto.

El comportamiento estándar es que inspecciona el objeto por la propiedad consultada, y retorna el valor.

También cuenta con otro importante comportamiento si la propiedad no es encontrada.

Si la propiedad no es encontrada en el objeto consultado, se continúa buscando en los objetos vinculados por `[[prototype]]`

```js
var otroObjeto = {
    a: 2
};

// Object.create, permite crear un objeto,

// fijando de manera explicita elvinculo por [[prototype]]

var miObjeto = Object.create( otroObjeto );

miObjeto.a; // 2
```

>  Se realiza la consulta de la propiedad por toda la cadena de prototipo, hasta Object.prototype

Si la propiedad no es encontrada en ningún nivel de la cadena de prototipo, se devuelve _undefined_.

```js
var miObjeto = {
    a: undefined
};

miObjeto.a; // undefined

miObjeto.b; // undefined
```

El valor retornado es el mismo, pero la operación para obtener el valor de _miObjeto_. _b_, requiere más trabajo ya que requiere recorrer la cadena de prototipo completa.

### \[[put]]

Define como va a ser establecido el valor de una propiedad en un objeto.

Podría pensarse que establecer el valor de una propiedad, es algo sencillo, pero existen algunas consideraciones.

`[[put]]` dispone de un algoritmo, el cual analiza algunas variables antes de fijar una propiedad.

Veamos algunas consideraciones:

* Si no se encuentra la propiedad en la cadena de prototipos se establece la propiedad normalmente.
* Si ya existe y es un accessor property, llama al setter de la propiedad.
* Si la propiedad tiene un atributo, **writable: false**, falla silenciosamente si no se usa _strict mode._
* Si la propiedad está en el objeto consultado y si existe una propiedad más arriba en la cadena de prototipos con el mismo nombre, se utiliza la propiedad que se intenta establecer, a esto se le llama _shadowing_

Veamos este último caso más a fondo.

Si quisieramos establecer _miObjeto.bar _, pero esta propiedad ya existe en un objeto más arriba en la cadena de prototipos. Podría suceder alguno de los siguientes casos.

* Si la propiedad _bar_ es una propiedad normal, y es encontrada en un nivel más alto de la cadena, y **NO** está marcada como _writable: false_, _bar_ se añade a _myObj_, y la otra propiedad es ocultada (_shadowing)._

```js
var eseObjeto = {
  bar: 2
};

var esteObjeto = Object.create( eseObjeto );

esteObjeto.bar++;

console.log(esteObjeto.bar); // 3 ‘shadowing’
console.log(eseObjeto.bar); // 2
```

* Sí _bar_ es encontrado en un nivel más arriba en cadena de prototipo y **SI** está marcada como _writable: false_, ambas propiedades la existente y la nueva son rechazadas, si se usa _strict mode_, arroja un error.

```js
var eseObjeto = {};

Object.defineProperty(eseObjeto, ‘bar’, {
  writable: false
});

var esteObjeto = Object.create( eseObjeto );

esteObjeto.bar++;

console.log(esteObjeto.bar); //undefined
```

* Sí _bar_ es encontrado en un nivel superior de la cadena de prototipo, y es un setter, el setter será el que sea usado.

```js
var eseObjeto = {
  get bar() {
    return this.__bar__;
  },
  set bar(value) {
    this.__bar__ = value * 2;
  },
};

var esteObjeto = Object.create( eseObjeto );

esteObjeto.bar = 2;

console.log(esteObjeto.bar); //4
```

Para evitar cualquier funcionamiento diferente al esperado, se recomienda usar _Object.defineProperty_

> El comportamiento de _shadowing_, es un peligroso ya que puede llevar a comportamientos no esperados de las propiedades, se debe usar con gran cuidado.
