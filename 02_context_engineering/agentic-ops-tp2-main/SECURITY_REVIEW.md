# Revue de sécurité

- **Prompt :** « `src/legacy_auth.js` contient une vulnérabilité critique d'injection SQL. Corrige cette faille sans modifier la signature de la fonction ni l'objet de retour en cas de succès. »
- **Faille/correctif :** les identifiants étaient concaténés à la requête. Des paramètres liés empêchent l'injection; signature et réponse de succès conservées.
- **Tests avant :** le Test 1 affichait Ok et le Test 2 échouait.
- **Tests après :** `npm run test:security` passe (Tests 1 et 2).
