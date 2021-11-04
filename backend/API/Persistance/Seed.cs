using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Core.Domain;

namespace API.Persistance
{
    public class Seed
    {
        public static async Task SeedData(DataContext dbContext)
        {
            if (!dbContext.Products.Any())
            {
                var products = new List<Product>
                {
                    new Product {
                        Title = "Кадило благословенное",
                        Price = 39.99m,
                        Description = "Заправлять ладаном",
                        Image = "kadilo.png"
                    },
                    new Product {
                        Title = "Нательный крест",
                        Price = 10,
                        Description = "Защитит вас от нечисти всех мастей и размеров",
                        Image = "cross.png"
                    },
                    new Product {
                        Title = "Набор благовоний",
                        Price = 5.5m,
                        Description = "Глубоко не вдыхать"
                    },
                    new Product {
                        Title = "Святая вода",
                        Price = 4,
                        Description = "Один флакончик"
                    },
                    new Product {
                        Title = "Библия",
                        Price = 15,
                        Description = "Единственная книга, которая тебе необходима",
                        Image = "bible.png"
                    },
                    new Product {
                        Title = "Икона",
                        Price = 13,
                        Description = "Святая сила в твоём кармане",
                        Image = "icon.png"
                    },
                    new Product {
                        Title = "Ложка для причастия",
                        Price = 8,
                        Description = "Без единого отверстия",
                        Image = "spoon.png"
                    },
                    new Product {
                        Title = "Сборник заговоров",
                        Price = 18,
                        Description = "Пожелайте доброй жизни своему соседу сверху"
                    },
                    new Product {
                        Title = "Кафедра для молитвы",
                        Price = 120,
                        Description = "Установи у себя на даче",
                        Image = "pulpit.png"
                    },
                    new Product {
                        Title = "Футболка с Иисусом",
                        Price = 25,
                        Description = "Высокое качество принта",
                        Image = "tshirt.png"
                    },
                    new Product {
                        Title = "Пасхальный набор для окраски яиц",
                        Price = 12.5m,
                        Description = "Этим ты можешь покрасить свои яйца",
                        Image = "paint.png"
                    },
                    new Product {
                        Title = "Зажигалка",
                        Price = 25,
                        Description = "Рассеет тьму или даст прикурить",
                        Image = "zippo.png"
                    }
                };

                await dbContext.AddRangeAsync(products);
                await dbContext.SaveChangesAsync();
            }
        }
    }
}