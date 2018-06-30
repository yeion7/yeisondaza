---
templateKey: blog
path: entendiendo-scopes-de-variables-en-javascript
imagen: /img/1_fnuemnxas0cce_elcgn0-q.png
title: Entendiendo scopes de variables en JavaScript
date: '2016-03-09T17:03:23-05:00'
description: >+
  El scope de una variable hace referencia al lugar donde va a vivir esta, o
  podrá ser accesible, en JavaScript tenemos varias opciones: global, local y
  bloque.
---
El scope de una variable hace referencia al lugar donde va a vivir esta, o podrá ser accesible, en JavaScript tenemos varias opciones: global, local y bloque.

Pero vamos paso a paso, y veamos cómo funciona cada una.

> Este contenido lo publiqué primero en [mi newsletter](https://tinyletter.com/yeion7), la semana después de publicar el newsletter publico en mi blog, si quieres ser el primero en leer suscríbete

![banner posts](/img/1_fnuemnxas0cce_elcgn0-q.png)

## Global Scope

Las variables globales son accesibles en cualquier lugar de nuestro código.

Esto sucede porque cuando creamos una variable global esta es instanciada en el objeto _window_

```js
//pruebalo: https://jsbin.com/neravu/edit?js,console

var variableGlobal = 'esto es una variable global';

console.log(window.variableGlobal);
```

Esto lleva a que podamos llamarlas en cualquier lugar de nuestro código.

```js
// pruebalo: https://jsbin.com/koheri/edit?js,console

var variable = 'esto es una variable';

function imprime() {
  console.log(`${variable} llamada dentro de una funcion`);
};

imprime();
console.log(`${variable} llamada fuera de una funcion`);
```

Existen dos casos particulares en los que podemos crear variables globales sin darnos cuenta.

1. Cuando queremos definir una variable dentro de una función y no utilizamos _var, let o const_ para esto.

```js
//pruebalo: https://jsbin.com/mahagec/edit?js,console

function variables() {
  variableGlobal = 'Esto es una variable global'
}

variables();

console.log(variableGlobal);
```

2. Cuando pretendemos igualar dos variables definiendolas con un solo keyword

```js
//pruebalo: https://jsbin.com/sizede/edit?js,console

function variable(){
  var variableLocal = variableGlobal = 'Variable Global';
}

variable();

console.log(variableGlobal);
```

Debemos tener cuidado con estos casos, ya que podemos estar creando side-effects al crear variables globales sin darnos cuenta.

> Utilizar variables globales en nuestro código debería ser evitado, ya que al estar almacenadas en window estas pueden ser sobreescritas y/o llevarnos a tener funciones con side-effects.

## Local Scope

Las variables solo van a vivir en la función donde son creadas, para esto utilizamos el keyword _var_

```js
// pruebalo: https://jsbin.com/xatixi/edit?js,console

function variables() {
  var variableLocal = 'esto es una variable local';
  console.log(variableLocal); // esto es una variable local
}

variables();

console.log(variableLocal); //error variable no definina
```

La variable local únicamente va a vivir dentro de la función, fuera de ella la variable no está definida.

Pero, en el [articulo anterior](/calculo-lambda-en-javascript), vimos que podemos crear funciones que tomen o retornen una función, la manera que funciona el scope en estas es:

```js
//Pruebalo: https://jsbin.com/sequho/edit?js,console

function variables() {
  var variable1 = "variable externa";
  // console.log(variable2); //error
  return function() {
    var variable2 = "variable interna";
    console.log(variable1); // variable externa
   };
}

variables()();
```

En funciones que retornan funciones, podemos llamar a variables exteriores desde funciones que están anidadas, pero desde las funciones externas no vamos a poder acceder a variables internas de funciones anidadas.

## Block Scope

Desde **ES2015** contamos con los keyword _let_ y _const _los cuales nos permite tener un scope de bloque, esto quiere decir que las variables solo van a vivir dentro del bloque de código ( **{dentro de llaves es un bloque} **)donde se crean.

```js
//Pruebalo: https://jsbin.com/samena/edit?js,console

function block() {
  
  const count = 5;
  
  for(let i = 0; i < count; i++  ) {
    console.log(i);
  }
  
  console.log(i); // error
  
}

block();
```

La variable _i_ aun esta en el entorno local de la función, pero como la creamos con _let_, solo va a estar disponible dentro del bloque de código del loop.

En siguientes post veremos más a fondo el funcionamiento de _let_ y _const._

Tener claro donde viven y son accesibles nuestra variables nos va a permitir crear pure functions , lo que es bueno, ya que nos lleva a tener código con menos bugs. Cosa que nos hace feliz a todos.
