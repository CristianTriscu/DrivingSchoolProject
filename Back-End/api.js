import { app, router } from "./init/serverInit.js";
import {
  Address,
  Client,
  job_title,
  reservation,
  driving_lesson_service,
  request,
  employee,
  reservation_status,
  request_status,
  license_type,
  vehicle,
  user,
  identityCard,
  message,
  Series,
  Groups,
  incorrect_answers,
  Questions,
} from "./sequelize/sequelize.js";
import permit from "./authorization/authorization.js";
import seq from "sequelize";
import jsonwebtoken from "jsonwebtoken";
import { questions } from "./questions/cap13.js";
const jwt = jsonwebtoken;

////---------------USERS-----------------////

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-acces-token"];
  if (!token) {
    res.send("Yo, we need a token pls give it to us next time");
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "You failed to authenticate! " });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

//de revenit aici
router.route("/isUserAuth", verifyJWT, (req, res) => {
  res.send("you are authenticated, Congrats!");
});

router.route("/login").post((req, res) => {
  user
    .findAll({ where: { email: req.body.email, password: req.body.password } })
    .then((usr) => {
      if (usr != 0) {
        // putem intra in aplicatie
        const id = usr[0].id;
        const token = jwt.sign({ id }, "jwtSecret", {
          expiresIn: 300,
        });

        return res.status(200).json({
          auth: true,
          result: usr[0],
          token: token,
        });
      }
      //userul e gresit
      else
        return res
          .status(401)
          .json({ message: "Email or password does not exist" });
    })
    .catch((err) => console.log(err));
});

router.route("/users").get((req, res) => {
  user.findAll().then((User) => {
    return res.json(User);
  });
});

router.route("/users/:id").get((req, res) => {
  user.findByPk(req.params.id).then((result) => res.json(result));
});

router.route("/usersByEmail/:email").get((req, res) => {
  user
    .findOne({
      where: { email: req.params.email },
      include: [
        {
          model: Client,
        },
      ],
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

// register / /
router.route("/users").post(async (req, res) => {
  //validare username
  var usr = /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/;
  if (!req.body.username.match(usr)) {
    return res.status(500).json({
      message: "Invalid username",
    });
  }

  //validare email
  var em =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!req.body.email.match(em)) {
    return res.status(500).json({
      message: "Invalid email",
    });
  }

  //validare parola
  var pass = /^[A-Za-z]\w{7,14}$/;
  if (!req.body.password.match(pass)) {
    return res.status(500).json({
      message: "Invalid password",
    });
  }

  const userName = await user.findOne({
    where: { username: req.body.username },
  });
  if (userName)
    return res.status(500).json({ message: "Choose another username" });

  const email = await user.findOne({ where: { email: req.body.email } });
  if (email) return res.status(500).json({ message: "Choose another email" });

  //creare user
  user
    .create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: "client",
    })
    .then(() => {
      res.json({ message: "Registration successfully" });
    })
    .catch((err) => res.json({ message: err.toString() }));
});

router.route("/users/:id").put((req, res) => {
  //trebuie adauga validare pentru editarea detaliilor dar de catre userul curent in aplicatie
  if (req.body.username) {
    //validare username
    var usr = /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/;
    if (!req.body.username.match(usr)) {
      return res.status(500).json({
        message: "Invalid username",
      });
    }
  }
  if (req.body.email) {
    //validare email
    var em =
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!req.body.email.match(em)) {
      return res.status(500).json({
        message: "Invalid email",
      });
    }
  }
  if (req.body.password) {
    //validare parola
    var pass = /^[A-Za-z]\w{7,14}$/;
    if (!req.body.password.match(pass)) {
      return res.status(500).json({
        message: "Invalid password",
      });
    }
  }
  user
    .update(
      {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    .then(() => {
      res.json({ message: "Modification was successfully" });
    })
    .catch((err) => res.json(err));
});

router.route("/users/:id").delete((req, res) =>
  //trebuie adauga adaugata acc validare ca mai sus
  user
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then(() => {
      res.json({ message: "Deleted" });
    })
    .catch((err) => res.json({ message: err.toString() }))
);
////---------------USERS-----------------////

// --------Addresses-----------//
router.route("/addresses").get((req, res) => {
  Address.findAll()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

router.route("/addressesById/:id").get((req, res) => {
  Address.findByPk(req.params.id).then((result) => res.json(result));
});

router.route("/addresses").post((req, res) => {
  Address.create({
    street: req.body.street,
    city: req.body.city,
    county: req.body.county,
    zip_code: req.body.zip_code,
  }).then((response) => res.json(response));
});

router.route("/addresses/:id").put((req, res) => {
  Address.findByPk(req.params.id).then((record) => {
    record
      .update({
        street: req.body.street,
        city: req.body.city,
        county: req.body.county,
        zip_code: req.body.zip_code,
      })
      .then((response) => res.json(response));
  });
});

router.route("/addresses/:id").delete((req, res) => {
  Address.findByPk(req.params.id)
    .then((record) => {
      record.destroy();
    })
    .then(() => res.sendStatus(200));
});

// --------Addresses------end-----//

// --------Clients-----------//

router.route("/clientsById/:id").get((req, res) => {
  Client.findByPk(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

router.route("/clients").get(async (req, res) => {
  try {
    const clientsWithInstructors = await Client.findAll({});
    if (clientsWithInstructors) {
      res.status(200).json(clientsWithInstructors);
    } else {
      res.status(400).json({ message: "not found" });
    }
  } catch (e) {
    console.log(e);
  }
});

router.route("/ClientByUserId/:userId").get(async (req, res) => {
  try {
    const clientInfo = await Client.findOne({
      where: {
        userId: req.params.userId,
      },
    });
    if (clientInfo) {
      res.status(200).json(clientInfo);
    } else {
      res.status(400).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
  }
});

router.route("/ClientsByInstructorId/:employeeId").get(async (req, res) => {
  try {
    const client = await Client.findAll({
      where: {
        employeeId: req.params.employeeId,
      },
    });
    if (client) {
      res.status(200).json(client);
    } else {
      res.status(400).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
  }
});

router.route("/clients").post((req, res) => {
  Client.create({
    last_name: req.body.last_name,
    first_name: req.body.first_name,
    previous_name: req.body.previous_name,
    adress_id: req.body.adress_id,
    birth_date: req.body.birth_date,
    phone: req.body.phone,
    email: req.body.email,
    license_type: req.body.license_type,
    user_id: req.body.user_id,
    employeeId: req.body.employeeId,
    is_active: req.body.is_active,
  }).then((result) => res.json(result));
});

router.route("/clients").post((req, res) => {
  Client.create({
    last_name: req.body.last_name,
    first_name: req.body.first_name,
    previous_name: req.body.previous_name,
    adress_id: req.body.adress_id,
    birth_date: req.body.birth_date,
    phone: req.body.phone,
    email: req.body.email,
    license_type: req.body.license_type,
    user_id: req.body.user_id,
    instructor_id: req.body.instructor_id,
    is_active: req.body.is_active,
  }).then((result) => res.json(result));
});

router.post(
  "/newClient",
  permit("client", "administrator"),
  async (req, res) => {
    const today = new Date();
    const adressId =
      parseInt(Math.random() * 100) +
      req.body.street.charAt(0) +
      req.body.city.charAt(0) +
      today.getDay() +
      today.getHours() +
      today.getMinutes() +
      today.getSeconds() +
      parseInt(Math.random() * 100);
    const identityCardId =
      parseInt(Math.random() * 100) +
      req.body.series +
      req.body.number +
      today.getDay() +
      today.getHours() +
      today.getMinutes() +
      today.getSeconds() +
      parseInt(Math.random() * 100);
    const clientId =
      parseInt(Math.random() * 100) +
      parseInt(today.getDay()) +
      parseInt(today.getMinutes()) +
      parseInt(today.getFullYear()) +
      parseInt(Math.random() * 100);

    try {
      if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "body is missing" });
      }

      //regex pt cnp
      let cnp = `^[1-9]\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(0[1-9]|[1-4]\d|5[0-2]|99)(00[1-9]|0[1-9]\d|[1-9]\d\d)\d$`;

      await Client.create({
        id: clientId,
        last_name: req.body.last_name,
        first_name: req.body.first_name,
        previous_name: req.body.previous_name,
        birth_date: req.body.birth_date,
        phone: req.body.phone,
        email: req.body.email,
        license_type: req.body.license_type,
        userId: req.body.userId,
        employeeId: req.body.employeeId,
        is_active: req.body.is_active,
      });
      await identityCard.create({
        id: identityCardId,
        type: req.body.type,
        series: req.body.series,
        number: req.body.number,
        issuedBy: req.body.issuedBy,
        issuedDate: req.body.issuedDate,
        expirationDate: req.body.expirationDate,
        socialSecurityNumber: req.body.socialSecurityNumber,
        ClientId: clientId,
      });

      await Address.create({
        id: adressId,
        street: req.body.street,
        city: req.body.city,
        county: req.body.county,
        zip_code: req.body.zip_code,
        ClientId: clientId,
      });

      return res
        .status(201)
        .json({ message: "Client registered with success" });
    } catch (err) {
      console.warn(err.stack);
    }
  }
);

router.route("/clients/:id").put((req, res) => {
  Client.findByPk(req.params.id).then((record) => {
    record
      .update({
        last_name: req.body.last_name,
        first_name: req.body.first_name,
        adress_id: req.body.adress_id,
        birth_date: req.body.birth_date,
        phone: req.body.phone,
        email: req.body.email,
        license_type: req.body.license_type,
        user_id: req.body.user_id,
        employeeId: req.body.employeeId,
        is_active: req.body.is_active,
      })
      .then((response) => res.json(response));
  });
});

router.route("/clients/:id").delete((req, res) => {
  Client.findByPk(req.params.id)
    .then((record) => {
      record.destroy();
    })
    .then(() => res.sendStatus(200));
});
// --------Clients----end-------//

// ----- Job Title---------//

router.route("/job_titles").get((req, res) => {
  job_title
    .findAll()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

router.route("/job_titlesById/:id").get((req, res) => {
  job_title.findByPk(req.params.id).then((result) => res.json(result));
});

router.route("/job_titles").post((req, res) => {
  job_title
    .create({
      job_description: req.body.job_description,
    })
    .then((response) => res.json(response));
});

router.route("/job_titles/:id").put((req, res) => {
  job_title.findByPk(req.params.id).then((record) => {
    record
      .update({
        job_description: req.body.job_description,
      })
      .then((response) => res.json(response));
  });
});

router.route("/job_titles/:id").delete((req, res) => {
  job_title
    .findByPk(req.params.id)
    .then((record) => {
      record.destroy();
    })
    .then(() => res.sendStatus(200));
});

// --------Job Titles------end-----//

// ----- Reservations ---------//

router.route("/reservations").get((req, res) => {
  reservation
    .findAll()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

router.route("/reservationsByInstructor/:employeeId").get((req, res) => {
  reservation
    .findAll({
      where: {
        employeeId: req.params.employeeId,
      },
    })
    .then((result) => res.json(result));
});

router
  .route("/reservationsaAndrequestsByInstructor/:employeeId")
  .get(async (req, res) => {
    try {
      const arr1 = await reservation.findAll({
        where: {
          employeeId: req.params.employeeId,
        },
      });

      const arr2 = await request.findAll({
        where: {
          employeeId: req.params.employeeId,
        },
      });

      return res.json(arr1.concat(arr2));
    } catch (err) {
      console.log(err.toString());
    }
  });

router.route("/reservationsById/:id").get((req, res) => {
  reservation.findByPk(req.params.id).then((result) => res.json(result));
});

router.route("/reservations").post((req, res) => {
  reservation
    .create({
      title: req.body.title,
      employeeId: req.body.employeeId,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      state: req.body.state,
      ClientId: req.body.ClientId,
    })
    .then((response) => res.json(response));
});

router.route("/reservations/:id").put((req, res) => {
  reservation.findByPk(req.params.id).then((record) => {
    record
      .update({
        request_id: req.body.request_id,
        vehicle_id: req.body.vehicle_id,
        staff_id: req.body.staff_id,
        reservation_date: req.body.reservation_date,
        reservation_status_id: req.body.reservation_status_id,
        driving_lesson_id: req.body.driving_lesson_id,
      })
      .then((response) => res.json(response));
  });
});

router.route("/reservations/:id").delete((req, res) => {
  reservation
    .findByPk(req.params.id)
    .then((record) => {
      record.destroy();
    })
    .then(() => res.sendStatus(200));
});

// --------Reservations------end-----//

// -----Driving lessons services ---------//

router.route("/driving_lesson_service").get((req, res) => {
  driving_lesson_service
    .findAll()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

router.route("/driving_lesson_service/:id").get((req, res) => {
  driving_lesson_service
    .findByPk(req.params.id)
    .then((result) => res.json(result));
});

router.route("/driving_lesson_service").post((req, res) => {
  driving_lesson_service
    .create({
      title: req.body.title,
      price: req.body.price,
      duration: req.body.duration,
    })
    .then((response) => res.json(response));
});

router.route("/driving_lesson_service/:id").put((req, res) => {
  driving_lesson_service.findByPk(req.params.id).then((record) => {
    record
      .update({
        title: req.body.title,
        price: req.body.price,
        duration: req.body.duration,
      })
      .then((response) => res.json(response));
  });
});

router.route("/driving_lesson_service/:id").delete((req, res) => {
  driving_lesson_service
    .findByPk(req.params.id)
    .then((record) => {
      record.destroy();
    })
    .then(() => res.sendStatus(200));
});

// --------Driving_lessons_services------end-----//

// ----Requests---------//

router.route("/requests").get((req, res) => {
  request
    .findAll()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

router.route("/requests/:id").get((req, res) => {
  request.findByPk(req.params.id).then((result) => res.json(result));
});

router.route("/requestsByInstructor/:employeeId").get((req, res) => {
  request
    .findAll({
      where: {
        employeeId: req.params.employeeId,
      },
    })
    .then((result) => res.json(result));
});

router.route("/requests").post((req, res) => {
  request
    .create({
      employeeId: req.body.employeeId,
      title: req.body.title,
      service_id: req.body.service_id,
      vehicle_id: req.body.vehicle_id,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      state: "waiting",
      ClientId: req.body.ClientId,
    })
    .then((response) => res.status(200).json(response))
    .catch((err) => {
      res.status(400), console.log(err);
    });
});

router.route("/unavailablePeriod").post((req, res) => {
  try {
    const unav = request.create({
      employeeId: req.body.employeeId,
      title: req.body.title,
      service_id: req.body.service_id,
      vehicle_id: req.body.vehicle_id,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      state: "unavailable",
      ClientId: null,
    });

    if(unav){
      res.status(200).json(unav)
    }else{
      res.status(400).json({message:"wrong"})
    }
  } catch (e) {
    console.log(e);
  }
});

router.route("/requests/:id").put((req, res) => {
  request.findByPk(req.params.id).then((record) => {
    record
      .update({
        client_id: req.body.client_id,
        service_id: req.body.service_id,
        vehicle_id: req.body.vehicle_id,
        date_requested: req.body.date_requested,
      })
      .then((response) => res.json(response));
  });
});

router.route("/requests/:id").delete((req, res) => {
  request
    .findByPk(req.params.id)
    .then((record) => {
      record.destroy();
    })
    .then(() => res.status(200).json({ message: "deleted" }));
});

router.route("/cancelReservation/:id/:clientId").delete(async (req, res) => {
  try {
    /*TODO
    cand sterg o rezervare sa creez un mesaj "rezervare stearsa"
    //sa pun o conditie gen if( date.now - startingDate < 1 zi ) => nu pot sterge else => sterge cu succes, operatia de mai sus 
    */
    let date = new Date();
    let reservationToBeDeleted = await reservation.findByPk(req.params.id);
    if (reservationToBeDeleted) {
      let differenceInDays =
        (date.getTime() - reservationToBeDeleted.startDate.getTime()) /
        (1000 * 3600 * 24);
      if (differenceInDays >= 2) {
        await reservationToBeDeleted.destroy();
        await message.create({
          content: `Reservation was canceled on ${date.toLocaleDateString()}`,
          ClientId: req.params.clientId,
        });
        res.status(200).json({ message: "accepted" });
      } else {
        res.status(403).json({
          message:
            "Must be at least 2 days difference to cancel the reservation. ",
        });
      }
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (er) {
    console.warn(er);
  }
});

router.route("/makeRequestReservation/:id").delete(async (req, res) => {
  try {
    let solicitation = await request.findByPk(req.params.id);
    if (solicitation) {
      let reservation_ = await reservation.create({
        employeeId: solicitation.employeeId,
        title: solicitation.title,
        service_id: solicitation.service_id,
        vehicle_id: solicitation.vehicle_id,
        startDate: solicitation.startDate,
        endDate: solicitation.endDate,
        state: "accepted",
        ClientId: solicitation.ClientId,
      });
      await solicitation.destroy();
      const date = new Date(reservation_.startDate);
      const date2 = new Date(reservation_.endDate);

      let minutes = null;
      let minutes2 = null;
      date.getMinutes() === 0
        ? (minutes = `${date.getMinutes()}${date.getMinutes()}`)
        : (minutes = `${date.getMinutes()}`);

      date2.getMinutes() === 0
        ? (minutes2 = `${date2.getMinutes()}${date2.getMinutes()}`)
        : (minutes2 = `${date2.getMinutes()}`);
      await message.create({
        content: `Ședință acceptată pentru data de ${date.toLocaleDateString()}. Ora de începere: ${date.getHours()}:${minutes} - Ora de finalizare ${date2.getHours()}:${minutes2}`,
        ClientId: reservation_.ClientId,
        isRead: false,
      });
      res.status(200).json({ message: "accepted" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
  }
});

// --------Requests------end-----//

// -------- Messages ----------//

// --------- Messages ---- end //

// ----Employees---------//

router.route("/employees").get((req, res) => {
  employee
    .findAll()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

router.route("/employeeByUserId/:userId").get(async (req, res) => {
  const employee_ = await employee.findOne({
    where: {
      userId: req.params.userId,
    },
  });
  if (employee_) {
    res.status(200).json(employee_);
  } else {
    res.status(404).json({ message: "not found" });
  }
});

router.route("/employees/:id").get((req, res) => {
  employee.findByPk(req.params.id).then((result) => res.json(result));
});

router.route("/employees").post((req, res) => {
  employee
    .create({
      last_name: req.body.last_name,
      first_name: req.body.first_name,
      adress_id: req.body.adress_id,
      birth_date: req.body.birth_date,
      phone: req.body.phone,
      email: req.body.email,
      job_title_id: req.body.job_title_id,
      userId: req.body.userId,
      is_active: req.body.is_active,
    })
    .then((response) => res.json(response));
});

router.route("/employees/:id").put((req, res) => {
  employee.findByPk(req.params.id).then((record) => {
    record
      .update({
        last_name: req.body.last_name,
        first_name: req.body.first_name,
        adress_id: req.body.adress_id,
        birth_date: req.body.birth_date,
        phone: req.body.phone,
        email: req.body.email,
        job_title_id: req.body.job_title_id,
        userId: req.body.userId,
        is_active: req.body.is_active,
      })
      .then((response) => res.json(response));
  });
});

router.route("/employees/:id").delete((req, res) => {
  employee
    .findByPk(req.params.id)
    .then((record) => {
      record.destroy();
    })
    .then(() => res.sendStatus(200));
});

// --------Employees------end-----//

// -------Reservation_status---------//

router.route("/reservation_status").get((req, res) => {
  reservation_status
    .findAll()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

router.route("/reservation_status/:id").get((req, res) => {
  reservation_status.findByPk(req.params.id).then((result) => res.json(result));
});

router.route("/reservation_status").post((req, res) => {
  reservation_status
    .create({
      is_active: req.body.is_active,
      status_description: req.body.status_description,
    })
    .then((response) => res.json(response));
});

router.route("/reservation_status/:id").put((req, res) => {
  reservation_status.findByPk(req.params.id).then((record) => {
    record
      .update({
        is_active: req.body.is_active,
        status_description: req.body.status_description,
      })
      .then((response) => res.json(response))
      .catch((err) => console.log(err));
  });
});

router.route("/reservation_status/:id").delete((req, res) => {
  reservation_status
    .findByPk(req.params.id)
    .then((record) => {
      record.destroy();
    })
    .then(() => res.sendStatus(200));
});

// --------reservation_status------end-----//

// -------Request_status---------//

router.route("/request_status").get((req, res) => {
  request_status
    .findAll()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

router.route("/request_status/:id").get((req, res) => {
  request_status.findByPk(req.params.id).then((result) => res.json(result));
});

router.route("/request_status").post((req, res) => {
  request_status
    .create({
      is_active: req.body.is_active,
      status_description: req.body.status_description,
    })
    .then((response) => res.json(response));
});

router.route("/request_status/:id").put((req, res) => {
  request_status.findByPk(req.params.id).then((record) => {
    record
      .update({
        is_active: req.body.is_active,
        status_description: req.body.status_description,
      })
      .then((response) => res.json(response));
  });
});

router.route("/request_status/:id").delete((req, res) => {
  request_status
    .findByPk(req.params.id)
    .then((record) => {
      record.destroy();
    })
    .then(() => res.sendStatus(200));
});

// --------request_status------end-----//

// -------license_type---------//

router.route("/license_type").get((req, res) => {
  license_type
    .findAll()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

router.route("/license_type/:id").get((req, res) => {
  license_type.findByPk(req.params.id).then((result) => res.json(result));
});

router.route("/license_type").post((req, res) => {
  license_type
    .create({
      description: req.body.description,
    })
    .then((response) => res.json(response));
});

router.route("/license_type/:id").put((req, res) => {
  license_type.findByPk(req.params.id).then((record) => {
    record
      .update({
        description: req.body.description,
      })
      .then((response) => res.json(response));
  });
});

router.route("/license_type/:id").delete((req, res) => {
  license_type
    .findByPk(req.params.id)
    .then((record) => {
      record.destroy();
    })
    .then(() => res.sendStatus(200));
});

// --------license_type------end-----//

// -------vehicle_type---------//

router.route("/vehicle_type").get((req, res) => {
  vehicle_type
    .findAll()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

router.route("/vehicle_type/:id").get((req, res) => {
  vehicle_type.findByPk(req.params.id).then((result) => res.json(result));
});

router.route("/vehicle_type").post((req, res) => {
  vehicle_type
    .create({
      description: req.body.description,
    })
    .then((response) => res.json(response));
});

router.route("/vehicle_type/:id").put((req, res) => {
  vehicle_type.findByPk(req.params.id).then((record) => {
    record
      .update({
        description: req.body.description,
      })
      .then((response) => res.json(response));
  });
});

router.route("/vehicle_type/:id").delete((req, res) => {
  vehicle_type
    .findByPk(req.params.id)
    .then((record) => {
      record.destroy();
    })
    .then(() => res.sendStatus(200));
});

// --------vehicle_type------end-----//

// -------vehicle---------//

router.route("/vehicles").get((req, res) => {
  vehicle
    .findAll()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

router.route("/vehiclesB").get(async (req, res) => {
  try {
    const vehiclesB = await vehicle.findAll({
      where: {
        vehicle_type: "B",
      },
    });
    if (vehiclesB) {
      res.status(200).json(vehiclesB);
    } else {
      res.status(400).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
  }
});

router.route("/vehiclesC").get(async (req, res) => {
  try {
    const vehiclesC = await vehicle.findAll({
      where: {
        vehicle_type: "C",
      },
    });
    if (vehiclesC) {
      res.status(200).json(vehiclesC);
    } else {
      res.status(400).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
  }
});

router.route("/vehiclesD").get(async (req, res) => {
  try {
    const vehiclesD = await vehicle.findAll({
      where: {
        vehicle_type: "D",
      },
    });
    if (vehiclesB) {
      res.status(200).json(vehiclesD);
    } else {
      res.status(400).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
  }
});

router.route("/vehicles/:id").get((req, res) => {
  vehicle.findByPk(req.params.id).then((result) => res.json(result));
});

router.route("/vehicles").post((req, res) => {
  vehicle
    .create({
      vehicle_type_id: req.body.vehicle_type_id,
      make: req.body.make,
      model: req.body.model,
      license_plate: req.body.license_plate,
    })
    .then((response) => res.json(response));
});

router.route("/vehicles/:id").put((req, res) => {
  vehicle.findByPk(req.params.id).then((record) => {
    record
      .update({
        vehicle_type_id: req.body.vehicle_type_id,
        make: req.body.make,
        model: req.body.model,
        license_plate: req.body.license_plate,
      })
      .then((response) => res.json(response));
  });
});

router.route("/vehicles/:id").delete((req, res) => {
  vehicle
    .findByPk(req.params.id)
    .then((record) => {
      record.destroy();
    })
    .then(() => res.sendStatus(200));
});

// --------vehicle-----//

router.route("/userswithclients").post((req, res) => {
  user
    .create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    })
    .then((user) => {
      req.body.Clients.forEach((client) => {
        Client.create({
          last_name: client.last_name,
          first_name: client.first_name,
          id: user.id,
        })
          .then((response) => res.json(response))
          .catch((err) => console.log(err));
      });
    })
    .catch((err) => console.log(err));
});

// -- Serii si grupe
router.route("/Series").get(async (req, res) => {
  try {
    const series = await Series.findAll({
      attributes: {
        include: [[seq.fn("COUNT", seq.col("SeriesId")), "no_of_clients"]],
      },
      include: [
        {
          model: Client,
          attributes: [],
        },
      ],
      group: [
        "Series.id",
        "Series.name",
        "Series.start_date",
        "Series.createdAt",
        "Series.updatedAt",
      ],
    });
    if (series) {
      res.status(200).json(series);
    } else {
      res.status(400).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
  }
});

router.route("/removeFromSeries/:id").put(async (req, res) => {
  try {
    const client = await Client.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (client) {
      client.update({
        SeriesId: null,
      });
      res.status(200).json(client);
    } else {
      res.status(400).json({ message: "not found" });
    }
  } catch (e) {
    console.log(e);
  }
});

router.route("/addToSeries/:id").put(async (req, res) => {
  try {
    const client = await Client.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (client) {
      client.update({
        SeriesId: req.body.SeriesId,
      });
      res.status(200).json(client);
    } else {
      res.status(400).json({ message: "not found" });
    }
  } catch (e) {
    console.log(e);
  }
});

router.route("/deleteSeries/:id").delete(async (req, res) => {
  try {
    const series = await Series.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (series) {
      await series.destroy();
      res.status(200).json({ message: "deleted with succes" });
    } else {
      res.status(400).json({ message: "not found" });
    }
  } catch (e) {
    console.log(e);
  }
});

router.route("/updateSeries/:id").put(async (req, res) => {
  try {
    const series = await Series.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (series) {
      await series.update({
        name: req.body.name,
        start_date: req.body.start_date,
      });
      res.status(200).json({ message: "updated with succes" });
    } else {
      res.status(400).json({ message: "not found" });
    }
  } catch (e) {
    console.log(e);
  }
});

router.route("/createSeries").post(async (req, res) => {
  try {
    const series = await Series.create({
      name: req.body.name,
      start_date: req.body.start_date,
    });

    if (series) {
      res.status(200).json({ message: "created with succes with succes" });
    } else {
      res.status(400).json({ message: "not found" });
    }
  } catch (e) {
    console.log(e);
  }
});

router.route("/ClientsFromSeries/:id").get(async (req, res) => {
  try {
    const clientsFromSeries = await Client.findAll({
      where: {
        SeriesId: req.params.id,
      },
    });
    if (clientsFromSeries) {
      res.status(200).json(clientsFromSeries);
    } else {
      res.status(400).json({ message: "not found" });
    }
  } catch (e) {
    console.log(e);
  }
});

router.route("/ClientsNotAsignedToSeries").get(async (req, res) => {
  try {
    const clientsWithNoSeries = await Client.findAll({
      where: {
        SeriesId: null,
      },
    });

    if (clientsWithNoSeries) {
      res.status(200).json(clientsWithNoSeries);
    } else {
      res.status(400).json({ message: "not found" });
    }
  } catch (e) {
    console.log(e);
  }
});

router.route("/GroupsBySeriesId/:id").get(async (req, res) => {
  try {
    const groups = await Groups.findAll({
      where: {
        SeriesId: req.params.id,
      },
    });

    if (groups) {
      res.status(200).json(groups);
    } else {
      res.status(400).json({ message: "not found" });
    }
  } catch (e) {
    console.log(e);
  }
});

router.route("/CreateGroupsBySeriesId/:id").post(async (req, res) => {
  try {
    const groups = await Groups.create({
      name: req.body.name,
      SeriesId: req.body.seriesId,
    });

    if (groups) {
      res.status(200).json({ message: "created with succes" });
    } else {
      res.status(400).json({ message: "not found" });
    }
  } catch (e) {
    console.log(e);
  }
});

router.route("/DeleteGroupsById/:id").delete(async (req, res) => {
  try {
    const groups = await Groups.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (groups) {
      await groups.destroy();
      res.status(200).json({ message: "deleted with succes" });
    } else {
      res.status(400).json({ message: "not found" });
    }
  } catch (e) {
    console.log(e);
  }
});

router.route("/ClientiDupaIdGrupa/:id").get(async (req, res) => {
  try {
    const clientiDinGrupa = await Client.findAll({
      where: {
        GroupId: req.params.id,
      },
    });

    if (clientiDinGrupa) {
      res.status(200).json(clientiDinGrupa);
    } else {
      res.status(400).json({ message: "not found" });
    }
  } catch (e) {
    console.log(e);
  }
});

router.route("/ClientiFaraGrupaDinSerie/:id").get(async (req, res) => {
  try {
    const clientiFaraGrupa = await Client.findAll({
      where: {
        SeriesId: req.params.id,
        GroupId: null,
      },
    });

    if (clientiFaraGrupa) {
      res.status(200).json(clientiFaraGrupa);
    } else {
      res.status(400).json({ message: "not found" });
    }
  } catch (e) {
    console.log(e);
  }
});

router.route("/removeFromGroup/:id").put(async (req, res) => {
  try {
    const client = await Client.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (client) {
      client.update({
        GroupId: null,
      });
      res.status(200).json(client);
    } else {
      res.status(400).json({ message: "not found" });
    }
  } catch (e) {
    console.log(e);
  }
});

router.route("/addToGroup/:id").put(async (req, res) => {
  try {
    const client = await Client.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (client) {
      client.update({
        GroupId: req.body.GroupId,
      });
      res.status(200).json(client);
    } else {
      res.status(400).json({ message: "not found" });
    }
  } catch (e) {
    console.log(e);
  }
});

//invatare
router.route("/Questions/:categorie/:dificultate").get(async (req, res) => {
  try {
    const questions = await Questions.findAll({
      where: {
        category: req.params.categorie,
        difficulty: req.params.dificultate,
      },
      include: [
        {
          model: incorrect_answers,
        },
      ],
      order: [["id", "DESC"]],
    });

    if (questions) {
      res.status(200).json(questions);
    } else {
      res.status(400).json({ message: "not found" });
    }
  } catch (e) {
    console.log(e);
  }
});

router
  .route("/QuestionsByCatAndChapter/:category/:chapter")
  .get(async (req, res) => {
    try {
      const questions = await Questions.findAll({
        where: {
          category: req.params.category,
          chapter: req.params.chapter,
        },
        include: [
          {
            model: incorrect_answers,
          },
        ],
        order: [["id", "DESC"]],
      });

      if (questions) {
        res.status(200).json(questions);
      } else {
        res.status(400).json({ message: "not found" });
      }
    } catch (e) {
      console.log(e);
    }
  });

router.route("/mainPage").get(async (req, res) => {
  try {
    const nrOfInstructors = await employee.count();
    const nrOfClients = await Client.count({ where: { is_active: true } });

    if (nrOfClients && nrOfInstructors) {
      res
        .status(200)
        .json({ nrOfInstructors: nrOfInstructors, nrOfClients: nrOfClients });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    console.log(e);
  }
});

router.route("/getMessages").get(async (req, res) => {
  try {
    let messages = await message.findAll();
    if (messages) {
      res.status(200).json(messages);
    } else {
      res.status(404).json({ message: "no messages" });
    }
  } catch (e) {
    console.warn(e);
  }
});

router.route("/getMessages/:clientId").get(async (req, res) => {
  try {
    let messages = await message.findAll({
      where: {
        ClientId: req.params.clientId,
      },
      order: [["id", "DESC"]],
    });
    if (messages) res.status(200).json(messages);
    else res.status(404).json({ message: "no messages" });
  } catch (e) {
    console.warn(e);
  }
});

router.route("/getUnreadMessages/:clientId").get(async (req, res) => {
  try {
    let messages = await message.findAll({
      where: {
        ClientId: req.params.clientId,
        isRead: false,
      },
    });
    if (messages) res.status(200).json(messages);
    else res.status(404).json({ message: "no messages" });
  } catch (e) {
    console.warn(e);
  }
});

router.route("/deleteMessage/:id").delete(async (req, res) => {
  try {
    let messageToBeDeleted = await message.findByPk(req.params.id);
    if (messageToBeDeleted) {
      messageToBeDeleted.destroy();
      res.status(200).json({ message: "accepted" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
  }
});

router.route("/markAsRead/:id").put(async (req, res) => {
  try {
    let message1 = await message.findByPk(req.params.id);
    if (message1) {
      message1.update({
        isRead: true,
      });

      res.status(200).json({ message: "accepted" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
  }
});

router.route("/markAsUnRead/:id").put(async (req, res) => {
  try {
    let message1 = await message.findByPk(req.params.id);
    if (message1) {
      message1.update({
        isRead: false,
      });

      res.status(200).json({ message: "accepted" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
  }
});

router.route("/identityCardByClientId/:id").get(async(req,res)=>{
  try{
    let identityCardInfo = await identityCard.findOne(
      {where:{clientId:req.params.id}
    
    })
    if(identityCardInfo){
      res.status(200).json(identityCardInfo);
    }else{
      res.status(404).json({message:"not found"})
    }
  }catch(e){
    console.log(e);
  }
})


router.route("/fillData").post(async (req, res) => {
  try {
    for (let i = 0; i < questions.length; i++) {
      const question = await Questions.create({
        category: "B",
        difficulty: "easy",
        question: questions[i].question,
        correct_answer: questions[i].answer,
        chapter: "Noţiuni de mecanică; Cunoaşterea automobilului",
        image_url: questions[i].image_url,
      });

      const wrong_anw = await incorrect_answers.create({
        incorrect_answer1: questions[i].wrong_answer1,
        incorrect_answer2: questions[i].wrong_answer2,
        QuestionId: question.id,
      });
    }
    res.status(200).json({ message: "ok" });
  } catch (e) {
    console.log(e);
  }
});

var port = 8080;
app.listen(port, () => console.log("Server is running on port " + port));
