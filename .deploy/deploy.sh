cd ~/news
npm run build:prod

rm -rf ~/../var/www/news/html
mv ~/news/build ~/../var/www/news/html