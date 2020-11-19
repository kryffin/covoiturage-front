# Covoiturage

Oui je sais je n'ai pas été très original sur le nom, mais c'est sûrement changeable. De plus pour la petite histoire j'avais des idées originales mais j'ai refait 5 fois un projet tellement je comprenais rien, bref.

## Nuit du 18 au 19 Novembre 2020

Réalisation d'un front pas beau et bancal où l'affichage et la suppression d'utilisateur/trajet et fonctionnelle.  
Malheureusement le stockage passe par un tableau statique comme lors des premiers TPs.  
Il faudra donc effectuer le back et sa connexion à un mongodb pour faire les requêtes du front en CRUD.  
De plus un formulaire d'ajout et de modification d'un utilisateur et d'un trajet (possiblement d'une localisation) est nécessaire.  
Et pour finir un beau front, qui sera le dernier de nos soucis je pense.  
  
### Objets

#### User
* id: string
* firstname: string
* lastname: string
* age: number
* email: string
* phone: string

#### Location
* street: string
* postalCode: string
* city: string  

(Peut être ajouter un numéro de rue ?)

#### Ride
* id: string
* driver: number //id du user conduisant la voiture
* clients: number[] //ids des users profitant du trajet
* start: Location
* finish: Location
* duration: number //en heures j'imagine
* price: number //en euros
* stops: Location[] //tableau des arrêts sur le trajet
* nbSeats: number //nombre de places disponibles
* date: number

### Affichage (les components)

home : page d'accueil  
user : affichage en détail d'un utilisateur  
users : affichage de la liste des utilisateurs  
user-card : affichage d'un utilisateur sous forme de carte (pour l'instant j'utilise ça dans la liste users)  
ride : affichage en détail d'un trajet  
rides : affichage de la liste des trajets  
drive-card : affichage d'un trajet sous forme de carte (pour l'instant j'utilise ça dans la liste drives)

### Les services

Un service user pour gérer le CRUD des trajets.  
Un service ride pour gérer le CRUD des trajets.  
Il faudra notamment voir si in fine on utilise des EventEmitter pour dialoguer entre les pages ou juste ces services (je suis pour garder seulement ces services).  

En gros la diff : les évènements peuvent parler avec leur parent peu importe qui c'est, pas besoin de le connaître. Un service peut être utilisé partout assez aisément seulement en le passant dans le constructeur.

*J'ai passé les premières 5 heures de la nuit à faire des projets puis les supprimer, suivre les TPs, rien capter et avoir 5 000 erreurs de partout, un vrai plaisir. Seulement après ces 5 heures j'ai commencé à prendre en main le front et vite fait comment il marche, même si le reste n'est que poudre aux yeux. J'aurais préféré faire plus mais f\*ck. Je vais faire encore un peu de VA avant que le cours de MOSOS commence.  
Peace.*

**Note** : Désolé si j'ai push des trucs locaux qu'il fallait pas, j'ai juste tout push vu que je sais pas trop.
