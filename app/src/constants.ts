export const longInterval = 60;
export const shortInterval = 10;

export const colors = {
  red: "\033[31m",
  green: "\033[32m",
  orange: "\033[33m",
  clear: "\033[0m",
};

export const welcomeMessage = (firstName: string) => `
Bonjour ${firstName},

Bienvenue dans mon réseau.

En attendant de me parler directement, vous pouvez demander à mon bot quelques informations basiques à l'aide des commandes suivantes :

- profile : pour en savoir un peu plus sur moi,
- techno : pour connaître mes technologies préférées,
- dispo : pour connaître mes disponibilités,
- contact : pour communiquer directement avec moi et désactiver le bot,
- unmute : pour réactiver le bot après une demande de contact.

Pour information, ce bot tourne sur mon raspberry et il manque parfois de ressources pour vous répondre ! Un peu de patience...

A très vite.

Alex
`;
