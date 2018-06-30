---
templateKey: blog
path: novedades-de-html-5-2
imagen: /img/1_nlqpttam8dbgl4pabmje_g.jpeg
title: Novedades de HTML 5.2
date: '2018-01-15T09:23:04-05:00'
description: >-
  Los estándares que definen como deben ser las tecnologías más importantes de
  la web siguen creciendo y hace unos meses la versión 5.2 de HTML se volvió la
  recomendación oficial de la W3C
---
Los estándares que definen como deben ser las tecnologías más importantes de la web siguen creciendo y hace unos meses la **versión 5.2 de HTML** se volvió la recomendación oficial de la [W3C](https://www.w3c.es/).

Veamos cuales son los principales cambios.

> Este contenido lo publiqué primero en **[mi newsletter](https://tinyletter.com/yeion7)**, la semana después de publicar el newsletter publico en mi blog, si quieres ser el primero en leer **[suscríbete](https://tinyletter.com/yeion7)**.

![foto por Christopher Gower en unsplash](/img/1_nlqpttam8dbgl4pabmje_g.jpeg)

## Etiqueta <dialog>

Algo muy común en las interfaces que **construimos son las cajas de diálogo**,
**modales**, etc. Hasta ahora teníamos distintas formas de implementarlas, que
no eran muy sencillas y no cumplían estándares de accesibilidad.

En esta especificación se ha **añadido la etiqueta **`<dialog>` la cual nos
permite solucionar esto de forma sencilla.

```html
<dialog open>  
  <h2>Primer modal</h2>
  <p>Este es un modal chingon</p>
</dialog>
```

`dialog` tiene un atributo open que indica si es visible o no, también para interactuar con ella desde JS cuenta con un par de métodos para mostrarla `.open()` y ocultarla `.close()`

## Usar Payment Request API desde un iframe

Payment Request es un API con un montón de potencial, que nos permite delegar el trabajo de construir formularios de pago (entre otras) al navegador, **permitiendo guardar datos de pago entre sitios y reutilizarlos.**

El problema es que antes de esta especificación no se podía realizar por medio de un iframe embebido, limitando algunas solución de pasarelas de pago (Stripe, PayPal, etc), así que esta especificación introduce la **posibilidad de usar el  API desde un iframe**.

Para lograr usarlo basta con agregar la etiqueta `allowpaymentrequest` al iframe que vaya a usar el API.

```html
<iframe allowpaymentrequest>
```

## Tamaños de iconos apple

Para **definir iconos de nuestra aplicación **(especialmente si construimos una PWA) debemos definir los iconos de la aplicación y su tamaño, el navegador va a definir cual utilizar de acuerdo al dispositivo.

El problema es que apple no soporta el atributo size en las etiquetas link, para solucionarlo apple introdujo el atributo **apple-touch-icon, **pero este estándar establece que pueda soportar size.

Ahora basta con esperar que apple decida implementarlo.

## Varios main por página

**El elemento** `<main>` **representa el contenido principal** y único de la
página, hasta el momento solo podía existir uno por página, pero creando SPAs
puede ser difícil cumplir esto, por eso ahora **podemos tener varios main en una
página.**

Con la condición de que solo uno este visible y debemos usar el atributo
`hidden` para ocultar los otros

## Estilos no solo en el head

Ahora podemos colocar etiquetas de estilo no solo en el `<head>` podemos
agregarlas en el body si así queremos

```html
<body>
  <h1> titulo </h1>
  <style>
    h1 {
      color: red;
    }
  </style>
</body>
```

Por rendimiento aún se recomienda dejarlo en el `head`

## Encabezados en la etiqueta legend

En formularios la etiqueta legend representa un subtitulo de un campo del
formulario, hasta el momento su contenido podía ser solo texto, desde ahora
puede ser etiquetas `h`

```html
<form action="">
  <fieldset>
    <legend>
       <h3>Subtitulo</h3>
    </legend>
  </fieldset>
</form>
```

## Solo texto en etiquetas p

Desde ahora solo es valido que dentro de un `<p>` tenga contenido, no es valido agregar elementos de tipo inline-block , inline-tables, flotantes dentro.

## Elementos removidos

Los elementos `keygen` , `menu` , `menuitem` han sido removidos.

## Seguridad

Atributo `nonce` (“number used once”) en etiquetas link para determinar si el contenido de la etiqueta va a ser cargado y usado.

## Accesibilidad

Se actualizo a la versión [wai-aria-1.1](https://www.w3.org/TR/wai-aria-1.1/) que tiene varias mejoras en accesibilidad.

## Palabras finales

Sí quieres leer la lista completa de cambios, la encuentras [acá](https://www.w3.org/TR/html52/changes.html#changes).

Cada año la web sigue creciendo y con ella los estándares que la soportan, muchos de estos cambios ya están disponibles en navegadores como Chrome, recuerda que puedes visitar [caniuse](https://caniuse.com/) para revisar el soporte específico de alguno de estos.

**Por último, ¿cuál es tu cambio favorito?**
