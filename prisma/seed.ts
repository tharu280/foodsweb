import { PrismaClient, DayOfWeek, MealType } from '@prisma/client'

const prisma = new PrismaClient()

const menuData = {
  "restaurant_info": {
    "name": "Healthy Hub Kuliyapitiya",
    "phone": "070 6068114",
    "socials": {
      "facebook": "Healthy Hub Kuliyapitiya",
      "tiktok": "healthy_hub_kuliyapitiya"
    }
  },
  "weekly_menu": [
    {
      "day": "Monday",
      "meals": {
        "Lunch": [
          {
            "dish_type": "Egg Dish",
            "ingredients": "2 Boiled eggs + Cabbage, Carrot, Cucumber salad + Baked potato",
            "price": {
              "without_basmathi_rice": 400,
              "with_basmathi_rice": 500
            }
          },
          {
            "dish_type": "Chicken Dish",
            "ingredients": "Chicken + Cabbage, Carrot, Cucumber salad + Baked potato",
            "price": {
              "without_basmathi_rice": 500,
              "with_basmathi_rice": 600
            }
          },
          {
            "dish_type": "Beef Dish",
            "ingredients": "Beef + Cabbage, Carrot, Cucumber salad + Baked potato",
            "price": {
              "without_basmathi_rice": 700,
              "with_basmathi_rice": 800
            }
          }
        ],
        "Dinner": [
          {
            "dish_type": "Egg Dish",
            "ingredients": "2 Boiled eggs + Green gram salad with veggies + Sweet potato",
            "price": 500
          },
          {
            "dish_type": "Chicken Dish",
            "ingredients": "Chicken + Green gram salad with veggies + Sweet potato",
            "price": 600
          },
          {
            "dish_type": "Beef Dish",
            "ingredients": "Beef + Green gram salad with veggies + Sweet potato",
            "price": 700
          }
        ]
      }
    },
    {
      "day": "Tuesday",
      "meals": {
        "Lunch": [
          {
            "dish_type": "Egg Dish",
            "ingredients": "2 Boiled eggs + Boiled vegetables + Baked corn",
            "price": {
              "without_basmathi_rice": 400,
              "with_basmathi_rice": 500
            }
          },
          {
            "dish_type": "Chicken Dish",
            "ingredients": "Chicken + Boiled vegetables + Baked corn",
            "price": {
              "without_basmathi_rice": 500,
              "with_basmathi_rice": 600
            }
          },
          {
            "dish_type": "Beef Dish",
            "ingredients": "Beef + Boiled vegetables + Baked corn",
            "price": {
              "without_basmathi_rice": 700,
              "with_basmathi_rice": 800
            }
          }
        ],
        "Dinner": [
          {
            "dish_type": "Egg Dish",
            "ingredients": "Veggie mini bread pizza with eggs + Potato wedges",
            "price": 500
          },
          {
            "dish_type": "Chicken Dish",
            "ingredients": "Veggie mini bread pizza with chicken + Potato wedges",
            "price": 600
          },
          {
            "dish_type": "Beef Dish",
            "ingredients": "Veggie mini bread pizza with beef + Potato wedges",
            "price": 700
          }
        ]
      }
    },
    {
      "day": "Wednesday",
      "meals": {
        "Lunch": [
          {
            "dish_type": "Egg Dish",
            "ingredients": "2 Boiled eggs + Green peas salad with veggies + Smashed potato",
            "price": {
              "without_basmathi_rice": 400,
              "with_basmathi_rice": 500
            }
          },
          {
            "dish_type": "Chicken Dish",
            "ingredients": "Chicken + Green peas salad with veggies + Smashed potato",
            "price": {
              "without_basmathi_rice": 500,
              "with_basmathi_rice": 600
            }
          },
          {
            "dish_type": "Beef Dish",
            "ingredients": "Beef + Green peas salad with veggies + Smashed potato",
            "price": {
              "without_basmathi_rice": 700,
              "with_basmathi_rice": 800
            }
          }
        ],
        "Dinner": [
          {
            "dish_type": "Egg Dish",
            "ingredients": "2 Fried eggs + Vegetables salad + Basmathi rice",
            "price": 500
          },
          {
            "dish_type": "Chicken Dish",
            "ingredients": "Chicken + Vegetables salad + Basmathi rice",
            "price": 600
          },
          {
            "dish_type": "Beef Dish",
            "ingredients": "Beef + Vegetables salad + Basmathi rice",
            "price": 700
          }
        ]
      }
    },
    {
      "day": "Thursday",
      "meals": {
        "Lunch": [
          {
            "dish_type": "Egg Dish",
            "ingredients": "2 Boiled eggs + Fried mushrooms, Cauliflower, Garlic + Beans",
            "price": {
              "without_basmathi_rice": 400,
              "with_basmathi_rice": 500
            }
          },
          {
            "dish_type": "Chicken Dish",
            "ingredients": "Chicken + Fried mushrooms, Cauliflower, Garlic + Beans",
            "price": {
              "without_basmathi_rice": 500,
              "with_basmathi_rice": 600
            }
          },
          {
            "dish_type": "Beef Dish",
            "ingredients": "Beef + Fried mushrooms, Cauliflower, Garlic + Beans",
            "price": {
              "without_basmathi_rice": 700,
              "with_basmathi_rice": 800
            }
          }
        ],
        "Dinner": [
          {
            "dish_type": "Egg Dish",
            "ingredients": "2 Boiled eggs + Smashed potato + Toasted bread",
            "price": 500
          },
          {
            "dish_type": "Chicken Dish",
            "ingredients": "Chicken + Smashed potato + Toasted bread",
            "price": 600
          },
          {
            "dish_type": "Beef Dish",
            "ingredients": "Beef + Smashed potato + Toasted bread",
            "price": 700
          }
        ]
      }
    },
    {
      "day": "Friday",
      "meals": {
        "Lunch": [
          {
            "dish_type": "Egg Dish",
            "ingredients": "Spinach wrap with Eggs and Veggies + Baked Potato",
            "price": 500
          },
          {
            "dish_type": "Chicken Dish",
            "ingredients": "Spinach wrap with Chicken and Veggies + Baked Potato",
            "price": 600
          },
          {
            "dish_type": "Beef Dish",
            "ingredients": "Spinach wrap with Beef and Veggies + Baked Potato",
            "price": 700
          }
        ],
        "Dinner": [
          {
            "dish_type": "Egg Dish",
            "ingredients": "2 Boiled eggs + Fried mushrooms + Kurakkan noodles with veggies",
            "price": 500
          },
          {
            "dish_type": "Chicken Dish",
            "ingredients": "Chicken + Fried mushrooms + Kurakkan noodles with veggies",
            "price": 600
          },
          {
            "dish_type": "Beef Dish",
            "ingredients": "Beef + Fried mushrooms + Kurakkan noodles with veggies",
            "price": 700
          }
        ]
      }
    },
    {
      "day": "Saturday",
      "meals": {
        "Lunch": [
          {
            "dish_type": "Egg Dish",
            "ingredients": "Scrambled egg + Pasta with veggies + Sweet corn",
            "price": 500
          },
          {
            "dish_type": "Chicken Dish",
            "ingredients": "Chicken + Pasta with veggies + Sweet corn",
            "price": 600
          },
          {
            "dish_type": "Beef Dish",
            "ingredients": "Beef + Pasta with veggies + Sweet corn",
            "price": 700
          }
        ],
        "Dinner": [
          {
            "dish_type": "Egg Dish",
            "ingredients": "2 Fried eggs + Boiled vegetables + Basmathi rice",
            "price": 500
          },
          {
            "dish_type": "Chicken Dish",
            "ingredients": "Chicken kebab + Boiled vegetables + Basmathi rice",
            "price": 600
          },
          {
            "dish_type": "Beef Dish",
            "ingredients": "Beef + Boiled vegetables + Basmathi rice",
            "price": 700
          }
        ]
      }
    }
  ]
}

const dayMap: Record<string, DayOfWeek> = {
  "Monday": "MONDAY",
  "Tuesday": "TUESDAY",
  "Wednesday": "WEDNESDAY",
  "Thursday": "THURSDAY",
  "Friday": "FRIDAY",
  "Saturday": "SATURDAY"
}

async function main() {
  console.log('Clearing existing food items...')
  await prisma.foodItem.deleteMany({})

  const foodsToCreate = []

  for (const dayData of menuData.weekly_menu) {
    const dayOfWeek = dayMap[dayData.day]

    for (const [mealName, meals] of Object.entries(dayData.meals)) {
      const mealType = mealName === "Lunch" ? "LUNCH" : "DINNER"

      for (const meal of meals) {
        let price = 0
        let description = meal.ingredients

        if (typeof meal.price === 'object') {
          price = meal.price.without_basmathi_rice
          description += ` (With Basmathi Rice: Rs. ${meal.price.with_basmathi_rice})`
        } else {
          price = meal.price
        }

        let imageUrl = ""
        if (meal.dish_type.includes("Egg")) imageUrl = "/images/egg_dish.png"
        else if (meal.dish_type.includes("Chicken")) imageUrl = "/images/chicken_dish.png"
        else if (meal.dish_type.includes("Beef")) imageUrl = "/images/beef_dish.png"

        foodsToCreate.push({
          name: meal.dish_type,
          description: description,
          price: price,
          imageUrl: imageUrl,
          isAvailable: true,
          dayOfWeek: dayOfWeek as DayOfWeek,
          mealType: mealType as MealType
        })
      }
    }
  }

  console.log(`Seeding ${foodsToCreate.length} food items...`)
  
  for (const food of foodsToCreate) {
    await prisma.foodItem.create({
      data: food,
    })
  }
  
  console.log('Seed completed successfully.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
