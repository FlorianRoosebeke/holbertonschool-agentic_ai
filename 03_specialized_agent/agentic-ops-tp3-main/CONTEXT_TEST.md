# Test de persistance du contexte

## Réponse avant la purge du contexte

La règle exacte est :

```text
should_[EXPECTED_BEHAVIOR]_when_[CONDITION]
```

Le nom doit être en anglais. Exemple :

```text
should_return_zero_when_cart_is_empty
```

## Réponse après la réinitialisation

La convention de nommage applicable aux blocs `it()` ou `test()` est :

```text
should_[EXPECTED_BEHAVIOR]_when_[CONDITION]
```

Elle doit être formulée en anglais, par exemple :
`should_return_zero_when_cart_is_empty`.

## Constat

Les deux réponses donnent la même règle exacte, mais la réponse après réinitialisation confirme qu'elle a été retrouvée via les guidelines du projet plutôt que directement depuis le contexte de conversation précédent.
