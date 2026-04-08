

const UserWithAddress = require('../models/UserWithAddress');

async function demoOneToFew() {
  console.log('\n--- ONE-TO-FEW DEMO ---');

  const user = await UserWithAddress.create({
    name: 'Alice Johnson',
    email: 'alice@example.com',
    addresses: [
      { street: '123 Main St', city: 'Boston', country: 'USA', isPrimary: true },
      { street: '45 Oak Ave', city: 'Cambridge', country: 'USA', isPrimary: false }
    ]
  });

  console.log('Created user:', user.name);

  const foundUser = await UserWithAddress.findById(user._id);
  console.log('Primary city:', foundUser.addresses.find(a => a.isPrimary).city);

  return user;
}

module.exports = demoOneToFew;