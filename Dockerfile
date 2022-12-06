FROM        node:18

RUN			useradd -m -s /bin/bash linkedin

WORKDIR     /opt/bot

COPY        ./app .

RUN			chown -R linkedin:linkedin /opt/bot

WORKDIR     /opt/bot/app

RUN         yarn add -D nodemon

RUN         yarn add typescript

USER        linkedin
