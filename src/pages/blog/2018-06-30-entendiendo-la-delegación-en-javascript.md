---
templateKey: blog
path: entendiendo-la-delegacion-en-javascript
imagen: /img/1_ovvmu8nzpvhfmga2auyxia.png
title: Entendiendo la delegación en JavaScript
date: '2016-05-06T17:50:17-05:00'
description: >-
  Cuando la mayoría de programadores piensa en programación orientada a objetos
  (POO), generalmente recuerdan lenguajes como Java o C++ donde una clase es una
  plantilla estática para crear objetos, heredando estos atributos y métodos
  dentro del objeto creado.
---
Cuando la mayoría de programadores piensa en programación orientada a objetos (POO), generalmente recuerdan lenguajes como Java o C++ donde una clase es una plantilla estática para crear objetos, heredando estos atributos y métodos dentro del objeto creado.

> “Si estás creando funciones constructoras y heredando de ellas, no has aprendido JavaScript” — Eric Elliott

Como vimos [antes](/entendiendo-la-herencia-en-javascript), JavaScript no tiene clases, pero tiene un sistema de herencia más **simple, flexible y poderoso.**

> Este contenido lo publiqué primero en [mi newsletter](https://tinyletter.com/yeion7), la semana después de publicar el newsletter publico en mi blog, si quieres ser el primero en leer suscríbete

![prueba](/img/1_ovvmu8nzpvhfmga2auyxia.png)

La palabra herencia podría llegar a crear confusión, ya que esta hace referencia a que un comportamiento donde se está siendo copiado, lo que no sucede en JavaScript, por esta razón [Kyle Simpson](https://twitter.com/getify?lang=es) autor de [You Don’t Know JS](https://github.com/getify/You-Dont-Know-JS), lo define como OLOO (objetos linkeados a otros objetos, por sus siglas en inglés).

Vamos paso a paso y entendamos el sistema de delegación.

## Cadena de prototipos

Todo objeto tiene una propiedad interna \[[Prototype]], esta es un vínculo que hace referencia a otro objeto.

> \[[Prototype]] crea una referencia a otro objeto, la mayoría de los objetos cuentan con una cadena de prototipo a otro objeto. —[ Propiedades internas](/propiedades-internas-en-javascript)

Este mecanismo es utilizado cuando se hace referencia a un propiedad de un objeto y no es encontrada en este, es ahí cuando el método `[[get]]`, continua buscando en el objeto vinculado via \[[Prototype]], a esta serie de vínculos entre objetos se le conoce **cadena de prototipos.**

## Object.prototype

La parte superior de la cadena de prototipos es _Object.prototype_, gracias a este objeto tenemos métodos comunes en todos los objetos como:

* toString()
* valueOf()
* hasOwnProperty( .. )
* isPrototypeOf( .. )

> Cuando creamos un objeto literal automáticamente es vinculado a Object.prototype

### Object.create( .. )

Para controlar este vínculo podemos crear objetos con [\*Object.create( .. )](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/create)*, quien recibe un primer argumento, que es el objeto al cual se vincula por medio de `[[Prototype]]` y un segundo argumento, con las nuevas propiedades nuevas.

Veamos un ejemplo.

```js
const Bass = { a: 1 };

const Foo = Object.create(Bass);

Foo.b = 2;

const Zass = Object.create(Foo,
  { c: { enumerable: true, value: 3, writable: true } }
)

Zass.hasOwnProperty('a'); //false
Zass.hasOwnProperty('b'); //false
Zass.hasOwnProperty('c'); //true

Bass.isPrototypeOf(Zass); // true
Foo.isPrototypeOf(Zass); // true

Zass.a; // 1
Zass.b; // 2
Zass.c; // 3
```

Una representación de gráfica de esto sería.

![null](https://cdn-images-1.medium.com/max/2000/1*iVmW3UVprFJ3V7WJ6Kz1zQ.png)

> Object.create(null) crea un objeto que tiene un vínculo vacío, así que el objeto no delega nada, no tiene una cadena de prototipos

### Delegando comportamientos

Ya sabemos podemos manejar el vínculo entre los objetos, esta es la clave de la delegación en JavaScript, de esta manera solo debemos preocuparnos de objetos y las propiedades delegadas entre ellos.

```js
const switchProto = {
  meta: { name: 'interuptor luces' },
  state: false,

  isOn() {
    console.log(this.state);
  },

  toggle() {
    this.state = !this.state;
  }
};

const luzSala = Object.create(switchProto);
const luzComedor = Object.create(switchProto);


luzSala.toggle();

luzSala.isOn(); // true

luzComedor.isOn(); // false
```

Como vemos podemos crear dos objetos y vincularlos al objeto que usamos como prototipo, y su comportamiento va a ser independiente.

## Mutación

Algo de lo que debemos tener cuidado es de la **mutación**, ya que los objetos en JavaScript son dinámicos.

Si una propiedad se cambia en un objeto se cambia en todos, claro este comportamiento es esperado si sabemos como funciona los [tipos en JavaScript](/entendiendo-los-tipos-en-javascript).

```js
const switchProto = {
  meta: { name: 'interuptor luces' },
  state: false,

  isOn() {
    console.log(this.state);
  },

  toggle() {
    this.state = !this.state;
  }
};

const luzSala = Object.create(switchProto);
const luzComedor = Object.create(switchProto);


luzSala.meta.name = 'interuptor de la sala';

console.log(luzComedor.meta.name); // 'interuptor de la sala' Mutació
```

En el siguiente post veremos **composición**, lo cual nos ayudará a controlar esto y tener un sistema de herencia mucho más poderoso.

Me gustaría presentarles un ejemplo algo más complejo el cual tomó de [You Don’t Know JS](https://github.com/getify/You-Dont-Know-JS), en su libro dedicado a [objetos](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/ch6.md).

En este ejemplo tenemos dos objetos controladores, que manejan el formulario de login y la autentificación con el servidor.

> Antes de leer el ejemplo te recomiendo [entender como funciona this](https://medium.com/@yeion7/entendiendo-this-javascript-cba60c8cec8c).

```js
const LoginController = {
  errors: [],

  getUser() {
    return document.getElementById("login_username").value;
  },

  getPassword() {
    return document.getElementById("login_password").value;
  },

  validateEntry(user, pw) {
    user = user || this.getUser();
    pw = pw || this.getPassword();

    if (!(user && pw)) {
      return this.failure("Please enter a username & password!");
    }
    else if (pw.length < 5) {
      return this.failure("Password must be 5+ characters!");
    }

    // Se valida correctamente
    return true;
  },

  showDialog(title, msg) {
    // Mostrar un mensaje al usuario
  },

  failure(err) {
    this.errors.push(err);
    this.showDialog("Error", "Login invalid: " + err);
  }
};
```

```js
const AuthController = Object.create(LoginController);

AuthController.errors = [];
AuthController.checkAuth = function () {
  let user = this.getUser();
  let pw = this.getPassword();

  if (this.validateEntry(user, pw)) {
    this.server("/check-auth", {
      user: user,
      pw: pw
    })
      .then(this.accepted.bind(this))
      .fail(this.rejected.bind(this));
  }
};
AuthController.server = function (url, data) {
  return $.ajax({
    url: url,
    data: data
  });
};

AuthController.accepted = function () {
  this.showDialog("Success", "Authenticated!")
};

AuthController.rejected = function (err) {
  this.failure("Auth Failed: " + err);
};
```

Con delegación de comportamiento _AuthController_ y _LoginController_ son solo objetos, solo debemos preocuparnos de delegar comportamientos.

### Conclusión

Utilizar delegación de comportamientos puede llevar a arquitecturas de código más simples.

En este solo debemos pensar en objetos, los cuales delegan comportamientos a otros objetos, lo que lleva a no tener estructuras jerárquicas rígidas.

> “Hay dos clases de programadores JS, los que aprendimos con JS y los que aprendieron con otro lenguaje y tratan de usar JS como ese lenguaje” — Sergio Xalambrí

Tal vez al principio después de haber utilizado durante mucho tiempo constructores, jerarquías, poliformismos, etc. entender como funciona el patrón de delegación requiere un poco de costumbre, pero esta es mucho más fácil de entender que la herencia clásica.
