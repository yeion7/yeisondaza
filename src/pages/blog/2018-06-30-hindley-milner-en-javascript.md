---
templateKey: blog
path: hindley-milner-en-javascript
imagen: /img/1_ohnagdokat5d0vsda-vjfg.jpeg
title: Hindley-Milner en JavaScript
date: '2016-07-25T10:02:43-05:00'
description: >-
  Una parte fundamental de programar es la manera en que documentamos el código
  que escribimos, hoy veremos una manera de documentar funciones en JavaScript.
---
Una parte fundamental de programar es la manera en que documentamos el código que escribimos, hoy veremos una manera de documentar funciones en JavaScript.

> Nota: Este contenido lo publiqué primero en mi newsletter, la semana después de publicar el newsletter publico en mi blog, si quieres ser el primero en leer [suscríbete](https://tinyletter.com/yeion7).

![Banner post](/img/1_ohnagdokat5d0vsda-vjfg.jpeg)

La semana pasada vimos como [componer funciones en JavaScript](https://yeisondaza.com/componiendo-funciones-en-javascript), como dijimos después de crear un función nos interesa cómo se relacionan con otras funciones y no tanto su implementación.

Para entender esta relación debemos pensar en los tipos de datos que recibe y retornan las funciones.

> En JavaScript los valores son los que tienen tipos, no las variables — Tipos en JavaScript

JavaScript no tiene un sistema fuerte de pitado de sus variables, para comprobar estos podríamos usar una librería como [Flow](https://flowtype.org/).

Hoy veremos una manera de documentar las funciones siguiendo un sistema utilizado en programación funcional, bastante simple y que resulta útil cuando leamos código.

## Hindley-Milner

Este es un sistema de tipos creado para el [calculo Lambda](https://yeisondaza.com/calculo-lambda-en-javascript), es usado en lenguajes funcionales, principalmente [Haskell](http://dev.stephendiehl.com/fun/006_hindley_milner.html).

Veamos como podemos documentar nuestras funciones usando este sistema.

> Hindley-Milner es una notación bastante sencilla que nos va a dar claridad de como se comporta la función respecto a sus tipos.

Recordemos que los tipos básicamente son una colección de valores, por ejemplo si nos referimos al tipo Booleano, es una colección de dos valores (True, False).

Comencemos viendo como se escriben los tipos básicos.

### Tipos básicos

```
Bool    —  booleanos
Char    —  Caracter sencillo
String  —  Cadena de caracteres
Integer —  Números enteros 
Float   —  Números con punto flotante
```

### Tipos de lista

Las listas son secuencias de valores, estos son fundamentales en cualquier lenguaje funciones (JavaScript no es un lenguaje puramente funcional, así que las listas son un tipo especial de objetos)

#### Arrays

Los arrays son colecciones de un mismo tipo, para escribirlas podemos usar el tipo que las compone sin importar la longitud.

```
// xs :: [Bool]
const xs = [False, True, False, True]
// ns :: [Char]]
const ns = ['a', 'b', 'c']
```

También podemos escribir listas de listas

```
xss :: [[Char]]
const xss = [[‘a’], [‘a’,’c’]]
```

> Los arrays normalmente se escriben con los nombres como xs, ns, xss

### Tipos tupla

En JavaScript no existe un tipo tupla, pero es un tipo de dato importante.

Tupla es una secuencia de valores de diferente tipo, estas podemos usarla para escribir los tipos de datos que acepta una función.

```
// (Bool, Bool)
(False, True)

// (Bool, Char, Integer)
(False, 'a', 12)
```

Con esto ya vimos los tipos de datos que normalmente se usan en las funciones ahora veamos como documentar estas.

## Documentando nuestras funciones

Como ya sabemos una función es un mapa de valores de un tipo a valores de otro tipo o el mismo, esta relación la podemos escribir usando una flecha (→) que representa la función.

```
// not :: Bool → Bool
const not = (a) => !(a);

// isDigit :: a → Bool
const isDigit = (x) => typeof(x) === 'number'

// add :: (Int, Int) → Int
const add = (x,y) => x + y

// take :: ([a], Int) → a
const take = (xs, i) => xs[i]

// length :: String → Number
const length = (a) =>  return a.length
```

Cómo vemos documentar una función es bastante sencillo y nos da información sobre que tipos acepta y entrega la función.

Por ejemplo la función add, recibe una tupla de dos números y retorna un número.

Pero si vemos la función isDigit vemos algo interesante, su tipo de entrada lo escribimos con una a, esto es porque esta función no recibe un tipo especifico, puede recibir varios tipos.

Veamos un poco esto.

### Funciones polimorficas

```
// length :: [a] → Int
const length = (xs) => xs.length();
length([true, false, true]); // 3
length([1,2,3,4,5]); // 5

// id :: a → a
const id = (x) => x

id('a'); //a
id(12); //12
```

En la función id esta puede recibir valores de cualquier tipo, asi que podemos escribir este tipo con a, los tipos variables se escriben con letras como a, b, c, etc.

> Un tipo variable debe iniciar con minúscula, mientras que los tipos fijos comienzan con mayúscula

### Funciones currificadas

Como ya sabemos podemos escribir [funciones currificadas](https://yeisondaza.com/currying-en-javascript-funciones-con-superpoderes), así que podemos documentar estas de la siguiente forma.

```
// add :: Int → Int → Int 
const add = x => y => x + y
// map :: (a → b) → [a] → [b]

const map = curry(function(f, xs) {
  return xs.map(f);
});

// reduce :: (b -> a -> b) -> b -> [a] -> b
const reduce = curry(function(f, x, xs) {
  return xs.reduce(f, x);
});
```

El valor que retorna la función es el último, y las funciones las podemos agrupar de derecha a izquierda.

Las funciones map y reduce son un poco más complejas que las anteriores, pero con esta documentación se entiende su proposito.

### Sobrecargar una función

Una función polimorfica es llamada sobrecargada (overloaded) si tipo contiene una o más restricciones.

Por ejemplo

```
sum :: Num a => (a, a) → a
```

En esta función sum, antes de la flecha (=>) estamos aclarando que el tipo a, es un tipo que debe ser numérico.

Así estamos colocando una condición del tipo que se puede utilizar.

```
sum [1,2,3]
sum [‘a’,’b’,’c’] -> error
```

Algunas de las restricciones que se pueden utilizar son.

```
Num, tipo numérico
Eq , tipo que pueda comparar igualdad
Ord, tipo que pueda ser ordenado
```

## Conclusión

Este sistema de documentación es usado en la comunidad de programación funcional, si lees la [documentación de Ramda](https://ramdajs.com/0.21.0/docs/) veras que usa esta notación para documentar los métodos que contiene.

Aunque esta notación no tiene una implementación en JavaScript, si podemos utilizarla como documentación que nos dará información importante al momento de componer funciones.
