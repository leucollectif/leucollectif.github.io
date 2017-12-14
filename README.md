# Le site de Le Collectif

## Kesseuce

Un site mysterieux pour un collectif mysterieux.
Le tout developpe a partir d'un clqvier qwerty.
Amoureux des accents pleurez.

## Gameplay

Moteur simple, en webgl :
- Vue fps ou l'on peut tourner la tete et avancer / reculer (ASDW, fleches).
- Personnage en dessin, avec des sprites.

Todo :
- Ajouter les mouvements de tete haut / bas.
- Gerer les collisions du joueur -> escaliers, sauts, se baisser.

## Le code

Pour l'instant du javascript vanilla, avec du three.js pour le contexte webgl.

### Les classes

Map :
- Instancie la map, charge des objets.
  
Player :
- Update la position et la direction du joueur en fonction des etats de controls

Controls :
- Detecte les evenements clavier / souris / touchscreen et update les etats
  correspondants.

