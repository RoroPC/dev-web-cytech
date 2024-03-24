## Backend 

## Installation   
voir le readme au dessus

## API Endpoint
GET :  
- Fleurs:
  - Toute les fleurs : /api/flowers  
  - Les fleurs depuis une certaine catégory : /api/flowers/category/<int:category_id>/  
- Paniers:
  - Récupérer le panier de l'utilisateur courant : /api/basket/
- Utilisateur:
  - Récupérer les donnée de l'utilisateur courant: /api/me
POST:
  - Panier: 
    - Créer ou change le panier de l'utilisateur courant (la requête doit contenir "flowers":[id1,id2,id3,...]) /api/basket
PATCH:
    - Fleurs: 
      - met à jour le stocks (doit contenir "stock":10) /api/flowers/<int:flower_id>/