# Le site de Le Collectif

## Kesseuce

Un site mysterieux pour un collectif mysterieux.
Le tout developpe a partir d'un clqvier qwerty.
Amoureux des accents pleurez.

## Gameplay

Base sur les moteurs de raycasting type wolfenstein :
- Fps ou l'on peut tourner la tete et avancer / reculer.
- Physique limite avec seulement collision avec les murs.
Todo :
- Clean les mouvements de tete haut / bas.
- Gerer la hauteur du perso -> escaliers, sauts, se baisser.

## Le code

Pour l'instant du javascript vanilla, eventuellement du three.js plus tard pour
executer le raycasting sur le GPU / incruster de beaux shaders de shadertoy.

### Les classes

Map :
- Charge le tableau de hauteur des murs et le tableaux des textures associes,
  plus la skybox et bientot le sol.
- Procedure de raycasting d'un rayon.

Camera :
- Gere l'affichage et l'appel au raycasting pour chaque colone de pixel.

Player :
- Update la position et la direction du joueur en fonction des etats de controls

Controls :
- Detecte les evenements clavier / souris / touchscreen et update les etats
  correspondants.

Gameloop :
- Gere le callback de la boucle principale.



### Ou pas.
