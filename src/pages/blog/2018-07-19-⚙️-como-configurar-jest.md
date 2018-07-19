---
templateKey: blog
path: configurar-jest
imagen: /img/photo-1516542076529-1ea3854896f2.jpeg
title: ⚙️ Como configurar jest
date: '2018-07-19T09:45:54-05:00'
description: >-
  Lo primero que necesitamos para comenzar a implementar pruebas en cualquier
  proyecto es instalar la herramienta adecuada, en mi caso he elegido Jest y hoy
  vamos a ver como instalarlo y configurarlo.
---
Lo primero que necesitamos para comenzar a implementar pruebas en cualquier proyecto es instalar la herramienta adecuada, en mi caso he elegido [jest](https://jestjs.io/) y hoy vamos a ver como instalarlo y configurarlo.

![Imagen persona en el computador,  NordWood Themes @nordwood  NordWood Themes](/img/photo-1516542076529-1ea3854896f2.jpeg)

## ¿Porqué jests?

Jest es una librería que nos permite escribir y ejecutar tests, es desarrollada por Facebook y usada por plataformas como [airbnb](https://www.airbnb.com], [twitter](https://twitter.com/), [spotify](https://www.spotify.com/), [resuelve](https://resuelvetudeuda.com/), etc.

Algunas de las características que creo hacen a jest la mejor opción hoy, son:

* Casí cero configuración para comenzar a usarlo, depende de las cosas que uses en el proyecto
* Es extremadamente rápido, usar workers para paralelizar su ejecución
* Permite usar snapshops testing 📸
* Los mensajes de error/feedback son muy claros
* Detecta y utiliza la configuración de babel
* Puedes tener el reporte del coverage sin necesidad de instalar algo más
* Es extendible, puedes crear tus matchers personalizados o incluso correr pruebas de otros lenguajes 🤯.
* Se pueden hacer tests de frontend y backend, corriendo en paralelo si tiene un monorepo

## Instalar Jest

Cómo les contaba instalar jest implica casí cero configuración, solo debemos agregar `jest` a nuestras dependencias, con:

```bash
npm install --save-dev jest
```

Luego podemos crear un script para ejecutarlo, añadiendo en el `package.json`

```json
{
  "scripts": {
    "tests": "jest"
  }
}
```

Ahora, si ejecutas `npm run tests`, va a correr jest pero va a arrojar un error, este dice que no encontró ningún archivo de pruebas, para poder verlo funcionando debemos añadir uno.

Por defecto busca los archivos que estén dentro de una carpeta `__tests__` y que su nombre termine con `.test.js` o `.spec.js`, también por defecto ignora todo dentro de `node_modules`.

El _"hola mundo"_ de los test es solo crear un archivo (donde gustes) dentro del proyecto `__tests__/index.test.js`, y añade el siguiente contenido.

```js
// __tests__/index.test.js
describe('initial', () => {
  test('first tests', () => {
    expect(true).toBe(true)
  })
})
```

Esto simplemente va a probar que `true` sea igual a `true`, si vuelves a ejecutar npm test, vas a ver como dice que paso un test.

Con esto ya tendríamos todo lo necesario para proyectos sencillos, pero que pasa si usamos cosas como importar css/scss en JS, dynamic imports, ES modules, etc. Vamos a ver como configurar algunas cosas particulares.

## Configurar ES Modules en Jest

Muchos de los proyectos modernos en los que trabajes van a estar usando ES Modules, pero normalmente cuando configuramos babel ignoramos la transpilación de los módulos, porque webpack si soporta esta sintaxis y la usa para hacer tree shaking cuando construye el proyecto.

La configuración se debe ver algo como

```json
// .babelrc
{
  "presets": [["env", { modules: false }]]
}
```

Ahora debemos decirle que cuando corramos los tests, si transpile los módulos, pero en producción no lo haga, tenemos dos opciones.

Primera opción: usar la configuración como un archivo `.js`

```js
// babelrc.js
const isTest = String(process.env.NODE_ENV) === 'tests'
module.exports = {
  presets: [['env', { modules: isTest ? 'commonjs' : false }]]
}
```

y dentro del `package.json` llamar la configuración usando

```json
{
  "babel": {
    "presets": "./babelrc.json"
  }
}
```

Segúnda opción usar envirotments de babel

```json
{
  "env": {
    "test": {
      "presets": [["env", { modules: 'commonjs' }]]
    },
    "production": {
      "presets": [["env", { modules: false }]]
    }
  }
}
```

De esta forma ahora cuando ejecutemos los tests, jest va a poder entender los imports ya que babel los va a convertir en commonjs, pero en producción webpack va a poder hacer tree shaking y todo va a funcionar como debería.

## Environments en Jest

Por defecto jest carga js-dom, que nos provee en pocas palabras un objeto que simula `window` del navegador, pero no siempre queremos cargar este objeto gigante, porque podríamos querer usarlo para hacer tests de un proyecto de node.

Para configurar el entorno que queremos podemos agregar en el `package.json`

```json
{
  "jest": {
    "testEnvironment": "node"
  }
}
```

o

```json
{
  "scripts": {
    "tests": "jest --env=node"
  }
}
```

De esta forma ahora no vamos a cargar js-dom, y tenemos todo listo para probar código de un proyecto con node.

En npm puedes encontrar muchos otros paquetes de environments como [jest-environment-electron](https://www.npmjs.com/package/jest-environment-electron), [jest-environment-webdriver](https://www.npmjs.com/package/jest-environment-webdriver) o [jest-environment-puppeteer](https://www.npmjs.com/package/jest-environment-puppeteer)

Si usan monorepo en el proyecto y quieren ejecutar las pruebas de backend y frontend con una sola ejecución, jest soporta multi proyecto con el que puedes correr diferentes conjunto de pruebas en paralelo y con su propia configuración.

```json
// package.json
"jest": {
  "projects": [
    {
      "displayName": "Frontend",
      "testMatch": ["<rootDir>/frontend/*.js"],
      "testEnvironment": "jsdom"
    },
    {
      "displayName": "Backend",
      "testMatch": ["<rootDir>/backend/*.js"],
      "testEnvironment": "node"
    },
    {
      "displayName": "lint",
      "runner": "jest-runner-eslint",
      "testMatch": ["<rootDir>/**/*.js"]
    }
  ]
}
```

Cómo ves también podríamos configurar correr runners personalizados, en este caso corriendo el linter con jest

## Importar CSS en JS

Cuando en nuestros archivos de JS importamos archivos CSS, ya que usamos un loader que lo soporte con [webpack](https://webpack.js.org/), va a hacer que jest falle, ya que esto no es una sintaxis valida para JavaScript, para hacer que jests lo soporte debemos hacer que todos los imports de css se detecten y manejarlos para evitar el fallo, para hacerlo debes agregar en el `package.json`

```json
{
  "jest": {
    "moduleNameMapper": {
      "//.css$": "./test/cssMock.js"
    }
  }
}
```

Lo que estamos haciendo es decirle a jest que cuando encuentre un import que haga match con el regex `.css`, va importar en reemplazo el archivo que le digamos, que puede ser un archivo como:

```js
// cssMock.js
module.exports = {}
```

Esto también funciona si estas cargando archivo `.graphql`, `.svg` o imagenes dentro de JS

## Usar CSS Modules con Jest

Cuando usamos css modules y usamos la forma anterior los tests van a funcionar pero de cierta forma nos gustaría poder ver que estilo se está aplicando a un nodo, para esto podemos usar [identity-obj-proxy](https://www.npmjs.com/package/identity-obj-proxy)

Primero debemos instalarlo con `npm i -D identity-obj-proxy` y agregar en la configuración de jest

```json
// package.json
{
  "jest": {
    "moduleNameMapper": {
      "//.module.css$": "identity-obj-proxy"
    }
  }
}
```

Ahora cuando usemos css modules como

```js
import styles from 'style.css'
const Title = ({ text }) => {
  return <h1 className={style.title}>{text}</h1>
}
export default Title
```

Y usamos el componente en una prueba vamos a obtener algo como:

```html
<h1 class="title">Hola</h1>
```

## Usar Dynamic imports con Jests

Si importamos módulos de forma dinámica en nuestros proyectos, vamos a tener problemas, ya que antes configuramos para que los imports se convirtieran en commonjs, pero estos no soportan dynamic imports, necesitamos configurar para poder soportarlos, para esto vamos a usar [babel-plugin-dynamic-import-node](https://www.npmjs.com/package/babel-plugin-dynamic-import-node)

Dentro de la configuración de babel

```json
{
  "env": {
    "test": {
      "presets": [["env", { modules: 'commonjs' }]], 
      "plugins" ["dynamic-import-node"]
    },
    "production": {
      "presets": [["env", { modules: false }]]
    }
  }
}
```

De nuevo esto es algo que solo queremos hacerlo cuando nuestro entorno sea de pruebas.

## Usar LocalStorage

Por ahora js-dom no soporta local storage, debemos agregarlo nosotros, para esto podemos utilizar [jest-localstorage-mock](https://www.npmjs.com/package/jest-localstorage-mock) y llamarlo en la configuración.

```json
// package.json
{
  "jest": {
    "setupFiles": ["jest-localstorage-mock"]
  }
}
```

> `setupFiles` permite especificar una serie de módulos que deben ejecutarse antes de lo tests

O podríamos escribir nuestra propia versión de local storage (acá un buen issue sobre el tema), para esto podemos utilizar `setupTestFrameworkScriptFile` que nos permite ejecutar un archivo antes de que los tests se ejecuten.

```json
// package.json
{
  "jest": {
    "setupTestFrameworkScriptFile": "./testSetup.js"
  }
}
```

Dentro del archivo podría contener una implementación como

```js
// testSetup.js
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = value.toString();
  }
  removeItem(key) {
    delete this.store[key];
  }
}
window.localStorage = new LocalStorageMock();
```

## Watch mode

Si estamos escribiendo pruebas no nos gustaría estar haciendo cambios y ejecutando cada vez manualmente, con el modo watch el va a detectar si hay cambios y ejecutar de nuevo los tests, para usarlo basta con agregar `--watch`

```json
{
  "scripts": {
    "tests:watch": "jest --watch"
  }
}
```

Algunas cosas interesantes del modo watch son que:

* Se ejecutan por defecto únicamente los tests que se añadieron desde el último commit
* Se ejecuta primero el último que fallo
* Se puede hacer watch de un solo archivo o un tests

## Coverage

También algo que nos gustaría ver cuando añadimos tests es ver cuanto de nuestro código está cubriendo las pruebas, para esto usamos el coverage, con jest es bastante fácil basta con agregar `--coverage` cuando se ejecuta jest.

```json
// package.json
{
  "scripts": {
    "tests:coverage": "jest --coverage"
  }
}
```

Una vez lo ejecutemos también va a generar archivos para poder ver un registro desde el navegador, lo puedes abrir en `coverage/lcov-report/index.html`

En ocaciones también queremos ignorar algunos archivos de nuestro coverage, para esto podemos utilizar `collectCoverageFrom` que nos permite especificar los archivos que queremos incluir en el coverage.

```json
{
  "jest": {
    "collectCoverageFrom": [
      "**/src/*.{js,jsx}",
    ]
  }
}
```

De esta forma le decimos que solo los archivo dentro de `src` y que tengan extensión `.js` o `.jsx`, por defecto ya excluye nuestros archivos dentro de carpetas `__tests__`

## Palabras finales

Muchos de los casos que vimos depende realmente de lo que se use en el proyecto, no necesitas realizar todas las configuraciones, con instalar jest en la mayoría de los casos es suficiente.

En los próximos posts, comenzaremos a ver como escribir pruebas.
