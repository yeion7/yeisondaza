---
templateKey: blog
path: var-let-y-const-en-javascript
imagen: /img/1__iepudh2frt7z3femleeow.png
title: 'var, let y const en JavaScript'
date: '2016-03-26T17:09:14-05:00'
description: >-
  En JavaScript tenemos varias maneras de poder declarar nuestras variables,
  pero, ¿cuál deberías usar?
---
En JavaScript tenemos varias maneras de poder declarar nuestras variables, pero, ¿cuál deberías usar?

> Este contenido lo publiqué primero en [mi newsletter](https://tinyletter.com/yeion7), la semana después de publicar el newsletter publico en mi blog, si quieres ser el primero en leer suscríbete

![banner](/img/1__iepudh2frt7z3femleeow.png)

Como sabemos dependiendo de la manera en que declaremos nuestras variables, van a tener diferente scope.

> Si las declaramos con **var**, tienen un scope local.
> Si las declaramos con **let** o **const**, tienen un scope de bloque.
>
> [Entendiendo el scope de variables en JavaScript](/entendiendo-scopes-de-variables-en-javascript)

Pero veamos otras consideraciones para saber como declarar nuestras variables

### Funcionamiento

* con **var** definimos una variable con local scope, también nos permite utilizar un comportamiento llamado [hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting), sin generar ningún error.
* con **let** definimos variable con block scope, las variables declaradas de esta manera nos genera un error de referencia cuando intentamos utilizar hoisting.
* con **const** definimos variables de sólo lectura (no confundir con inmutables), esto quiere decir que, cuando asignamos una variable, el nombre de esta va estar asignada a un puntero en memoria, el cual no puede ser sobreescrito o reasignado.

```js
const variable = 'esto';

variable = 'eso'; // TypeError: Assignment to constant variable
```

Pero, si creamos un objeto con **const** y intentamos cambiar una de sus propiedades

```js
const variable = { cosa: ‘esto’};

variable.cosa = ‘eso’;

console.log(variable.cosa); //eso
```

Debido a esto existe confusión sobre el comportamiento de las variables declaradas con **const**.

Como dije antes es una variable de sólo lectura, que no puede reasignarse el puntero en memoria, pero las cosas dentro de los valores por referencia si pueden ser modificadas.

Con valores primitivos como string o números, no podrán ser modificados.

### Legibilidad

Un aspecto fundamental de nuestro código es la legibilidad y lo entendible que sea a la hora de leerse por otros desarrolladores o nosotros mismos en el futuro, por eso considero que **let** y **const** es un paso adelante en este sentido.

> Una variable debería ser usada para representar solo una cosa

Por eso, estoy a favor de **const** sobre **let** y **var**, ya que este nos permite declarar una sola cosa por variable, dándonos a entender que durante la ejecución de nuestro código no será reasignado.

Así, **let** debería ser utilizado para variables dentro de loops o implementaciones de algoritmos como [swap](https://en.wikipedia.org/wiki/Swap_(computer_science)), donde se requiere intercambiar el valor de dos variables.

Una herramienta poderosa que puedes utilizar para mejorar tu código en este y otros aspectos es un Linter, en especial recomiendo [ESLint](http://eslint.org/) junto con las [guías de estilo para escribir código del equipo de airbnb](https://www.npmjs.com/package/eslint-config-airbnb).
