---
templateKey: blog
path: entendiendo-los-tipos-en-javascript
imagen: /img/1_ilobnlhtpv4ybuornyvhdg.png
title: Entendiendo los tipos en JavaScript
date: '2016-04-08T17:22:21-05:00'
description: >-
  Una de las características más particulares de JavaScript, es el
  comportamiento de los tipos de datos, pero conociendo su comportamiento nos
  permite entender como se comportan nuestros datos durante la ejecución.
---
Una de las características más particulares de JavaScript, es el comportamiento de los tipos de datos, pero conociendo su comportamiento nos permite entender como se comportan nuestros datos durante la ejecución.

> Este contenido lo publiqué primero en [mi newsletter](https://tinyletter.com/yeion7), la semana después de publicar el newsletter publico en mi blog, si quieres ser el primero en leer suscríbete

![banner](/img/1_ilobnlhtpv4ybuornyvhdg.png)

### ¿Que es un tipo?

Básicamente los tipos definen el comportamiento que van a tener los datos.

> “Un tipo es un conjunto integrado de características intrínsecas que identifican el comportamiento de un valor particular y lo distingue de otros valores, tanto para el engine y el desarrollador” [You Don’t Know JS: Types & Grammar](https://github.com/getify/You-Dont-Know-JS/blob/master/types%20&%20grammar/ch1.md)

### ¿Cuales tipos existen?

La [especificación del lenguaje](http://www.ecma-international.org/ecma-262/5.1/) define los tipos:

* **string**
* **number**
* **boolean**
* **null**
* **undefined**
* **object**
* **symbol**

Antes de continuar, es preciso decir que en JavaScript, las variables no tienen tipos, Los valores son quienes los tienen. Las variables pueden almacenar cualquier tipo.

> “Las variables en JavaScript no tienen tipos, los valores son quienes tienen tipos”

Estos tipos se dividen en dos:

### Primitivos

**string, number, boolean, null, undefined**

Entendamos el comportamiento de estos.

Cuando definimos un valor primitivo:

```js
let variable = “hola”; //string
```

El nombre de la variable se instancia en su [scope](/entendiendo-scopes-de-variables-en-javascript), y este nombre hace referencia a la ubicación en memoria, donde está almacenado el valor.

![null](https://cdn-images-1.medium.com/max/2000/1*ciEN0bQ7HtRCscINzWYPNQ.png)

Ahora, si asignamos esta variable a otra, el valor se copia, a otra posición en memoria, y cada variable apunta a una ubicación distinta.

![null](https://cdn-images-1.medium.com/max/2000/1*9i0KzR9Y-mWPsWhfh7G9qw.png)

Este comportamiento, hace que si nosotros declaramos un valor primitivo dentro de una variable con _const_, será inmutable, ya que este no podrá ser reasignado.

### Por referencia

**object**

Los objetos definen subtipos, los cuales son: **String, Number, Boolean, Object, Function, Array , Date, RegExp, Error**

Cuando definimos un objeto:

```js
let obj = {nombre: ‘yeison’}
```

El nombre de la variable se instancia en su [scope](/entendiendo-scopes-de-variables-en-javascript), y este hace referencia al objeto en memoria, este contiene una lista de sus propiedades, que a su vez hacen referencia a donde están almacenados los valores.

![null](https://cdn-images-1.medium.com/max/2000/1*VXfqlxGB3GrMygWHTn6Pow.png)

Ahora si, asignamos _obj_ a otra variable, el objeto al que hace referencia no se va a copiar, lo que va a suceder, es que la nueva variable, es otra referencia al mismo objeto.

```js
let obj2 = obj
```

![null](https://cdn-images-1.medium.com/max/2000/1*O2raJ1Nvr4s3VUpCe9AwZw.png)

Por eso, si cambiamos la propiedad _nombre_ de _obj2_, ambas variables apuntar al mismo objeto, se va a cambiar también en _obj_

```js
obj2.nombre = “camilo”;

console.log(obj.nombre) // camilo
```

Este es el comportamiento de los objetos en JavaScript, y funciona igual para objetos anidados dentro de otros objetos

```js
let identify = { 
  name: {
    first: "yeison",
  },
  social: {
    twitter: "@yeion7"
  }
};
```

Que seria algo asi

![null](https://cdn-images-1.medium.com/max/2000/1*MOFkg-iV89qBVsa6xTxVqg.png)

y si yo hiciera

```js
let identify2 = identify.name

identify2 = {first: “juan”}

console.log(identify.name.first) // ??? 
```

**¿Que me mostraria en consola?**

Como vimos no todo en JavaScript es un objeto, pero si todos los valores se relacionan a través de referencias/punteros, tener un entendimiento sólido de como funcionan los diferentes tipos nos va a permitir entender como trabajar con nuestros valores, sin llegar a tener mutaciones inesperadas.

Te recomiendo ver este video donde se muestran algunos errores del lenguaje referente a los tipos.

<center><iframe width="100%" height="315" src="https://www.youtube.com/embed/2pL28CcEijU" frameborder="0" allowfullscreen></iframe></center>
