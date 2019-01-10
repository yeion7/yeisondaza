---
templateKey: blog
path: tipos-en-javascript-sin-typescript
imagen: /img/patrick-robert-doyle-1281439-unsplash.jpg
title: 'Tipos en JavaScript sin TypeScript/Flow'
date: '2019-01-10T09:45:54-05:00'
description: >-
  JavaScript no es un lenguaje que sea estrictamente tipado y muchos proyectos han escalado bastante bien sin usar tipado, pero la realidad es que a medida que crece un proyecto su complejidad aumenta y simplemente existen muchos detalles que ya no podemos tener en mente.
---

JavaScript no es un lenguaje que sea estrictamente [tipado](/entendiendo-los-tipos-en-javascript) y muchos proyectos han escalado bastante bien sin usar tipado, pero la realidad es que a medida que crece un proyecto su complejidad aumenta y simplemente existen muchos detalles que ya no podemos tener en mente.

Los tipos nos ayudan a reducir esta complejidad de varias formas, algunas de estas son:

* *Evitar errores comunes*, ya que al conocer los input/outputs o interfaces de los módulos que usamos nos ayuda a usarlos como se debería.
* *Documentación*, Poder tener claro los tipos de datos que acepta o retorna un módulo sin tener que ir a buscar su definición es bastante útil, más cuando es un proyecto grande.
* *Soporte IDE*, la integración y sugerencias de los IDE/Editores es bastante útil cuando programas.
* *Refactorizar*, poder modificar partes de tu código sin tener regresiones o infiriendo donde se está usando lo que cambias resulta una de las mejores ventajas que dan los tipos.
parámetros
Estas son algunas de las razones por las cuales son una gran idea integrar tipos en tus proyectos, te ayudará en general al developer experience y poder prevenir errores antes de que el producto llegue a tus usuarios.

> Si no usas una forma de definir tipos está bien, muchos proyectos funcionan sin esto y si no sientes tener el problema no los integres, ya que esto solo va a añadir otra capa de complejidad a tus desarrolladores.


## JSDOC + TSC

Las dos alternativas más comunes al integrar tipos en JavaScript es usar [Flow](https://flow.org/) o [TypeScript](https://www.typescriptlang.org/), ambas tienen props y contras, pero ambas van a añadir una capa de transpilación a tu código y es posible que integrarlo a tu flujo de desarrollo no resulte tan sencillo.

> Toma tiempo y experiencia siendo eficiente con los tipos si tienes background en lenguajes tipados

Una alternativa es usar [JSDoc](http://usejsdoc.org/) que es una forma estándar de añadir documentación al código en JS, usandolo junto con TSC o TS (solo para chequeo de tipos) podemos tener las mismas ventajas de usar tipado.

Una de las razones por las cuales usar este enfoque es que no requires o require tener un paso más de transpilación, el código que escribes sigue siendo JS y no necesitas migrar o cambiar las herramientas que usas en desarrollo.

También si usas [VSCode](https://code.visualstudio.com/docs/languages/javascript), este soporta JSDoc para poder usar intelliSense, permitiendo mejorar el autocompletado, información de parámetros, etc.

## Configuración

Para activar esto en VSCode puedes hacerlo de dos formas: 

La primera es activarlo por defecto en todos los archivos JS, en settings, agrega

```json
"javascript.implicitProjectConfig.checkJs": true
```

La segunda es agregar en la raíz del proyecto un archivo `jsconfig.json`, con la siguiente configuración

```
{
  "compilerOptions": {
    "target": "es2017",
    "allowSyntheticDefaultImports": true,
    "jsx": "react",
    "noEmit": true,
    "strict": true,
    "noImplicitThis": true,
    }
  },
  "exclude": ["node_modules", "build"],
}
```

Puedes leer más en detalle todas las opciones de configuración ![aquí](https://code.visualstudio.com/docs/languages/jsconfig).

También podrías estar interesado en tener un paso de CI que te permita checar los tipos, para esto basta con añadir un script en el `package.json` con

```
  "type-lint": "tsc --pretty",
```

Uno de los proyectos grandes que usan esta forma de revisión de tipos es [webpack](https://github.com/webpack/webpack/blob/master/package.json#L125)

## Tipos de librerías de terceros

Una vez inicies a utilizar tipos de esta forma o con TypeScript, vas a encontrar que tus dependencias necesitan ayuda para conocer sus tipos ya que no todas son publicadas con estos, para esto la comunidad de TS, tiene una gran herramienta ![TypeSearch](https://microsoft.github.io/TypeSearch/) qué te ayuda a encontrar los tipos de tus dependencias.

## ¿Qué tipos puedo usar?

Los tipos básicos son 

* null
* undefined
* boolean
* number
* string
* Array or []
* Object or {}

Para definir el tipo de una variable puedes usar `@type`

```js
/**
 * @type {number}
 */
const age = 1

/**
 * @type {string}
 */
const name = "yeison"
```

> Es este caso sería innecesario ya que al asignar un numero a la variable, se infiere el tipo

Por ejemplo en arrays podemos definir el tipo de los elementos que contiene.

```js
/**
 * @type {Array<number>} 
 */
const randomNumbers = []
```

> Una alternativa es usar la sintaxis `@type {number[]}`

Con los objetos puedes definir que tipo va a tener cada propiedad.

```js
/**
 * @type {{age: number, name: string}}
 */
const person = {age: 1, name: 'yeison'}
```

Otra alternativa es definir cada propiedad en una línea independiente

```js
/**
 * @property {number} age
 * @property {string} name
 */
const person = {age: 1, name: 'yeison'}

person.name = 1 // Te va a mostrar un error
```

Si una propiedad es opcional podemos declararlo usando `[]` al rededor del nombre de la propiedad,

```js
/** 
 * @typedef {Object} Options The Options to use in the function createUser.  
 * @property {string} firstName The user's first name.  
 * @property {string} lastName The user's last name.
 * @property {number} [age] The user's age.
 */
/**
 * @type {Options} opts
 */
const opts = { firstName: 'Joe', lastName: 'Bodoni' } // no va a mostrar error
```

## Definir tipos personalizados 

Podemos crear tipos personalizados, esto es una forma para crear tipos personalizados y podemos reutilizarlos.

Para declarar un tipo personalizado usamos `@typedef`

```js
/**
 * @typedef {{age: number, name: string}} Person
 */

/**
 * @type {Person} 
 */
const person = {age: 1, name: 'yeison'}

/**
 * 
 * @param {Person} person 
 * @returns {string}
 */
const getUpperName = (person) => person.name.toUpperCase()
```

### Métodos y funciones

Cuando declaramos funciones podemos definir que valores va a recibir y retornar una función, tenemos varias sintaxis que podríamos usar.

#### Sintaxis estándar de JSDoc

```js
/**
 * 
 * @param {number} a 
 * @param {number} b 
 * @returns {boolean}
 */
const gte = (a, b) => a > b

```

#### Sintaxis más parecida a TS

```js
/**
 * @type {function(number, number): boolean}
 */
const gte = (a, b) => a > b
```

#### Sintaxis parecida a Clojure

```js

/**
 * @type {(a: number, b: number) => boolean}
 */
const gte = (a, b) => a > b
```

## Generic

Para poder usar valores genéricos podemos usar `@template`

```js
/**
 * @template T
 * @param {T} i 
 * @return {T}
 */
function identity(i) { 
  return i
}
```

En este caso `identity` va a recibir cualquier tipo, pero el tipo que reciba es el que debe retornar.

## Importar tipos

También podemos importar tipos entre archivos, de forma estandar JSDoc no permite hacer esto, pero VSCode permite utilizar `import` para poder lograr importar definiciones de tipos.

```js
/**
 * @typedef {import('moment').Moment} initialDate
 */
```

También puedes importarlos de archivos (no necesitas declarar ninguna clausula de export)

```js
/**
 * @typedef {import('../utils').File} File
 */
```

## Intersecciones y uniones

Algo que podríamos querer hacer es extender una definición que ya tenemos, para esto podemos utilizar las intersecciones (`&`) que nos permite unir varios tipos en uno solo

```js
/**
 * @typedef {{name: string, cc: number, tel: number}} Person
 * @type {Person & {addres: string}}
 */
const person = { name: 'yeison', cc: 1, tel: 12, addres: 'asd' }
```

O también podríamos necesitar que un tipo sea uno u otro, para esto podemos utilizar las uniones (`|`) 

```js
/**
 * @type {{isValidCitizen: true, cc: number} | {isValidCitizen: false, ce: number}}
 */
const person = { isValidCitizen: true, cc: 1 }
```

## React con JSDoc

Una vez ya sabemos utilizar las partes básicas de JSDOC, podemos aplicar estas en proyectos donde usamos React, en este caso para definir los tipos de los `props` y el `estado` de cada componente.

Si un componente que vamos a utilizar tiene definido sus tipos, cuando lo utilizamos el editor nos va a dar información de los props que espera y sus tipos.

* Componente como función

```js
import React from 'react'

/**
 * @param {{name: string}} Props
 */
const Hello = ({ name }) => (
  <h1>Hello {name}</h1>
)

<Hello name={1}> {/* muestra error */}
```

* Componentes con clases

En los componentes que declaramos con clases, debemos definir sus props y el estado, para esto la clase esta extendiendo de `Component`, para escribir esto en JSDoc, debemos utilizar `@extends`

```js
import React, { Component } from 'react'

/**
 * @typedef {{ user: string, password: string }} State
 * @typedef {{ login: (data: State) => Promise }} Props
 * @extends {Component<Props, State>}
 */
class Login extends Component {
  state = {
    user: '',
    password: ''
  }

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} ev
   */
  handleChange = (ev) => {
    const { value, id } = ev.target

    this.setState({[id]: value})
  }

  /**
   * @param {React.FormEvent} ev
   */
  handleSubmit = (ev) => {
    ev.preventDefault()
    
    this.props.login(this.state)
  }

  render () {
    return (
      <form>
        <fieldset>
          <label htmlFor='user'>
            Password
            <input type='text' id='user' />
          </label>
          <label htmlFor='password'>
            Password
            <input type='password' id='password' />
          </label>
        </fieldset>
        <input type='submit' value='Enviar'/>
      </form>
    ) 
  }
}
```

## Bonus

En muchos proyectos se usan alias, para poder realizar imports de modulos sin tener que escribir grandes rutas, el problema de esto es que tu editor no va a reconocer estas rutas, para solucionarlo podemos agregar la configuración de los alias en el `jsconfig.json`

```json
{
  "compilerOptions": {
    "module": "es2015",
    "esModuleInterop": true,
    "moduleResolution": "node",
    "baseUrl": "./src",
    "paths": {
      "utils": ["utils/"],
      "api": ["api/"],
      "actions/*": ["actions/*"],
      "stores/*": ["stores/*"],
    }
  }
}
```

## Palabras finales

Creo personalmente que usar JSDoc en un proyecto es una forma bastante buena y con menos fricción para poder mejorar el developer experiencie y tener las ventajas que ofrece usar tipos sin tener que migrar de una a usar TS/Flow.
