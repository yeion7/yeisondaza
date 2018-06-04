---
templateKey: blog
path: el-brillante-futuro-de-css-proyecto-houdini
imagen: /img/1_o4o91o4dltkqj46itgdc3g.png
title: El brillante futuro de CSS — Proyecto Houdini
date: '2018-01-30T19:36:33-05:00'
description: >-
  Alguna vez has aprendido una característica de CSS que te gustaría comenzar a
  usar pero no puedes porque no es soportada por todos los navegadores o no
  todos la implementan de la misma forma. Todos hemos vívido esto.
---
Alguna vez **has aprendido una característica de CSS** que te gustaría comenzar a usar pero **no puedes porque no es soportada por todos los navegadores** o no todos la implementan de la misma forma. **Todos hemos vívido esto.**

Nota: Este contenido lo publiqué primero en **[mi newsletter](https://tinyletter.com/yeion7)**, la semana después de publicar el newsletter publico en mi blog, si quieres ser el primero en leer **[suscríbete](https://tinyletter.com/yeion7)**.

**Utilizar nuevas características de CSS históricamente a sido un proceso de años** y esto hace que no avance a la velocidad que avanza la web, esto es un problema que viene a solucionar el proyecto Houdini.

#### Estado actual de CSS

CSS hoy en día es realmente complejo y poderoso, logrando **cambiar la experiencia total en una página cambiando unos cuantos atributos**. Pero la realidad es que como desarrolladores no tenemos mucho control sobre como
funciona CSS.

![En la izquierda la segunda y tercera edición de CSS the definitive guide, en la derecha la cuarta edición](/img/1_o4o91o4dltkqj46itgdc3g.png)

> En la izquierda la segunda y tercera edición de CSS the definitive guide, en la derecha la cuarta edición

Sobre lo único que tenemos control es sobre el DOM, por eso si queremos crear un polyfill de una característica de CSS lo que hoy se hace es parsear los estilos, encontrar y modificarlo y luego insertarlo al DOM.

Esto hace que la página se vuelva a pintar y muy posiblemente teniendo problemas de rendimiento.

#### ¿Qué es el proyecto Houdini?

El proyecto Houdini es un trabajo en conjunto de Mozilla, Apple, Opera,Microsoft, HP, Intel y Google para poder **exponer APIs que nos permitan trabajar con ciertas partes del motor de CSS**.

#### ¿Qué implicaciones tiene Houdini?

Cómo dije antes utilizar nuevas características es un proceso de mucho tiempo, algo que **no pasa en la comunidad de JavaScript con [Babel](https://babeljs.io/)**, ya que está nos permite escribir nuevo JS hoy, algo por el estilo lograríamos con Houdini.

> Históricamente la forma de usar nuevas características de CSS es esperar todo el proceso de estandarización por parte de la W3C y estandarización por parte de los navegadores.

#### Por qué quisieramos tener control sobre como funciona CSS?

El tener control sobre cómo sobre como los navegadores pinta la página no es solo cuestión de crear páginas bonitas, algunas de las posibilidades que tendríamos sería.

* **Poder normalizar como los navegadores implementan ciertas características.**
* **Crear plugins o polyfills para implementar nuevas características que no están implementadas o son solo propuestas.**

Sí trabajar como desarrollador web sabes que esto es bastante poderoso, y nos llevaría a una nueva etapa en la web, donde las posibilidades son ilimitadas.

**Qué APIs están en desarrollo**

Para poder realmente tener control del proceso de pintado la idea del proyecto es crear un **conjunto de APIs que nos permita manipular ciertas partes del proceso de pintado en el navegador.**

Estos son algunos de los APIs, aunque muchos aún son solo borradores.

#### Listado de APIs

* **Worklets:** Mucho del código de estos APIs va a correr cada vez que se haga repinte la página, por esto es se planea una función parecida a los web workers.
* **Layout API:** Añade la habilidad de crear custom display como `display: layout('myflex')` podríamos crear nuestras propias versiones de flex o grid por ejemplo.
* **Painting API:** Permite pintar bordes e imágenes, podría añadirse la posibilidad de filtros, alfas, etc
* **Parser API:** Nos permitiría parsear código como lo hace internamente Babel.
* **Typed API:** Añade sistema de tipos para poder controlar medidas o cosas así.
* **Font Metric API:** Provee métodos para trabajar con fuentes.
* **Propiedades y valores API:** Registar nuevas propiedades.

#### Estado actual de Houdini

**Muchos de los APIs que propone Houdini aún están en borrador**, pero ya se están comenzando a trabajar en ellos, [Chrome 65 ya tiene soporte para Paint API](https://developers.google.com/web/updates/2018/01/paintapi), es cuestión de tiempo para que poder usar todos estos APIs sea una realidad y podemos ver el progreso en:

#### Palabras finales

Cómo desarrollador realmente me emociona el desarrollo de Houdini y sus posibilidades, creo que en un futuro no muy lejano no vamos a tener que esperaraños para usar nuevas funciones de CSS y tener real control de cómo funciona una de las partes fundamentales de la web.

_Contenido que no te puedes perder:_

* [Small Tweaks That Can Make a Huge Impact on Your Website’s Accessibility](https://css-tricks.com/small-tweaks-can-make-huge-impact-websites-accessibility/?utm_source=ponyfoo+weekly&utm_medium=email&utm_campaign=98)
* [Robust Client-Side JavaScript](https://molily.de/robust-javascript/?utm_source=ponyfoo+weekly&utm_medium=email&utm_campaign=98)
* [Documentation, Lessons Learned](https://sergiodxa.com/essays/documentation/)
* [CSS](https://medium.com/tag/css?source=post)
* [Front End Development](https://medium.com/tag/front-end-development?source=post)
* [Español](https://medium.com/tag/espaÃ±ol?source=post)
* [Web](https://medium.com/tag/web?source=post)
* [Web Development](https://medium.com/tag/web-development?source=post)
