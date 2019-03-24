// Assuming you have already done "npm install fernet"
let fernet = require('fernet')
let secret = new fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=')
// Oh no! The code is going over the edge! What are you going to do?
let message = 'gAAAAABcltXtR69y_RZr5impboYMuhdQlvYivwmnZxV6BMuRUu7aAbUz3S30gYYUsMEFcNXTMt8S3Od9J21FSDgyv2fls_LDFnG0KA-IynAzNNYbrSZYxbuoyawkKSX7by25esxpQJe8HDKq1PYr83uS7buTDr3FOSgqA7hUcYYC2Zjjr16cpfQ0WNdfEQzdfiRUcwSAWNFO'
let token = new fernet.Token({ secret: secret, token: message, ttl: 0 })
console.log(token.decode())