---
templateKey: blog
path: entendiendo-los-objetos-en-javascript
imagen: /img/1_rim5xncbxed_oszdsoknnq.png
title: Entendiendo los Objetos en JavaScript
date: '2016-04-30T17:14:31-05:00'
description: >-
  Los objetos son, una de las características menos entendidas en JavaScript,
  dado que su implementación tiene algunas diferencias importantes con muchos
  lenguajes de programación más tradicionales.
---
Los objetos son, una de las características menos entendidas en JavaScript, dado que su implementación tiene algunas diferencias importantes con muchos lenguajes de programación más tradicionales.

Vayamos paso a paso, intentando entenderlos.

> Este contenido lo publiqué primero en [mi newsletter](https://tinyletter.com/yeion7), la semana después de publicar el newsletter publico en mi blog, si quieres ser el primero en leer suscríbete

![banner](/img/1_rim5xncbxed_oszdsoknnq.png)

En palabras simples:

**Los objetos son una colección de propiedades**

Para construir objetos podemos hacerlo de dos maneras,

* **Objetos declarativos o literales**: podemos crear objetos sin necesidad de un constructor o instanciar una clase, para esto solo declaramos el objeto y sus propiedades.

```js
const camilo = {
  nombre: 'Camilo',
  edad: 22,
  sexo: 'masculino',
  pasatiempos: ['patinar', 'bailar'],
  hablar: function(){
    return `hola soy ${this.nombre}, y tengo ${this.edad} años`;
  }
}

console.log(camilo);
```

* **Objetos construidos:** JavaScript es un lenguaje libre de clases, pero tenemos el keyword _new_, el cual nos permite crear un nuevo objeto, de esta manera podemos utilizar una función que cumpla el rol del constructor.

```js
function Persona(nombre, edad, sexo, pasatiempos) {
  this.nombre = nombre;
  this.edad = edad;
  this.sexo = sexo;
  this.pasatiempos = pasatiempos;
  this.hablar = function() {
    return `hola soy ${this.nombre}, y tengo ${this.edad} años`;
  };
}

const camilo = new Persona('camilo', 22, 'masculino', ['patinar', 'bailar']);

console.log(camilo)
```

### Contenido

JavaScript no almacena el contenido de las propiedades dentro de los objetos, este solo guarda el nombre de las propiedades, con referencias a donde están almacenados los valores.

```js
//pruebalo: https://jsbin.com/vukava/edit?js,console

const myObj = {
  nombre: 'yeison',
  hablar: function(){
    return `hola soy ${this.nombre}`;
  }
}

const myFunc = myObj.hablar;

myObj.hablar = null;

console.log(myObj.hablar); //null
console.log(myFunc); // function hablar() {..}
```

### Acceder a propiedades

Para acceder a las propiedades tenemos dos opciones

* notación con `.`
* notación con `[]`

```js
//Pruebalo https://jsbin.com/vusoqu/edit?js,console
const myObj = {
  nombre: 'yeison',
  hablar: function(){
    return `hola soy ${this.nombre}`;
  }
}

console.log(myObj.nombre); //yeison

const propiedad = 'nombre'

console.log(myObj[propiedad]); //yeison
```

### Atributos de las propiedades

Cada una de las propiedades tiene 4 atributos, los cuales son

* value
* configurable
* enumerable
* writable

Para poder ver los atributos usamos _Object.getOwnPropertyDescriptor(target, propiedad)_

```js
// Pruebalo https://jsbin.com/dataku/edit?js,console
const myObj = {
  nombre: 'yeison',
  hablar: function(){
    return `hola soy ${this.nombre}`;
  }
}

var atributos = Object.getOwnPropertyDescriptor(myObj, 'nombre');

console.log(atributos); 
/*
 * [object Object] {
 *  configurable: true,
 *  enumerable: true,
 *  value: "yeison",
 *  writable: true
 *  }
 */
```

Sabiendo esto podremos ver nuestro objetos representados como

```js
const myObj = {
  nombre:  {
    configurable: true,
    enumerable: true,
    value: "yeison",
    writable: true
  },
  hablar: {
    configurable: true,
    enumerable: true,
    value: function (){
    return `hola soy ${this.nombre}`;
    },
    writable: true
  }
}
```

### Establecer atributos

Para setear nuevas propiedades con atributos personalizados utilizamos _Object.defineProperty(myObj, propiedad, {atributos})_

```js
var myObject = {};

Object.defineProperty( myObject, 'a', {
 value: 2,
 writable: true,
 configurable: true,
 enumerable: true
} );

console.log(myObject.a); // 2
```

Veamos cada uno de estos atributos y entendamos mejor a que hacen referencia.

### Writable

Nos permite definir si el valor de una propiedad va a poder ser modificado o no.

```js
const myObj = {}

Object.defineProperty(myObj,'a', {
  value: 2,
  writable: false, // no writable
  configurable: true,
  enumerable: true
})

myObj.a = 3; 

console.log(myObj.a) // 2
```

### Configurable

Nos permite definir si los atributos de la propiedad van a poder ser modificados.

```js
//pruebalo https://jsbin.com/danawo/edit?js,console
const myObj = {};

Object.defineProperty(myObj,'a', {
  value: 2,
  writable: true, 
  configurable: false, // no configurable
  enumerable: true
});


Object.defineProperty(myObj,'a', {
  value: 2,
  writable: false, // no writable
  configurable: true,
  enumerable: true
}); //TypeError: Cannot redefine property: a
```

### Enumerable

Controla si la propiedad va a ser mostrada cuando se enumeren las propiedades del objeto, como usando for..in

```js
var myObj = {
  a: 1,
  b: 2,
  c: 3
};

Object.defineProperty(myObj, 'd', {
  value: 4,
  writable: true,
  configurable: true,
  enumerable: false
});

console.log(myObj); // {a: 1,b: 2,c: 3}

for(var item in myObj) {
  console.log(item);
}
```

### Metodos útiles

* _Object.preventExtensions(objeto)_ recibe un objeto y retorna un objeto al cual no se pueden agregar nuevas propiedades.

```js
var myObj = {
  a: 1,
  b: 2,
  c: 3
};

var otherObj = Object.preventExtensions(myObj);

otherObj.d = 4; // Error
```

* _Object.seal(objeto)_ recibe un objeto y retorna un objeto al cual no se le pueden agregar propiedades, ni configurar las existentes

```js
var myObj = {
  a: 1,
  b: 2,
  c: 3
};

var otherObj = Object.seal(myObj);

var atributos = Object.getOwnPropertyDescriptor(otherObj, 'a');

console.log(atributos); //configurable: flase

otherObj.d = 4; // error
```

* _Object.freeze(Objeto)_ recibe un objeto y retorna uno al cual, no se puede agregar propiedades, modificarlas, o sobrescribir las actuales

```js
var myObj = {
  a: 1,
  b: 2,
  c: 3
};

var otherObj = Object.freeze(myObj);

var atributos = Object.getOwnPropertyDescriptor(otherObj, 'a');

console.log(atributos); //configurable: flase, writable: false
otherObj.a = 4; // error
otherObj.d = 4; // error
```

Los objetos en JavaScript son entidades dinámicas que se pueden modificar en cualquier punto, esto aunque es una característica poderosa, no siempre la vamos a querer.

Aplicando los métodos que anteriores vamos a poder llegar a tener objetos inmutables, pero si tuviéramos otros objetos como propiedades, estos no aplican esta inmutabilidad, podríamos crear una función recursiva, que vuelva todas las propiedades de nuestros objetos inmutables o utilizas librerías como [immutable.js](https://facebook.github.io/immutable-js/) .
