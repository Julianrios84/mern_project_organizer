print('START #################################################################');
db.auth('root', 'root');
db = db.getSiblingDB('projectorganizer');
db.createUser({
  user: 'administrator',
  pwd: 'administrator',
  roles: [{ role: 'readWrite', db: 'projectorganizer' }]
});
db.createCollection('users');
print('END #################################################################');
