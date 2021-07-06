# P7Groupo

Sur ce projet, nous avons utiliser dotEnv ainsi que sequelize et CLI-sequelize.
Pour lancer le back, vous aurez besoin d'un fichier .env contenant les informations suivantes :
Le nom de la base de données, le nom d'utilisateur et enfin le mot de passe.
Vous pouvez vous référez au .example.env.

Pour Sequelize / CLI-Sequelize. Ils ont été installé suite à la commande "npm install".
Vous pourrez ensuite créer votre base de données MySQL, avec le nom que vous indiquerait par le suite dans le fichier .env "DB_NAME=nom_de_la_base_de_données".

Les informations dans le fichier .env, à savoir le nom de base de données, le nom d'utilisateur et le mot de passe, devront être identique aux informations dans le fichier config.json du dossier config.

Vous devrez ensuite créer votre base de données dans MySQL "create database nom_de_la_base_de_données;".

Une fois ces étapes réalisées, vous pouvez ouvrir votre console et taper : npx seqelize db:migrate

Vous devriez obtenir trois migrations, et voir dans votre base de données les tables "users", "comments", "posts" et enfin "sequelizemeta" qui est créées par l'ORM.

Pour le Frontend, nous avons utilisé du javascript Vanilla, il devrait se lancer sans problème.
