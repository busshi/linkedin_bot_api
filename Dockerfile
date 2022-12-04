FROM        node:17

RUN			useradd -m -s /bin/bash linkedin

WORKDIR     /opt/bot

COPY        ./app .

RUN			chown -R linkedin:linkedin /opt/bot

WORKDIR     /opt/bot/app

COPY        --chown=linkedin:linkedin entrypoint.sh .

RUN         yarn add -D nodemon

RUN         yarn add typescript

USER        linkedin
