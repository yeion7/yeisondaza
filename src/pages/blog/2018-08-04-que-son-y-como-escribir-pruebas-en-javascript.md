---
templateKey: blog
path: que-son-y-como-escribir-pruebas-en-javascript
imagen: /img/photo-1456428746267-a1756408f782.jpeg
title: 'Qué son y cómo escribir pruebas en JavaScript'
date: '2018-08-06T09:45:54-05:00'
description: >-
  Algo que tal vez todos los programadores hacemos todos los días es cometer errores (romper cosas) y esto es mucho más frecuente mientras la complejidad de nuestras aplicaciones crece, la forma que tenemos de evitar que esto suceda y pueda afectar al negocio es escribir pruebas
---
Algo que tal vez todos los programadores hacemos todos los días es cometer errores (rompemos cosas) y esto es mucho más frecuente mientras la complejidad de nuestras aplicaciones crece, la forma que tenemos de evitar que esto suceda y pueda afectar al negocio es escribir pruebas, hoy vamos a ver que son realmente las pruebas y como funcionan herramientas como [Jest](http://jestjs.io/).

![Imagen de unsplash https://unsplash.com/photos/BW0vK-FA3eg](/img/photo-1456428746267-a1756408f782.jpeg)

## ¿Qué es realmente una prueba?

Un prueba (test) en pocas palabras es un pequeño conjunto de código que nos ayuda a verificar que los programas que escribimos funcionen como deberían, técnicamente una prueba es un código que arroja un error durante la ejecución del código si este no concuerda con el resultado de esperamos.

Por ejemplo si quisieramos probar una función que sume dos números, podríamos ejecutar.

```js
// tests.js

const result = sum(3,4)
const expected = 7

if(result !== expected) {
  throw new Error(`${result} is not equal to ${expected} 😕`)
} else {
  console.log("Todo bien 🌈")
}
```

Si la función `sum` devuelve un valor diferente al que esperamos el programa arrojaría un error. 

Puedes guardar el código de arriba en un archivo llamado `test.js` y ejecutarlo con `node test.js`. Intentar cambiar el valor que espera y ver que realmente arroje un error.

Si escribieras código como este ya estarías creando pruebas para tu código, pero estar escribiendo condiciones y errores de esta forma puede resultar aburrido o complicado, para esto existen herramientas de pruebas.

> Una prueba nos permite detectar cuando una parte de nuestro código no retorna lo que esperamos, usando una condición para evaluarlo a esto se le llama aserción

## ¿Qué es una herramienta de pruebas?

Una herramientas de pruebas nos brinda dos cosas principalmente:

1. Una forma de agrupar y organizar pruebas
2. Una forma de crear estas condiciones para evaluar nuestro código, llamadas aserciones (assertions)

Existen cientos de librerías que solucionan uno o ambos casos, en mi caso uso Jest una librería que soluciona ambos casos muy bien, pero siento que para iniciar a utilizarla es importante entender como funciona, para esto escribamos una versión sencilla de como funciona Jest (casí todas la herramientas de pruebas funciona igual).

## Librería de aserciones 

Primero escribamos una función que nos permita hacer aserciones mucho más fácil.

```js
function expect(result) {
  return {
    toBe(expected) {
      if(result !== expected) {
        throw new Error(`${result} is not equal a ${expected} 😕`)
      }
    }
  }
}
```

Esta función `expect` recibe un valor y gracias a [closures](/entendiendo-closures-en-javascript) podemos retornar un objeto con uno o varios métodos que puedan acceder a este valor, en este caso solo un método que recibe otro valor y evalua si realmente son iguales.

Con esta función si quisieramos de nuevo probar la función `sum`, podemos simplente escribir.

```js
const result = sum(3,4)
const expected = 7

expect(result).toBe(expected)
```

Y estaríamos creando pruebas sobre nuestra función igual que haciamos arriba, lo importante es que ya tenemos una abstracción bastante útil que nos permite escribir aserciones mucho más rápido, a estas abstracciones se le llama `matchers` y herramientas como Jest vienen con muchas que resultan muy útiles, como: 

* `toEqual`
* `toBeGreaterThan`
* `toBeLessThan`
* `toBeLessThanOrEqual`
* `toStrictEqual`
* `toThrow`
* `toThrowError`

Pero recuerda al final del día estas son solo condiciones como las que aprendimos en nuestra primera clase de programación.

## Cómo organizar nuestras pruebas.

Ahora ya podemos escribir aserciones mucho más rápido, pero ¿qué sucede si falla una?, en este momento sería difícil saber cual fallo. 

Algo importante sobre los mensajes de error es que nos ayuden a encontrar donde sucede el error y que nos den indicios de que parte debemos revisar, esto nos resulta útil si tenemos cientos de pruebas, escribamos una función para esto.

```js
function test(title, callback) {
  try {
    callback()
    console.log(`😉 ${title}`)
  } catch (error) {
    console.error(`🙁 ${title}`)
    console.error(error)
  }
}
```

La función `test` simplemente recibe un titulo para la función y lo útiliza para mostar un log más organizado de las pruebas que ejecutas.

Ahora podemos volver a escribir nuestro test, pudiendo darle un titulo

```js
test('sum works', () => {
  const result = sum(3,4)
  const expected = 7
  expect(result).toBe(expected)
})
```

Si este test falla podríamos ver en consola algo como `🙁 sum works`, que nos ayuda a encontrar que prueba fallo, Jest va un paso más allá y agrega más información.

![Ejemplo mensaje de error Jest](/img/jest_error.png)

Pero que sucede si tienes varias pruebas relacionadas o que intentar evaluar el mismo código, tal vez te gustaría agruparlas, Jest cubre este caso y nos da una función `describe` que nos permite agrupar pruebas que tienen algo relacionado.

Todas las pruebas que hemos escrito hasta el momento son pruebas validas en Jest, un archivo al final termina siendo como.

```js
// sum.test.js

describe('sum function', () => {
  test('should return a correct value', () => {
    const result = sum(3,4)
    const expected = 7
    expect(result).toBe(expected)
  });

  test('should convert value strings to number and result value', () => {
    const result = sum(3, "4")
    const expected = 7
    expect(result).toBe(expected)
  });

  test("should throw a error if pass a invalid string", () => {
    expect(() => {
      sum(3,"a")
    }).toThrow();
  })
});
```

Dentro de describe puedes agregar una o muchas pruebas, y Jest te ayudará mostrando logs increíbles cuando alguna falle. pero recuerda, es importante que las descripciones de tus bloques (describe) y pruebas (test), sean claros y descriptivos.

## Palabras finales

Durante este post ya entendemos realmente que es una prueba y como poder escribirlas usando una herramienta como Jest, pero nos queda bastante camino por delante, en siguientes posts cubriremos cosas como:

* Crear pruebas de funciones asincronas
* Crear pruebas de funciones que no siempre retornan lo mismo
* Usar spys y mocks
* Probar funciones que dependen de temporizadores.
* Y mucho más.

