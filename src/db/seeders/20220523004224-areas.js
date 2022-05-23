'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('areas', [{

      name: "PiscinaCubierta",
      description: "Climatizada",
      maxCapacity: 10,
      openingHour:"09:00",
      closingHour:"21:00",
      category: ("Climatizado","Apto Niños"),
      },{
      name: "PiscinaAireLibre",
      description: "Largo: 12 metros",
      maxCapacity: 15,
      openingHour:"09:00",
      closingHour:"19:00",
      category: ("Aire Libre","Apto Niños"),
      },{
      name: "Jacuzzi",
      description: "Potencia 12 jets",
      maxCapacity: 6,
      openingHour:"09:00",
      closingHour:"21:00",
      category: ("Climatizado","Apto Niños"),
      },{
      name: "Gym",
      description: "15 máquinas",
      maxCapacity: 10,
      openingHour:"08:00",
      closingHour:"23:00",
      },{
      name: "Sauna",
      description: "3 cabinas",
      maxCapacity: 3,
      openingHour:"12:00",
      closingHour:"19:00",
      },{
      name: "Spa",
      description: "6 tratamientos",
      maxCapacity: 4,
      openingHour:"10:00",
      closingHour:"18:00",
      category: ("Tratamientos"),
      },
    
    ], {});
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('areas', null, {});

  }
};
