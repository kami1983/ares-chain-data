docker-compose -f docker-compose-with-frontend down
#rm -rf .data
yarn codegen
yarn build
docker-compose -f docker-compose-with-frontend up
