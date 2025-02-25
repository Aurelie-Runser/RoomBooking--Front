# Room Booking - Projet Ynov M1 Web

## par - [Alixan Balu](https://github.com/Alixanb) et - [Aurélie Runser](https://github.com/Aurelie-Runser)

> Lien vers le repos du backend : https://github.com/Aurelie-Runser/RoomBooking--Back

## Build et Lancement du Projet

### Cloner le projet

```
git clone https://gitlab.com/AurelieRunser/RoomBooking--Front
cd RoomBooking--Front
```

### Ajouter la variable d'environnement

Afin de communiquer avec le back-end, dupliquer le fichier `env.exemple` à la racine du projet et renseignez-y l'url sur laquelle votre backend est lancé. Par exemple : `VITE_ROOM_BOOKING_API=http://localhost:5010`

### Installer les packages

Afin de télécharger les packages nécessaires au bon fonctionnement du projet, tappez la commande :

```
npm i
```

### Lancer le projet

Vous pouvez lancer le projet avec la commande suivante :

```
npm run dev
```

## Versions

Ce projet a été développé, et donc testé avec la version **3.5.12 de Vue.js** et la version **22.10.0 de Node.js**

## Fonctionnalités

### Obligatoires

- [x] Demande de réservation (+ modification)
- [x] Catalogue des salles (+ CRUD par les Admin)
- [ ] Envoi d'un rappel avant l'évènement
- [x] Profil Client
- [x] Profil Administrateur
- [x] Demande de réservation client sur mobile
- [x] Export .cal

### Supplémentaires

- [ ] Calendrier interactif des salles
- [ ] Affichage de l'horaire courant
- [x] Filtre de recherche
- [x] Afficher les créneaux disponibles / indisponibles
- [x] Pouvoir annuler une réservation
- [x] Export .csv
- [ ] Export .xlsx
- [x] Historique des réservations
