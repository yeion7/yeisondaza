---
templateKey: blog
path: entendiendo-la-composicion-en-javascript
imagen: /img/1_ylqwdexgzccdei0oojn4yw.png
title: Entendiendo la composición en JavaScript
date: '2016-05-21T18:06:29-05:00'
description: >+
  En muchas ocasiones vemos que el sistema de objetos de JavaScript es nombrado
  como basado ejemplos o prototipos, pero no siempre vemos qué significa esto.
---
En muchas ocasiones vemos que el sistema de objetos de JavaScript es nombrado como basado ejemplos o prototipos, pero no siempre vemos qué significa esto.

> Este contenido lo publiqué primero en [mi newsletter](https://tinyletter.com/yeion7), la semana después de publicar el newsletter publico en mi blog, si quieres ser el primero en leer suscríbete

![](https://cdn-images-1.medium.com/max/2048/1*ylQwdExgZccdEI0ooJN4yw.png)

Por esto hoy vamos a entender como funciona la composición en JavaScript

Una de las formas en que los objetos se relacionan es a través de la [delegación de comportamientos](/entendiendo-la-delegacion-en-javascript), aunque es un sistema simple y poderoso por sí solo, junto con la composición podremos construir objetos basados en otros, creando un sistema mucho más poderoso.

Para entender la composición podemos pensar en cada objeto como una **pieza de lego**, que tiene definido comportamientos, y uniendo varios en un objetos destino formamos objetos más complejos.

Veamos como se implementa la composición en JavaScript

### Object.assign(..)

Desde *ES2105* el lenguaje implementa el [método *Object.assign()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/assign)*, el cual permite componer objetos o hacer mixins (como algunos lo conocen)

> Aunque antes podíamos hacer uso de esta funcionalidad en librerías como jquery con [$.extend()](https://api.jquery.com/jquery.extend/) o en lodash con [_.assign()](https://lodash.com/docs#assign)

La sintaxis del método es bastante simple, este recibe la cantidad de argumentos desees, pero **todos deben ser objetos**.

De estos argumentos el primero, es el objeto sobre el cual se va a construir (el objeto destino), los demás argumentos, son los objetos que se van a usar para construir.

```js
const comer = {
  comer(comida = '') {console.log(`Estoy comiendo ${comida}`)}
}

const caminar = {
  caminar() {console.log('estoy caminando')}
}

const taladrar = {
  taladrar() {console.log('estoy taladrando')}
}

const masajear = {
  masajear() {console.log('Estoy masajeando')}
}


const obrero = Object.assign({nombre: 'Juan'}, comer, caminar, taladrar)
const masajista = Object.assign({nombre: 'Juana'}, comer, caminar, masajear)

masajista.masajear() //'Estoy masajeando'
obrero.taladrar() // 'estoy taladrando'

masajista.comer('Ensalada') // 'Estoy comiendo Ensalada'
obrero.comer('Carne') // Estoy comiendo Carne
```

Es importante tener en cuenta, que

* Solo se copian las propiedades enumerables de cada objeto

* La composición usa el método [[put]], por esto se debe tener en cuenta los casos de [*shadowing](https://medium.com/@yeion7/propiedades-internas-en-javascript-717057026516) *.

```js
const obj = {
  get prop() {
    return this.__prop__;
  },
  set prop(value) {
    this.__prop__ = value * 4;
  },
};

var bb = {
  prop: 4
};

Object.assign(obj, bb); // obj.prop = 16
```

### Ventajas

* Como vemos representa un modelo mental más simple, para representar la relación entre objetos.

* Mejora la legibilidad de nuestro código.

* Es más fácil realizar separación de conceptos, pudiendo aislar funcionalidades y reutilizar código (DRY).

* Podemos modularizar nuestro código, partiendo esos grandes y complejos objetos, en unos más pequeños.

* Seguridad, ya que cada objeto es una entidad independiente.

<center><iframe width="100%" height="315" src="https://www.youtube.com/embed/wfMtDGfHWpA" frameborder="0" allowfullscreen></iframe></center>

La próxima semana, escribiré sobre herencia funcional, que nos permitirá unir estos conceptos, y ver lo poderoso que resultan juntos.
