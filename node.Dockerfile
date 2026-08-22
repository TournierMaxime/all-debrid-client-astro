FROM node:22

USER root
ARG USER_ID="1000"
ARG GROUP_ID="1000"

RUN if [ "$GROUP_ID" != "1000" ]; then groupadd node${USER_ID} -g ${GROUP_ID}; fi
RUN if [ "$USER_ID" != "1000" ]; then useradd node${USER_ID} -u ${USER_ID} -g ${GROUP_ID}; fi

RUN if [ "$USER_ID" != "1000" ]; then mkdir /home/node${USER_ID} && chown ${USER_ID}:${GROUP_ID} /home/node${USER_ID}; fi

# Crée un répertoire de travail
WORKDIR /var/app

# Copie d'abord uniquement les fichiers de dépendances (package.json + lock)
COPY package*.json ./

# Installe les dépendances
RUN npm ci

ARG PORT
ARG PUBLIC_MOTRIX
ARG PUBLIC_DS
ARG PUBLIC_GOPEED
ARG NODE_ENV
ARG PUBLIC_TMDB
# On les expose au script de build
ENV PORT=$PORT
ENV PUBLIC_MOTRIX=$PUBLIC_MOTRIX
ENV PUBLIC_GOPEED=$PUBLIC_GOPEED
ENV PUBLIC_DS=$PUBLIC_DS
ENV PUBLIC_TMDB=$PUBLIC_TMDB
ENV HOST=0.0.0.0
ENV NODE_ENV=$NODE_ENV

# Copie les fichiers de l’app dans l’image
COPY . .

# Build l’app (si nécessaire pour ton projet Next.js)
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

EXPOSE $PORT

CMD if [ "$NODE_ENV" = "production" ]; then npm run preview; else npm run dev; fi