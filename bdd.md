Base de donnée
==============

La base de donnée est une base MongoDB
--------------------------------------

- Nom     : db_tournois
- Adresse : 127.0.0.1 // Localhost
- port    : 27017
- User    : admin
- MDP     : Admin123

| Tournoi |
| :-----: |
| ID |
| Nom |
| Lieu |
| Date Debut |
| Date Fin |
| Disciplines - Enum : Echecs... |
| Système - Enum : Elimination Directe, Ronde Suisses... |
| Equipe - Bool |
| Creneaux |

| Equipes - Tournois |
| :----------------: |
| ID |
| Tournoi |
| Date Inscription |
| Equipe |
| Points |
| Rang |
| Sgroupe - Num (11, 12, 21, 22) groupe+sousgroupe |
| Couleur - Blanc : nb / Noir : nb |
| Adversaires - jouer : Liste / Ajouer : Liste (Equipe) |

| Equipe |
| :----: |
| ID |
| Joueurs |
| Creneaux |

| Joueur |
| :----: |
| ID |
| Nom |
| Prenom |
| Date de naissance |
| Mail |