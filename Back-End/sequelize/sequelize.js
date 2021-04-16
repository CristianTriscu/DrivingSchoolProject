import Sequelize from "sequelize";

const DB_USERNAME = "sa";
const DB_PASSWORD = "sa";

const sequelize = new Sequelize("bd_licenta2", DB_USERNAME, DB_PASSWORD, {
  host: "localhost",
  dialect: "mssql",
  dialectOptions: {
    options: {
      //instanceName:"DESKTOP-L929KG2",
      trustedConnection: true,
      enableArithAbort: true,
    },
  },
});

export const Address = sequelize.define("Addresses", {
  id: {
    type: Sequelize.STRING,

    primaryKey: true,
    allowNull: true,
  },

  street: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  county: {
    type: Sequelize.STRING,
  },
  zip_code: {
    type: Sequelize.STRING,
  },
});

export const Client = sequelize.define("Clients", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: true,
  },

  last_name: {
    type: Sequelize.STRING,
  },
  first_name: {
    type: Sequelize.STRING,
  },

  birth_date: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  license_type: {
    type: Sequelize.STRING,
  },
  is_active: {
    type: Sequelize.BOOLEAN,
  },
});

export const identityCard = sequelize.define("identityCards", {
  id: {
    type: Sequelize.STRING,

    primaryKey: true,
    allowNull: true,
  },
  type: { type: Sequelize.STRING },
  series: { type: Sequelize.STRING },
  number: { type: Sequelize.INTEGER },
  issuedBy: { type: Sequelize.STRING },
  issuedDate: { type: Sequelize.STRING },
  expirationDate: { type: Sequelize.STRING },
  socialSecurityNumber: { type: Sequelize.INTEGER },
});

export const job_title = sequelize.define("job_titles", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: true,
  },
  job_description: { type: Sequelize.STRING },
});

export const reservation = sequelize.define("reservations", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: true,
  },
 
  startDate: { type: Sequelize.DATE },
  endDate:{type:Sequelize.DATE},
  state:{type:Sequelize.STRING},
  title:{type:Sequelize.STRING},

});

export const driving_lesson_service = sequelize.define(
  "driving_lessons_services",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: true,
      unique: true,
    },
    title: { type: Sequelize.STRING },
    price: { type: Sequelize.DECIMAL(12, 5) },
    duration: { type: Sequelize.DECIMAL(3, 2) },
  }
);

export const request = sequelize.define("requests", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: true,
  },
  
  title: { type: Sequelize.STRING },
  service_id: { type: Sequelize.INTEGER },
  vehicle_id: { type: Sequelize.INTEGER },
  startDate: { type: Sequelize.DATE },
  endDate: { type: Sequelize.DATE },
  state:{type:Sequelize.STRING},
});

export const employee = sequelize.define("employees", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: true,
  },

  last_name: {
    type: Sequelize.STRING,
  },
  first_name: {
    type: Sequelize.STRING,
  },
  adress_id: {
    type: Sequelize.STRING,
  },
  birth_date: {
    type: Sequelize.DATE,
  },
  phone: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  job_title_id: {
    type: Sequelize.INTEGER,
  },
  is_active: {
    type: Sequelize.BOOLEAN,
  },
});

export const reservation_status = sequelize.define("resevations_statuses", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: true,
  },
  is_active: { type: Sequelize.BOOLEAN },
  status_description: { type: Sequelize.STRING },
});

export const request_status = sequelize.define("request_statuses", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: true,
  },
  is_active: { type: Sequelize.BOOLEAN },
  status_description: { type: Sequelize.STRING },
});

export const license_type = sequelize.define("license_types", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: true,
  },
  description: {
    type: Sequelize.STRING,
  },
});

export const vehicle_type = sequelize.define("vehicle_types", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: true,
  },
  description: {
    type: Sequelize.STRING,
  },
});

export const user = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: true,
  },
  username: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  role: { type: Sequelize.STRING },
});

export const vehicle = sequelize.define("vehicles", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: true,
  },
  vehicle_type_id: { type: Sequelize.INTEGER },
  make: { type: Sequelize.STRING },
  model: { type: Sequelize.STRING },
  license_plate: { type: Sequelize.STRING },
});

//user.hasMany(Client,{foreignKey:"id",foreignKeyConstraint:true});
//Client.belongsTo(user,{foreignKey:"id"});


Client.hasOne(identityCard);
Client.hasOne(Address);



employee.hasOne(Address);

employee.hasMany(request);
employee.hasMany(reservation);
employee.hasMany(Client);

Client.hasMany(reservation);
Client.hasMany(request);


request.hasOne(request_status);
user.hasOne(Client);
user.hasOne(employee);
employee.hasOne(job_title);
Client.hasMany(license_type);

// request.hasOne(vehicle_type)

// reservation.hasOne(vehicle)
reservation.hasOne(driving_lesson_service);

sequelize
  .authenticate()
  .then(() => {
    console.log("Sequelize has successfully connected to the database");
  })

  .catch((err) => console.error("Unable to connect to the database:" + err));

sequelize
  .sync({ force: false, alter: true })
  .then(() => {
    console.log("Sync completed!");
  })
  .catch((err) => console.log("Error at creating: ") + err);
