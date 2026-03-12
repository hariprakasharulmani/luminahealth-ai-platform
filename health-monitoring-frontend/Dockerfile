FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package info and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Pass in environment variables for Vite to bake into the static build
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Build the Vite application
RUN npm run build

# Expose Vite preview port
EXPOSE 5173

# Start the preview server on 0.0.0.0
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]
