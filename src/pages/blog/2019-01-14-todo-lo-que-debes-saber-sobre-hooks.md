---
templateKey: blog
path: todo-lo-que-desbes-saber-sobre-hooks
imagen: /img/patrick-robert-doyle-1281439-unsplash.jpg
title: 'Todo lo que debes saber sobre hooks'
date: '2019-01-14T09:45:54-05:00'
description: >-
  
---

## React Hooks 

No cambios que rompan lo que ya tienes

Es difícil de reusar lógica entre componentes
Componentes complejos se vuelven difíciles de entender
Clases son conusas

## Hooks

```js
import React, {useState} from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

Dentro de un componente declarado como una función podemos añadir un estado local, react preserva el estado entre renders

`useState` retorna un array, donde el primer elemento es el valor y el segundo el setter

* No hace merge del anterior con el nuevo

El unico argumento de `useState` es el estado inicial

Se pueden usar multiples `useState` dentro de un componente

Un hook es una función que te permite usar estados dentro de componentes declarados como funciones, hooks no funcionan dentro de clases, 

## Use Efect

Probablemente hagas fecth de datos, suscripciones, o cambios en el dom, estas operaciones son side effects, porque afectan otros componentes, y no pueden realizarse en el render.

`useEffect` añade la habilidad de realizar side effect desde un FC, en terminos practicos cumple el proposito de (componentDidMount, componentDidUpdate, componentWillMount), pero unificado

```js
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function App() {
  const [{count, label}, setCount] = useState({count: 0, label: 'positive'})

  useEffect(() => {
    document.title = `counter ${count}`
  })
  
  return (
    <div className="App">
      <h1>{count} - {label}</h1>
      <button onClick={() => setCount({count: count + 1, label })}>+</button>
      <button onClick={() => setCount({ count: count - 1, label })}>-</button>
    </div>
  );
}
```

cuando llamas `useEffect` le dices a react que ejecute el efecto después de realizar cambios en el DOM

React ejecuta los effectos despues de cada renders, incluyendo el primer render

```js
  useEffect(() => {
    suscribeChanel(id)

    return () => deSuscribe(id)
  });
```


```js
  useEffect(() => {
    suscribeChanel(id)

    return () => deSuscribe(id)
  }, [id]);
```

Se puede usar más de uno por componente.

## Reglas

* Hooks solo pueden ser en el top level, no dentro de loops, condiciones o otras funciones
* Solo se pueden llamar dentro de componentes declarados como funciones

## Custom hooks

Cuando queremos reutilizar lógica entre componentes normalemnte usamos hocs o render props, custom hooks te permite compartir lógica entre componentes

```js
function App() {
  const [sizes, setSizes] = useState({ width: 0, height: 0})
  const ref = useRef();

  useEffect(() => {
    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSizes({ width, height });
    });

    resizeObserver.observe(ref.current);

    return () => resizeObserver.unobserve(ref.current);
  });

  return (
    <div className="App" ref={ref}>
      <h1>{JSON.stringify(sizes)}</h1>
    </div>
  );
}
```


```js
const useSize = () => {
  const ref = useRef();
  const [sizes, setSizes] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSizes({ width, height });
    });

    resizeObserver.observe(ref.current);

    return () => resizeObserver.unobserve(ref.current);
  });

  return { ref, ...sizes };
};

function App() {
  const { ref, ...sizes } = useSize();
  return (
    <div className="App" ref={ref} >
      <h1>{JSON.stringify(sizes)}</h1>
    </div>
  );
}
```

El estado de cada hooks es completamente independiente, los hooks son una manera de reusar logica, no estado en si, cada llamado a un tiene un estado complemente aislado.

Cada custom hook debe iniciar con el prefix `use`, 

## Use context 

```js
import React, { useContext, createContext } from "react";

const Context = createContext(0)

function App() {
  const context = useContext(Context)

  return (
    <div className="App">
      <h1>{context}</h1>
    </div>
  );
}
```