require('dotenv').config();
let mongoose = require('mongoose');

mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  },
  age: Number, 
  favoriteFoods: [{
    type: String
  }]
})

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let potis = new Person({
    name: "Potis", 
    age: 39,
    favoriteFoods: ['gyros', 'steak']
  });

  potis.save((err, data) => {
    if (err) {
      return done(err);
    }
    return done(null, data);
  });
};

let arrayOfPeople = [
  {name: 'Potis', age: 39, favoriteFoods: ['gyros', 'steak']},
  {name: 'Alkisti', age: 36, favoriteFoods: ['food1', 'burrito']}, 
  {name: 'Julia', age: 62, favoriteFoods: ['burrito', 'food4']}
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) {
      return done(err);
    }
    return done(null, people);
  });
};

const findPeopleByName = ({name: personName}, done) => {
  Person.find(personName, (err, data) => {
    if (err) {
      return done(err);
    }
    return done(null, data)
  })
};

const findOneByFood = ({favoriteFoods: food}, done) => {
  Person.findOne(food, (err, data) => {
    if (err) {
      return done(err);
    }
    return done(null, data)
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) {
      return done(err);
    }
    return done(null, data)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  
  Person.findById(personId, (err, pers) => {
    if (err) {
      return done(err)
    }
    pers.favoriteFoods.push(foodToAdd)
    pers.save((err, newPers) => {
      if (err) {
        return done(err)
      }
      return done(null, newPers)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, pers) => {
    if (err) {
      return done(err)
    }
    return done(null, pers)
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, pers) => {
    if (err) return done(err)
    return done(null, pers)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, pers) => {
    if (err) return done(err)
    return done(null, pers)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch })
        .sort({name: 1})
        .limit(2)
        .select({age: 0})
        .exec((err, data) => {
          if (err) return done(err)
          return done(null, data)
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
