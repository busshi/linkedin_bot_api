FROM        node:17

RUN			useradd -m -s /bin/bash linkedin

WORKDIR     /opt/bot

COPY        ./app .

RUN			chown -R linkedin:linkedin /opt/bot

RUN         npm install -D nodemon

RUN         npm install --location=global typescript && tsc

USER        linkedin
