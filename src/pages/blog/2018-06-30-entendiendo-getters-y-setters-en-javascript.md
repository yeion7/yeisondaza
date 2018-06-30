---
templateKey: blog
path: entendiendo-getters-y-setters-en-javascript
imagen: /img/1_duizv4vxnqnu3l_ttf5aia.png
title: Entendiendo Getters y Setters en JavaScript
date: '2015-04-15T17:28:23-05:00'
description: >-
  Desde ES2015, tenemos la posibilidad de usar getters y setters para definir
  propiedades en nuestros objetos. En este post entenderemos como funcionan.
---
Desde ES2015, tenemos la posibilidad de usar getters y setters para definir propiedades en nuestros objetos. En este post entenderemos como funcionan.

> Este contenido lo publiqué primero en [mi newsletter](https://tinyletter.com/yeion7), la semana después de publicar el newsletter publico en mi blog, si quieres ser el primero en leer suscríbete

![banner](/img/1_duizv4vxnqnu3l_ttf5aia.png)

Antes de leer este post te recomiendo leer:

> * [Entendiendo this en JavaScript](/entendiendo-this-javascript)
> * [Entendiendo los tipos en JavaScript](/entendiendo-los-tipos-en-javascript)
> * [Entendiendo los objetos en JavaScript](/entendiendo-los-objetos-en-javascript)

¿Listo?

En este momento ya deberías conocer el comportamiento y atributos de las propiedades de los objetos en JavaScript.

En este punto cabe aclarar que los objetos tienen tres tipos de propiedades:

* [Data properties](/entendiendo-los-objetos-en-javascript): Las propiedades normales, que contienen datos.
* _Accessor properties_: Propiedades que cambian el comportamiento estándar de `[[get]]` y `[[put]]`
* _Internal properties: _propiedades internas del lenguaje, como `[[prototype]]`, `[[get]]` o `[[put]]` entre otros.

## Qué son los getters y setters

Una función que obtiene un valor de una propiedad se llama _getter_ y una que establece el valor de una propiedad se llama _setter_.

Esta característica a sido implementada en ES2015, pudiendo modificar el funcionamiento normal de establecer u obtener el valor de una propiedad, a estas se les conoce como _accessor properties._

## Funcionamiento

En ocasiones queremos valores basados en otros valores, para esto los data accessors son bastante útiles.

Para crearlos usamos los keywords _get_ y _set_

```js
const obj = {
  get prop() {
    return this.__prop__;
  },
  set prop(value) {
    this.__prop__ = value * 2;
  },
};

obj.prop = 12;

console.log(obj.prop); //24
```

Creamos un objeto, con una única propiedad, que tiene un getter y un setter. de esta manera cada vez que establezcamos un valor para _prop_ se multiplicará por dos.

Nota: utilice **_prop_** por convención, pero no implica que es un valor especial, este es un valor normal.

Otra manera de crear un _accessor properties_ es de manera explícita usando _Object.defineProperty_

```js
const obj = {};

Object.defineProperty(obj, //objeto target
  'prop', //nombre propiedad
  {
    enumerable: true,
    configurable: true,
    get prop() { //getter
      return this.__prop__;
    },
    set prop(value) { //setter
      this.__prop__ = value * 2;
    },
  });
obj.prop = 12;

var atr = Object.getOwnPropertyDescriptor(obj, 'prop')
console.log(atr); 
```

La ventaja que tenemos de esta manera, es que podemos establecer los atributos que queremos tenga la propiedad.

## Características

Una _accessor property_, solo tiene los atributos _configurable_ y _enumerable, _si vemos sus atributos veremos esto.

```js
[object Object] {
    configurable: true,
    enumerable: true,
    get: function get() {
      return this.__prop__;
    },
    set: function set(value) {
      this.__prop__ = value * 2;
    }
}
```

Esto nos lleva a que el valor no puede ser sobreescrito si no se usa el _setter_ de la función (se recomienda definir ambos _setter_ y _getter_).

> Si no se usa _strict mode_ y se intenta modificar el valor va a ser un error silencioso.

Otra característica importante, es que, si se establece una propiedad con el mismo nombre en un ámbito superior de la cadena de prototipos, el accessor property, va a ser la propiedad que predomine.

Veamos un último ejemplo

```js
let persona = {
  nombre: 'Yeison',
  apellido: 'Daza',
  get nombreCompleto() {
    return `${nombre} ${apellido}`
  },
  set nombreCompleto(nom) {
    const palabras = nom.split(' ');
    this.nombre = palabras[0] || '';
    this.apellido = palabras[1] || '';
  }
}

persona.nombreCompleto = 'Camilo Sanchez'

console.log(persona.nombre); //camilo
console.log(persona.apellido); //sanchez
```
