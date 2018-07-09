---
templateKey: blog
path: cuales-son-buenos-tests-en-frontend
imagen: /img/photo-1520431626067-a140ac2122f3.jpeg
title: 'Realmente, ¿cuáles son buenos tests en frontend?'
date: '2018-07-09T17:36:21-05:00'
description: >-
  Algo en lo que tal vez estemos de acuerdo es que una parte fundamental de
  construir software son los tests, un producto que no tenga pruebas es riesgoso
  que vaya producción, pero ¿cómo saber que los tests que escribimos son buenos
  tests?
---
Algo en lo que tal vez estemos de acuerdo es que una **parte fundamental de construir software son los tests**, un producto que no tenga pruebas es riesgoso que vaya producción, pero **¿cómo saber que los tests que escribimos son buenos tests?**

![Photo by Max Adulyanukosol on Unsplash](/img/photo-1520431626067-a140ac2122f3.jpeg)

_Photo by Max Adulyanukosol on Unsplash_

## Sobre que son realmente los tests

La realidad es que los productos que construimos son muy complejos, **incluso productos pequeños tienen cientos de casos de uso** y probar cada uno de estos manualmente muy pronto se vuelve imposible.

> La complejidad no sucede solo en software, todas la industrias que construyen cosas se enfrentan con esto y por eso requieren pruebas

Al final los test no son sobre revisar que nuestra lógica sea lo mejor o la más rápida o sigamos los pasos correctos, los test son sobre **confianza**.

Confianza de poder realizar cambios y no dañar cosas que ya existían, confianza de que cuando se liberen nuevas características a los usuarios estas funcionan como se espera, **confianza de poder entregar un producto**.

Así que mientras más estemos seguros que las pruebas revisan que nuestro software funcione como debería, mejores test vamos a tener.

## ¿Qué características tiene buen tests?

Existen un montón de pruebas y cada equipo elige cuales se ajustan más a lo que buscan probar, pero existen **características que comparten los buenos tests**.

* _**Corren rápido**_: Las pruebas no deberían tardar horas en correr, muchas pruebas deberían solo tardar algunos minutos (a menos que tu proyecto sea muy grande).\
  Normalmente las herramientas para escribir tests nos avisan cuando un tests se demora más de lo que debería.
* _**No se rompen siempre**_: Las pruebas también deben tener mantenimiento, por eso es importante que las pruebas no se rompen cada vez que hacemos un cambio o se volvería muy costoso el tenerlas.
* _**Fácil de leer y entender**_: Las pruebas no deben ser más complejas que el código que verifican, por eso nuestros tests deberían ser simples de leer y escribir.
* _**Puede prevenir bugs**_: Esta tal vez es la característica más importante de una prueba, si hacemos cambios que afecten una funcionalidad existente nuestras pruebas deberían fallar y darnos indicios de que fallo.
* _**Buen coverage ratio**_: El coverage ratio es en pocas palabras cuanto de nuestro código estamos cubriendo con las pruebas y no debería ser nuestra meta que sea 100%, cada equipo elige cuanto es un coverage que sirve en el proyecto.
* _**Sobrevive a un mayor refactor**_: si quisiéramos cambiar la arquitectura interna del proyecto o cambiar algo para mejorar el rendimiento, las pruebas deberían ser nuestro mejor amigo, ayudándonos a evitar que algo deje de funcionar

## El costo de los tests

Otro factor a tener en cuenta para saber si estamos escribiendo los tests adecuados es pensar en **cuanto le cuesta tener tests al equipo**, no todas las pruebas que tengamos van a ser iguales, esta es una imagen que lo ilustra bien

![Piramide tests](/img/0_8uapgla-xhuhs6ph.png)

Los tests **más rápidos de implementar son las pruebas unitarias**, esto hace que sean las de menor coste, pero también son las que menos bugs podrían ayudarnos a encontrar.

Mientras que las **pruebas E2E no darían mucha más confianza pero el costo de implementación y mantenimiento es muy alto**.

![Escribe pruebas, no muchas, mayormente integración](/img/screen-shot-2018-07-09-at-08.10.31.png)

Tal vez un buen enfoque es el que propone  [Guillermo Rauch](https://twitter.com/rauchg/status/807626710350839808) sobre mayormente invertir tiempo escribiendo tests de integración, ya que pueden representar un buen balance entre velocidad y coste.

Las partes que sean más criticas en nuestro software podríamos invertir en tener tests E2E.

## Algunos de los errores más comunes en pruebas

He trabajado en varios equipos de desarrollo e intentado varios métodos para tener pruebas algunos que he usado son:

* _**Probar que un componente se monte sin error**_, este test busca hacer render de un componente y que no se lance un error, pero esto realmente no prueba nada, ya que si la librería/framework funciona sin duda va a hacer render.
* _**Probar componente usando snapshot tests**_, esto es una practica común, se trata de ver que el markup que devuelve un componente siempre sea el mismo, el problema con ellos es que generan un montón de archivos y muchas veces los equipos al ver un error simplemente actualizan los snapshot sin buscar la razón del fallo.
* _**Probar solo los reducers**_, los equipos que usan redux suelen usar esto, aunque es un buen intento ya que se está probando la lógica de la aplicación, si tenemos que hacer cambios importantes que impliquen cambiar flujos o dejar de usar reducers, los test no nos van a funcionar para prevenir regresiones.

## Pero entonces, como escribir tests

Luego de intentar implementar los test que nombre antes, encontré este tweet de [Kent C. Dodds](https://twitter.com/kentcdodds) que me hizo replantear como escribía mis tests.

![Mientras más tus pruebas se parezcan a la manera que tu software es usado, mayor confianza te darán](/img/screen-shot-2018-07-09-at-08.16.09.png)

La realidad es que sin importar que framework o arquitectura utilicemos los usuarios siempre van a usar nuestro producto usando una interfaz, sin importar que lógica tenga atrás.

Sí nuestros **tests intentan emular la forma que nuestros usuarios utilizan lo que construimos vamos a tener mayor confianza al final** y vamos a estar escribiendo buenos tests que cumplen con la mayoría de características que liste anteriormente.

Existen varias librerías para lograr esto, particularmente me gusta utilizar [react-testing-library](https://github.com/kentcdodds/react-testing-library/blob/master/README.md) (también para [vue](https://github.com/dfcook/vue-testing-library) y [angular](https://github.com/synapse-wireless-labs/angular-testing-library)).

## Palabras finales

Crear pruebas que recreen lo más posible como el usuario utilizaría lo que construyo para mi ha resultado ser la mejor forma de escribir tests, pero **cada equipo debe decidir cual forma es la más conveniente para ellos basados en muchos factores**, como el tipo de proyecto, los recursos, la cantidad de personas, etc.

En próximos post veremos como comenzar a implementar tests que cumplan las características que vimos antes.

Por último me gustaría preguntarte, _¿piensas que es importante tener pruebas en tu proyecto? ¿el proyecto donde estas tiene un set de pruebas? ¿te sientes seguro con las pruebas que tienen?_
