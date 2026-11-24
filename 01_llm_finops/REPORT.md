## Report

# la demande technique volontairement floue utilisée ;

Écris un script qui récupère les données de l'API et qui les met dans un fichier propre.

# les deux modèles testés ;

1 - IA généraliste : Gemini 4 Hydrogen
2 - IA spécialisé code : Claude code 

# court résumé des différences observées ;

Même demande floue pour les deux IA. Aucune n'a posé de question avant de coder.

| Critère | IA généraliste (Gemini) | IA spécialisée code (Claude Code) |
|---|---|---|
| Taille | 31 lignes | 146 lignes |
| URL de l'API | Fictive, codée en dur | Configurable, exemple qui fonctionne |
| « Propre » | JSON indenté, sans nettoyage | Données aplaties, sans doublons |
| Format | JSON uniquement | CSV ou JSON |
| Dépendances | `requests` (non installé) | Aucune |
| Erreurs | Message affiché, pas de code d'erreur | Message + code d'erreur, 3 tentatives |
| Fonctionne tel quel | Non | Oui |

**En bref :**

- **Gemini** donne un exemple court et lisible, mais à compléter.
- **Claude Code** donne un outil complet et testé, mais plus long, et il interprète la demande à la place de l'utilisateur.
- **Leçon :** une demande floue doit être clarifiée avant d'écrire le code.

# problèmes ou choix arbitraires identifiés ;

**Gemini :**
1. **URL fictive** (`https://exemple.com`) : le script ne marche pas sans modification.
2. **« Propre » ignoré** : il réécrit le JSON tel quel, sans aucun nettoyage.
3. **Erreurs silencieuses** : en cas d'échec, le script renvoie quand même le code 0.

**Claude Code :**
1. **API choisie arbitrairement** : JSONPlaceholder `/users`, alors que la demande parle de « l'API » sans la nommer.
2. **« Propre » interprété arbitrairement** : sortie CSV, données aplaties, doublons supprimés, alors que rien de tout ça n'était demandé.
3. **Trop de code** : 146 lignes pour un besoin encore inconnu.

# auto-évaluation ;

Gemini utilise `requests` sans vérifier qu'il est installé et prévoit de mettre la clé API dans le code. Claude Code ajoute une architecture non demandée (ligne de commande, CSV) et ne vérifie pas l'URL : il lit des fichiers locaux via `file://` et enverrait le jeton en `http://` non chiffré. Un prompt flou est dangereux en production car le modèle remplace l'information manquante par des suppositions : le code a l'air correct, mais personne n'a validé ses choix, ce qui peut causer des fuites de données ou des pannes.
