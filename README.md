# notification-api
CF sample application API

## Installation
1. Create a MongoDB service instance called `notification-db` 
```
cf create-service mongodb small notification-db
``` 
2. Create a RabbitMq service instance called `notification-mq`
```
cf create-service rabbitmqent usage notification-mq
```
3. If required, adapt the `name` attribute in `manifest.yml` to change the app's name.
4. Push the app
```
cf push
```
