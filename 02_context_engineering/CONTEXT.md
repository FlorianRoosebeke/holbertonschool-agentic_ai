# Service d'export

**Prompt :** « Analyse `src/repositories/user.repository.js` et `src/services/user.service.js`. Crée un service d'export dans `src/services/`, reprends les conventions du service existant pour l'accès au repository et les exceptions. N'ajoute ni dépendance ni architecture, ne modifie pas les fichiers existants et fournis uniquement le code du nouveau fichier. »

**Contexte fourni :**
- `02_context_engineering/agentic-ops-tp2-main/src/repositories/user.repository.js`
- `02_context_engineering/agentic-ops-tp2-main/src/services/user.service.js`

**Service créé :** `02_context_engineering/agentic-ops-tp2-main/src/services/data-export.service.js`

**Conventions reprises :** repository importé comme singleton, recherche par email et même erreur si l'utilisateur est introuvable. Le service retourne les données en JSON indenté.