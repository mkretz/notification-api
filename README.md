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
cf create-service mongodb-2 small notification-db
```
3. Create a RabbitMQ service instance called `notification-mq`
```
cf create-service rabbitmqent usage notification-mq
```
4. Adapt the `route` attribute in `manifest.yml` to a value matching an avilable domain.
5. Push the app
```
cf push
```
6. Test the app using the route specified in `manifest.yml`
```
curl https://notification-api.scapp.io/notification
```
