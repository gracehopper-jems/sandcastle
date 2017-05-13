const db = require('./').db;
console.log('===', db);
// const Product = require('./product')
// const {expect} = require('chai')

// describe('Product', () => {
//   before('wait for the db', () => db.didSync)

//   describe('validations and required fields', () => {
//     it('includes name, description, color, size, pictureUrl, inventory, magicalAbilities, lifespan, price fields', () =>{
//       Product.create({
//         name: 'Bob',
//         description: 'A happy puppy',
//         colors: ['brown', 'rainbow'],
//         size: 'S',
//         pictureURL: 'http://www.google.com',
//         inventory: 10,
//         magicalAbilities: ['being cute'],
//         lifespan: 15,
//         price: 100
//       })
//       .then(product => {
//         expect(product.name).to.equal('Bob')
//         expect(product.description).to.equal('A happy puppy')
//         expect(product.colors).to.eql(['brown', 'rainbow'])
//         // add commented code below after color attribute in product model update merged to master
//         expect(product.colors).to.be.an('array')
//         expect(product.size).to.equal('S')
//         expect(product.pictureURL).to.equal('http://www.google.com')
//         expect(product.inventory).to.equal(10)
//         expect(product.magicalAbilities).to.be.an('array')
//         expect(product.magicalAbilities[0]).to.equal('being cute')
//         expect(product.lifespan).to.equal(15)
//         expect(product.price).to.equal(100)
//       })
//     })

//     it('requires a product name', () =>{
//       Product.create({})
//       .catch(err => {
//         expect(err).to.be.an('object')
//         expect(err.errors[0].type).to.be.equal('notNull Violation')
//       })
//     })


//     it("price and inventory defaults to 0", () => {
//       Product.create({
//         name: 'Phoenix',
//         description: 'Blah blah',
//         color: 'red',
//         size: 'M',
//         lifespan: 6
//       })
//       .then(product => {
//         expect(product.price).to.be.equal(0)
//         expect(product.inventory).to.be.equal(0)
//       })

//     })

//     it("Price cannot be lower than 0", () => {
//       Product.create({
//         name: 'Phoenix',
//         description: 'Blah blah',
//         color: 'red',
//         size: 'M',
//         lifespan: 6,
//         price: -20
//       })
//       .catch(err => {
//         expect(err).to.be.an('object')
//         expect(err.errors[0].message).to.be.equal('Validation min failed')
//       })
//     })
//   })
// })
