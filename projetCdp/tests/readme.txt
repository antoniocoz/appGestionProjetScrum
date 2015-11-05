Pour lancer les tests,

- Ouvrir un terminal et lancer mongod

- Ouvrir un second terminal, aller à la racine du projet et lancer npm start

- Ouvrir un troisième terminal, aller à la racine du projet et lancer protractor protractor.conf.js

Si ça ne marche pas :

	- Assurer vous d'avoir installer Firefox (sinon juste changer firefox par chrome).
	- npm install ? au cas où il manque une dépendance.

Ps: s'il y'a une erreur qui dit que taskkill est impossible à trouver, c'est pas grave c'est juste windaube qui craque. 
Vérifier quand même que la variable d'environnement Taskkill soit à c:/windows/systeme32