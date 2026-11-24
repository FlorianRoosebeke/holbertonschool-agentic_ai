# Test de l’outil MCP

- **Tool ajouté :** `update_customer_status`
- **Paramètres transmis :**
  - `email`: `dev@entreprise.com`
  - `new_status`: `Inactif`
- **Résultat retourné :** `Statut du client dev@entreprise.com mis à jour avec succès: Inactif`
- **Vérification préalable :** avant l’appel autorisé par la demande explicite de l’utilisateur, le serveur a été vérifié : il publiait `update_customer_status` et contenait le client `dev@entreprise.com`.
- **Vérification après appel :** `get_customer_status` a confirmé le statut `Inactif`.
