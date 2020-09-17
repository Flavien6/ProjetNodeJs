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
        - Gagnant = 1pts
        - Perdant = 0pts
        - Egalité = 0.5pts

- Calculer les affrontements de la prochaine ronde
    - Rassemblement des joueurs en groupes de points
        - Exemple deuxième ronde
            - Premier groupe : Tous les joueurs à 1pts
            - Deuxième groupe : Tous les joueurs à 0.5pts
            - Troisième groupe : Tous les joueurs à 0pts
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
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
| 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 |