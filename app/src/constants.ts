export const longInterval = 600; // seconds
export const shortInterval = 60;

export const newWelcomeMessage = (firstName: string) => `
Bonjour ${firstName},

Bienvenue dans mon réseau.

Développeur passionné, je crée entre autres des sites web. Je t'invite à découvrir le mien. Si tu as le temps et l'envie, donne moi ton avis : https://busshidev.fr

Le code source est disponible sur mon github : https://github.com/busshi
(Si tu aimes, une petite étoile ou un follow est toujours apprécié.) 😁

A très vite d'échanger sur le dev.

Alex
`;

export const welcomeMessage = (firstName: string) => `
Bonjour ${firstName},

Bienvenue dans mon réseau.

En attendant de me parler directement, vous pouvez demander à mon bot (expérimental) quelques informations basiques à l'aide des commandes suivantes :

- profile : pour en savoir un peu plus sur moi,
- techno : pour connaître mes technologies préférées,
- dispo : pour connaître mes disponibilités,
- contact : pour communiquer directement avec moi,

Pour information, ce bot tourne sur mon raspberry et il manque parfois de ressources pour vous répondre ! Un peu de patience... En service uniquement la journée... Le soir, je pourrais sûrement vous répondre en personne. 

A très vite.

Alex
`;

export const actions = {
  dispo:
    "Je viens de terminer une mission de longue durée mais je suis actuellement disponible à temps plein pour collaborer avec vous. N'hésitez pas à me contacter directement pour en discuter, je suis assez flexible sur l'emploi du temps",
  techno:
    "Mes compétences principales concernent les frameworks suivants :\n\n• Frontend: React, NextJS\n• Backend: ExpressJS, NestJS, Python\n• Devops: Déploiement en ligne avec Google Cloud Platform, Cloudflare, OVH\n• SEO: Optimisation dans les moteurs de recherche\n\nJ'ai bien sûr d'autres cordes à mon arc. Je développe de nombreux projets personnels autour du Web, de la domotique et de la cyber-sécurité... Demandes-en moi plus si cela t'intéresse",
  profile:
    "Je suis plutôt cool mais déterminé. J'aime ce que je fais et je suis épanoui dans mon travail ce qui me permet d'être plus productif.\n\nAutodidacte, je me forme en permanence pour rester à la pointe des dernières technologies.\nJe travaille essentiellement dans le web en tant que développeur fullstack mais je m'adapte très facilement.\n😎\n\nJetez un oeil à mon profil sur Malt : https://www.malt.fr/profile/alexandredubar",
  contact:
    "J'ai transmis votre demande de communiquer avec mon créateur. Il vous répondra en personne dès que possible...", //\nJe resterai muet en attendant... 🫢\n\nUnmute pour me réactiver",
  //   unmute:
  //     "👋\n\nRappel des commandes disponibles :\n\n- profile : pour en savoir un peu plus sur moi,\n- techno : pour connaître mes technologies préférées,\n- dispo : pour connaître mes disponibilités,\n- contact : pour communiquer directement avec moi et désactiver le bot,\n- unmute : pour réactiver le bot après une demande de contact.",
};
