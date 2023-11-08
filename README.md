# lara-trait

### Importar lara-trait
``` typescript
import trait from 'lara-trait'
```

### use()

O função `use` mescla funções e variaveis de uma ou mais classe para o objeto alvo.

``` typescript
import trait from 'lara-trait'

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

> CONSOLE.LOG OUTPUT

``` typescript
rect {
  width: 0,
  height: 0,
  x: 0,
  y: 0
  [...]
}
```

### instanceOf()

O metodo `instanceOf` verifica se o objeto alvo esta sendo implentado por alguma class usada como trait.

``` typescript
import trait from 'lara-trait'

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

> CONSOLE.LOG OUTPUT

``` typescript
TRUE
FALSE
```

