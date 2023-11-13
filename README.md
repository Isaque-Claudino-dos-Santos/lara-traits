# lara-traits

Pacote `NPM` para usar `Trait` no Javascript/Typescript, deforma simples 😎.

### Importar lara-traits

```typescript
import trait from 'lara-traits'
```

### use()

O função `use` mescla funções e variaveis de uma ou mais classe para o objeto alvo.

```typescript
import trait from 'lara-traits'

class Vector2 {
  public x: number = 0
  public y: number = 0
}

class Rect {
  public width: number = 0
  public height: number = 0

  constructor() {
    trait.use(this, [Vector2])
  }
}

const rect = new Rect()

console.log(rect)
```

CONSOLE.LOG OUTPUT

```typescript
rect {
  width: 0,
  height: 0,
  x: 0,
  y: 0
  [...]
}
```

### Modificadore de Acesso

#### Privado

Caso queira definir uma propriedade ou método como `private`, basta usar o prefixo _underscore(\_)_, isso faz com que o propriedade ou método não seja mesclado no uso do método `use()`.

```typescript
  import trait from 'lara-traits'

  class Events  {
    _events: EventType[] = ['click', 'over', 'outover']

    constructor() {
      this._bootEvents()
    }

    _bootEvents() {}

    onClick() { ... }
    onUpdate() { ... }
    onRender() { ... }
  }

  class Player {
    constructor() {
      trait.use(this, [Events])
    }
  }
```

No exemplo a cima a class `Player` está mesclando de `Events`, nessa class temos `_events` e `_bootEvents()`, que é usado internamente na class `Events` definido essa propriedade e método como inutilizavel em `Player` ou dentro de `onClick()`, `onUpdate()` e `onRender()` ou até outros métodos publicos.

> **Métodos Privado** -> pode conter métodos e propriedades publico e privado.

> **Métodos Publico** -> pode conter apenata métodos e propriedade publico.

> **Propriedades** -> pode ter _swap_ entre valor privado e publico

### instanceOf()

O método `instanceOf` verifica se o objeto alvo esta sendo implentado por alguma class usada como trait.

```typescript
import trait from 'lara-traits'

class Vector2 {
  public x: number = 0
  public y: number = 0
}

class Events {
  onCLick(): void { ... }
}

class Rect {
  public width: number = 0
  public height: number = 0

  constructor() {
    trait.use(this, [Vector2])
  }
}

const rect = new Rect()

console.log(trait.instanceOf(rect, Vector2)
console.log(trait.instanceOf(rect, Events)
```

CONSOLE.LOG OUTPUT

```typescript
TRUE
FALSE
```

### Resolver problema de detecção de tipagem

Quando você estiver utilizando Typescript provavelmente repetindo os exemplos a cima, o compilador vai lançar um erro informando que certa propriedade ou método herdado não existe,
para solucionar este probloca pode ser utilizado da segunte forma.

```typescript
import trait from 'lara-traits'

class Vector2 {
  public x: number = 0
  public y: number = 0
}

class Transform {
    move(x: number,y: number): void { ... }
}

interface Rect extends Vector2, Transform {}
class Rect {
  public width: number = 0
  public height: number = 0

  constructor() {
    trait.use(this, [Vector2, Transform])
    this.move(10,30)
  }
}
```

No exemplo a cima o compilador do Typescript não lançara um erro, isso porque logo a cima da class `Rect` foi criada uma interface com o mesmo nome da class que estende as classes que serve com trait para `Rect`.

> Essa foi a solução que encontrei para o compilador do Typescript não lançar um erro, essa forma não foi como eu queria, mas no typescript não encontrei uma solução que injetasse os tipos por dentro de uma função passados no segundo parametro de `use`.

### Bora Colaborar 🎉

- [Project Issues](https://github.com/Isaque-Claudino-dos-Santos/lara-traits/issues)

#### Funcionalidades ⚙️

Caso tenha alguma ideia ou necessite de uma funcionalidade especifica use o repositório do GitHub para colaborar.

#### Bugs 🐞

Se em seu desenvolvimento encontrar algum bug, tire print da tela do código e erros, envie para para o e-mail **isaqueclaudinosec@gmail.com**, vou fazer o possivel para corrigin o mais rapido possível.

#### Feedback 🧠

Por favor envie **feedback** no e-email **isaqueclaudinosec@gmail.com**, pode me ajudar muito a melhorar este projeto e futuros.
