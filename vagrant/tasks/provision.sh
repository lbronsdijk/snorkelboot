#!/usr/bin/env bash

echo "Setup SWAP file"
    sudo fallocate -l 4G /swapfile
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile

echo "Installing dependencies..."
    apt-get update -y
    sudo apt-get install -y nginx
    sudo apt-get install -y nodejs
    sudo apt-get install -y npm
    sudo apt-get install -y git
    sudo apt-get install -y zsh

echo "Installing ZSH..."
    cd ~
    wget --no-check-certificate https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sudo ZSH=/home/vagrant/.oh-my-zsh sh
    sudo chsh -s /bin/zsh vagrant
    zsh
    cp /home/vagrant/.oh-my-zsh/templates/zshrc.zsh-template /home/vagrant/.zshrc
    chown vagrant:vagrant /home/vagrant/.zshrc
    chown -R vagrant:vagrant /home/vagrant/.oh-my-zsh
    sed -i -e 's/ZSH_THEME="robbyrussell"/ZSH_THEME="manar"/g' ~/.zshrc

echo "Symlinking dependencies"
    ln -s /usr/bin/nodejs /usr/bin/node

echo "Installing Meteor"
    curl https://install.meteor.com/ | sh
    #cd /var/www/app/.meteor/local && mv db /home/vagrant && ln -s ~/db/ db

echo "Configuring Nginx"
    cp /vagrant/tasks/config/nginx/frontend_snorkelboot_vagrant /etc/nginx/sites-available/frontend_snorkelboot_vagrant > /dev/null
    ln -s /etc/nginx/sites-available/frontend_snorkelboot_vagrant /etc/nginx/sites-enabled/

    cp /vagrant/tasks/config/nginx/app_snorkelboot_vagrant /etc/nginx/sites-available/app_snorkelboot_vagrant > /dev/null
    ln -s /etc/nginx/sites-available/app_snorkelboot_vagrant /etc/nginx/sites-enabled/

    rm -rf /etc/nginx/sites-available/default
    service nginx restart > /dev/null
