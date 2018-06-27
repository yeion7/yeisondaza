---
templateKey: blog
path: optimizar-sitio-web-preload-prefech
imagen: /img/photo-1517026575980-3e1e2dedeab4.jpeg
title: "\U0001F680 Cómo cargar nuestro sitio web más rápido"
date: '2018-06-26T19:12:05-05:00'
description: >-
  Como desarrolladores frontend nuestra meta es brindar mejores experiencias a
  los usuarios, una de las cosas principales parar lograr esto es hacer que
  nuestras aplicaciones carguen lo antes posible.
---
Como desarrolladores frontend nuestra meta es brindar mejores experiencias a los usuarios, una de las cosas principales parar lograr esto es hacer que nuestras aplicaciones carguen lo antes posible. 

Existen varios [estudios con casos reales](https://searchengineland.com/mobile-speed-case-studies-push-for-faster-page-loads-295331) de empresas que optimizando la carga de su sitio han logrado vender más, tener más visitas, en general impactando la rentabilidad del negocio, así que esto se vuelve un tema crítico.

![Imagen de unsplash por Chris Liverani](/img/photo-1517026575980-3e1e2dedeab4.jpeg)

Para lograr que nuestro sitio sea lo más rápido posible podemos usar una gran variedad de técnicas

* Minificar nuestro código
* Comprimir nuestros assets (gzip, brotil, etc)
* Cargar solo el código que sea necesario
* Cargar las imágenes optimizadas, en el tamaño necesario, etc
* Usar lazy loading para cargar imágenes, evitando cargar imágenes que no ve el cliente.
* Usar CDNs que estén lo más cerca posible a nuestros clientes
* Cachear correctamente nuestros assets para no descargarlos múltiples veces
* Transpilar solo el código necesario de JS para los navegadores que queremos soportar
* No bloquear el render de la página con la carga de assets

Muchos de estos se pueden lograr de forma bastante sencilla usando la herramienta adecuada, pero hoy quiero hablarles de una que a mi parecer no es tan usada y puede tener el mayor impacto con pocas líneas de código.

## Preload y Prefetch

[Preload](https://www.w3.org/TR/preload/) y [Prefetch](https://www.w3.org/TR/resource-hints/#prefetch) son un estándar web que nos permite mejorar el rendimiento de nuestro sitio, tomando el control de cuando se cargan los recursos que son importantes para nosotros.

_Preload_ es como decirle al navegador, "oye descarga esto pronto porque el usuario lo va a necesitar de inmediato" y el navegador inicia su descarga aún cuanto este leyendo el HTML.

_Prefetch_ es como decirle al navegador, "oye descarga esto pero no tiene tanta prioridad", de pronto el usuario lo va a necesitar el recurso en algún punto y el navegador decide cuando es el mejor momento para descargarlo. Si el usuario cambia de vista aún así la descarga va a continuar en paralelo.

> Recuerda, es importante que no uses esto para cargar todos los recursos de tu sitio. Un gran poder requiere una gran responsabilidad.

## ¿Cómo usar preload y prefetch?

Para usarlos debes declararlos usando etiquetas `link` tan pronto abras el `head` de tu sitio. Debes usar tres atributos principalmente:

* `rel` defines si usar preload o prefetch
* `href` la ruta del recurso
* `as` el tipo del recurso

Así, por ejemplo quiere hacer preload de los estilos de tu sitio debes hacer:

```html
<html>
  <head>
    <link rel="preload" href="/static/styles.css" as="styles">
    <link rel="preload" href="app.js" as="script">
    <link rel="stylesheet" href="/static/styles.css">
  </head>
  <body>
    <script src="app.js"></script>
  </body>
</html>
```

Haciendo este pequeño cambio podemos ver algunos resultados como las imágenes a continuación 

en esta primera imagen es el resultado de [Lighthouse](https://developers.google.com/web/tools/lighthouse/?hl=es) sin usar preload, en el vemos que la página se pudo ver más o menos a los 700ms.

![Imagen resultado lighthouse sin preload](/img/screen-shot-2018-06-26-at-19.09.41.png)

En la segundo usando preload para los estilos, más o menos a los 300ms ya podemos ver la página.

![Imagen resultado lighthouse con preload](/img/screen-shot-2018-06-26-at-19.06.27.png)

Este ejemplo solo es usando preload en un archivo css, imagina cuantos assets tiene tu proyecto que están bloqueando la carga de tu sitio.

Ahora imagina que alguien entra al home del sitio y sabes que es probable que entre a `/about`, y estás usando code splitting, podrías ir haciendo prefetch del script necesario para esa página.

```html
<html>
  <head>
    <link rel="prefetch" href="about.js" as="script">
  </head>
  <body>
    <h1>Home</h1>
    <a href="/about">Sobre mi</a>
  </body>
</html>
```

Una vez el usuario entre al home, el navegador en cierto punto va a descargar el script necesario para `/about`, así la carga de esa página va a ser mucho más rápida.

## ¿Qué tipos de contenido podemos usar?

* audio
* document
* embed
* fetch
* font
* image
* object
* script
* style
* track
* worker
* video

## Cosas a tener en cuenta

* Si usas preload en recursos que no van a ser usados inmediatamente vas a tener un warning en la consola.
* Si un recurso ya está cacheado (service workers por ejemplo), no debería volverse a descargar.
* Puedes ver la prioridad de cada recurso usando el tab network en las herramientas de desarrollo.
* Si los recursos a los que haces preload/prefetch tienen headers de caché válidos son guardados en caché.
* Cuando cargas fuentes debes usar el atributo `crossorigin`, así los cargues desde el mismo dominio.
* No intentes cargar absolutamente todo usando esta técnica.

## Fuentes

Uno de los assets más críticos son las fuentes, y son las que muchas veces bloquean el render de la página, podemos decirle al navegador que tienen gran importancia y que debe descargarlos pronto

```html
<head>
  <link 
    rel="preload" 
    href="https://fonts.googleapis.com/css?family=Rubik:300,400,500,700" as="font" 
    as="font"
    crossorigin
  >
  <link href="https://fonts.googleapis.com/css?family=Rubik:300,400,500,700" rel="stylesheet">
</head>
```

> > Recuerda también usar `font-display: swap` así el navegador va a mostrar el contenido con la fuente fallback y tan pronto cargue cambiar la fuente, sin bloquear el render

Ahora técnicamente aún estamos bloqueando el render de la página, con los assets críticos no tenemos opción debemos cargarlos, con preload vamos a lograr que se descarguen lo más pronto posible, pero con assets que no son críticos podemos cargarlos lazy, sin necesidad de ejecutarlos de inmediato

```html
<body>
  <script>
    var preload = document.createElement("link");
    link.href = "app.js";
    link.rel = "preload";
    link.as = "script";
    document.head.appendChild(link);
  </script>
</body>
```

y cuando deseemos usarlo, simplemente los inyectas en el sitio.

```html
<body>
  <script>
    var script = document.createElement("script");
    script.src = "app.js";
    document.body.appendChild(script);
  </script>
</body>
```

## Preload elementos de acuerdo a la resolución

Ya que preload/prefetch usan el tag link, podemos usar el atributo media para personalizar cuando precargamos assets

```html
<link rel="preload" as="image" href="imagen.png" media="(max-width: 600px)">
```

## Con webpack

Si usas [webpack](https://webpack.js.org/) para construir tu proyecto también puedes usar esta técnica, basta con usar el plugin [preload-webpack-plugin](https://github.com/GoogleChromeLabs/preload-webpack-plugin) y desde la versión `4.6.0`, se añadió soporte para cuando uses code sppliting puedas usar un _magic commet_ para definir si quieres usar preload o prefetch en ese chunk 

```js
import(
  /* webpackChunkName: "modal" */
  /* webpackPrefetch: true */
  "Modal"
)
```

## Palabras finales

Esta forma de manejar los assets la usan proyecto como [Next.js](https://github.com/zeit/next.js/) o [Gatsby.js](https://www.gatsbyjs.org/) consiguiendo muy buenos resultados, inténtalo en tus proyectos y me cuentas que tan rápido carga ahora.
