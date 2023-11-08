# lara-trait

### Importar lara-trait
``` typescript
import trait from 'lara-trait'
```

### use()

O função `use` mescla funções e variaveis de uma class ou mais class para um objeto qualquer.

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

OUTPUT

``` typescript
rect {
  width: 0,
  height: 0,
  x: 0,
  y: 0
}
```
