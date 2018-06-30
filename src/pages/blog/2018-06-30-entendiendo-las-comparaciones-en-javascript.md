---
templateKey: blog
path: entendiendo-las-comparaciones-en-javascript
imagen: /img/1_wu_tumm-amzxxkjj0mqvmg.png
title: Entendiendo las comparaciones en JavaScript
date: '2016-05-14T18:00:25-05:00'
description: >
  Uno de los procesos que todos realizamos mientras programamos cada día es
  comparar valores, si estos son iguales, diferentes, mayores, menores, etc,
  para poder realizar acciones con estos.
---
Uno de los procesos que todos realizamos mientras programamos cada día es comparar valores, si estos son iguales, diferentes, mayores, menores, etc, para poder realizar acciones con estos.

> Este contenido lo publiqué primero en [mi newsletter](https://tinyletter.com/yeion7), la semana después de publicar el newsletter publico en mi blog, si quieres ser el primero en leer suscríbete

![banner](/img/1_wu_tumm-amzxxkjj0mqvmg.png)

Muchas veces en JavaScript obtenemos resultados de estas comparaciones que no esperábamos y esto puede conducir a bugs en nuestro código, por esto creo que es importante entender el algoritmo que establece el lenguaje para esto.

```js
21 == '21'          // true
undefined == null   // true
undefined === null  // false
{} === {}           // false
NaN === NaN         // false
[10] == 10          // true
21 < '22'           // true
[22] > [21]         // true
```

vamos paso a paso y entendamos esto.

Existen dos tipos principales de comparaciones **igualdades** y **desigualdades**, el resultado de cualquiera de estas es un **booleano** (_true_ o _false_) reflejando la relación entre los valores evaluados.

Una de las cosas que hace complejo este mecanismo es la coerción, la cual convierte los tipos de datos según su contexto de uso (si es posible la conversión).

Si no se entiende este mecanismos se pueden producir algunos resultados inesperados sin saber porque sucede de esta manera.

```js
let num = ‘24’; //String

let explicita = Number(num); //number

let implicita = num * 2; //num ahora se usa como number
```

Existen valores que son implícitamente convertidos a _false_, estos son:

```js
'' // (string vacio)

0, -0, NaN

null, undefined
```

> Ya que este es un tema algo extenso, se tratará más adelante en un post completo.

Otro mecanismo que se utiliza en las comparaciones en la **conversión de objetos a primitivos**, cuando se les compara a estos con un valor primitivo.

>  Los tipos en JavaScript se dividen en primitivos o por referencia — [Entendiendo los tipos en JavaScript](/entendiendo-los-tipos-en-javascript)

El mecanismo que se sigue para realizar esta conversión es:

1. Si _valueOf(..)_ se puede usar, es llamado y devuelve un valor primitivo.
2. Si ._toString(..)_ se puede usar, es llamado y devuelve un valor primitivo.
3. En otros casos devuelve un _error_

> El mecanismo que normalmente se utiliza es _toString()_.

## Tipos de comparaciones

### Igualdades

Evalúan si dos valores son iguales, se utilizan los siguientes operadores:

```js
== , ===  → Igual

!= , !==  → No igual
```

> De utiliza ! para denotar la negación, refiriéndose a, _no es igual_

### \== vs ===

El operador `===` es muchas veces conocido como igualdad estricta, teniendo un comportamiento más cercano al esperado, pero más allá de esto es bueno conocer el algoritmo de ambos tipos de igualdad.

### Algoritmo de ==

Cuando se evalúan dos valores con este, se sigue la siguiente secuencia para determinar el resultado:

1. Si son del mismo tipo, entonces, se prueban con `===`
2. Si son de diferente tipo:

2.1 Si uno es _null_ y otro _undefined_, retorna _true._

2.2 Si uno es _string_ y otro _number_, se convierte el string, y se evalúan como números.

2.3 Si uno es _booleano_, se transforma, _true_ en 1 y _false_ en 0, y se evalúan.

2.4 Si uno es un _object_ y otro un _number_ o _string_, convierte el objeto a primitivo.

3. En otros casos, devuelve _false._

Puedes revisar este algoritmo en la especificación, [sección 11.9.3](http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3)

```js
null == undefined // true, caso 2.1
10 == '10'        // true, caso 2.2
true == 1         // true, caso 2.3
[10] == 10        // true, caso 2.4
[] == []          // false, caso 3
```

### Algoritmo de ===

Esta igualdad es más estricta con sus resultados, utilizando secuencia para determinar el resultado.

1. Si tienen diferentes tipos, devuelve _false_
2. Si ambos son _null_, devuelve _true_
3. Si ambos son _undefined_, devuelve _true_
4. Si uno o ambos son _NaN_, devuelve _false_
5. Si ambos son _true_ o _false_, devuelve _true_
6. Si ambos son _number_ y tienen el mismo valor, devuelve _true_
7. Si ambos son _string_ y tienen el mismo valor, devuelve _true_
8. En otros casos, devuelve _false_

Puedes revisar este algoritmo en la especificación, [sección 11.9.6](http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.6)

```js
21 === "21"         // false, caso 1
undefined === null  // false, caso 1
NaN === NaN         // false, caso 4
[10] == 10          // false, caso 1
true == 1           // false, caso 1
[] === []           //false, caso 8
'10' === '10'       //true, caso 7
```

Podrías tener lo siguiente en cuenta para saber cuál operador utilizar.

* Si cualquiera de los valores es boolean, utiliza `===`
* Si **no** tienes claro si los valores son convertidos por coerción, usa `===`
* En otros casos podrías usar con seguridad `==`

> Por convención y una buena práctica la comunidad promueve el uso de ===

### Desigualdades

Siempre el resultado de evaluar una desigualdad es un booleano.

Los siguiente operadores son utilizados para comparar desigualdades,

```js
<  → Menor

>  → Mayor

<= → Menor Igual

>= → Mayor Igual
```

Usualmente se utiliza para números, pero también sirve para textos.

1. Si alguno es un _object_, se convierte a primitivo y se evalúa.
2. Si ambos son _string_, se evalúa el orden de los caracteres alfabéticamente.
3. Si ambos son _number_, se evalúa
4. En otros casos es _false_

Puedes revisar este algoritmo en la especificación, [sección 11.8.5](http://www.ecma-international.org/ecma-262/5.1/#sec-11.8.5)

```js
[10] < 9    // false, caso 1 
"a" < "b"   // true, caso 2
10 >= 10    // true, caso 3
```
