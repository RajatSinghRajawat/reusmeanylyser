# Use standard light node 22 alpine image
FROM node:22-alpine

# Define working directory under standard path
WORKDIR /usr/src/app

# Copy dependency manifests
COPY package*.json ./

# Install only production dependencies securely (leverage caching)
RUN npm ci --only=production

# Copy application source (obeying .dockerignore)
COPY . .

# Configure environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Expose port dynamically (default 8080)
EXPOSE 8080

# Run the container under standard non-privileged node user for security compliance
USER node

# Start the server using node directly
CMD ["node", "index.js"]