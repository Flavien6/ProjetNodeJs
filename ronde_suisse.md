Ronde Suisse
============

- Initialiser un tournoi
    - Joueurs : 50
    - Rondes : 8 (de 6 à 10)
- Calculer les premiers affrontements
    - Par niveau
        - Faire des groupes de niveau
        - Diviser ces groupes en deux sous groupes
            - S1 : 1 - (n/2)
            - S2 : ((n/2)+1) - n
        - Faire affronter en mirroir les deux sous groupes
    - Aléatoire
        - Tirer des affrontements au hasard

    - Condition
        - Chaque joueurs ont un numéro, un pair affronte un impair
        - Le premier joueur tire une couleur aléatoire pour les impair et les pair prennent la couleur opposée
        - Si le nombre de joueurs est impair, le dernier joueur seul gagne automatiquement la ronde

    - Résultat
        - Gagnant = 1p
        - Perdant = 0p
        - Egalité = 0.5p

- Calculer les affrontements de la prochaine ronde
    - Rassemblement des joueurs en groupes de points
        - Exemple deuxième ronde
            - Premier groupe : Tous les joueurs à 1p
            - Deuxième groupe : Tous les joueurs à 0.5p
            - Troisième groupe : Tous les joueurs à 0p
        - En cas de jeux par niveaux regroupement par groupe de niveaux et de points

    - Division de ces nouveaux groupes en deux sous-groupe pour affrontement mirroir

    - Conditions
        - Les joueurs ne doivent pas affronter un joueurs déjà rencontré
        - Les joueurs doivent jouer de manière équilibré, les couleurs

    - Résultat
        - Formation de nouveaux groupe en fonction des nouveaux points gagnés
        - Recommencer le processus

- Fin de partie
    - Classement des joueurs en fonction de leur points
    - Pour le podium, en cas d'égalité
        - Choix du système de départage
        - Prise en compte des points des adversaires des deux joueurs

Exemple d'une partie
--------------------

Joueurs : 20
Rondes : 6
Type : Hasard

### Ronde 1
| | | | | | | | | | |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| 1 | 3 | 5 | 7 | 9 | 11 | 13 | 15 | 17 | 19 |
| 2 | 4 | 6 | 8 | 10 | 12 | 14 | 16 | 18 | 20 |

1 tire la couleur : Blanc

| | | | | | | | | | |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| 1 : Blanc | 3 : Blanc | 5 : Blanc | 7 : Blanc | 9 : Blanc | 11 : Blanc | 13 : Blanc | 15 : Blanc | 17 : Blanc | 19 : Blanc |
| 2 : Noir | 4 : Noir | 6 : Noir | 8 : Noir | 10 : Noir | 12 : Noir | 14 : Noir | 16 : Noir | 18 : Noir | 20 : Noir |

#### Résultat
| | | | | | | | | | |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| 1 : 1p | 3 : 0.5p | 5 : 0p | 7 : 0p | 9 : 0.5p | 11 : 1p | 13 : 1p | 15 : 0p | 17 : 0p | 19 : 1p |
| 2 : 0p | 4 : 0.5p | 6 : 1p | 8 : 1p | 10 : 0.5p | 12 : 0p | 14 : 0p | 16 : 1p | 18 : 1p | 20 : 0p |

### Ronde 2
3 Groupes

|| | | | | | | | |
|-|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| 1p | 1 | 11 | 13 | 19 | 6 | 8 | 16 | 18 |
| 0p | 5 | 7 | 15 | 17 | 2 | 12 | 14 | 20 |
| 0.5p | 3 | 9 | 4 | 10 |

Nouveau match

| | | | |
|:-:|:-:|:-:|:-:|
| 1 | 11 | 13 | 19 |
| 6 | 16 | 8 | 18 |

| | | | |
|:-:|:-:|:-:|:-:|
| 5 | 15 | 2 | 14 |
| 7 | 17 | 12 | 20 |

| | |
|:-:|:-:|
| 3 | 4 |
| 9 | 10 |

Couleurs

| | | | |
|:-:|:-:|:-:|:-:|
| 1 : Noir | 11 : Noir | 13 : Noir | 19 : Noir |
| 6 : Blanc | 16 : Blanc | 8 : Blanc | 18 : Blanc |

| | |
|:-:|:-:|
| 3 : Noir | 4 : Noir |
| 9 : Blanc | 10 : blanc |

Points

| | | | |
|:-:|:-:|:-:|:-:|
| 1 : 1p | 11 : 0p | 13 : 0.5p | 19 : 0p |
| 6 : 0p | 16 : 1p | 8 : 0.5p | 18 : 1p |

| | |
|:-:|:-:|
| 3 : 1p | 4 : 0p |
| 9 : 0p | 10 : 1p |

Total

| | | | |
|:-:|:-:|:-:|:-:|
| 1 : 2p | 11 : 1p | 13 : 1.5p | 19 : 1p |
| 6 : 1p | 16 : 2p | 8 : 1.5p | 18 : 2p |

| | |
|:-:|:-:|
| 3 : 1.5p | 4 : 0.5p |
| 9 : 0.5p | 10 : 1.5p |

Résultat

|| | | | |
|-|:-:|:-:|:-:|:-:|
| 2p | 1 | 18 | 16 |
| 1.5p | 13 | 8 | 3 | 10 |
| 1p | 11 | 19 | 6 |
| 0.5p | 9 | 4 |

Futur match
| | |
|:-:|:-:|
| 1 | 16 |
| 18 | |

| | |
|:-:|:-:|
| 13 | 3 |
| 8 | 10 |

| | |
|:-:|:-:|
| 11 | 6 |
| 19 | |

| |
|:-:|
| 9 |
| 4 |