# Guide d'Administration (Admin Guide)

## Accéder au Panneau d'Administration
1.  Assurez-vous que le serveur backend tourne:
    ```bash
    cd backend
    php artisan serve
    ```
2.  Ouvrez votre navigateur et allez sur: [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin)
3.  Connectez-vous avec:
    - **Email**: `admin@vibe.com`
    - **Password**: `password`

## Ajouter un Produit
1.  Dans le menu de gauche, cliquez sur **"Products"**.
2.  Cliquez sur le bouton **"New product"** (en haut à droite).
3.  Remplissez les informations:
    - **Name**: Nom du produit (ex: "T-Shirt Vibe").
    - **Category**: Sélectionnez une catégorie.
    - **Price**: Prix de base.
    - **Description**: Description détaillée.
4.  **Images**:
    - Cliquez sur "Add to Images".
    - Chargez une image.
    - Cochez "Primary Image" pour la photo principale.
5.  **Variants (Tailles/Couleurs)**:
    - Ce système supporte les variantes.
    - Cliquez sur "Add Variant".
    - **Size**: ex: "L", "M".
    - **Color**: ex: "Black", "Red".
    - **Stock**: Quantité disponible.
    - **Price (+/-)**: Si cette variante coûte plus cher, mettez la différence (ex: `10` pour +10$). Sinon `0`.
6.  Cliquez sur **"Create"**.

Votre produit est maintenant en ligne sur le site !
