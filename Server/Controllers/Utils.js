const checkAndGetBody = (req, res) => {
  const body = req.body;

  if (!body) {
    res.json({
      success: false,
      error: "No body provided.",
    });
    return { success: false, error: "login.errors.internalError" };
  }

  switch ("") {
    case body.email:
      return { success: false, error: "login.errors.noEmail" };
    case body.password:
      return { success: false, error: "login.errors.noPassword" };
  }

  return body;
};

const createUser = (userSchema, req) => {
  const body = req.body;
  return new userSchema({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    age: body.age,
    description: body.description,
    address: {
      country: body.address.country,
      city: body.address.city,
      street: body.address.street,
      number: body.address.number,
    },
    formation: {
      studies: body.formation.studies,
      establishment: body.formation.establishment,
      level: body.formation.level,
    },
  });
};

module.exports = {
  checkAndGetBody: checkAndGetBody,
  createUser: createUser,
};
