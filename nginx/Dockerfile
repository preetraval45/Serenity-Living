FROM nginx:alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom config
COPY nginx.conf /etc/nginx/conf.d/

# Create directory for SSL certificates
RUN mkdir -p /etc/nginx/ssl

# Set proper permissions
RUN chmod 755 /etc/nginx/ssl

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]