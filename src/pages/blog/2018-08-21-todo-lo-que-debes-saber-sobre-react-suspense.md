---
templateKey: blog
path: todo-lo-que-debes-saber-sobre-react-suspense
imagen: /img/photo-1508303852202-4753808b8cd7.jpeg
title: 'Todo lo que debes saber sobre React Suspense'
date: '2018-08-21T09:45:54-05:00'
description: >-
  React en su versión 17 va a tener cambios importantes agregando dos nuevas características React Suspense y Time Slicing, hoy hablaremos sobre la primera de ellas, veamos todo lo que debes saber sobre React Suspense.
---
React en su versión 17 va a tener cambios importantes agregando dos nuevas características React Suspense y Time Slicing, hoy hablaremos sobre la primera de ellas, veamos todo lo que debes saber sobre React Suspense.

![Imagen de unsplash https://unsplash.com/photos/eZKJlDM3PKw](/img/photo-1508303852202-4753808b8cd7.jpeg)

Hay dos factores importantes que siempre intervienen en todas las interfaces que construimos.

1. La velocidad de la red que usan nuestros usuarios.
2. La velocidad/capacidad de computo donde se usan nuestras interfaces.

Estos dos factores y como solucionarlos nos llevan a tomar decisiones técnicas en nuestros productos, pensando en estos dos problemas el equipo que desarrolla React ha desarrollado:

*React Suspense*, nos da una forma estándar de requerir datos asíncronos, enfocándose principalmente en la experiencia del usuario.

*Time Slicing*, no da una forma de asignar la prioridad que tienen los cambios en la interfaz de nuestra aplicación, logrando tener aplicaciones con mejor rendimiento.

Hoy vamos a ver en detalle como usar React Suspense, (si quieres ver un demo de como funcionan ambos puedes ver la [charla de Dan Abramon en JSConf Iceland](https://www.youtube.com/watch?v=v6iR3Zk4oDY)

> Todas las características tratadas en este post no están listas para ser usadas en producción, aún pueden existir cambios antes de tener el lanzamiento final.

## ¿Qué es React Suspense?

React Suspense es el codename del feature que nos da una forma estándar de poder cargar datos asíncronos en nuestros componentes.

La forma en la que funciona en pocas palabras es que cuando un componente necesite realizar una acción asíncrona (como hacer fetch de datos) antes de mostrarse, React va a "pausar" el render del componente hasta tener los datos.

Para entender esto, debemos ver un poco como funciona el render de un componente en React. 

El render de todo componente se divide en tres fases

### Fase de Render 

En esta se realiza todo el proceso de cálculos de las diferencias entre el virtual DOM y DOM, esta fase no tiene ningún side effect así que puede realizarse asincronamente, y con la implementación de React Fiber en esta fase se puede pausar, restaurar o abortar trabajo (aka, render de un componente)

## Fase de precommit

En está fase básicamente se puede leer el DOM, permitiendo realizar cálculos 

## Fase de commit 

Esta fase es sincrona, ya que en esta fase se realiza el proceso de reconciliación de lo que está en el virtual DOM con el DOM.

![Fases de React](/img/bmfcRQm.jpg)

Así que para poder tener React Suspense, React toma control del componente pausandolo en la fase de render, hasta que los datos sean resueltos, sin bloquear la interfaz o tener problemas de rendimiento. 

## El estado actual de React

Antes de hablar sobre cómo implementar React Suspense, quisiera hablar sobre cómo hacemos fetch de datos hoy en día en React, lo que hacemos normalmente (si no usas un state manager), es usar `componentDidMount` para poder hacer fetch de datos.

Tendremos una implementación más o menos así.

```jsx
class User extends Component {
  state = { 
    users: []
  }

  componentDidMount() {
    this.fetch()
  }

  fetch = async () => {
    const users = await fetch("/users")
    this.setState({ users })
  }

  render() {
    const { users } = this.state
    if(users.lenght === 0) {
      return <Spinner />
    }
    return users.map(user => <User key={user.id} {...user} >)
  }
}
```

Una vez el componente se monte, se va a hacer la petición de datos, mientras se va a mostrar un indicador (en este caso un spinner), de que está sucediendo algo.

Es muy normal que encuentres este tipo de implementaciones hoy en día, pero está implementación tiene algunos problemas.

* Sí el usuario cambia de vista muy rápido y la promesa no se ha resuelto, cuando se resuelva va a intentar actualizar el estado de un componente que ya no está (react te va a mostrar un warning de esto).

Para solucionar esto puedes utilizar una librería como Axios que te permita cancelar promesas o usar una arquitectura como flux que te permite desuscribirse al desmontar un componente y no tener este problema, pero ahora tenemos una capa de abstracción más en nuestra aplicación.

* Los usuarios siempre van a tener que ver el indicador de carga y esto no está mal en conexiones lentas, ya que los usuarios tienen una indicación de que algo está sucediendo, pero en conexiones rápidas, este indicador se va a ver por menos de un segundo, así que vamos a tener un montón de indicadores que duren muy poco en la pantalla.

Y así algunos otros problemas que pueden solucionarse de forma sencilla o no, añadiendo muchas veces complejidad, así que React Suspense tiene una solución bastante elegante para esto.


## Cómo usar React Suspense

Para usar React suspense necesitamos básicamente tres cosas, 

1. Un recurso
2. Un sistema de cache
3. Usar un Placeholder

Veamos uno por uno

## Crear un recurso con React Suspense

Como dije antes React Suspense va a permitirnos pausar el render de un componente hasta que los datos asíncronos se resuelvan, para esto debemos crear un recurso con los datos asíncronos que necesitamos, vamos a usar una pequeña librería llamada `simple-cache-provider`.

Está librería tiene un método llamado `createResource` el cual recibe una función asíncrona y crea un recurso.

```js
import { createResource } from 'simple-cache-provider';
import { fetchUserDetails } from 'api'


const UserDetailsResource = createResource(fetchUserDetails)
```

Al crear este recurso, este tiene dos métodos.

* `.read`, nos permite ejecutar la función asíncrona y leer el valor que resuelve
* `.preload`, nos permite ejecutar la función asíncrona pero no leer el valor

> `simple-cache-provider`, es una librería pequeña que principalmente va a servir como referencia, para otras implementaciones internas de otras librerías.

## Cache en React Suspense

Ya que tenemos nuestro recurso, es importante también poder tener cache de estos (ya sabes el cache siempre es bueno), para crearlo podemos de nuevo usar `simple-cache-provider`

```js
import { createCache } from 'simple-cache-provider';

const cache = createCache()
```

De esta forma creamos una forma ya tenemos un sistema de cache.

## Componente asíncrono en React suspense

Ahora que ya tenemos nuestro recurso y cache, podemos usarlo dentro de un componente

```js
import { createResource, createCache } from 'simple-cache-provider';
import { fetchUserDetails } from 'api'

const cache = createCache()
const UserDetailsResource = createResource(fetchUserDetails)

function UserDetails({ id }) {
  const user = UserDetailsResource.read(cache, id);
  return <User {...user}/>
}
```

Cómo puedes ver podemos usar el recurso dentro del render del componente que necesite la información, el método `read` va a tomar como primer argumento el cache y los demás argumentos se los va a pasar a la función asíncrona que tiene.

De esta forma ya tenemos un componte asíncrono, que hace un llamado a un API carga datos y se muestra en pantalla, ahora veamos como usar este componente en nuestras interfaces.

## Componente Placeholder

Ya que nuestro componente es asíncrono y va a depender que se resuelva el recurso para mostrarse necesitamos una forma de poder mostrar un indicador visual si esta carga dura mucho tiempo, para esto React tiene un nuevo componente llamado `Placeholder`

Vamos a necesitar envolver todos nuestros componentes asíncronos con `Placeholder` (React arroja un warning si no lo haces)

```js
import React, { Placeholder } from 'react';

class App extends Component {
  render() {
    return (
      <Placeholder delayMs={500} fallback={<Spinner size="medium" />}>
        <UserDetails id={this.props.id}/>
      </Placeholder>
    )
  }
}
```

Placeholder recibe dos props, `delayMs` y `fallback`

`fallback` es un componente que debería mostrar si la carga de nuestro recurso no sucede rápido, y `delayMs`es el tiempo que debería esperar antes de mostrar este fallback.

Podríamos decirle que espere `500ms`, en conexiones rápidas este fallback nunca aparecería porque el recurso se cargaría antes, pero en conexiones lentas si tendríamos un indicador de carga.

Esto también nos da más flexibilidad, ya que imagina que todos los endpoints que consultas no son igual de rápidos, si sabes que un endpoint demora en responder puedes mostrar el fallback lo antes posible y esperar que el rápido si se muestre, algo así 

```js
import React, { Placeholder, Fragment } from 'react';
import Spinner from 'spinner'

class App extends Component {
  render() {
    return (
      <Fragment>
        <Placeholder delayMs={500} fallback={<Spinner size="medium" />}>
          <UserDetails id={this.props.id}/>
        </Placeholder>
        <Placeholder delayMs={1} fallback={<Spinner size="medium" />}>
          <UserComments id={this.props.id}/>
        </Placeholder>
      </Fragment>
    )
  }
}
```

`Placeholder` puede envolver a más de un componente asíncrono, pero en este caso queremos que el tiempo en el que se muestra el fallback sea diferente.

## Placeholders anidados 

Los componentes asíncronos puedes estar dentro de otros componentes asíncronos sin ningún problema, así en nuestro ejemplo una ver cargue los detalles de un usuario, podríamos iniciar a cargar sus comentarios para hacerlo de nuevo necesitamos usar el componente `Placeholder`

```js
import React, { Placeholder } from 'react';
import Spinner from 'spinner'
import { createCache, createResource } from 'simple-cache-provider';
import { fetchUserDetails } from 'api'

const cache = createCache()
const UserDetailsResource = createResource(fetchUserDetails)

function UserDetails({id}) {
  const user = UserDetailsResource.read(cache, id);
  return <div>
    <h1>{user.name}</h1>
    <Placeholder delayMs={500} fallback={<Spinner size="medium" />}>
      <UserComments userId={id} />
    </Placeholder>
  </div>
}
```

Esto está bastante bien, pero dependemos que la carga del recurso de los detalles del usuario termine para que inicie la carga de los comentarios, si quisiéramos mejorar esto podemos hacer uso del `preload` del recurso 

```js
import React, { Placeholder } from 'react';
import Spinner from 'spinner'
import { createCache, createResource } from 'simple-cache-provider';
import { fetchUserDetails, fetchCommets } from 'api'

const cache = createCache()
const UserDetailsResource = createResource(fetchUserDetails)
const UserCommentsResource = createResource(fetchCommets)

function UserDetails({id}) {
  UserCommentsResource.preload(cache, id)
  const user = UserDetailsResource.read(cache, id);
  return <div>
    <h1>{user.name}</h1>
    <Placeholder delayMs={500} fallback={<Spinner size="medium" />}>
      <UserComments id={id} />
    </Placeholder>
  </div>
}
```

Así una ves inicie a cargar el recurso de los detalles, también se va a cargar los comentarios. 

Algo importante es que si el usuario se va a otra vista no pasa nada, React no bloquea la página o va a fallar porque no se use los recursos que están cargando.

## Cargar recursos con React Suspense

Cómo dije React Suspense es una forma estándar de cargar recursos asíncronos y esto no se limita solo a hacer fetch de datos, podríamos cargar recursos como imágenes, videos, audio usando esto que ya hemos visto.

Acá una implementación sencilla de como cargar una imagen 

```js
import {createCache, createResource} from 'simple-cache-provider';

const cache = createCache()

const ImageResource = createResource(
  src =>
    new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(src);
      img.src = src;
    })
);

function Img({src, alt, ...rest}) {
  return <img src={ImageResource.read(cache, src)} alt={alt} {...rest} />;
}
```

Y para usarla de nuevo basta con envolver este componente `Img` en `Placeholder`

```js
function UserPicture({ source }) {
  return (
    <Placeholder delayMs={1500} fallback={<img src={source} alt="poster" />}>
      <Img src={source}/>
    </Placeholder>
  )
);
```

De esta forma podríamos cargar recursos, incluso podríamos pre-cargarlos (recuerda `preload`), puedes ver como implementar la carga de otros recursos en el codebase de [react-async-elements](https://github.com/palmerhq/react-async-elements/tree/master/src).

## Code Splitting con React suspense

Sí estabas pensando que un componente que se requiere de forma asíncrona también debería funcionar con esto, estas en lo cierto, React ha integrado una forma de requerir asincronamente componentes, pero para esto vamos usar un nuevo método llamado `React.lazy`

`React.lazy` es simplemente una abstracción de crear un recurso, que nos permite requerir asincronamente un componente, usando la sintaxis de `import`

```js
import React, { Placeholder } from 'react';
import Spinner from 'spinner';

import UserPage = React.lazy(() => import('../userPage'))

class App extends Component {
  render() {
    return (
      <Placeholder delayMs={500} fallback={<Spinner size="medium" />}>
        <UserPage />
      </Placeholder>
    )
  }
}
```

También debes usar `Placeholder` para manejar si el componente tarda mucho en cargarse.

## Cómo usar React suspense hoy

React suspense es un feature aún en construcción y no existe un prerealease que puedas instalar para poder probarlo, para poder usarlo debemos usar el repositorio de React, habilitar este feature y construir el proyecto.

```bash
# clonar el repo
git clone git@github.com:facebook/react.git

# Entrar a la carpeta
cd react

# Instalar dependencias
yarn install

# Entrar al archivo ReactFeatureFlags.js
# En la línea 19, cambiar la variables enableSuspense por true 
vim packages/shared/ReactFeatureFlags.js

# Construir React
yarn build dom,core,interaction,simple-cache-provider --type=NODE
```

Ahora ya tenemos nuestra versión de React construida con React Suspense activo, dentro del repositorio también existe un pequeño proyecto construido con Suspense con el que puedes probar el API actual

```bash
# Entrar al proyecto
cd fixtures/unstable-async/suspense/

# Instalar dependencias 
yarn install

# Iniciar el proyecto
yarn start
```

Así vas a tener corriendo el proyecto en tu local, durante el post hemos hablado sobre todas las cosas que va a encontrar en este proyecto, mira el código del proyecto seguro encontraras cosas interesantes.

## Palabras finales

React Suspense va a cambiar la forma de como consumimos recursos asíncronos en nuestras aplicaciones, con una solución elegante y con gran flexibilidad. Pero más que cualquier cosa va a cambiar la experiencia de nuestros usuarios.

En el próximo post vamos a hablar sobre Time Slicing el otro gran feature de React 17
