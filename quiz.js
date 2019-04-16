// Assuming you have already done "npm install fernet"
let fernet = require('fernet')
let secret = new fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=')
// Oh no! The code is going over the edge! What are you going to do?
let message = 'gAAAAABctlMdJ0Y2N-e1DJqXiUrEvkH3Z7RhNc3btL7YKTKS5SMd-pVd4d3G0CP-CGtKq_dXcXZuLNi0CrWbu5yZ5zMrSAcGUXUjrIX6KXa_qEDG2vqag8xlnVpxHTd4ODQyZmUqaRzBk1FB1cgRB8hvYsJt8D7CePgCrYDT39ASbwmbt6rMJhYBryXrIBeFnOMU7yTMZP-_'
let token = new fernet.Token({ secret: secret, token: message, ttl: 0 })
console.log(token.decode())