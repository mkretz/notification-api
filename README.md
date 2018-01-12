# notification-api
CF sample application API

## Installation
1. Clone the repo
```
git clone https://github.com/mkretz/notification-api.git
cd notification-api
```
2. Create a MongoDB service instance called `notification-db` 
```
cf create-service mongodb small notification-db
``` 
3. Create a RabbitMq service instance called `notification-mq`
```
cf create-service rabbitmqent usage notification-mq
```
4. If required, adapt the `name` attribute in `manifest.yml` to change the app's name.
5. Push the app
```
cf push
```
