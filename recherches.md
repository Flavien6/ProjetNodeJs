Tournois d'Echecs
=================

Organisé sous forme de rondes
-----------------------------
> Chaque joueur jouent le même nombres de parties qu'ils perdent ou qu'ils gagnent

Gestion des appariements ou affrontements (les deux joueurs qui jouront ensemble)
---------------------------------------------------------------------------------
- Un joueur ne doit pas rencontrer plusieurs fois le même adversaire
- Assurer une bonne répartition des couleurs, un joueur ne doit pas toujours jouer avec la même couleur

Systèmes pour la bonne gestion des appariements
-----------------------------------------------
- Toutes Rondes
    - Chaque joueur rencontre tous les autres joueurs,
    - Pour N joueurs, il y a N-1 rondes,
    - Chaque joueur tire au hasard un nombre entre 1 et N,
    - On se base sur les tables de berger pour définir les affrontements
    - En cas de joueurs impairs, il y a un exempt à chauqe ronde, le joueur ne joue pas et marque le point de la victoire.

| 3 ou 4 joueurs | | |
| ------- | :-: | :-: |
| Ronde 1 | 1-4 | 2-3 |
| Ronde 2 | 4-3 | 1-2 |
| Ronde 3 | 2-4 | 3-1 |

| 5 ou 6 joueurs | | | |
| ------- | :-: | :-: | :-: |
| Ronde 1 | 1-6 | 2-5 | 3-4 |
| Ronde 2 | 6-4 | 5-3 | 1-2 |
| Ronde 3 | 2-6 | 3-1 | 4-5 |
| Ronde 4 | 6-5 | 1-4 | 2-3 |
| Ronde 5 | 3-6 | 4-2 | 5-1 |

| 7 ou 8 joueurs | | | | |
| ------- | :-: | :-: | :-: | :-: |
| Ronde 1 | 1-8 | 2-7 | 3-6 | 4-5 |
| Ronde 2 | 8-5 | 6-4 | 7-3 | 1-2 |
| Ronde 3 | 2-8 | 3-1 | 4-7 | 5-6 |
| Ronde 4 | 8-6 | 7-5 | 1-4 | 2-3 |
| Ronde 5 | 3-8 | 4-2 | 5-1 | 6-7 |
| Ronde 6 | 8-7 | 1-6 | 2-5 | 3-4 |
| Ronde 7 | 4-8 | 5-3 | 6-2 | 7-1 |

- Suisse
    - En cas de grand nombres de joueurs, utilisation du système suisse à la place du toutes ronde
    - Fixe le nombre de rondes, 6 ou 10 par exemple
    - Les affrontements des nouvelles rondes sont calculés en fonction des résultats de la précédente.
    - Le but est de faire jouer ensemble les joueurs qui ont le même nombre de points

    - Premiere ronde par tirage ou sort ou Classement ELO

    - Gagnant = 1pts
    - Perdant = 0pts
    - Egalité = 0.5pts

    - 2eme ronde gagnant contre gagnant, perdant contre perdant et ainsi de suite.

    - Pour chaque ronde, rassemblement des joueurs en groupe de score et affrontement entre eux,
    - Attention, le joueur ne peut pas affronter le même joueur et il doit jouer autant de fois les blanc et les noirs

    - Fin de partie, classement en fonction des points, si égalité, prise en compte de la somme des points de leurs adversaires ou système de départage

        - Partie :
            - premiere ronde
                - Joueurs classé par force dans plusieurs groupes
                - Chaque groupe est divisé en deux sous-groupes
                    - S1 : 1 - (n/2)
                    - S2 : ((n/2)+1) - n
                - Affrontement du 1er de S1 avec le premier de S2, ainsi desuite jusqu'a ce que le dernier de S1 affronte le dernier de S2.
                - Si nombre impair le dernier est exempté et marque un point
                - Les joueurs ont un numéro et les pair joue avec la couleur opposé aux impairs. Le premier tire la couleur au hasard.

                - Pour chaque ronde, les joueurs sont rassemblé par groupe en fonction de leur nombres de points.
                Puis ils sont redivisé en 2 sous-groupe et le processus recommenc en prenant en copte le fait qu'il n'affronte pas un joueur déjà rencontré et que les couleurs joué soit équitables.