docker-compose -f docker-compose-with-frontend.yml down
#rm -rf .data
yarn codegen
yarn build
docker-compose -f docker-compose-with-frontend.yml up
