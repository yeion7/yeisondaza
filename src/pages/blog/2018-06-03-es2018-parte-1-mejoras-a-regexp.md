---
templateKey: blog
path: es2018-parte-1-mejoras-a-regexp
imagen: /img/0_xyleo99iefjq_4sz.jpeg
title: 'ES2018 Parte 1: Mejoras a RegExp'
date: '2018-06-03T19:10:28-05:00'
description: >-
  JavaScript sigue evolucionando como lenguaje y ya se ha definido que
  características se van a añadir este año, veamos en detalle cada una
---
_JavaScript sigue evolucionando como lenguaje y ya se ha definido que
características se van a añadir este año, veamos en detalle cada una._

![A woman holding up a clipboard with a calendar in front of her chest](/img/0_xyleo99iefjq_4sz.jpeg)

<span class="figcaption_hack">“A woman holding up a clipboard with a calendar in front of her chest” by [Brooke Lark](https://unsplash.com/@brookelark?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)</span>

> **Nota: Este contenido lo publiqué primero en **[mi newsletter (https://tinyletter.com/yeion7)\*\*, la semana después de publicar el newsletter publico en mi blog, si quieres ser el primero en leer [suscríbete](https://tinyletter.com/yeion7).

En Enero el [TC39](https://ecma-international.org/memento/TC39.htm) se reunió y
**se decidió las propuestas que llegarán a stage 4** y por consiguiente **serán
incluidas dentro de ECMAScript 2018**.

Para poder cubrir en detalle cada nueva característica, vamos a dividirlo en una
sería de posts, donde este será el primero

**Parte1: Mejoras a RegExp**

_Parte2: Rest/Spread Object y Promise.finally_

_Parte3: Iteración asincrona_

Sí estas interesado en cuales son todas las propuestas actuales y sus estados
puedes verlas [acá](https://github.com/tc39/ecma262/blob/master/README.md)

Hoy vamos a hablar de las mejoras incluidas a las expresiones regulares

#### Capturar por grupos (named capture groups)

Actualmente podemos capturar una regexp (expresión regular) en grupos y el resultado es un array, por ejemplo si queremos capturar un número separado por espacios

```js
//live: 

const pattern = /(\d{3}).(\d{3}).(\d{4})/u

const number = pattern.exec('320 123 2312')

console.log(number) // [ "320 123 2312", "320", "123", "2312"]
```

Esto es bastante útil pero no lo suficientemente claro o legible, por eso en ES2018, podemos identificarlos con un nombre a cada grupo por ejemplo `(?<numero>\d)`

```js
\\ live: 

const pattern = /(?<indicator>\d{3}).(?<first>\d{3}).(?<second>\d{4})/u;

const number = pattern.exec('320 301 1239');

console.log(result.groups) \\ {indicator: '320', first: '301', second: '1239'}
```

Cómo vemos ahora vamos a tener un objeto donde los keys van a ser iguales a los nombres que le asignemos a los grupos.

También puedes usar destructuring 😉

```js
const {groups: { indicador, first, second}} = pattern.exec('320 301 1239');
```

#### Afirmaciones hacia atrás (Lookbehind Assertions)

Con Regex podemos tener un patrón que se daba cumplir pero no este en el
resultado al evaluarlo, actualmente podemos evaluar que se cumpla este patrón delante de lo que evaluamos, por ejemplo

```js
// live: 

const pattern = /\d+(?= pesos)/g 

console.log(pattern.exec('12 pesos')) // ["12"]
console.log(pattern.exec('12')) // null

// La palabra pesos debe estar delante, pero no aparece en el resultado
```

En ES2018 se a agregado esta funcionalidad pero buscando antes, usando la
sintaxis `(?<=\ )`esto quiere decir que podemos hacer lo siguiente

```js
// live: 

const pattern = /(?<=\$)\d+/g

console.log(pattern.exec('$12')) // ["12"]
console.log(pattern.exec('12')) // null

// El patrón debe estar atrás para que se evalue correcto
```

También podemos evaluar que **no** sea precedido por un patrón

```
// live: 

const pattern = /(?<!\€)\d+/g

console.log(pattern.exec('$12')) // ["12"]
```

#### Flag s(dotAll)

En expresiones regulares el `.` va a hacer mach con cualquier carácter, pero sin incluir las terminaciones de linea como `\n` , para esto en ES2018 tenemos el nuevo flag `s` que nos permite cubrir este caso.

```js
/Esta.Casa/u.test('Esta\nCasa'); // false

/Esta.Casa/su.test('Esta\nCasa'); // true
```

#### Escape de propiedades unicode (Unicode Property Escapes)

El estándar [unicode](https://unicode-table.com/es/) asigna varias propiedades a cada símbolo, desde ES2018 vamos a poder acceder a estas propiedades dentro de las expresiones regulares, esto va a ser solo posible usando el flag `u`

La sintaxis es `/p{Scrip_name}` por ejemplo si quieres buscar los símbolos que sea de números puedes usar `\p{Decimal_Number}`

Así con cualquier propiedad de unicode, está característica me parece increíble por lo legible que hace las expresiones regulares

#### Palabras finales

Recuerda después de los cambios incluidos en ES6 que fueron bastantes, cada año solo van a incluirse en el lenguaje unos pocos. Así que no te asuste o te sientas abrumado, tienes todo un año para aprender unas cuantas cosas nuevas. 😛

Si quieres usar una propuesta que aún no ha sido incluida oficialmente en el lenguaje puedes usar [babel](https://babeljs.io/).

La próxima hablamos sobre Spread/Rest Object y Promise.finally
