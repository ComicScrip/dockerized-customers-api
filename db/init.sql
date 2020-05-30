CREATE USER 'wilder' IDENTIFIED WITH mysql_native_password BY 'W1ldPa$$W0rd';
GRANT ALL PRIVILEGES ON * . * TO 'wilder';
FLUSH PRIVILEGES;
