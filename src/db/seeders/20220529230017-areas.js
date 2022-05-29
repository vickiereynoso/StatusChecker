'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('areas', [{

      name: "PiscinaCubierta",
      description: "Climatizada",
      maxCapacity: 10,
      currentOcupation: 5,
      openingHour:"2022-01-01 09:00:00",
      closingHour:"2022-01-01 21:00:00",
      state: "Disponible",
      category: ("Apto Niños"),
      },{
      name: "PiscinaAireLibre",
      description: "Largo: 12 metros",
      maxCapacity: 15,
      currentOcupation: 10,
      openingHour:"2022-01-01 09:00:00",
      closingHour:"2022-01-01 19:00:00",
      state: "Disponible",
      category: ("Apto Niños"),
      },{
      name: "Jacuzzi",
      description: "Potencia 12 jets",
      maxCapacity: 6,
      currentOcupation: 6,
      openingHour:"2022-01-01 09:00:00",
      closingHour:"2022-01-01 21:00:00",
      state: "Lleno",
      category: ("Apto Niños"),
      },{
      name: "Gym",
      description: "15 máquinas",
      maxCapacity: 10,
      currentOcupation: 0,
      openingHour:"2022-01-01 08:00:00",
      closingHour:"2022-01-01 23:00:00",
      state: "Cerrado"
      },{
      name: "Sauna",
      description: "3 cabinas",
      maxCapacity: 3,
      currentOcupation: 3,
      openingHour:"2022-01-01 12:00:00",
      closingHour:"2022-01-01 19:00:00",
      state: "Lleno",
      }
    
    ], {});
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('areas', null, {});

  }
};