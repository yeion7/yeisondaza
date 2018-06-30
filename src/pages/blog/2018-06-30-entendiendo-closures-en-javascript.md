---
templateKey: blog
path: entendiendo-closures-en-javascript
imagen: /img/1_jfabpwzj6djgmjqmv2faug.png
title: Entendiendo closures en JavaScript
date: '2016-03-17T18:24:51-05:00'
description: >
  Un closure es cuando una función es capaz de recordar y acceder a un lexical
  scope, incluso cuando la función es ejecutada por fuera del lexical scope.
---
Un closure es cuando una función es capaz de recordar y acceder a un lexical scope, incluso cuando la función es ejecutada por fuera del lexical scope.

Sencillo ¿cierto?, bueno tal vez no tanto, pero vamos paso a paso y entendamos esto.

> Este contenido lo publiqué primero en [mi newsletter](https://tinyletter.com/yeion7), la semana después de publicar el newsletter publico en mi blog, si quieres ser el primero en leer suscríbete

Antes de entender mejor el concepto, deberías conocer:

* [Entendiendo scope de variables en JavaScript](/entendiendo-scopes-de-variables-en-javascript)
* [Calculo lambda en JavaScript](/calculo-lambda-en-javascript)

![banner](/img/1_jfabpwzj6djgmjqmv2faug.png)

Los closures son muy utilizados en JavaScript, solo hay que saber reconocerlos dentro del código y las implicaciones de funcionalidad que este tiene.

Los closures están disponibles gracias a que el lenguaje implementa [lambdas](/calculo-lambda-en-javascript) y [funciones de alto orden](/funciones-de-alto-orden-en-javascript) y son una consecuencia directa de escribir código usando [lexical scopes](/entendiendo-scopes-de-variables-en-javascript).

veamos esto en código:

```js
// Pruebalo: https://jsbin.com/dajocobugu/edit?js,console

function say() {
  var name = 'yeison';
  
  function sayName() {
    console.log(name);
  }
  
  // se retrona la definición de la función sayName
  return sayName;
}

// se asigna la ejecución de say a sayYeison
var sayYeison = say();

sayYeison();
```

Se tiene una función, que tiene una variable interna, que utiliza la variable _name_ y retorna la definición de la función _sayName._

> Si llamamos la _función sin paréntesis _estamos pasando el objeto función en sí mismo.
>
> Si llamamos la _función con paréntesis_ pasamos el resultado de su ejecución.
> [Funciones de alto orden en JavaScript](/funciones-de-alto-orden-en-javascript)

Pero al ejecutar la función _say_, cuando se asigna a la variable _sayYeison_, su variable interna, no debería ser borrada por el _Garbage Collector, _ya que no está en uso, ¿no?

Esto no es así, ya que al ejecutar la función, se retorna la definición de la función interna que tiene una referencia a este scope, por este motivo la variable no va desaparecer.

> _El scope interno todavía está en uso, usado por la función que se retorna_

Lo fundamental para poder entender el concepto de closure, es que contamos con una contexto y una función que hace uso de este, permitiéndonos acceder al scope de tal contexto.

Veamos en otro ejemplo.

```js
// Pruebalo: https://jsbin.com/zebevucamo/edit?js,console
function makeCounter(counter, step) {
  
  function next() {
    return counter += step;
  }
  
  return next;
}

var counter2 = makeCounter(10,2);
counter2(); // sumamos dos, 12
console.log(counter2()); // sumamos dos, 14

var counter10 = makeCounter(50, 10);
counter10(); // sumamos 10, 60
console.log(counter10()); // sumamos 10, 70
```

Aplicando closures podemos crear funciones utilizando diferentes contextos, esto nos lleva a un patrón muy poderoso que veremos en el siguiente post.

Por último veamos una aplicación práctica de closures, tomado de [JavaScript: The Good Parts](http://shop.oreilly.com/product/9780596517748.do) (página 60).

Vamos a crear una función para calcular el [número Fibonacci](https://es.wikipedia.org/wiki/Sucesi%C3%B3n_de_Fibonacci)

```js
// pruebalo: https://jsbin.com/laqikax/1/edit?js,console

var contador = 0;

var fibonacci = function (n) {
  // Contador para ver cuantas veces se ejecuta la función
  contador++;
  // recibimos un numero, si es menor de dos retornamos el numero,
  // si no realizamos dos llamadas recursivas a la función
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};

// Loop donde vamos pasando numero de uno en uno a la funcion fibonacci y mostrando el resultado
for (var i = 0; i <= 10; i += 1) {
  console.log(i + ': ' + fibonacci(i));
}

console.log(contador); //453
```

Podemos ver en la ejecución, se llamó 453 veces a la función _fibonacci,_ así con números más grandes esta cantidad crecerá exponencialmente, intentemos mejorar esto aplicando closures.

```js
// Pruebalo: https://jsbin.com/bucuha/edit?js,console

var contador = 0;

var fibonacci = function () {
  var memo = [0, 1]; // array, para almacenar resultados

  var fib = function (n) {
    contador++; // contador para medir veces de ejecución

    var result = memo[n]; // se almacena la posición del array
    if (typeof result !== 'number') {//Se comprueba si el resultado ya existe
      result = fib(n - 1) + fib(n - 2); // se hace una llamada recursiva
      memo[n] = result; // y se almacena el resultado
    }
    return result;  // se retorna el resultado
  };
  return fib; // se retorna la definición de la función fib
}(); // se auto ejecuta la función para cuando se llame, se utilice la definición de la función fib

for (var i = 0; i <= 10; i += 1) {
  console.log(i + ': ' + fibonacci(i));
}

console.log(contador); //29
```

Utilizando un closure, que nos permita almacenar los resultados en un array, el número de veces que se invoca la función ahora es 29.

Puedes encontrar más referencias a este tema en:

* [You Don’t Know JS: Scope & Closures](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20&%20closures/ch3.md)
* [Closures en MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Closures)
* [JavaScript: The Good Parts](http://shop.oreilly.com/product/9780596517748.do) por [Douglas Crockford](http://www.crockford.com/) (página 37)
