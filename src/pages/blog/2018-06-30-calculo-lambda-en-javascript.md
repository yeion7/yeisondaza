---
templateKey: blog
path: calculo-lambda-en-javascript
imagen: /img/1_qskwsgy2-uftjsewskpj3a.png
title: Calculo lambda en JavaScript
date: '2016-03-02T16:52:27-05:00'
description: >+
  Hoy he querido escribir de un tema bastante interesante, que hace gran parte
  de la computación moderna y al entender un poco de él, será de gran ayuda para
  entender algunos conceptos avanzados en JavaScript.
---
Hoy he querido escribir de un tema bastante interesante, que hace gran parte de la computación moderna y al entender un poco de él, será de gran ayuda para entender algunos conceptos avanzados en JavaScript.

Pero vayamos paso a paso.

> Este contenido lo publiqué primero en [mi newsletter](https://tinyletter.com/yeion7), la semana después de publicar el newsletter publico en mi blog, si quieres ser el primero en leer suscríbete

![banner post](/img/1_qskwsgy2-uftjsewskpj3a.png)

### ¿Que es el calculo lambda?

Es un sistema formal, desarrollado por [Alonzo Church](https://es.wikipedia.org/wiki/Alonzo_Church) (director de Alan Turing) en 1936, buscaba formalizar la matemática, pero otra persona se dio cuenta que el trabajo de Church caía en una paradoja que no le permitía hacer esto.

Así Church tomo una parte de su trabajo y se enfocó en investigar la definición de función, la aplicación de estas funciones y la recursión.

Dando origen a lo que muchos reconocen hoy como el lenguaje más pequeño y universal de programación, así cualquier función computable puede ser evaluada y expresada en el calculo lambda.

### Lambda en lenguajes de programación

El requisito fundamental para implementar el calculo lambda en un lenguaje de programación, es que las funciones sean tratadas como [ciudadanos de primera clase](/funciones-de-alto-orden-en-javascript).

El primer lenguaje de programación en hacerlo fue [Lisp](https://es.wikipedia.org/wiki/Lisp) desarrollado por \[John McCarthy](http://John McCarthy), quien creo una propuesta teórica de la implementación del calculo lambda, pero uno de sus estudiantes viendo las posibilidades de este, creó un compilador.

Lisp no alcanzó una gran popularidad comercial, pero fue utilizado por personas como [Paul Graham](https://twitter.com/paulg) quien lo usó para construir su startup ViaWeb, en su libro [Hackers and Painters](http://www.amazon.es/Hackers-Painters-Big-Ideas-Computer/dp/1449389554) habla de las bondades de usar un lenguaje como este en el desarrollo de aplicaciones web.

Luego de esto a sido implementado en lenguajes como Scheme, ML, Haskell y el que nos interesa JavaScript (agradezcamos a [Brendan Eich](https://twitter.com/brendaneich) por hacer esta implementación en tan poco tiempo).

### ¿Porque sigue siendo tan valioso el calculo lambda?

Resumiendo es básicamente por:

* La recursión es fundamental para la computación.
* Es un modelo simple para explicar propiedades de computo.

Pero basta de historia y veamos lo que nos interesa del calculo lambda.

### Funciones

Antes de nada debemos definir que es una función, y de manera básica es una asociación entre valores de entrada y valores de salida.

> Pasamos unos valores de entrada, estos valores se procesan y obtenemos unos valores de salida

Por ejemplo:

```js
    function doble(x) {
      return 2 * x;
    } 

    //La entrada es un número
    //Se procesa multiplicando por dos
    //La salida es el doble del número ingresado
```

### Funciones en calculo lambda

Church estableció algunas características de las funciones, estas son:

> El nombre de las funciones no importa, solo importa lo que hagan.

Si tenemos una función suma, que toma dos numero y retorna la suma de estos

```js
suma(x,y) = x + y
```

Será lo mismo que tener

```js
(x,y) = x + y
```

De esta manera podemos tener en un lenguaje de programación funciones anónimas, siguiendo con el ejemplo anterior, sería lo mismo tener

```js
const suma2 = x => x + 2;
```

> El nombre de los parámetros de entrada no importan

Usando el ejemplo anterior, una función que recibe dos números y los suma

```js
(x,y) = x + y
```

Estos números que recibe podrían llamarse de cualquier manera

```js
(a,b) = a + b
```

Gracias a esto, cuando creamos una función, el nombre de los parámetros que definimos recibir sólo tienen importancia dentro de la función.

> Si una función recibe más de un parámetro, se puede reescribir como, una función que toma un parámetro y retorna una función, está a su vez recibe una parámetro y retorna el resultado.

Usando el ejemplo anterior, donde recibimos dos números y retornamos la suma de ellos

```js
(x,y) = x + y
```

También podríamos expresarlo como:

```js
x -> (y -> x + y)
```

Una función que recibe _x_, y _retorna una función que recibe _y* retornando la suma de ambos (este proceso de llama [curificación](/currying-en-javascript-funciones-con-superpoderes)).

Ahora en código esta característica nos permite hacer esto:

```js
const suma = x => y => x + y;
  
const suma10 = suma(10);
const suma20 = suma(20);

console.log(suma10(20));
console.log(suma20(20));
```

Como mencione anteriormente y se observa en el ejemplo anterior para usar esto en los lenguajes de programación, las funciones deben ser [ciudadanos de primera clase](/funciones-de-alto-orden-en-javascript), ya que esto nos permite tomar funciones como parámetros o en este caso retornar funciones.

La implementación del calculo lambda, es un concepto muy poderoso, ya que con estas características, nos permite utilizar el paradigma de programación funcional en cualquier lenguaje que lo implemente.

Entendiendo esto vamos a poder entender de manera más profunda conceptos como [scopes](/entendiendo-scopes-de-variables-en-javascript), [closures](/entendiendo-closures-en-javascript), [currying](/currying-en-javascript-funciones-con-superpoderes), [composición de funciones](/componiendo-funciones-en-javascript), [funciones puras](/funciones-puras-en-javascript-crea-funciones-libres), o incluso [fábricas de funciones](/herencia-funcional-en-javascript).

Esto solo es una visión basica del calculo lambda, te invito a intentar entenderla a mayor profundidad. En próximos post veremos cómo se implementa en profundidad en JavaScript.
